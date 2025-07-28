# Panduan Deployment Wuniverse

Panduan lengkap untuk deploy aplikasi Next.js Wuniverse di VPS Debian 12 dengan Docker, auto-deploy webhook, dan SSL.

## 🚀 Quick Setup

### 1. Setup Server
```bash
# Jalankan script setup (sebagai user ubuntu, bukan root)
chmod +x setup-server.sh
./setup-server.sh
```

### 2. Clone Repository
```bash
# Clone repository ke directory yang tepat
cd /var/www
git clone https://github.com/YOUR_USERNAME/wuniverse.git
cd wuniverse

# Set permissions yang benar
sudo chown -R ubuntu:ubuntu /var/www/wuniverse
chmod +x deploy.sh
```

### 3. Setup SSL Certificate
```bash
# Pastikan domain sudah mengarah ke server ini
sudo certbot --nginx -d wuniverse.web.id -d www.wuniverse.web.id
```

### 4. Start Services
```bash
# Start webhook service
sudo systemctl start wuniverse-webhook
sudo systemctl status wuniverse-webhook

# Restart nginx
sudo systemctl restart nginx

# Test deployment
./deploy.sh
```

## 🔧 Konfigurasi Detail

### Docker Configuration
- **Multi-stage build** untuk optimasi production
- **Node 22 Alpine** sebagai base image
- **Standalone output** dari Next.js untuk performa terbaik
- **Health checks** untuk monitoring container

### Webhook Auto-Deploy
- **Systemd service** untuk webhook daemon
- **GitHub integration** otomatis untuk push ke branch master
- **Logging** lengkap di `/var/log/wuniverse-deploy.log`
- **Security** dengan user isolation

### Nginx Configuration
- **SSL/TLS** dengan Let's Encrypt
- **HTTP/2** support
- **Security headers** lengkap
- **Gzip compression**
- **Rate limiting**
- **Static file caching**

## 📊 Monitoring

### Check Status
```bash
# Status container
docker compose ps

# Status webhook service
sudo systemctl status wuniverse-webhook

# Status nginx
sudo systemctl status nginx

# Logs deployment
tail -f /var/log/wuniverse-deploy.log

# Logs aplikasi
docker compose logs -f
```

### Performance
```bash
# Monitor resource usage
docker stats

# Check nginx access logs
sudo tail -f /var/log/nginx/wuniverse.access.log

# Check nginx error logs
sudo tail -f /var/log/nginx/wuniverse.error.log
```

## 🔐 Security Features

1. **SSL/HTTPS** dengan auto-renewal
2. **Security headers** (HSTS, XSS Protection, etc.)
3. **Rate limiting** untuk mencegah abuse
4. **User isolation** untuk webhook service
5. **Firewall-ready** (port 80, 443, 9000 untuk webhook)

## 🔄 GitHub Webhook Setup

1. Buka repository di GitHub
2. Go to **Settings** → **Webhooks**
3. Add webhook dengan:
   - **Payload URL**: `https://wuniverse.web.id/webhook`
   - **Content type**: `application/json`
   - **Secret**: (kosongkan atau sesuai kebutuhan)
   - **Events**: Just the push event
4. Test webhook dengan push ke branch master

## 🐛 Troubleshooting

### Container tidak bisa start
```bash
# Check logs
docker compose logs

# Rebuild dari scratch
docker compose down
docker system prune -f
docker compose build --no-cache
docker compose up -d
```

### Webhook tidak berfungsi
```bash
# Check service status
sudo systemctl status wuniverse-webhook

# Check logs
sudo journalctl -u wuniverse-webhook -f

# Restart service
sudo systemctl restart wuniverse-webhook
```

### SSL issues
```bash
# Renew certificate
sudo certbot renew

# Test certificate
sudo certbot certificates

# Restart nginx
sudo systemctl restart nginx
```

## 📁 File Structure

```
/var/www/wuniverse/
├── app/                          # Next.js app directory
├── public/                       # Static files
├── Dockerfile                    # Production Docker config
├── docker-compose.yaml           # Docker compose config
├── deploy.sh                     # Deployment script
├── hooks.json                    # Webhook configuration
├── wuniverse-webhook.service     # Systemd service
├── nginx-wuniverse.conf          # Nginx configuration
├── setup-server.sh               # Server setup script
└── DEPLOYMENT.md                 # This file
```

## 🎯 Production Checklist

- [ ] Domain mengarah ke server IP
- [ ] SSL certificate aktif
- [ ] Webhook service running
- [ ] Nginx configuration valid
- [ ] Container health check passing
- [ ] GitHub webhook configured
- [ ] Deployment test berhasil
- [ ] Monitoring setup
- [ ] Backup strategy (opsional)

## 📞 Support

Jika ada masalah, check:
1. Logs di `/var/log/wuniverse-deploy.log`
2. Container logs dengan `docker compose logs`
3. Systemd service status
4. Nginx error logs

---

**Deployment URL**: https://wuniverse.web.id
**Webhook URL**: https://wuniverse.web.id/webhook