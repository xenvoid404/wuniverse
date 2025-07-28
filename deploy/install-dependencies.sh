#!/bin/bash

set -e

echo "🚀 Installing dependencies for Wuniverse deployment..."

# Update package list
echo "📦 Updating package list..."
sudo apt update

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    
    # Install required packages
    sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release
    
    # Add Docker's official GPG key
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
    # Add Docker repository
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # Update package list with Docker packages
    sudo apt update
    
    # Install Docker
    sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    
    # Add current user to docker group
    sudo usermod -aG docker $USER
    
    echo "✅ Docker installed successfully!"
else
    echo "✅ Docker is already installed"
fi

# Install webhook if not installed
if ! command -v webhook &> /dev/null; then
    echo "🪝 Installing webhook..."
    
    # Download and install webhook
    WEBHOOK_VERSION="2.8.1"
    wget -O /tmp/webhook.tar.gz "https://github.com/adnanh/webhook/releases/download/${WEBHOOK_VERSION}/webhook-linux-amd64.tar.gz"
    
    # Extract and install
    cd /tmp
    tar -xzf webhook.tar.gz
    sudo mv webhook-linux-amd64/webhook /usr/local/bin/
    sudo chmod +x /usr/local/bin/webhook
    
    # Clean up
    rm -rf /tmp/webhook.tar.gz /tmp/webhook-linux-amd64
    
    echo "✅ Webhook installed successfully!"
else
    echo "✅ Webhook is already installed"
fi

# Install other required tools
echo "🛠️ Installing additional tools..."
sudo apt install -y git curl nginx

# Create necessary directories
echo "📁 Creating necessary directories..."
sudo mkdir -p /var/www/wuniverse
sudo mkdir -p /var/log

# Set permissions
echo "🔐 Setting up permissions..."
sudo chown -R www-data:www-data /var/www/wuniverse
sudo chmod -R 755 /var/www/wuniverse

echo "✅ All dependencies installed successfully!"
echo ""
echo "⚠️  IMPORTANT: You may need to log out and log back in for Docker permissions to take effect."
echo "   Or run: newgrp docker"
echo ""
echo "Next steps:"
echo "1. Copy your project files to /var/www/wuniverse"
echo "2. Install the webhook service: sudo systemctl enable wuniverse-webhook.service"
echo "3. Start the webhook service: sudo systemctl start wuniverse-webhook.service"
echo "4. Configure Nginx with the provided configuration"