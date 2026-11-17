$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$chromeRoot = Join-Path $root 'src/chrome'
$firefoxRoot = Join-Path $root 'src/firefox'
$chrome = Get-Content (Join-Path $chromeRoot 'manifest.json') -Raw | ConvertFrom-Json
$firefox = Get-Content (Join-Path $firefoxRoot 'manifest.json') -Raw | ConvertFrom-Json

# Firefox's browser_specific_settings are intentionally browser-specific.
foreach ($property in $chrome.PSObject.Properties.Name) {
    $expected = ConvertTo-Json $chrome.$property -Depth 20 -Compress
    $actual = ConvertTo-Json $firefox.$property -Depth 20 -Compress
    if ($expected -cne $actual) { throw "Manifest mismatch: $property" }
}
foreach ($property in $firefox.PSObject.Properties.Name) {
    if ($property -ne 'browser_specific_settings' -and $property -notin $chrome.PSObject.Properties.Name) {
        throw "Unexpected Firefox manifest property: $property"
    }
}

$files = @($chrome.content_scripts | ForEach-Object { $_.js; $_.css })
$files += @($chrome.icons.PSObject.Properties.Value)
$files += 'icons/icon-source-v2.png'
foreach ($file in $files) {
    $expected = (Get-FileHash (Join-Path $chromeRoot $file)).Hash
    $actual = (Get-FileHash (Join-Path $firefoxRoot $file)).Hash
    if ($expected -ne $actual) { throw "Browser asset mismatch: $file" }
}
Write-Output "Browser parity passed for version $($chrome.version): manifests and $($files.Count) shared files match."
