# TESTING GUIDE

This document outlines the procedures to verify the functionality, security, and performance of the system.

---

## 1. Authentication Testing
**Goal**: Verify secure access and role enforcement.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1.1 | Login with correct credentials | Successful login, JWT token stored in browser session. |
| 1.2 | Login with incorrect password | "Unauthorized" error message. |
| 1.3 | Access `/admin` route as Team Member | Redirect to unauthorized page or 403 error. |
| 1.4 | Wait for token expiry | Auto-refresh of token or forced logout. |

---

## 2. Chat & Real-Time Testing
**Goal**: Ensure low-latency messaging and persistence.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 2.1 | User A sends DM to User B | User B receives message instantly without page refresh. |
| 2.2 | User B reads message | User A sees "Read" receipt update. |
| 2.3 | Post message in Group Chat | All members of the group receive the message. |
| 2.4 | Edit a sent message | Content updates for all participants in real-time. |

---

## 3. File Sharing Testing
**Goal**: Verify large file support and integrity.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 3.1 | Upload 1MB PDF | Successful upload, preview appears in chat. |
| 3.2 | Upload 100MB Video | Progress bar updates accurately, successful upload. |
| 3.3 | Upload 1GB+ File | Successful upload using chunked transfer. |
| 3.4 | Download uploaded file | File opens correctly, checksum matches original. |
| 3.5 | Pause/Resume Upload | Upload continues from last chunk without failure. |

---

## 4. Security & Encryption Testing
**Goal**: Validate data protection at rest and in transit.

| Step | Action | Expected Result |
|------|--------|-----------------|
| 4.1 | Inspect Database `messages` table | `content` column contains encrypted strings (AES). |
| 4.2 | Intercept API Request (Burp/Fiddler) | Message content is not visible in raw request (if E2EE) or protected by HTTPS. |
| 4.3 | Attempt to download file via direct link without login | 403 Forbidden or 401 Unauthorized. |

---

## 5. Performance & Load Testing
**Goal**: Identify system limits.

- **Baseline**: 10 Concurrent Users. Measure CPU/RAM usage of `backend` and `db` containers.
- **Moderate Load**: 100 Concurrent Users sending messages every 5 seconds. Monitor Redis Pub/Sub latency.
- **Stress Test**: 500+ Concurrent Users. Verify if the system handles queuing or if memory exhaustion occurs.
- **Large File Stress**: 10 users uploading 1GB files simultaneously. Monitor disk I/O and network bandwidth.

---

## 6. Automated Tests
Run the following commands to verify code integrity:
```bash
# Unit Tests
npm run test

# Integration Tests
npm run test:integration

# End-to-End (E2E) Tests
npm run test:e2e
```
