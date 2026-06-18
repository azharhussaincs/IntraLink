# Node.js Requirements

This project is built using modern JavaScript/TypeScript frameworks (NestJS 11 and Next.js 14). To ensure stability and compatibility, follow the version requirements below.

## Minimum & Recommended Versions

| Requirement | Version | Status |
| ----------- | ------- | ------ |
| **Minimum Node.js** | `v18.20.0` | Supported (with polyfills) |
| **Recommended Node.js**| `v20.x` or `v22.x` | Preferred for Production |
| **Minimum npm** | `v9.x` | Required |
| **Recommended npm** | `v10.x` | Preferred |

## Why these versions?

- **Node.js 18**: The project includes a polyfill for `crypto.randomUUID()` in the backend to support Node 18 environments.
- **Node.js 20+**: Modern dependencies like Next.js 14 and Tailwind CSS 3 perform optimally and have better native support for Web APIs in these versions.

## Installation Instructions

### Ubuntu / Debian (Recommended)
Use NodeSource to install the desired version:

```bash
# For Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Using NVM (Node Version Manager)
The best way to manage Node versions locally:

```bash
# Install nvm (if not installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install and use Node 20
nvm install 20
nvm use 20
```

## Upgrading Node.js

If you are currently on an older version:

1. Remove existing `node_modules`:
   ```bash
   rm -rf backend/node_modules frontend/node_modules
   ```
2. Install the new Node version via NVM or your package manager.
3. Reinstall dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

## Verification

Check your versions by running:
```bash
node -v
npm -v
```
