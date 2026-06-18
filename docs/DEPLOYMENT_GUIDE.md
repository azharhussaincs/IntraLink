# CipherLink: Deployment Guide

This document explains how to configure and deploy CipherLink across different environments.

## 1. Running on Local Machine (Development)
For local development, all services typically run on `localhost`.

### Key Configuration
**Backend (`.env`)**:
```env
PORT=3001
DATABASE_URL=postgres://user:pass@localhost:5432/cipherlink
REDIS_URL=redis://localhost:6379
MINIO_ENDPOINT=localhost
```

**Frontend (`.env.local`)**:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

---

## 2. Running on LAN (Intranet Deployment)
When deploying for an organization, the system must be accessible via the server's IP address.

### Example Environment
**Server IP**: `192.168.1.100`

### Key Configuration
**Backend (`.env`)**:
```env
PORT=3001
# Keep database/redis as localhost if they are in the same Docker network
DATABASE_URL=postgres://user:pass@localhost:5432/cipherlink
MINIO_ENDPOINT=192.168.1.100
```

**Frontend (`.env.local`)**:
```env
# CRITICAL: Point these to the Server's LAN IP
NEXT_PUBLIC_API_URL=http://192.168.1.100:3001
NEXT_PUBLIC_SOCKET_URL=http://192.168.1.100:3001
```

### Accessing the System
Users will connect by typing `http://192.168.1.100:3000` into their browsers.

---

## 3. Running on Production Server
For large-scale production, additional steps are recommended.

### Configuration Requirements
- **Static IP**: Ensure the server has a static IP address assigned by the network administrator.
- **DNS (Optional)**: If the organization has an internal DNS server, you can map the IP to a name (e.g., `http://messenger.internal`).
- **Firewall Rules**:
  - Allow inbound TCP on ports `3000`, `3001`, `9000`, `9001`.

### Environment Changes Table
| Setting | Development | Production (LAN) |
|---------|-------------|------------------|
| `NODE_ENV` | `development` | `production` |
| `API_URL` | `http://localhost:3001` | `http://192.168.1.100:3001` |
| `JWT_SECRET` | `default_secret` | `HighEntropyRandomString!` |
| `MINIO_USE_SSL` | `false` | `true` (if using internal CA) |

---

## 4. Port Mappings
| Service | Internal Port | External Port | Purpose |
|---------|---------------|---------------|---------|
| Frontend | 3000 | 3000 | Web UI |
| Backend | 3001 | 3001 | API / WebSockets |
| MinIO | 9000 | 9000 | S3 API |
| MinIO UI | 9001 | 9001 | Storage Console |
