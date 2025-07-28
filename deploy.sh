#!/bin/bash

set -e

# Configuration
PROJECT_DIR="/var/www/wuniverse"
LOG_FILE="/var/log/wuniverse-deploy.log"
BACKUP_DIR="/var/backups/wuniverse"

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to create backup
create_backup() {
    log "📦 Creating backup..."
    mkdir -p "$BACKUP_DIR"
    BACKUP_NAME="wuniverse-backup-$(date +%Y%m%d-%H%M%S).tar.gz"
    tar -czf "$BACKUP_DIR/$BACKUP_NAME" -C "$PROJECT_DIR" --exclude='.git' --exclude='node_modules' --exclude='.next' .
    log "✅ Backup created: $BACKUP_NAME"
    
    # Keep only last 5 backups
    cd "$BACKUP_DIR"
    ls -t wuniverse-backup-*.tar.gz | tail -n +6 | xargs -r rm
}

# Function to rollback
rollback() {
    log "🔄 Rolling back..."
    docker compose down
    LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/wuniverse-backup-*.tar.gz | head -n 1)
    if [ -n "$LATEST_BACKUP" ]; then
        tar -xzf "$LATEST_BACKUP" -C "$PROJECT_DIR"
        docker compose up -d
        log "✅ Rollback completed"
    else
        log "❌ No backup found for rollback"
        exit 1
    fi
}

# Main deployment process
main() {
    log "🚀 Starting deployment..."
    
    cd "$PROJECT_DIR" || exit 1
    
    # Create backup before deployment
    create_backup
    
    # Pull latest changes
    log "🌀 Pulling latest changes..."
    if ! git pull origin master; then
        log "❌ Git pull failed"
        rollback
        exit 1
    fi
    
    # Stop containers
    log "🛑 Stopping containers..."
    docker compose down --remove-orphans
    
    # Build new images
    log "🔨 Building new images..."
    if ! docker compose build --no-cache; then
        log "❌ Docker build failed"
        rollback
        exit 1
    fi
    
    # Start containers
    log "🚢 Starting containers..."
    if ! docker compose up -d; then
        log "❌ Docker compose up failed"
        rollback
        exit 1
    fi
    
    # Wait for health check
    log "🔍 Waiting for application to be healthy..."
    sleep 30
    
    # Check if application is running
    if ! curl -f http://localhost:3001 > /dev/null 2>&1; then
        log "❌ Application health check failed"
        rollback
        exit 1
    fi
    
    # Clean up old docker images
    log "🧹 Cleaning up old Docker images..."
    docker image prune -f
    
    log "✅ Deployment completed successfully!"
}

# Trap errors and rollback
trap 'log "❌ Deployment failed, attempting rollback..."; rollback' ERR

# Run main function
main