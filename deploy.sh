#!/bin/bash

set -e

cd /var/www/wuniverse

echo "🌀 Pulling latest changes..."
git pull origin master

echo "🚢 Rebuilding docker containers..."
docker compose down --remove-orphans
docker compose build --no-cache
docker compose up -d

echo "✅ Deploy completed!"