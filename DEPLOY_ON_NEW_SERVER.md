# Server Deployment Guide (Ubuntu)

This guide provides step-by-step instructions to deploy the CipherLink Enterprise LAN Messenger on a fresh Ubuntu server.

## Prerequisites
- Ubuntu 22.04 LTS or newer
- Sudo access
- LAN connection with a Static IP

---

## Step 1: Install System Dependencies

Update the system and install required software:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential postgresql redis-server
```

### Install Node.js 18
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

### Install Docker & Docker Compose
```bash
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER
# Log out and log back in to apply group changes
```

---

## Step 2: Clone the Project

```bash
git clone https://github.com/azharhussaincs/IntraLink.git
cd IntraLink
```

---

## Step 3: Configure Environment Variables

### Backend
```bash
cd backend
cp .env.example .env
# Edit .env and set your secrets
nano .env
```

### Frontend
```bash
# Return to root then enter frontend
cd ../frontend
cp .env.local.example .env.local
# Edit .env.local and set the SERVER_IP
nano .env.local
```

---

## Step 4: Configure PostgreSQL

Follow the [Database Setup Guide](docs/DATABASE_SETUP.md) to create the database and user.

---

## Step 5: Configure Redis

By default, Redis is installed and running on localhost:6379. No additional configuration is needed unless you want to change the port or add a password.

---

## Step 6: Configure MinIO (Object Storage)

You can run MinIO via Docker for the easiest setup:

```bash
docker run -p 9000:9000 -p 9001:9001 \
  --name minio \
  -e "MINIO_ROOT_USER=minio_admin" \
  -e "MINIO_ROOT_PASSWORD=minio_password" \
  -v /mnt/data:/data \
  minio/minio server /data --console-address ":9001"
```

---

## Step 7: Build and Start Backend

It is recommended to use a process manager like PM2 to keep the backend running in the background.

```bash
# From the project root
cd backend
npm install
npm run build
# Start with PM2
sudo npm install -g pm2
pm2 start dist/main.js --name "cipherlink-backend"
```

---

## Step 8: Create Initial Admin Account

For security, public registration is disabled. You must create the first Admin user directly in the database or use a seeding script.

Example SQL to create an admin (password must be hashed with Argon2 or Bcrypt depending on your configuration):
```sql
INSERT INTO users (username, email, password, role) VALUES ('admin', 'admin@organization.com', '$HASHED_PASSWORD$', 'ADMIN');
```

After the first login, the Admin can create more users via the UI.

---

## Step 9: Build and Start Frontend

Use PM2 to keep the frontend running as well.

```bash
# Return to root then enter frontend
cd ../frontend
npm install
npm run build
pm2 start npm --name "cipherlink-frontend" -- start
```

---

## Step 10: Access the System

The application is now running:
- Frontend: `http://SERVER_IP:3000`
- Backend API: `http://SERVER_IP:3001`
