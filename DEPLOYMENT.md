# Wuniverse Deployment Guide

Panduan lengkap untuk deploy aplikasi Wuniverse di VPS Debian 12 dengan Docker, auto-deploy webhook, dan Nginx menggunakan Node.js 22.

## 📋 Prerequisites

- VPS dengan Debian 12
- Root access atau sudo privileges
- Domain name (opsional, bisa menggunakan IP)
- GitHub repository dengan webhook access
- Node.js 22 (akan diinstall via Docker)

## 🚀 Quick Setup

### 1. Clone Repository ke VPS

```bash
# Login ke VPS dan clone repository
sudo mkdir -p /var/www
cd /var/www
sudo git clone https://github.com/your-username/wuniverse.git
sudo chown -R www-data:www-data /var/www/wuniverse
```

### 2. Jalankan Setup Script

```bash
cd /var/www/wuniverse
sudo chmod +x setup-server.sh
sudo ./setup-server.sh
```

Script ini akan menginstall dan mengkonfigurasi:
- Docker & Docker Compose
- Nginx
- Webhook service
- Systemd service
- Firewall (UFW)
- Log rotation

### 3. Konfigurasi Domain

Edit file nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/wuniverse
```

Ganti `your-domain.com` dengan domain Anda.

### 4. Restart Nginx

```bash
sudo systemctl reload nginx
```

### 5. Setup GitHub Webhook

Di GitHub repository Anda:
1. Go to Settings → Webhooks
2. Add webhook dengan URL: `http://your-domain.com/webhook`
3. Content type: `application/json`
4. Select: "Just the push event"

## 📁 File Structure

```
/var/www/wuniverse/
├── app/                          # Next.js app directory
├── public/                       # Static files
├── Dockerfile                    # Optimized multi-stage Docker build (Node.js 22)
├── docker-compose.yaml           # Production Docker Compose
├── next.config.ts               # Next.js config with standalone output
├── deploy.sh                    # Enhanced deployment script
├── hooks.json                   # Webhook configuration
├── wuniverse-webhook.service    # Systemd service file
├── nginx-wuniverse.conf         # Nginx configuration
└── setup-server.sh              # Server setup script
```

## 🔧 Configuration Files

### Docker Configuration

**Dockerfile** - Multi-stage build untuk optimasi:
- Base image: Node.js 22 Alpine
- Security: Non-root user
- Optimization: Standalone output
- Size: Minimal production image

**docker-compose.yaml** - Production configuration:
- Health checks
- Logging configuration
- Network isolation
- Security binding (127.0.0.1 only)

### Nginx Configuration

**nginx-wuniverse.conf** features:
- Reverse proxy ke aplikasi (port 3001)
- Webhook endpoint (port 9000)
- Security headers
- Gzip compression
- Static file caching
- Rate limiting
- SSL ready (commented out)

### Webhook Configuration

**wuniverse-webhook.service** - Systemd service:
- Runs as www-data user
- Auto-restart on failure
- Security restrictions
- Logging to journald

**hooks.json** - Webhook configuration:
- GitHub webhook integration
- Security filters
- Environment variables
- Logging

## 🛠 Manual Commands

### Docker Operations

```bash
# Build and start containers
cd /var/www/wuniverse
sudo docker compose up -d --build

# View logs
sudo docker compose logs -f

# Stop containers
sudo docker compose down

# Rebuild without cache
sudo docker compose build --no-cache
```

### Webhook Service

```bash
# Check status
sudo systemctl status wuniverse-webhook

# Start/stop/restart
sudo systemctl start wuniverse-webhook
sudo systemctl stop wuniverse-webhook
sudo systemctl restart wuniverse-webhook

# View logs
sudo journalctl -u wuniverse-webhook -f

# Reload configuration
sudo systemctl reload wuniverse-webhook
```

### Nginx Operations

```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# View access logs
sudo tail -f /var/log/nginx/access.log

# View error logs
sudo tail -f /var/log/nginx/error.log
```

## 📊 Monitoring & Logs

### Application Logs

```bash
# Deployment logs
sudo tail -f /var/log/wuniverse-deploy.log

# Docker container logs
sudo docker compose logs -f wuniverse

# Webhook logs
sudo journalctl -u wuniverse-webhook -f
```

### Health Checks

```bash
# Check application health (will show Node.js 22 version)
curl http://localhost:3001/health

# Check webhook endpoint
curl http://localhost:9000/webhook

# Check via nginx
curl http://your-domain.com/health
```

Example health check response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "version": "1.0.0",
  "environment": "production",
  "nodeVersion": "v22.x.x",
  "uptime": 3600,
  "memory": {
    "used": 45,
    "total": 128,
    "external": 12
  },
  "pid": 1
}
```

## 🔒 Security Features

### Firewall (UFW)
- SSH (22)
- HTTP (80)
- HTTPS (443)
- All other ports blocked

### Nginx Security
- Security headers
- Rate limiting
- IP restrictions for webhook
- Hidden sensitive files

### Docker Security
- Non-root user
- Minimal base image (Alpine)
- Network isolation
- Resource limits

### Systemd Security
- Restricted file access
- Capability dropping
- Private temp directory

## 🚨 Troubleshooting

### Common Issues

1. **Docker build fails**
   ```bash
   # Check Docker service
   sudo systemctl status docker
   
   # Restart Docker
   sudo systemctl restart docker
   ```

2. **Node.js version mismatch**
   ```bash
   # Check container Node.js version
   sudo docker compose exec wuniverse node --version
   
   # Should show v22.x.x
   ```

3. **Webhook not triggering**
   ```bash
   # Check webhook service
   sudo systemctl status wuniverse-webhook
   
   # Check webhook logs
   sudo journalctl -u wuniverse-webhook -f
   
   # Test webhook manually
   curl -X POST http://localhost:9000/webhook
   ```

4. **Nginx 502 Bad Gateway**
   ```bash
   # Check if application is running
   sudo docker compose ps
   
   # Check application logs
   sudo docker compose logs wuniverse
   
   # Test direct connection
   curl http://localhost:3001
   ```

5. **Permission errors**
   ```bash
   # Fix ownership
   sudo chown -R www-data:www-data /var/www/wuniverse
   
   # Fix permissions
   sudo chmod +x /var/www/wuniverse/deploy.sh
   ```

### Log Locations

- Application: `sudo docker compose logs wuniverse`
- Deployment: `/var/log/wuniverse-deploy.log`
- Webhook: `sudo journalctl -u wuniverse-webhook`
- Nginx Access: `/var/log/nginx/access.log`
- Nginx Error: `/var/log/nginx/error.log`

## 🔐 SSL Setup (Recommended)

### Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx
```

### Get SSL Certificate

```bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### Auto-renewal

```bash
# Test renewal
sudo certbot renew --dry-run

# Check renewal timer
sudo systemctl status certbot.timer
```

## 📈 Performance Optimization

### Docker Optimization
- Multi-stage builds
- Node.js 22 Alpine base image
- Standalone output
- Image layer caching
- Resource limits

### Nginx Optimization
- Gzip compression
- Static file caching
- Connection keepalive
- Buffer tuning

### Application Optimization
- Production mode
- Telemetry disabled
- Health checks
- Graceful shutdowns

## 🔄 Backup & Recovery

### Manual Backup

```bash
# Create backup
sudo /var/www/wuniverse/deploy.sh backup

# List backups
ls -la /var/backups/wuniverse/
```

### Restore from Backup

```bash
# Stop application
sudo docker compose down

# Restore latest backup
cd /var/backups/wuniverse
sudo tar -xzf wuniverse-backup-YYYYMMDD-HHMMSS.tar.gz -C /var/www/wuniverse

# Start application
cd /var/www/wuniverse
sudo docker compose up -d
```

## 📞 Support

Jika mengalami masalah:

1. Check logs terlebih dahulu
2. Pastikan semua service running
3. Test connectivity
4. Check firewall rules
5. Verify file permissions
6. Confirm Node.js 22 is being used in container

Untuk bantuan lebih lanjut, buka issue di GitHub repository.