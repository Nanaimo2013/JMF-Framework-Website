#!/bin/sh

# Set environment variables if not already set
: ${SERVER_PORT:=80}
: ${NODE_ENV:=production}

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Update application code if a Git repository is configured
if [ -n "$GIT_REPO" ]; then
    log "Updating from Git repository: $GIT_REPO"
  
  if [ -d "/app-repo" ]; then
    cd /app-repo
        log "Pulling latest changes..."
    git pull
  else
        log "Cloning repository..."
    git clone $GIT_REPO /app-repo
    cd /app-repo
  fi

    # Build the application
  if [ -f "package.json" ]; then
        log "Installing dependencies..."
    npm install
        
        log "Building application..."
    npm run build
    
    # Copy the built app to nginx html directory
        log "Deploying to web server..."
    cp -r dist/* /usr/share/nginx/html/
  fi
fi

# Handle Pterodactyl specific environment
if [ -n "$PTERODACTYL" ]; then
    log "Running in Pterodactyl environment"
    
    # Update port in nginx config if needed
    if [ "$SERVER_PORT" != "80" ]; then
        log "Configuring nginx to listen on port $SERVER_PORT"
        sed -i "s/listen 80/listen $SERVER_PORT/" /etc/nginx/conf.d/default.conf
    fi
fi

# Start nginx
log "Starting nginx on port $SERVER_PORT..."
nginx -g 'daemon off;' 