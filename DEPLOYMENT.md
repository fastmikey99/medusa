# Medusa Deployment Guide to Railway

This guide will help you deploy your Medusa e-commerce backend to Railway with automatic CI/CD pipeline from GitHub.

## Prerequisites

- Node.js 18+ installed locally
- Git repository (GitHub)
- Railway account (sign up at https://railway.app)
- PostgreSQL database (will be provisioned on Railway)

## Local Development Setup

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Set up local environment:**
   - Copy `.env` file and update with your local settings
   - Ensure PostgreSQL is running locally or use Docker:
     ```bash
     docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:15
     ```

3. **Run database migrations:**
   ```bash
   yarn medusa migrations run
   ```

4. **Start development server:**
   ```bash
   yarn dev
   ```

## Railway Deployment

### Method 1: Using Railway CLI (Recommended)

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Run the setup script:**
   ```bash
   ./scripts/setup-railway.sh
   ```

3. **Deploy:**
   ```bash
   railway up
   ```

### Method 2: Using GitHub Integration

1. **Connect GitHub to Railway:**
   - Go to Railway Dashboard
   - Create new project
   - Select "Deploy from GitHub repo"
   - Select your repository

2. **Configure Environment Variables in Railway:**
   ```
   NODE_ENV=production
   DATABASE_URL=<auto-provisioned by Railway>
   JWT_SECRET=<generate-secure-secret>
   COOKIE_SECRET=<generate-secure-secret>
   STORE_CORS=https://your-storefront.com
   ADMIN_CORS=https://your-admin.com
   PORT=<auto-assigned by Railway>
   ```

3. **Add Services:**
   - PostgreSQL: Click "New" → "Database" → "Add PostgreSQL"
   - Redis (optional): Click "New" → "Database" → "Add Redis"

4. **Set up GitHub Secret:**
   - Get your Railway token from: https://railway.app/account/tokens
   - Add to GitHub: Settings → Secrets → New repository secret
   - Name: `RAILWAY_TOKEN`
   - Value: Your Railway token

### Method 3: Manual Deployment

1. **Create Railway project:**
   ```bash
   railway init
   ```

2. **Add PostgreSQL:**
   ```bash
   railway add postgresql
   ```

3. **Deploy:**
   ```bash
   railway up
   ```

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/deploy-railway.yml`) will automatically:
- Run on pushes to `main` and `develop` branches
- Install dependencies
- Run tests
- Build the project
- Deploy to Railway

## Environment Variables

### Required Variables:
- `DATABASE_URL`: PostgreSQL connection string (auto-provided by Railway)
- `JWT_SECRET`: Secret for JWT tokens (generate a secure random string)
- `COOKIE_SECRET`: Secret for cookies (generate a secure random string)

### Optional Variables:
- `REDIS_URL`: Redis connection string for caching
- `STORE_CORS`: Frontend store URL
- `ADMIN_CORS`: Admin dashboard URL
- `PORT`: Server port (auto-assigned by Railway)

### Generate Secure Secrets:
```bash
# Generate JWT_SECRET
openssl rand -base64 32

# Generate COOKIE_SECRET
openssl rand -base64 32
```

## Database Migrations

Railway will automatically run migrations on deployment if you add this to your `package.json`:

```json
{
  "scripts": {
    "start": "medusa migrations run && medusa start"
  }
}
```

## Monitoring and Debugging

1. **View logs:**
   ```bash
   railway logs
   ```

2. **SSH into container:**
   ```bash
   railway shell
   ```

3. **View deployment status:**
   ```bash
   railway status
   ```

## Custom Domain

1. Go to Railway project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Scaling

Railway automatically handles scaling, but you can configure:
- Horizontal scaling: Multiple instances
- Vertical scaling: Adjust CPU/Memory in project settings

## Troubleshooting

### Common Issues:

1. **Database connection errors:**
   - Ensure DATABASE_URL is correctly set
   - Check if PostgreSQL service is running

2. **Build failures:**
   - Check Node.js version compatibility
   - Ensure all dependencies are in package.json

3. **Port binding issues:**
   - Let Railway assign the PORT automatically
   - Use `process.env.PORT` in your code

4. **CORS errors:**
   - Update STORE_CORS and ADMIN_CORS environment variables
   - Ensure they match your frontend URLs

## Support

- Medusa Documentation: https://docs.medusajs.com
- Railway Documentation: https://docs.railway.app
- GitHub Issues: https://github.com/medusajs/medusa/issues

## Next Steps

After deployment:
1. Set up your storefront (Next.js, Gatsby, etc.)
2. Configure payment providers
3. Set up email notifications
4. Configure file storage (S3, etc.)
5. Set up monitoring and analytics