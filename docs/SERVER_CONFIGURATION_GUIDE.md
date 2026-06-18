# Server Configuration & Change Management Guide

This document tracks exactly what needs to change when moving the CipherLink application between different environments.

## 1. Local Development → LAN Deployment
**Scenario**: You have finished testing on your laptop and are moving to the organization's server.

### Required Changes
1. **Frontend `.env.local`**:
   - *Before*: `NEXT_PUBLIC_API_URL=http://localhost:3001`
   - *After*: `NEXT_PUBLIC_API_URL=http://192.168.1.100:3001` (Replace with Server IP)
2. **Backend `.env`**:
   - *Before*: `MINIO_ENDPOINT=localhost`
   - *After*: `MINIO_ENDPOINT=192.168.1.100`
3. **Secrets**:
   - Generate a new `JWT_SECRET` and `ENCRYPTION_KEY`. Do not use development keys on the LAN server.

---

## 2. LAN Deployment → Production Hardening
**Scenario**: Moving from a test LAN server to the permanent production infrastructure.

### Required Changes
1. **Database**:
   - Switch from the default `admin` password to a strong, randomly generated string.
   - Update `DATABASE_URL` in the backend `.env`.
2. **Persistence**:
   - Ensure Docker volumes are mapped to a high-availability storage array (SAN/NAS) rather than local disk.
3. **SSL/TLS**:
   - If using a reverse proxy (Nginx), update the Frontend and Backend URLs to use `https://`.
   - Update `MINIO_USE_SSL=true`.

---

## 3. Migration to a New Server
**Scenario**: You are upgrading hardware or moving to a different data center.

### Checklist
- [ ] **Stop Services**: `docker-compose down` on the old server.
- [ ] **Data Export**:
  - Run `pg_dump` to export the database.
  - Compress the `minio_data` directory.
- [ ] **Environment Sync**: Copy `.env` and `.env.local` to the new server.
- [ ] **IP Update**: If the new server has a different IP, update all environment variables as shown in Section 1.
- [ ] **Verification**: Run the `TESTING_GUIDE.md` after migration.

---

## Configuration Variable Reference
| Variable | Description | Security Note |
|----------|-------------|---------------|
| `JWT_SECRET` | Used for session tokens | Must be 32+ characters |
| `ENCRYPTION_KEY` | Used for file encryption | **NEVER** change this once files are stored, or they will be lost. |
| `REDIS_URL` | Redis connection | Use a password in production. |
| `MINIO_ACCESS_KEY` | Storage login | Change from `minio_admin`. |
