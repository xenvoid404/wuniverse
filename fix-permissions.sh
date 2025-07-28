#!/bin/bash

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔧 Fixing permissions for Wuniverse...${NC}"

# Set correct ownership
sudo chown -R www-data:www-data /var/www/wuniverse
sudo chown -R www-data:www-data /var/backups/wuniverse 2>/dev/null || true

# Set directory permissions
find /var/www/wuniverse -type d -exec chmod 755 {} \;

# Set file permissions
find /var/www/wuniverse -type f -exec chmod 644 {} \;

# Make scripts executable
chmod +x /var/www/wuniverse/deploy.sh
chmod +x /var/www/wuniverse/setup-server.sh
chmod +x /var/www/wuniverse/fix-permissions.sh

# Set log file permissions
sudo touch /var/log/wuniverse-deploy.log
sudo chown www-data:www-data /var/log/wuniverse-deploy.log
sudo chmod 644 /var/log/wuniverse-deploy.log

# Set backup directory permissions
sudo mkdir -p /var/backups/wuniverse
sudo chown www-data:www-data /var/backups/wuniverse
sudo chmod 755 /var/backups/wuniverse

echo -e "${GREEN}✅ Permissions fixed successfully!${NC}"