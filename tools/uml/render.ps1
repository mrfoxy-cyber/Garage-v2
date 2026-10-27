param([switch]$CheckOnly)

$ErrorActionPreference = 'Stop'
$repository = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../..'))
if (-not $CheckOnly) {
    # One refresh updates the interactive data and the exact PUML that will be rendered below.
    & dotnet run --project (Join-Path $PSScriptRoot 'Uml.csproj') -- generate --root $repository
    if ($LASTEXITCODE -ne 0) { throw 'Diagram generation failed; no new previews were rendered.' }
}
$version = '1.2026.8'
$cache = Join-Path $PSScriptRoot ".cache/plantuml-$version"
[IO.Directory]::CreateDirectory($cache) | Out-Null

function Get-VerifiedDownload([string]$Url, [string]$Destination, [string]$Sha256) {
    if (-not (Test-Path -LiteralPath $Destination)) {
        Invoke-WebRequest -Uri $Url -OutFile $Destination
    }
    if ((Get-FileHash -LiteralPath $Destination -Algorithm SHA256).Hash.ToLowerInvariant() -ne $Sha256) {
        throw "Checksum mismatch for $Destination. Remove that cached download and retry."
    }
}

if ($IsWindows -and [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture -eq 'X64') {
    $archive = Join-Path $cache 'plantuml-windows.zip'
    Get-VerifiedDownload "https://github.com/plantuml/plantuml/releases/download/v$version/native-plantuml-windows-amd64-$version.zip" $archive '75c62a594d7db35fec5b4e745b9a6cf1a82acbc2dae9d99b4d5ab4b2ee6518d6'
    $renderer = Join-Path $cache 'plantuml.exe'
    if (-not (Test-Path -LiteralPath $renderer)) { Expand-Archive -LiteralPath $archive -DestinationPath $cache }
    $prefixArguments = @()
}
else {
    $java = Get-Command java -ErrorAction SilentlyContinue
    if (-not $java) { throw 'Install Java 21 or newer to render on this platform. Windows x64 uses the portable renderer automatically.' }
    $jar = Join-Path $cache "plantuml-$version.jar"
    Get-VerifiedDownload "https://github.com/plantuml/plantuml/releases/download/v$version/plantuml-$version.jar" $jar '5e1ecfa8ecd32c90b03bbf3b1eb6f020943f98ab0fcf4032be31a0002ee2c462'
    $renderer = $java.Source
    $prefixArguments = @('-Djava.awt.headless=true', '-jar', $jar)
}

$manifest = Get-Content -LiteralPath (Join-Path $repository 'docs/uml/manifest.json') -Raw | ConvertFrom-Json
$sources = @($manifest.diagrams | ForEach-Object { Join-Path $repository $_.file })
if ($sources.Count -eq 0) { throw 'The UML manifest contains no diagrams.' }
if (-not $CheckOnly) {
    $dataScript = [IO.File]::ReadAllText((Join-Path $repository 'docs/uml/diagrams.generated.js'))
    $snapshot = $dataScript.Substring($dataScript.IndexOf('=') + 1).Trim().TrimEnd(';') | ConvertFrom-Json
    $snapshotRoot = Join-Path $cache 'snapshot'
    $sources = @($snapshot.diagrams | ForEach-Object {
        $snapshotPath = Join-Path $snapshotRoot $_.source
        [IO.Directory]::CreateDirectory([IO.Path]::GetDirectoryName($snapshotPath)) | Out-Null
        [IO.File]::WriteAllText($snapshotPath, $_.puml, [Text.UTF8Encoding]::new($false))
        $snapshotPath
    })
}
if ($CheckOnly) { $renderArguments = @('--check-syntax', '--charset', 'UTF-8') }
else { $renderArguments = @('--format', 'svg', '--pragma', 'layout=smetana', '--check-before-run', '--charset', 'UTF-8') }
& $renderer @prefixArguments @renderArguments @sources
if ($LASTEXITCODE -ne 0) { throw "PlantUML failed with exit code $LASTEXITCODE." }

if (-not $CheckOnly) {
    foreach ($source in $sources) {
        if (-not (Test-Path -LiteralPath ([IO.Path]::ChangeExtension($source, '.svg')))) { throw "Missing SVG output for $source" }
    }
    $previewHashes = [ordered]@{}
    foreach ($diagram in $snapshot.diagrams) {
        $rendered = [IO.Path]::ChangeExtension((Join-Path $snapshotRoot $diagram.source), '.svg')
        $destination = Join-Path $repository ('docs/uml/' + $diagram.svg)
        Copy-Item -LiteralPath $rendered -Destination $destination -Force
        $previewHashes[$diagram.id] = $diagram.pumlHash
    }
    $stamp = 'globalThis.GARAGE_UML_PREVIEWS = ' + ($previewHashes | ConvertTo-Json) + ';' + "`n"
    [IO.File]::WriteAllText((Join-Path $repository 'docs/uml/previews.generated.js'), $stamp, [Text.UTF8Encoding]::new($false))
    Write-Output "Updated interactive data and $($sources.Count) PlantUML previews from the same source snapshot. Open docs/uml/index.html."
}
else { Write-Output "Validated PlantUML syntax for $($sources.Count) diagrams." }
