# Wuniverse Deployment Guide

This guide will help you set up auto-deployment with webhooks for the Wuniverse application.

## Prerequisites

- Ubuntu/Debian server with sudo access
- Domain name pointed to your server (wuniverse.web.id)
- GitHub repository for the project

## Quick Setup

### 1. Install Dependencies

First, install all required dependencies:

```bash
chmod +x deploy/install-dependencies.sh
./deploy/install-dependencies.sh
```

This will install:
- Docker and Docker Compose
- Webhook binary
- Nginx
- Git and other tools

### 2. Setup Deployment Environment

Run the setup script to configure everything:

```bash
chmod +x deploy/setup-deployment.sh
./deploy/setup-deployment.sh
```

This script will:
- Copy files to `/var/www/wuniverse`
- Install systemd service for webhook
- Configure Nginx
- Build and start the Docker container

### 3. Configure SSL (Required for webhooks)

Install Certbot and get SSL certificates:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d wuniverse.web.id -d www.wuniverse.web.id
```

### 4. Setup GitHub Webhook

1. Go to your GitHub repository
2. Navigate to Settings > Webhooks
3. Click "Add webhook"
4. Set Payload URL: `https://wuniverse.web.id/webhook`
5. Content type: `application/json`
6. Select "Just the push event"
7. Ensure "Active" is checked
8. Click "Add webhook"

## Manual Commands

### Check Service Status

```bash
# Check webhook service
sudo systemctl status wuniverse-webhook.service

# Check nginx
sudo systemctl status nginx

# Check application
docker compose ps
docker compose logs
```

### View Logs

```bash
# Deployment logs
tail -f /var/log/wuniverse-deploy.log

# Webhook logs
sudo journalctl -u wuniverse-webhook.service -f

# Application logs
docker compose logs -f
```

### Manual Deployment

```bash
cd /var/www/wuniverse
sudo -u www-data ./deploy/run.sh
```

## Troubleshooting

### Webhook Not Triggering

1. Check webhook service status:
   ```bash
   sudo systemctl status wuniverse-webhook.service
   ```

2. Check webhook logs:
   ```bash
   sudo journalctl -u wuniverse-webhook.service -f
   ```

3. Test webhook manually:
   ```bash
   curl -X POST https://wuniverse.web.id/webhook
   ```

### Docker Issues

1. Check if Docker is running:
   ```bash
   sudo systemctl status docker
   ```

2. Check Docker permissions:
   ```bash
   groups $USER  # Should include 'docker'
   ```

3. If permissions are wrong:
   ```bash
   sudo usermod -aG docker $USER
   newgrp docker
   ```

### Nginx Issues

1. Test Nginx configuration:
   ```bash
   sudo nginx -t
   ```

2. Check Nginx logs:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   sudo tail -f /var/log/nginx/wuniverse.error.log
   ```

3. Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

### Application Not Starting

1. Check container logs:
   ```bash
   docker compose logs
   ```

2. Rebuild container:
   ```bash
   docker compose down
   docker compose build --no-cache
   docker compose up -d
   ```

## File Structure

```
deploy/
├── hooks.json                 # Webhook configuration
├── run.sh                    # Deployment script
├── wuniverse                 # Nginx configuration
├── wuniverse-webhook.service # Systemd service
├── install-dependencies.sh  # Dependency installation
├── setup-deployment.sh      # Full setup script
├── nginx-rate-limit.conf    # Rate limiting configuration
└── README.md                # This file
```

## Security Notes

- The webhook service runs as `www-data` user
- SSL/TLS is required for webhook security
- Rate limiting is configured in Nginx
- Logs are properly secured with appropriate permissions

## Configuration Files

### Environment Variables

The application uses these environment variables:
- `NODE_ENV=production`
- `PORT=3001`

### Ports

- Application: 3001 (internal)
- Webhook: 9000 (internal)
- Nginx: 80, 443 (external)

## Monitoring

You can monitor the deployment with:

```bash
# Watch deployment logs
watch -n 5 'tail -10 /var/log/wuniverse-deploy.log'

# Check container health
watch -n 5 'docker compose ps'

# Monitor resource usage
docker stats
```