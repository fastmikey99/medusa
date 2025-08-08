#!/bin/bash

# Start script for Railway deployment
echo "Starting Medusa server..."

# Check if we're in production
if [ "$NODE_ENV" = "production" ]; then
    # Run migrations first
    cd packages/medusa && npx medusa migrations run
    
    # Start the server
    npx medusa start
else
    # Development mode
    cd packages/medusa && npx medusa develop
fi