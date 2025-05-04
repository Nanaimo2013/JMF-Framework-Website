#!/bin/bash

# JMF Framework Website - Pterodactyl Installation Script
# Author: nanaimo2013

set -e

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Welcome message
log "Starting JMF Framework Website installation for Pterodactyl"
log "This script will set up the docker container for your panel"

# Check if docker is installed
if ! command -v docker &> /dev/null; then
    log "Error: Docker is not installed. Please install Docker first."
    exit 1
fi

# Get configuration options
read -p "Enter the port to use (default: 80): " PORT
PORT=${PORT:-80}

read -p "Enter the GitHub repository to use for auto-updates (leave empty to skip): " GIT_REPO

# Create docker-compose.yml
log "Creating docker-compose configuration..."

cat > docker-compose.yml << EOF
version: '3.8'

services:
  jmf-website:
    image: ghcr.io/nanaimo2013/jmf-framework-website:latest
    container_name: jmf-website
    restart: unless-stopped
    ports:
      - "${PORT}:${PORT}"
    environment:
      - SERVER_PORT=${PORT}
      - PTERODACTYL=true
EOF

# Add Git repo if provided
if [ -n "$GIT_REPO" ]; then
    cat >> docker-compose.yml << EOF
      - GIT_REPO=${GIT_REPO}
EOF
fi

# Finish the docker-compose file
cat >> docker-compose.yml << EOF
    volumes:
      - website_data:/usr/share/nginx/html

volumes:
  website_data:
EOF

log "Configuration created successfully!"

# Start the container
log "Starting JMF Framework Website container..."
docker-compose up -d

# Final instructions
log "Installation complete!"
log "The JMF Framework Website is now running at: http://localhost:${PORT}"
log "To check logs, run: docker-compose logs -f"
log "To update, run: docker-compose pull && docker-compose up -d"

exit 0 