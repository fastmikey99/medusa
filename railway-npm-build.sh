#!/bin/bash
# Railway build script that forces npm usage

echo "Railway Build Script - Using NPM Only"
echo "======================================"

# Remove any yarn files to prevent yarn from running
echo "Removing yarn files..."
rm -f yarn.lock .yarnrc.yml
rm -rf .yarn

# Install dependencies using npm
echo "Installing dependencies with npm..."
cd app
npm ci --production

echo "Build complete!"