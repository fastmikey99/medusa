const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost/medusa-store";
const REDIS_URL = process.env.REDIS_URL || "";

const plugins = [
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: false,
      serve: process.env.NODE_ENV === "development",
      path: "admin",
    },
  },
  {
    resolve: "@medusajs/file-local",
    options: {
      upload_dir: "uploads",
    },
  },
];

const modules = {
  eventBus: REDIS_URL
    ? {
        resolve: "@medusajs/event-bus-redis",
        options: {
          redisUrl: REDIS_URL,
        },
      }
    : {
        resolve: "@medusajs/event-bus-local",
      },
  cacheService: REDIS_URL
    ? {
        resolve: "@medusajs/cache-redis",
        options: {
          redisUrl: REDIS_URL,
          ttl: 30,
        },
      }
    : {
        resolve: "@medusajs/cache-inmemory",
      },
};

// Add Stripe payment provider if API key is provided
if (process.env.STRIPE_API_KEY) {
  plugins.push({
    resolve: "@medusajs/payment-stripe",
    options: {
      api_key: process.env.STRIPE_API_KEY,
      webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    },
  });
}

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwt_secret: process.env.JWT_SECRET || "supersecret",
  cookie_secret: process.env.COOKIE_SECRET || "supersecret",
  store_cors: process.env.STORE_CORS || "http://localhost:8000",
  admin_cors: process.env.ADMIN_CORS || "http://localhost:7001",
  database_url: DATABASE_URL,
  database_type: "postgres",
  database_extra:
    process.env.NODE_ENV === "production"
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : {},
  redis_url: REDIS_URL,
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
  featureFlags: {
    product_categories: true,
    tax_inclusive_pricing: true,
  },
};