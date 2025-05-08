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
    
    # Create custom nginx config with dynamic port if needed
    if [ "$SERVER_PORT" != "80" ]; then
        log "Configuring nginx to listen on port $SERVER_PORT"
        mkdir -p /mnt/server/nginx
        cat > /mnt/server/nginx/default.conf << EOF
server {
    listen ${SERVER_PORT};
    server_name _;
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
}
EOF
    fi
fi

# Start nginx with the custom config
log "Starting nginx on port $SERVER_PORT..."
nginx -c /etc/nginx/nginx.conf -g 'daemon off;' 