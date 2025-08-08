const dotenv = require("dotenv");

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost/medusa-store";

module.exports = {
  projectConfig: {
    database_url: DATABASE_URL,
    database_type: "postgres",
    store_cors: process.env.STORE_CORS || "http://localhost:8000",
    admin_cors: process.env.ADMIN_CORS || "http://localhost:7001",
    database_extra: process.env.NODE_ENV === "production"
      ? { ssl: { rejectUnauthorized: false } }
      : {},
    jwt_secret: process.env.JWT_SECRET || "supersecret",
    cookie_secret: process.env.COOKIE_SECRET || "supersecret",
  },
  plugins: [
    {
      resolve: "@medusajs/admin",
      options: {
        autoRebuild: false,
      },
    },
  ],
};