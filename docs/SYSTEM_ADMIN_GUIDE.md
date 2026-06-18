# CipherLink: System Administrator Guide

This guide is intended for system administrators responsible for the deployment, configuration, and maintenance of the CipherLink enterprise messenger.

## 1. Initial Server Setup

### OS Requirements
- **Recommended**: Ubuntu 22.04 LTS or Debian 11.
- **Resources**: Minimum 4GB RAM, 2 CPU Cores, 50GB+ Disk Space (Scalable based on file sharing needs).

### Dependencies Installation
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y
```

### Firewall Configuration (UFW)
Ensure only the necessary ports are open to the LAN:
- **3000**: Frontend Access
- **3001**: Backend API & WebSockets
- **9000/9001**: MinIO (Storage) Console

```bash
sudo ufw allow 3000/tcp
sudo ufw allow 3001/tcp
sudo ufw allow 9000/tcp
sudo ufw allow 9001/tcp
sudo ufw enable
```

---

## 2. First Deployment

### Step 1: Clone and Configure
```bash
git clone <repository-url>
cd cipherlink
```

### Step 2: Environment Setup
Copy the example environment files and update them with production-grade secrets.
```bash
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local
```
**Important**: Change `JWT_SECRET` and `ENCRYPTION_KEY` immediately.

### Step 3: Start Services
```bash
docker-compose up -d --build
```

### Step 4: Create Initial Admin
Run this command to gain access to the system:
```bash
docker exec -it messenger_db psql -U cipherlink_user -d cipherlink -c "INSERT INTO users (username, \"passwordHash\", role, \"fullName\", \"isActive\") VALUES ('admin', '\$argon2id\$v=19\$m=65536,t=3,p=4\$OMPuX/z1urYuOEQ97b375Q\$ie8heCrm2QV7ndfynX3II9VxP6ZLcgpWgox0JhT92to', 'ADMIN', 'System Administrator', true);"
```
*Login: admin / admin*

---

## 3. Updating the System
To apply updates without data loss:
```bash
git pull origin main
docker-compose down
docker-compose up -d --build
```

---

## 4. Monitoring

### Container Health
```bash
docker ps
docker stats
```

### Log Inspection
```bash
docker logs -f messenger_backend
docker logs -f messenger_frontend
```

---

## 5. User Management

Administrators manage users through the **User Management** dashboard (`/dashboard/users`).

### Creating Users
1. Log in as **Admin**.
2. Navigate to **Manage Users**.
3. Enter **Username** and **Password**.
4. (Optional) Set **Role**. Default is `TEAM_MEMBER`.

### Password Resets
If a user forgets their password, the Admin can use the database to update the hash:
```bash
# Example reset to Admin@123
docker exec -it messenger_db psql -U cipherlink_user -d cipherlink -c "UPDATE users SET \"passwordHash\" = '\$argon2id\$v=19\$m=65536,t=3,p=4\$v8F/Xn0T2R8\$X+o5N0b0N0N0N0N0N0N0N0' WHERE username = 'target_user';"
```

---

## 6. Backup Procedures

### Daily Database Backup
Set up a cron job for daily dumps:
```bash
docker exec messenger_db pg_dump -U cipherlink_user cipherlink > /backups/db_$(date +%F).sql
```

### File Storage Backup
MinIO files are stored in the volume mapped to `./docker/minio_data`. Back up this entire directory using `rsync` or your preferred tool.

---

## 7. Disaster Recovery
1. Reinstall Docker/Compose on the new server.
2. Restore the `./docker/minio_data` folder.
3. Start the database container: `docker-compose up -d db`.
4. Restore the SQL dump:
   ```bash
   cat backup.sql | docker exec -i messenger_db psql -U cipherlink_user -d cipherlink
   ```
5. Start the remaining services: `docker-compose up -d`.
