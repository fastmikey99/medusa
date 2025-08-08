// Simple server to verify Railway deployment is working
const http = require('http');

const PORT = process.env.PORT || 9000;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      message: 'Medusa deployment is working!',
      timestamp: new Date().toISOString()
    }));
  } else {
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
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});