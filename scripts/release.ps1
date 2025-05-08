# PowerShell Release Script

param(
    [Parameter(Mandatory=$true)]
    [string]$Version
)

# Function to print colored messages
function Write-ReleaseMessage {
    param([string]$Message)
    Write-Host "[RELEASE] $Message" -ForegroundColor Green
}

function Write-ErrorMessage {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Write-WarningMessage {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

# Validate version format
if (-not ($Version -match '^\d+\.\d+\.\d+$')) {
    Write-ErrorMessage "Invalid version format. Use semantic versioning (e.g., 1.0.0)"
    exit 1
}

$Tag = "v$Version"

# Check if there are uncommitted changes
$status = git status --porcelain
if ($status) {
    Write-WarningMessage "You have uncommitted changes. Please commit or stash them first."
    exit 1
}

# Update version in package.json
Write-ReleaseMessage "Updating version in package.json..."
npm version $Version --no-git-tag-version

# Commit changes
Write-ReleaseMessage "Committing changes..."
git add package.json
git commit -m "chore: bump version to $Version"

# Create and push tag
Write-ReleaseMessage "Creating tag $Tag..."
git tag -a $Tag -m "Release $Tag"
git push origin $Tag

Write-ReleaseMessage "Release process started! The GitHub Action will handle the rest."
Write-ReleaseMessage "You can monitor the release progress in the Actions tab of your repository." 