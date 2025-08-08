#!/bin/bash

echo "🔧 Setting Railway environment variables..."

# Generate secure secrets
JWT_SECRET=$(openssl rand -base64 32)
COOKIE_SECRET=$(openssl rand -base64 32)

echo "Generated secrets:"
echo "JWT_SECRET: $JWT_SECRET"
echo "COOKIE_SECRET: $COOKIE_SECRET"

# Create env file for Railway
cat > .env.railway << EOF
NODE_ENV=production
JWT_SECRET=$JWT_SECRET
COOKIE_SECRET=$COOKIE_SECRET
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:7001
EOF

echo ""
echo "📝 Environment variables saved to .env.railway"
echo ""
echo "⚠️  IMPORTANT: Manual steps required:"
echo ""
echo "1. Open Railway dashboard: https://railway.app/dashboard"
echo "2. Select your Medusa project"
echo "3. Go to 'Variables' tab"
echo "4. Add these environment variables:"
echo ""
echo "   NODE_ENV=production"
echo "   JWT_SECRET=$JWT_SECRET"
echo "   COOKIE_SECRET=$COOKIE_SECRET"
echo "   STORE_CORS=http://localhost:8000"
echo "   ADMIN_CORS=http://localhost:7001"
echo ""
echo "5. The DATABASE_URL will be automatically set by Railway's PostgreSQL service"
echo ""
echo "Press Enter to open Railway dashboard..."
read
railway open