# Sets JDK + Android SDK paths for this session (fixes adb/java when user PATH is incomplete).
$ErrorActionPreference = 'Stop'
$ProjectRoot = Split-Path -Parent $PSScriptRoot

$androidSdk = Join-Path ([Environment]::GetFolderPath('LocalApplicationData')) 'Android\Sdk'

$javaHomeCandidates = @(
    (Join-Path ${env:ProgramFiles} 'Android\Android Studio\jbr'),
    (Join-Path $env:LOCALAPPDATA 'Programs\Android\Android Studio\jbr'),
    (Join-Path ${env:ProgramFiles(x86)} 'Android\Android Studio\jbr')
)

$javaHome = $null
foreach ($c in $javaHomeCandidates) {
    if ($c -and (Test-Path (Join-Path $c 'bin\java.exe'))) {
        $javaHome = $c
        break
    }
}

if (-not $javaHome) {
    Write-Error @'
Could not find a JDK (java.exe). Install Android Studio, or set JAVA_HOME to your JDK folder (e.g. ...\Android Studio\jbr), then try again.
'@
    exit 1
}

if (-not (Test-Path (Join-Path $androidSdk 'platform-tools\adb.exe'))) {
    Write-Error @"
Android SDK not found at:
  $androidSdk
Install SDK Platform-Tools via Android Studio (SDK Manager), or set ANDROID_HOME to your SDK path.
"@
    exit 1
}

$env:JAVA_HOME = $javaHome
$env:ANDROID_HOME = $androidSdk
$env:ANDROID_SDK_ROOT = $androidSdk

$prepend = @(
    (Join-Path $javaHome 'bin'),
    (Join-Path $androidSdk 'platform-tools'),
    (Join-Path $androidSdk 'emulator')
) -join ';'
$env:Path = "$prepend;$env:Path"

Set-Location $ProjectRoot

$rn = Join-Path $ProjectRoot 'node_modules\.bin\react-native.cmd'
if (-not (Test-Path $rn)) {
    Write-Error 'node_modules missing. Run yarn install in the project root, then retry.'
    exit 1
}

Write-Host "JAVA_HOME=$env:JAVA_HOME"
Write-Host "ANDROID_HOME=$env:ANDROID_HOME"
Write-Host ''

& $rn run-android @args
