# SERVER CONFIGURATION GUIDE

This guide details the specific changes required when migrating the system between different deployment stages.

---

## 1. Migration: Local Development → LAN Deployment

### Configuration Changes
| Parameter | Local Development | LAN Deployment |
|-----------|-------------------|----------------|
| `FRONTEND_URL` | `http://localhost:3000` | `http://192.168.1.100` |
| `BACKEND_URL` | `http://localhost:3001` | `http://192.168.1.100:3001` |
| `MINIO_ENDPOINT` | `localhost` | `192.168.1.100` |
| `JWT_SECRET` | `dev-secret` | `new-secure-random-string` |
| `ENCRYPTION_KEY` | `dev-key-32-chars` | `new-secure-32-char-key` |

### Steps
1. Change IP addresses in `.env` files for both Backend and Frontend.
2. Ensure the LAN IP is static on the server.
3. Update browser CORS settings in `backend/src/main.ts` if needed.

---

## 2. Migration: LAN Deployment → Production Deployment

### Configuration Changes
| Parameter | LAN Deployment | Production (Enterprise) |
|-----------|----------------|-------------------------|
| `DOMAIN` | N/A (IP Only) | `messenger.company.local` |
| `SSL_ENABLED` | `false` | `true` |
| `LOG_LEVEL` | `debug` | `info` |
| `DB_BACKUP_PATH`| `/tmp` | `/mnt/secure-backups` |
| `PORT` | `3000` | `443` (via Nginx) |

### Infrastructure Changes
- **Nginx Setup**: Configure as a reverse proxy to handle SSL and Domain routing.
- **Persistent Storage**: Move Docker volumes from local disk to an enterprise SAN or NAS.
- **Monitoring**: Connect logs to an ELK stack or similar centralized logging system.

---

## 3. Migration: Production → New Server Migration

### Pre-Migration Checklist
- [ ] Export current database: `pg_dump`.
- [ ] Sync MinIO data: `rsync`.
- [ ] Record all current `.env` variables.

### Recovery on New Server
1. Setup Docker environment on the new server.
2. Copy `data` directory and `.env` file.
3. Run `docker-compose up -d`.
4. Restore Database dump.
5. Update DNS records to point to the new Server IP.

---

## Sensitive Key Management
**NEVER** share the `ENCRYPTION_KEY` or `JWT_SECRET` between environments. If these keys are lost, existing encrypted messages cannot be decrypted, and all user sessions will be invalidated.
