const express = require("express");

// Custom API routes
const router = express.Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Medusa server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Welcome endpoint
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to Medusa API",
    version: "2.0",
    endpoints: {
      store: "/store",
      admin: "/admin",
      health: "/health"
    }
  });
});

module.exports = router;