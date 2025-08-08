# Railway Simple Deployment Guide

## Current Setup

We've created multiple deployment configurations to ensure Railway can successfully deploy your application. The error you were encountering (`The executable 'cd' could not be found`) was because Railway doesn't interpret shell commands like `cd` directly in its build commands.

## Deployment Options

### Option 1: Using Nixpacks (Recommended)
The `nixpacks.toml` file is configured to:
1. Install Node.js 18
2. Run npm install
3. Execute the deployment script
4. Start the server using `sh railway-deploy.sh`

### Option 2: Using Procfile
Railway will automatically detect the `Procfile` and use:
```
web: node server.js
```

### Option 3: Using Custom Dockerfile
If nixpacks continues to have issues, rename `Dockerfile.railway` to `Dockerfile`:
```bash
mv Dockerfile.railway Dockerfile
```

### Option 4: Using railway.json
The `railway.json` file is configured with simple commands that don't use shell built-ins.

## Files Created/Modified

1. **railway.json** - Simplified to avoid shell commands
2. **nixpacks.toml** - Uses shell script instead of cd commands
3. **package.json** - Simplified with proper main field
4. **railway-deploy.sh** - Shell script to handle deployment
5. **Dockerfile.railway** - Alternative Docker configuration
6. **Procfile** - Heroku-style process file
7. **.railwayignore** - Ensures only necessary files are deployed

## Deployment Steps

1. **Commit all changes:**
   ```bash
   git add .
   git commit -m "Fix Railway deployment configuration"
   git push
   ```

2. **In Railway Dashboard:**
   - Connect your GitHub repository
   - Railway should automatically detect one of:
     - Procfile (simplest)
     - nixpacks.toml
     - railway.json

3. **Set Environment Variables in Railway:**
   ```
   PORT=9000
   NODE_ENV=production
   ```

4. **Monitor the deployment logs** for any issues

## Testing the Deployment

Once deployed, you can test:
- Main page: `https://your-app.railway.app/`
- Health check: `https://your-app.railway.app/health`

## Troubleshooting

If deployment still fails:

1. **Check Railway logs** for specific error messages
2. **Try using the Dockerfile approach:**
   - Delete or rename `nixpacks.toml`
   - Rename `Dockerfile.railway` to `Dockerfile`
   - Railway will automatically use Docker

3. **Simplest approach** - Let Railway auto-detect:
   - Delete `railway.json` and `nixpacks.toml`
   - Keep only `Procfile` and `package.json`
   - Railway will use buildpacks similar to Heroku

## Current Server Status

The `server.js` file creates a simple HTTP server that:
- Listens on the PORT environment variable (default 9000)
- Provides a root endpoint with deployment success message
- Provides a `/health` endpoint for health checks
- Shows environment variable status

This is the simplest possible Node.js application to verify Railway deployment works before adding Medusa complexity.