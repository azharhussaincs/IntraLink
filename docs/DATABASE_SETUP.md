# Database Setup Guide

Follow these steps to set up the PostgreSQL database for the CipherLink application.

## 1. Initial Database Creation

Run the following commands as the `postgres` user on your Ubuntu server:

```bash
# Access PostgreSQL CLI
sudo -u postgres psql
```

Inside the `psql` prompt (indicated by `postgres=#`), execute the following SQL commands one by one. 

**Do NOT copy the `postgres=#` prefix.**

```sql
-- 1. Create the database
CREATE DATABASE cipherlink;

-- 2. Create the application user
CREATE USER cipherlink_user WITH PASSWORD 'admin';

-- 3. Grant privileges on the database
GRANT ALL PRIVILEGES ON DATABASE cipherlink TO cipherlink_user;

-- 4. Connect to the new database
\c cipherlink

-- 5. Grant schema permissions (important for migrations)
GRANT ALL ON SCHEMA public TO cipherlink_user;

-- 6. Exit psql
\q
```

## 2. Verify Connection

After exiting `psql`, run this command from your **regular terminal** (not inside the psql prompt):

```bash
psql -h localhost -U cipherlink_user -d cipherlink
```

When prompted, enter the password: `admin`

## 3. Environment Configuration

Ensure your backend `.env` file matches these settings:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=cipherlink_user
DATABASE_PASSWORD=admin
DATABASE_NAME=cipherlink
DATABASE_URL=postgres://cipherlink_user:admin@localhost:5432/cipherlink
```
