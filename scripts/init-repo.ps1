param(
  [Parameter(Mandatory = $true)]
  [string]$RemoteUrl,
  [string]$Branch = "main"
)

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "Git is not installed or not available on PATH."
}

git init
git add .
git commit -m "Initial LayerForge Shopify theme and local app scaffold"
git branch -M $Branch
git remote remove origin 2>$null
git remote add origin $RemoteUrl

Write-Host "Repository initialized."
Write-Host "Next: git push -u origin $Branch"
