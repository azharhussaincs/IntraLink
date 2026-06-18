# DEPLOYMENT GUIDE

This guide provides detailed instructions for deploying the Enterprise LAN Messenger across different environments.

---

## 1. Local Development Deployment
Ideal for developers or small-scale internal testing.

### Configuration
- **Server IP**: `127.0.0.1` or `localhost`
- **Port Mapping**:
    - Frontend: `3000:3000`
    - Backend: `3001:3001`
    - MinIO: `9000:9000`, `9001:9001`

### Steps
1. Install Docker Desktop.
2. Clone the repository.
3. Run `docker-compose up -d`.
4. Access the system at `http://localhost:3000`.

---

## 2. LAN Deployment
Standard deployment for medium-sized organizations.

### Configuration
- **Static IP**: Assign a static IP to the host (e.g., `192.168.1.50`).
- **Environment Variables**:
    - `BACKEND_URL=http://192.168.1.50:3001`
    - `MINIO_ENDPOINT=192.168.1.50`
- **Access**: Users connect via `http://192.168.1.50`.

### Firewall Rules
| Service | Port | Protocol |
|---------|------|----------|
| Web UI  | 80   | TCP      |
| API     | 3001 | TCP      |
| S3 API  | 9000 | TCP      |

---

## 3. Production Deployment (Enterprise)
High-availability setup for large organizations.

### Configuration
- **Host**: Dedicated Ubuntu/Linux Server.
- **Static IP / Internal DNS**: Use a DNS entry (e.g., `messenger.org.local`).
- **Reverse Proxy**: Nginx or Traefik to handle incoming traffic.
- **SSL**: While LAN-only, enabling SSL (Self-signed or Internal CA) is recommended for browser features like WebRTC and Notifications.

### Environment Changes Table
| Variable | Development | Testing | Production |
|----------|-------------|---------|------------|
| `NODE_ENV` | `development` | `test` | `production` |
| `DB_SSL` | `false` | `false` | `true` (if using external RDS) |
| `LOG_LEVEL` | `debug` | `warn` | `info` |
| `JWT_EXPIRES` | `24h` | `1h` | `8h` |

### Reverse Proxy Example (Nginx)
```nginx
server {
    listen 80;
    server_name messenger.org.local;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location /api {
        proxy_pass http://localhost:3001;
    }

    location /socket.io {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

## Environment Transitions Summary
Moving from development to production requires changing:
1. **Secrets**: Replace all placeholder keys (`JWT_SECRET`, `ENCRYPTION_KEY`).
2. **URLs**: Update all `localhost` references to the production IP or Domain.
3. **Storage Volumes**: Map Docker volumes to persistent, high-performance physical drives.
