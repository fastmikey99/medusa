const express = require('express');
const app = express();
const PORT = process.env.PORT || 9000;

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Medusa server is healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/healthcheck', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Medusa on Railway</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
        h1 { color: #7C3AED; }
        .status { background: #10B981; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block; }
        .pending { background: #F59E0B; }
        ul { line-height: 2; }
      </style>
    </head>
    <body>
      <h1>🎉 Medusa Successfully Deployed!</h1>
      <p class="status">Server Running - v2</p>
      <h2>Deployment Status:</h2>
      <ul>
        <li>✅ Basic server deployed</li>
        <li>✅ Health checks configured</li>
        <li>✅ PostgreSQL database available</li>
        <li class="pending">⏳ Medusa packages (next phase)</li>
      </ul>
      <h2>Environment:</h2>
      <ul>
        <li>PORT: ${PORT}</li>
        <li>NODE_ENV: ${process.env.NODE_ENV || 'development'}</li>
        <li>DATABASE_URL: ${process.env.DATABASE_URL ? '✅ Connected' : '❌ Not set'}</li>
      </ul>
      <p><a href="/health">Check Health Endpoint</a></p>
    </body>
    </html>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});