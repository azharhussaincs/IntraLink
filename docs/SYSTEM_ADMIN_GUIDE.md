# SYSTEM ADMINISTRATOR GUIDE

## Introduction
This guide is intended for system administrators responsible for deploying, maintaining, and monitoring the Enterprise LAN Messenger & File Sharing System.

---

## Initial Server Setup

### 1. Operating System
Recommended: Ubuntu 22.04 LTS or any modern Linux distribution with Docker support.

### 2. Install Docker & Docker Compose
```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose-plugin -y
```

### 3. Configure Firewall (UFW)
Open necessary ports for LAN access:
```bash
sudo ufw allow 80/tcp     # Frontend HTTP
sudo ufw allow 443/tcp    # Frontend HTTPS (if configured)
sudo ufw allow 3001/tcp   # Backend API
sudo ufw allow 9000/tcp   # MinIO API
sudo ufw allow 9001/tcp   # MinIO Console
sudo ufw enable
```

### 4. Configure Storage
Ensure the `/var/lib/docker/volumes` directory has sufficient space, or mount a dedicated data drive to the project's data directory.

---

## First Deployment

1. **Clone project & Navigate**:
   ```bash
   cd /opt/enterprise-messenger
   ```

2. **Configure Environment**:
   Create a production `.env` file based on the provided template. **CRITICAL**: Change all default passwords and secrets.

3. **Launch Stack**:
   ```bash
   docker compose -f docker-compose.yml up -d
   ```

4. **Verify Deployment**:
   ```bash
   docker compose ps
   # Check logs if any container fails to start
   docker compose logs -f backend
   ```

---

## Updating System

To update the system with minimal downtime:
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart containers
docker compose up -d --build
```

---

## Monitoring

### Container Health
```bash
docker stats
```
Monitor CPU, Memory, and Network usage of each container.

### Logs
Logs are captured by Docker. Use `docker compose logs -f [service_name]` to view real-time logs.
Recommended: Integrate with a log aggregator if the organization scales.

### Disk Space
MinIO storage will grow over time. Monitor `/data/minio` (or the mapped volume).

---

## User Management

The **Admin** role has exclusive access to the Administration Dashboard.

### Creating Users
1. Log in as an Admin.
2. Navigate to **Admin Panel > User Management**.
3. Create users manually or import via CSV (if supported).

### Promoting Roles
Admin can promote users to:
- **Super User**: For company owners/executives.
- **Team Lead**: For department heads.

### Password Resets
If a user forgets their password, the Admin can trigger a manual reset from the User Management panel.

---

## Backup Procedures

### 1. Database Backup (PostgreSQL)
Run daily:
```bash
docker exec messenger-db pg_dump -U messenger_user messenger_db > backup_$(date +%F).sql
```

### 2. File Storage Backup (MinIO)
Backup the entire MinIO data volume:
```bash
rsync -av /opt/enterprise-messenger/data/minio /mnt/backup/minio/
```

### 3. Backup Schedule
- **Daily**: Database SQL dump.
- **Weekly**: Incremental file storage backup.
- **Monthly**: Full system snapshot.

---

## Disaster Recovery

1. **Server Failure**: Provision a new server, install Docker.
2. **Data Restore**:
   - Copy MinIO data back to `/opt/enterprise-messenger/data/minio`.
   - Restore DB: `cat backup.sql | docker exec -i messenger-db psql -U messenger_user -d messenger_db`.
3. **Restart**: `docker compose up -d`.
