#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/var/www/wuniverse"
WEBHOOK_PORT="9000"
APP_PORT="3001"
DOMAIN="your-domain.com"  # Change this to your domain
NODE_VERSION="22"  # Using Node.js 22

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if running as root
check_root() {
    if [ "$EUID" -ne 0 ]; then
        print_error "Please run this script as root (use sudo)"
        exit 1
    fi
}

# Function to update system
update_system() {
    print_status "Updating system packages..."
    apt update && apt upgrade -y
    print_success "System updated"
}

# Function to install Docker
install_docker() {
    if command -v docker &> /dev/null; then
        print_success "Docker already installed"
        return
    fi
    
    print_status "Installing Docker..."
    
    # Install prerequisites
    apt install -y apt-transport-https ca-certificates curl gnupg lsb-release
    
    # Add Docker's official GPG key
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    
    # Add Docker repository
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    
    # Install Docker
    apt update
    apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    
    # Start and enable Docker
    systemctl start docker
    systemctl enable docker
    
    # Add www-data to docker group
    usermod -aG docker www-data
    
    print_success "Docker installed successfully"
}

# Function to install nginx
install_nginx() {
    if command -v nginx &> /dev/null; then
        print_success "Nginx already installed"
        return
    fi
    
    print_status "Installing Nginx..."
    apt install -y nginx
    systemctl start nginx
    systemctl enable nginx
    print_success "Nginx installed successfully"
}

# Function to install webhook
install_webhook() {
    if command -v webhook &> /dev/null; then
        print_success "Webhook already installed"
        return
    fi
    
    print_status "Installing webhook..."
    
    # Download and install webhook
    WEBHOOK_VERSION="2.8.1"
    wget -O /tmp/webhook.tar.gz "https://github.com/adnanh/webhook/releases/download/${WEBHOOK_VERSION}/webhook-linux-amd64.tar.gz"
    tar -xzf /tmp/webhook.tar.gz -C /tmp
    mv /tmp/webhook-linux-amd64/webhook /usr/local/bin/
    chmod +x /usr/local/bin/webhook
    rm -rf /tmp/webhook*
    
    print_success "Webhook installed successfully"
}

# Function to setup directories and permissions
setup_directories() {
    print_status "Setting up directories and permissions..."
    
    # Create necessary directories
    mkdir -p /var/www/wuniverse
    mkdir -p /var/log
    mkdir -p /var/backups/wuniverse
    
    # Set ownership
    chown -R www-data:www-data /var/www/wuniverse
    chown -R www-data:www-data /var/backups/wuniverse
    
    # Set permissions
    chmod 755 /var/www/wuniverse
    chmod 755 /var/backups/wuniverse
    
    print_success "Directories and permissions configured"
}

# Function to setup systemd service
setup_systemd() {
    print_status "Setting up systemd service for webhook..."
    
    # Copy service file
    cp "$PROJECT_DIR/wuniverse-webhook.service" /etc/systemd/system/
    
    # Reload systemd and enable service
    systemctl daemon-reload
    systemctl enable wuniverse-webhook.service
    
    print_success "Systemd service configured"
}

# Function to setup nginx configuration
setup_nginx() {
    print_status "Setting up Nginx configuration..."
    
    # Backup default nginx config if exists
    if [ -f /etc/nginx/sites-enabled/default ]; then
        mv /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/default.backup
    fi
    
    # Copy nginx configuration
    cp "$PROJECT_DIR/nginx-wuniverse.conf" /etc/nginx/sites-available/wuniverse
    ln -sf /etc/nginx/sites-available/wuniverse /etc/nginx/sites-enabled/wuniverse
    
    # Test nginx configuration
    nginx -t
    
    # Reload nginx
    systemctl reload nginx
    
    print_success "Nginx configuration applied"
}

# Function to setup firewall
setup_firewall() {
    print_status "Setting up firewall rules..."
    
    # Install ufw if not installed
    if ! command -v ufw &> /dev/null; then
        apt install -y ufw
    fi
    
    # Configure firewall
    ufw --force reset
    ufw default deny incoming
    ufw default allow outgoing
    ufw allow ssh
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw --force enable
    
    print_success "Firewall configured"
}

# Function to create health check endpoint
create_health_check() {
    print_status "Creating health check endpoint..."
    
    mkdir -p "$PROJECT_DIR/app/api/health"
    cat > "$PROJECT_DIR/app/api/health/route.ts" << 'EOF'
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        external: Math.round(process.memoryUsage().external / 1024 / 1024),
      },
      pid: process.pid,
    };

    return NextResponse.json(healthData, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 500 }
    );
  }
}
EOF
    
    chown www-data:www-data "$PROJECT_DIR/app/api/health/route.ts"
    print_success "Health check endpoint created"
}

# Function to setup log rotation
setup_log_rotation() {
    print_status "Setting up log rotation..."
    
    cat > /etc/logrotate.d/wuniverse << 'EOF'
/var/log/wuniverse-deploy.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        systemctl reload wuniverse-webhook > /dev/null 2>&1 || true
    endscript
}
EOF
    
    print_success "Log rotation configured"
}

# Function to start services
start_services() {
    print_status "Starting services..."
    
    # Make deploy script executable
    chmod +x "$PROJECT_DIR/deploy.sh"
    
    # Start webhook service
    systemctl start wuniverse-webhook.service
    systemctl status wuniverse-webhook.service --no-pager
    
    print_success "Services started"
}

# Function to display final instructions
display_instructions() {
    print_success "Setup completed successfully!"
    echo ""
    echo -e "${YELLOW}Configuration Summary:${NC}"
    echo "- Node.js Version: $NODE_VERSION"
    echo "- Application Port: $APP_PORT"
    echo "- Webhook Port: $WEBHOOK_PORT"
    echo "- Project Directory: $PROJECT_DIR"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "1. Update the domain name in /etc/nginx/sites-available/wuniverse"
    echo "2. Configure your GitHub webhook to point to: http://$DOMAIN/webhook"
    echo "3. Deploy your application by running: cd $PROJECT_DIR && ./deploy.sh"
    echo "4. Set up SSL certificate using certbot (recommended)"
    echo ""
    echo -e "${BLUE}Useful commands:${NC}"
    echo "- Check webhook status: systemctl status wuniverse-webhook"
    echo "- View webhook logs: journalctl -u wuniverse-webhook -f"
    echo "- View deploy logs: tail -f /var/log/wuniverse-deploy.log"
    echo "- Test application: curl http://localhost:$APP_PORT/health"
    echo "- Test webhook: curl http://localhost:$WEBHOOK_PORT/webhook"
    echo ""
    echo -e "${GREEN}Your application will be available at: http://$DOMAIN${NC}"
}

# Main execution
main() {
    print_status "Starting Wuniverse server setup with Node.js $NODE_VERSION..."
    
    check_root
    update_system
    install_docker
    install_nginx
    install_webhook
    setup_directories
    
    if [ -d "$PROJECT_DIR" ] && [ -f "$PROJECT_DIR/package.json" ]; then
        setup_systemd
        setup_nginx
        create_health_check
        setup_log_rotation
        setup_firewall
        start_services
        display_instructions
    else
        print_error "Project directory not found or invalid. Please ensure your project is in $PROJECT_DIR"
        exit 1
    fi
}

# Run main function
main "$@"