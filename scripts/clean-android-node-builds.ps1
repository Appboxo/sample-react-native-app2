# Removes android/build under native modules in node_modules (fixes stale incremental / duplicate .class on Windows).
$ErrorActionPreference = 'Continue'
$root = Split-Path -Parent $PSScriptRoot
$cxxStaging = Join-Path ([Environment]::GetFolderPath('LocalApplicationData')) 'RN-CXX\TestBoxoRN'
$targets = @(
    (Join-Path $root 'node_modules\@appboxo\react-native-sdk\android\build'),
    (Join-Path $root 'node_modules\react-native-safe-area-context\android\build'),
    (Join-Path $root 'android\app\.cxx'),
    (Join-Path $root 'android\app\build'),
    $cxxStaging
)
foreach ($t in $targets) {
    if (Test-Path $t) {
        Remove-Item -Recurse -Force $t
        Write-Host "Removed: $t"
    }
}
Write-Host 'Done.'
