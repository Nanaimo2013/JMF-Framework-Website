#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
print_message() {
    echo -e "${GREEN}[RELEASE]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if version is provided
if [ -z "$1" ]; then
    print_error "Please provide a version number (e.g., 1.0.0)"
    exit 1
fi

VERSION=$1
TAG="v$VERSION"

# Validate version format
if ! [[ $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    print_error "Invalid version format. Use semantic versioning (e.g., 1.0.0)"
    exit 1
fi

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    print_warning "You have uncommitted changes. Please commit or stash them first."
    exit 1
fi

# Update version in package.json
print_message "Updating version in package.json..."
npm version $VERSION --no-git-tag-version

# Commit changes
print_message "Committing changes..."
git add package.json
git commit -m "chore: bump version to $VERSION"

# Create and push tag
print_message "Creating tag $TAG..."
git tag -a $TAG -m "Release $TAG"
git push origin $TAG

print_message "Release process started! The GitHub Action will handle the rest."
print_message "You can monitor the release progress in the Actions tab of your repository." 