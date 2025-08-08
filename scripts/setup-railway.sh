#!/bin/bash

echo "🚂 Setting up Railway deployment for Medusa..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo -e "${YELLOW}Railway CLI not found. Installing...${NC}"
    npm install -g @railway/cli
fi

# Function to check if logged in to Railway
check_railway_login() {
    if ! railway whoami &> /dev/null; then
        echo -e "${YELLOW}Please login to Railway:${NC}"
        railway login
    else
        echo -e "${GREEN}✓ Logged in to Railway${NC}"
    fi
}

# Function to link project
link_project() {
    echo -e "${YELLOW}Linking to Railway project...${NC}"
    railway link
    echo -e "${GREEN}✓ Project linked${NC}"
}

# Function to set environment variables
setup_env_vars() {
    echo -e "${YELLOW}Setting up environment variables on Railway...${NC}"
    
    # Generate secure secrets if not provided
    JWT_SECRET=$(openssl rand -base64 32)
    COOKIE_SECRET=$(openssl rand -base64 32)
    
    # Set environment variables
    railway variables set NODE_ENV=production
    railway variables set JWT_SECRET="$JWT_SECRET"
    railway variables set COOKIE_SECRET="$COOKIE_SECRET"
    railway variables set STORE_CORS="https://your-storefront-url.com"
    railway variables set ADMIN_CORS="https://your-admin-url.com"
    
    echo -e "${GREEN}✓ Environment variables configured${NC}"
    echo -e "${YELLOW}Note: Update STORE_CORS and ADMIN_CORS with your actual URLs${NC}"
}

# Function to provision database
provision_database() {
    echo -e "${YELLOW}Provisioning PostgreSQL database...${NC}"
    railway add postgresql
    echo -e "${GREEN}✓ PostgreSQL database provisioned${NC}"
}

# Function to provision Redis (optional)
provision_redis() {
    read -p "Do you want to add Redis for caching? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}Provisioning Redis...${NC}"
        railway add redis
        echo -e "${GREEN}✓ Redis provisioned${NC}"
    fi
}

# Main setup flow
echo -e "${GREEN}Starting Railway setup...${NC}"

check_railway_login
link_project
setup_env_vars
provision_database
provision_redis

echo -e "${GREEN}✅ Railway setup complete!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Update environment variables in Railway dashboard"
echo "2. Push your code to trigger deployment: git push origin main"
echo "3. Monitor deployment: railway logs"
echo "4. Open your app: railway open"