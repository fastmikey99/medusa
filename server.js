// Simple server to verify Railway deployment is working
const http = require('http');

const PORT = process.env.PORT || 9000;

const server = http.createServer((req, res) => {
  // Handle both /health and /healthcheck endpoints
  if (req.url === '/health' || req.url === '/healthcheck') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      message: 'Medusa deployment is working!',
      timestamp: new Date().toISOString()
    }));
  } else if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head><title>Medusa on Railway</title></head>
        <body>
          <h1>🎉 Medusa Successfully Deployed to Railway!</h1>
          <p>The basic deployment is working. Next step is to configure the full Medusa application.</p>
          <p>Health check endpoint: <a href="/health">/health</a></p>
          <p>Environment Variables Detected:</p>
          <ul>
            <li>PORT: ${process.env.PORT || 'Not set'}</li>
            <li>NODE_ENV: ${process.env.NODE_ENV || 'Not set'}</li>
            <li>DATABASE_URL: ${process.env.DATABASE_URL ? 'Set ✓' : 'Not set'}</li>
          </ul>
        </body>
      </html>
    `);
  } else {
    // Return 404 for other paths
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check available at http://0.0.0.0:${PORT}/health`);
  console.log(`Ready to accept connections!`);
});