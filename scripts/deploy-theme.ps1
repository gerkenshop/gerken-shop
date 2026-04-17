param(
  [ValidateSet("development", "staging", "production")]
  [string]$Environment = "staging"
)

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

if (-not (Test-Path ".\shopify.theme.toml")) {
  throw "Missing shopify.theme.toml. Copy shopify.theme.toml.example and add your store credentials first."
}

cmd /c npm.cmd run "theme:push:$Environment"
