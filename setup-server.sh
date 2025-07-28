#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_error "This script should not be run as root. Please run as ubuntu user."
   exit 1
fi

print_status "🚀 Setting up Wuniverse deployment environment on Debian 12..."

# Update system
print_status "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install required packages
print_status "📦 Installing required packages..."
sudo apt install -y \
    curl \
    wget \
    git \
    nginx \
    certbot \
    python3-certbot-nginx \
    apt-transport-https \
    ca-certificates \
    gnupg \
    lsb-release

# Install Docker
if ! command -v docker &> /dev/null; then
    print_status "🐳 Installing Docker..."
    curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt update
    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    sudo usermod -aG docker ubuntu
    print_status "✅ Docker installed successfully"
else
    print_status "✅ Docker already installed"
fi

# Install webhook
if ! command -v webhook &> /dev/null; then
    print_status "🪝 Installing webhook..."
    WEBHOOK_VERSION="2.8.0"
    wget -O /tmp/webhook.tar.gz "https://github.com/adnanh/webhook/releases/download/${WEBHOOK_VERSION}/webhook-linux-amd64.tar.gz"
    tar -xzf /tmp/webhook.tar.gz -C /tmp
    sudo mv /tmp/webhook-linux-amd64/webhook /usr/local/bin/
    sudo chmod +x /usr/local/bin/webhook
    rm -rf /tmp/webhook*
    print_status "✅ Webhook installed successfully"
else
    print_status "✅ Webhook already installed"
fi

# Setup project directory
PROJECT_DIR="/var/www/wuniverse"
if [ ! -d "$PROJECT_DIR" ]; then
    print_status "📁 Creating project directory..."
    sudo mkdir -p /var/www
    sudo chown ubuntu:ubuntu /var/www
    print_status "✅ Project directory created"
fi

# Setup systemd service for webhook
print_status "⚙️ Setting up webhook systemd service..."
sudo cp wuniverse-webhook.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable wuniverse-webhook
print_status "✅ Webhook service configured"

# Setup Nginx configuration
print_status "🌐 Setting up Nginx configuration..."
sudo cp nginx-wuniverse.conf /etc/nginx/sites-available/wuniverse.web.id
sudo ln -sf /etc/nginx/sites-available/wuniverse.web.id /etc/nginx/sites-enabled/
sudo nginx -t

# Remove default Nginx site if it exists
if [ -f /etc/nginx/sites-enabled/default ]; then
    sudo rm /etc/nginx/sites-enabled/default
fi

print_status "✅ Nginx configured successfully"

# Setup SSL with Let's Encrypt
print_status "🔒 Setting up SSL certificates..."
print_warning "Make sure your domain wuniverse.web.id points to this server before running SSL setup!"
echo ""
echo "To obtain SSL certificates, run:"
echo "sudo certbot --nginx -d wuniverse.web.id -d www.wuniverse.web.id"
echo ""

# Setup log files
print_status "📝 Setting up log files..."
sudo touch /var/log/wuniverse-deploy.log
sudo chown ubuntu:ubuntu /var/log/wuniverse-deploy.log

# Setup cron for certificate renewal
print_status "⏰ Setting up SSL certificate auto-renewal..."
(sudo crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet --post-hook 'systemctl reload nginx'") | sudo crontab -

print_status "✅ Server setup completed!"
echo ""
print_status "📋 Next steps:"
echo "1. Make sure your domain wuniverse.web.id points to this server"
echo "2. Run: sudo certbot --nginx -d wuniverse.web.id -d www.wuniverse.web.id"
echo "3. Clone your repository to /var/www/wuniverse"
echo "4. Start the webhook service: sudo systemctl start wuniverse-webhook"
echo "5. Test your deployment with: ./deploy.sh"
echo ""
print_status "🎉 Your server is ready for deployment!"