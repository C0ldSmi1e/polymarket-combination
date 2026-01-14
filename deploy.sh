#!/bin/bash
set -e

echo "Installing dependencies..."
bun install --frozen-lockfile

echo "Building project..."
bun run build

echo "Restarting PM2..."
pm2 reload ecosystem.config.cjs --env production || pm2 start ecosystem.config.cjs

echo "Done!"
