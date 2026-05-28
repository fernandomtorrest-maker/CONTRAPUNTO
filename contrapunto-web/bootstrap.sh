#!/usr/bin/env bash
# bootstrap.sh - DevOps environment setup and build/lint verifier for contrapunto-web

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export NVM_DIR="$HOME/.nvm"

echo "=== Contrapunto-Web: DevOps Bootstrap & Verifier ==="
echo "Project directory: $PROJECT_DIR"

# 1. Check and install NVM if not present
if [ ! -d "$NVM_DIR" ]; then
  echo "[+] NVM not found. Installing NVM..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
fi

# Load NVM
echo "[+] Loading NVM..."
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

if ! command -v nvm &> /dev/null; then
  echo "[-] Error: NVM could not be loaded."
  exit 1
fi

# 2. Install and use Node v20
echo "[+] Installing and using Node.js v20..."
nvm install 20
nvm use 20

echo "[+] Node version: $(node -v)"
echo "[+] NPM version: $(npm -v)"

# 3. Install dependencies
echo "[+] Installing dependencies..."
cd "$PROJECT_DIR"
npm ci || npm install

# 4. Verify Build and Lint
echo "[+] Running TypeScript compilation and production build..."
npm run build

echo "[+] Running Linter..."
npm run lint

echo "=== Environment successfully validated! ==="
