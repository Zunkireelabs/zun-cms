#!/bin/bash
set -e

echo "Pulling latest changes..."
git pull origin main

echo "Building Docker image..."
docker compose build --no-cache

echo "Restarting services..."
docker compose up -d

echo "Cleaning up old images..."
docker image prune -f

echo "Deploy complete!"
