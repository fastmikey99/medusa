# Railway Deployment Guide for Medusa

This repository has been configured to deploy a Medusa backend to Railway.

## Structure

The deployment uses a standalone Medusa application in the `railway-app` folder to avoid conflicts with the monorepo's yarn configuration.

## Required Railway Environment Variables

Set these in your Railway project settings:

```bash
# Database (automatically set by Railway PostgreSQL)
DATABASE_URL=<provided by Railway>

# Security (generate secure random strings)
JWT_SECRET=<your-jwt-secret>
COOKIE_SECRET=<your-cookie-secret>

# CORS (update with your actual domains)
ADMIN_CORS=https://your-admin-domain.com
STORE_CORS=https://your-store-domain.com

# Optional: Redis for caching (if you add Redis to Railway)
REDIS_URL=<provided by Railway Redis>

# Node environment
NODE_ENV=production
PORT=9000
```

## Deployment Steps

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Configure Railway deployment"
   git push origin develop
   ```

2. **In Railway**:
   - Connect your GitHub repository
   - Railway will automatically detect the configuration and deploy
   - The build process will:
     - Remove conflicting yarn files
     - Install dependencies in `railway-app`
     - Build the Medusa application
     - Start the server

3. **First Deployment**:
   - Database migrations will run automatically on first start
   - Default admin user: `admin@medusa-test.com` / `supersecret`
   - Change this password immediately after deployment

## File Structure

```
/
├── railway-app/          # Standalone Medusa application
│   ├── src/             # API routes and custom code
│   ├── data/            # Seed data
│   ├── medusa-config.js # Medusa configuration
│   ├── package.json     # Dependencies
│   └── tsconfig.json    # TypeScript configuration
├── nixpacks.toml        # Railway build configuration
├── railway.json         # Railway deployment settings
├── deploy.sh           # Deployment script
└── package.json        # Root package.json for Railway
```

## Troubleshooting

If deployment fails:

1. Check Railway logs for specific errors
2. Ensure all environment variables are set
3. Verify PostgreSQL is provisioned and accessible
4. Check that the `DATABASE_URL` format is correct

## Local Testing

To test the railway-app locally:

```bash
cd railway-app
npm install
npm run dev
```

## Notes

- The root `.yarnrc.yml` is automatically removed during deployment to avoid conflicts
- The application uses npm instead of yarn for Railway compatibility
- Migrations run automatically on first deployment
- The admin panel is included and will be available at `/admin`