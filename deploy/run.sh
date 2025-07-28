#!/bin/bash

set -e

# Configuration
PROJECT_DIR="/var/www/wuniverse"
LOG_FILE="/var/log/wuniverse-deploy.log"
BRANCH="master"

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Create log file if it doesn't exist
if [ ! -f "$LOG_FILE" ]; then
    sudo touch "$LOG_FILE" || touch "$LOG_FILE"
    sudo chown www-data:www-data "$LOG_FILE" 2>/dev/null || true
fi

log "🚀 Starting deployment process..."

# Navigate to project directory
cd "$PROJECT_DIR" || {
    log "❌ Failed to navigate to project directory: $PROJECT_DIR"
    exit 1
}

# Check if git repository exists
if [ ! -d ".git" ]; then
    log "❌ Not a git repository"
    exit 1
fi

# Pull latest changes
log "🌀 Pulling latest changes from $BRANCH..."
git fetch origin || {
    log "❌ Failed to fetch from origin"
    exit 1
}
git reset --hard "origin/$BRANCH" || {
    log "❌ Failed to reset to origin/$BRANCH"
    exit 1
}

# Stop and remove old containers
log "🛑 Stopping existing containers..."
docker compose down --remove-orphans

# Remove old images to free space
log "🧹 Cleaning up old Docker images..."
docker image prune -f

# Build and start new containers
log "🚢 Building and starting new containers..."
docker compose build --no-cache || {
    log "❌ Failed to build containers"
    exit 1
}

docker compose up -d || {
    log "❌ Failed to start containers"
    exit 1
}

# Wait for container to be healthy
log "⏳ Waiting for container to be ready..."
sleep 30

# Check if container is running
if docker compose ps | grep -q "Up"; then
    log "✅ Deployment completed successfully!"
    log "🌐 Application is running at http://localhost:3001"
    
    # Test if the application responds
    sleep 10
    if curl -f http://localhost:3001 >/dev/null 2>&1; then
        log "✅ Application is responding correctly"
    else
        log "⚠️ Application may not be fully ready yet"
    fi
else
    log "❌ Deployment failed - container is not running"
    log "Container logs:"
    docker compose logs --tail=50
    exit 1
fi