#!/bin/sh
# Railway deployment script
# This script ensures we're in the right directory and starts the server

echo "Starting Railway deployment..."
echo "Current directory: $(pwd)"
echo "Files in current directory:"
ls -la

# Check if server.js exists
if [ -f "server.js" ]; then
    echo "Found server.js, starting server..."
    exec node server.js
else
    echo "ERROR: server.js not found!"
    echo "Looking for server.js in subdirectories..."
    find . -name "server.js" -type f
    exit 1
fi