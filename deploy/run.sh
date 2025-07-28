#!/bin/bash

set -e

# Configuration
PROJECT_DIR="/var/www/wuniverse"
LOG_FILE="/var/log/wuniverse-deploy.log"
BRANCH="master"

# Function to log with timestamp
log() {
    echo "[$(date '%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_FILE
}

# Create log file if it doesn't exist
sudo touch $LOG_FILE
sudo chown www-data:www-data $LOG_FILE

log "🚀 Starting deployment process..."

# Navigate to project directory
cd $PROJECT_DIR

# Pull latest changes
log "🌀 Pulling latest changes from $BRANCH..."
git fetch origin
git reset --hard origin/$BRANCH

# Stop and remove old containers
log "🛑 Stopping existing containers..."
docker compose down --remove-orphans

# Remove old images to free space
log "🧹 Cleaning up old Docker images..."
docker image prune -f

# Build and start new containers
log "🚢 Building and starting new containers..."
docker compose build --no-cache
docker compose up -d

# Wait for container to be healthy
log "⏳ Waiting for container to be ready..."
sleep 10

# Check if container is running
if docker compose ps | grep -q "Up"; then
    log "✅ Deployment completed successfully!"
    log "🌐 Application is running at http://localhost:3001"
else
    log "❌ Deployment failed - container is not running"
    docker compose logs
    exit 1
fi