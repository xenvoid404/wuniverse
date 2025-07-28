#!/bin/bash

set -e

PROJECT_DIR="/var/www/wuniverse"
CURRENT_DIR=$(pwd)

echo "🚀 Setting up Wuniverse deployment environment..."

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    echo "❌ Please don't run this script as root. Use a user with sudo privileges."
    exit 1
fi

# Create project directory if it doesn't exist
echo "📁 Setting up project directory..."
sudo mkdir -p "$PROJECT_DIR"
sudo chown -R www-data:www-data "$PROJECT_DIR"
sudo chmod -R 755 "$PROJECT_DIR"

# Copy project files if not already in the target directory
if [ "$CURRENT_DIR" != "$PROJECT_DIR" ]; then
    echo "📋 Copying project files..."
    sudo cp -r . "$PROJECT_DIR/"
    sudo chown -R www-data:www-data "$PROJECT_DIR"
fi

# Make scripts executable
echo "🔧 Making scripts executable..."
sudo chmod +x "$PROJECT_DIR/deploy/run.sh"
sudo chmod +x "$PROJECT_DIR/deploy/install-dependencies.sh"

# Install the webhook service
echo "⚙️ Installing webhook service..."
sudo cp "$PROJECT_DIR/deploy/wuniverse-webhook.service" /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable wuniverse-webhook.service

# Create nginx configuration
echo "🌐 Setting up Nginx configuration..."
sudo cp "$PROJECT_DIR/deploy/wuniverse" /etc/nginx/sites-available/
sudo ln -sf /etc/nginx/sites-available/wuniverse /etc/nginx/sites-enabled/

# Remove default nginx site if it exists
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
echo "🧪 Testing Nginx configuration..."
sudo nginx -t

# Create log files
echo "📝 Setting up log files..."
sudo touch /var/log/wuniverse-deploy.log
sudo chown www-data:www-data /var/log/wuniverse-deploy.log
sudo chmod 664 /var/log/wuniverse-deploy.log

# Start services
echo "🚀 Starting services..."
sudo systemctl restart nginx
sudo systemctl start wuniverse-webhook.service

# Check service status
echo "🔍 Checking service status..."
sudo systemctl status nginx --no-pager -l
sudo systemctl status wuniverse-webhook.service --no-pager -l

# Build and start the application
echo "🐳 Building and starting application..."
cd "$PROJECT_DIR"
docker compose down --remove-orphans 2>/dev/null || true
docker compose build --no-cache
docker compose up -d

# Wait for application to start
echo "⏳ Waiting for application to start..."
sleep 30

# Check if application is running
if docker compose ps | grep -q "Up"; then
    echo "✅ Application is running!"
    
    # Test local connection
    if curl -f http://localhost:3001 >/dev/null 2>&1; then
        echo "✅ Application is responding on port 3001"
    else
        echo "⚠️ Application may not be ready yet, check logs with: docker compose logs"
    fi
else
    echo "❌ Application failed to start, check logs with: docker compose logs"
fi

echo ""
echo "✅ Setup completed!"
echo ""
echo "📋 Summary:"
echo "- Webhook service: systemctl status wuniverse-webhook.service"
echo "- Nginx service: systemctl status nginx"
echo "- Application logs: docker compose logs"
echo "- Deployment logs: tail -f /var/log/wuniverse-deploy.log"
echo ""
echo "🌐 Webhook URL: https://wuniverse.web.id/webhook"
echo "🌐 Application URL: https://wuniverse.web.id"
echo ""
echo "⚠️ Remember to:"
echo "1. Configure your domain DNS to point to this server"
echo "2. Set up SSL certificates with: sudo certbot --nginx -d wuniverse.web.id -d www.wuniverse.web.id"
echo "3. Configure GitHub webhook URL: https://wuniverse.web.id/webhook"