# Production Readiness Checklist

Before handing over the CipherLink system to the end-users, ensure that all the following items have been verified.

## 1. Security Checks
- [ ] **Default Passwords**: Initial Admin password changed from `admin`.
- [ ] **Secrets**: `JWT_SECRET` and `ENCRYPTION_KEY` are unique and securely stored.
- [ ] **Firewall**: Only ports 3000, 3001, 9000, 9001 are open.
- [ ] **Role Validation**: Verified that restricted roles cannot access administrative dashboards.

## 2. Infrastructure Checks
- [ ] **Persistence**: Docker volumes for PostgreSQL and MinIO are correctly mapped to persistent storage.
- [ ] **IP Assignment**: The server has a static IP address that will not change on reboot.
- [ ] **Auto-Restart**: Containers are configured with `restart: always`.

## 3. Database & Storage
- [ ] **Initial Seeding**: The first Admin user has been created via SQL.
- [ ] **MinIO Buckets**: The `messenger` bucket exists and has been initialized.
- [ ] **Backup Job**: The daily database backup cron job is active and tested.

## 4. User Testing (UAT)
- [ ] **Chat Works**: Real-time messaging confirmed across different devices on the LAN.
- [ ] **File Transfers**: Large files (1GB+) can be uploaded and downloaded without error.
- [ ] **Notifications**: Unread message badges appear correctly.

## 5. Documentation Handover
- [ ] **Admin Manual**: System Admin has received the `SYSTEM_ADMIN_GUIDE.md`.
- [ ] **User Guides**: Role-specific manuals have been distributed to respective departments.
- [ ] **Support**: A point of contact for technical support has been established.

---
**Approved By**: ____________________  
**Date**: ____________________
