# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Install git for auto-updates
RUN apk add --no-cache git

# Copy the built app to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Create necessary directories and set permissions
RUN mkdir -p /var/cache/nginx /var/run \
    && chown -R nginx:nginx /var/cache/nginx /var/run \
    && chmod -R 755 /var/cache/nginx /var/run

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh

# Set environment variables
ENV SERVER_PORT=80
ENV NODE_ENV=production
ENV PTERODACTYL=true

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost:$SERVER_PORT || exit 1

ENTRYPOINT ["/entrypoint.sh"] 