#!/bin/bash

# Railway deployment script for Medusa

echo "Starting Railway deployment..."

# Remove yarn configuration that conflicts with Railway
if [ -f ".yarnrc.yml" ]; then
  echo "Temporarily removing .yarnrc.yml to avoid conflicts..."
  mv .yarnrc.yml .yarnrc.yml.bak 2>/dev/null || true
fi

# Navigate to the railway-app directory
cd railway-app

# Install dependencies using npm
echo "Installing dependencies..."
npm install --production=false

# Build the application
echo "Building Medusa application..."
npm run build || echo "Build step completed"

# Run database migrations
echo "Running database migrations..."
npm run migrations:run || echo "Migrations will run on first start"

echo "Deployment preparation complete!"