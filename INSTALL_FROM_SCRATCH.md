# Installation From Scratch (Ubuntu 22.04 / 24.04)

This guide provides a step-by-step walkthrough for deploying CipherLink on a fresh Ubuntu server.

## Step 1: Install System Dependencies

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential postgresql redis-server
```

### Install Node.js 20
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### Install Docker & Docker Compose
```bash
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER
newgrp docker
```

## Step 2: Clone the Project

```bash
git clone https://github.com/azharhussaincs/IntraLink.git
cd IntraLink
```

## Step 3: Configure Database (PostgreSQL)

```bash
sudo -u postgres psql -c "CREATE DATABASE cipherlink;"
sudo -u postgres psql -c "CREATE USER cipherlink_user WITH PASSWORD 'admin';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE cipherlink TO cipherlink_user;"
```

## Step 4: Configure Redis

Redis usually works out of the box. Verify it's running:
```bash
sudo systemctl status redis-server
```

## Step 5: Configure MinIO

For a simple setup, you can run MinIO via Docker:
```bash
docker run -d --name minio \
  -p 9000:9000 -p 9001:9001 \
  -e "MINIO_ROOT_USER=minioadmin" \
  -e "MINIO_ROOT_PASSWORD=minioadmin" \
  minio/minio server /data --console-address ":9001"
```

## Step 6: Configure Environment Files

### Backend
```bash
cd backend
cp .env.example .env
# Update .env with your settings
# Use DATABASE_URL=postgres://cipherlink_user:admin@localhost:5432/cipherlink
```

### Frontend
```bash
# Return to root then enter frontend
cd ../frontend
cp .env.local.example .env.local
# Update NEXT_PUBLIC_API_URL to point to your server IP
```

## Step 7: Build and Start Backend

**Note: Use a dedicated terminal window for the Backend.**

```bash
# From the project root
cd backend
npm install
npm run build
npm run start:prod
```

## Step 8: Build and Start Frontend

**Note: Open a SECOND terminal window for the Frontend. Do NOT close the Backend terminal.**

```bash
# Return to root then enter frontend
cd ../frontend
npm install
npm run build
npm run start
```

## Step 9: Create Admin User

Initially, you must create the first Admin user. Since public registration is disabled for security, you should use the provided database seed script or manually insert the first user into the PostgreSQL database.

Once the first Admin is created, they can create other users (Super Users, Team Leads, etc.) through the **User Management** dashboard in the application.

## Step 10: Access the Application

- **Frontend**: `http://<your-server-ip>:3000`
- **Backend API**: `http://<your-server-ip>:3001/api`
- **MinIO Console**: `http://<your-server-ip>:9001`
