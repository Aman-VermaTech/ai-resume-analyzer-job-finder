$ErrorActionPreference = "Stop"

if (-not $env:GEMINI_API_KEY) {
  $env:GEMINI_API_KEY = Read-Host "Enter your Gemini API key"
}

if (-not $env:GEMINI_MODEL) {
  $env:GEMINI_MODEL = "gemini-3.1-flash-lite"
}

$bundledNode = "C:\Users\ROG\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$node = if (Test-Path $bundledNode) { $bundledNode } else { "node" }

Write-Host "Starting Resume AI Analyzer at http://localhost:8765"
Write-Host "Using model: $env:GEMINI_MODEL"
& $node "$PSScriptRoot\server.js"
