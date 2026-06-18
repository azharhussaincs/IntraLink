# Role Manual: Administrator

## Role Overview
The **Administrator** is the highest-level role. You are responsible for the entire system's health, security, and user onboarding.

## Permissions
- Full access to System Settings.
- Manage all Users (Create, Disable, Reset Passwords).
- View Audit Logs for all system activities.
- Manage global storage and backup policies.
- Configure Security Policies (Session timeouts, encryption keys).

## Key Workflows

### 1. Onboarding New Staff
Since public registration is disabled, you (or a Super User/Team Lead) must create accounts for new employees.
- Go to **User Management**.
- Create account with a temporary password.
- Assign the appropriate role.

### 2. Monitoring System Health
Check the **Admin Dashboard** regularly for:
- Storage usage (MinIO).
- Active WebSocket connections.
- Error logs.

### 3. Security Audits
Periodically review the **Audit Module** to ensure no unauthorized access attempts or suspicious file transfers are occurring.

## Daily Usage Example
- Start the day by checking the **Audit Logs**.
- Create accounts for 2 new joiners.
- Review a Team Lead's request to increase group member limits.
