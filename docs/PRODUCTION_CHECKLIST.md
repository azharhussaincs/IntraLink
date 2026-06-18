# PRODUCTION CHECKLIST

Before deploying the Enterprise LAN Messenger to a production environment, complete the following checks:

## 1. Security Configuration
- [ ] **Secrets**: All default `JWT_SECRET`, `ENCRYPTION_KEY`, and `MINIO_SECRET_KEY` have been changed to unique, high-entropy values.
- [ ] **Encryption**: AES-256-GCM is verified to be working for message storage.
- [ ] **Rate Limiting**: API rate limiting is enabled to prevent brute-force attacks.
- [ ] **Firewall**: Only required ports (80, 443, 9000) are open to the LAN.
- [ ] **CORS**: Configured to only allow requests from the official production domain/IP.

## 2. Infrastructure & Storage
- [ ] **Static IP**: The server has a permanently assigned LAN IP address.
- [ ] **Disk Space**: At least 500GB (or as required) of dedicated storage is allocated to the MinIO volume.
- [ ] **Persistence**: Docker volumes are mapped to physical storage that survives container restarts.
- [ ] **Redis**: Configured with a memory limit and eviction policy suitable for the user base.

## 3. Database & Backups
- [ ] **Database Optimization**: PostgreSQL indexes are verified for `messages` and `users` tables.
- [ ] **Daily Backups**: A cron job or script is scheduled for daily database dumps.
- [ ] **Backup Offsite**: Backups are synced to a separate physical location or backup server.
- [ ] **Restore Test**: A sample restore has been performed successfully on a test server.

## 4. Monitoring & Logging
- [ ] **Log Rotation**: Docker log rotation is configured to prevent disk exhaustion.
- [ ] **Health Checks**: Container health checks are active and reporting "healthy".
- [ ] **Alerts**: (Optional) Notifications are set up for server downtime or high resource usage.

## 5. User Testing
- [ ] **Roles Verified**: Admin, Team Lead, and Team Member roles have been tested for correct permissions.
- [ ] **Large Files**: A 1GB+ file has been successfully uploaded and downloaded over the LAN.
- [ ] **Concurrent Chat**: Real-time messaging has been verified with at least 5 simultaneous users.

## 6. Final Launch
- [ ] **Documentation**: The System Admin and User Manuals are available to the relevant staff.
- [ ] **Maintenance Window**: Staff have been notified of the initial deployment and any expected downtime.
- [ ] **Version Control**: The production deployment is tagged with a version number in Git.
