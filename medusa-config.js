const dotenv = require("dotenv");

let ENV_FILE_NAME = ".env";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS configuration
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7001";
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

// Database configuration
const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";
const REDIS_URL = process.env.REDIS_URL || "";

const plugins = [
  {
    resolve: "@medusajs/admin",
    options: {
      autoRebuild: true,
      serve: process.env.NODE_ENV === "development",
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
];

const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-local",
  },
  cacheService: REDIS_URL
    ? {
        resolve: "@medusajs/cache-redis",
        options: {
          redisUrl: REDIS_URL,
        },
      }
    : {
        resolve: "@medusajs/cache-inmemory",
      },
};

module.exports = {
  projectConfig: {
    // Redis configuration for scalability
    redis_url: REDIS_URL,
    // Database configuration
    database_url: DATABASE_URL,
    database_type: "postgres",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
    // Database extra options
    database_extra: process.env.NODE_ENV === "production"
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : {},
    jwt_secret: process.env.JWT_SECRET || "supersecret",
    cookie_secret: process.env.COOKIE_SECRET || "supersecret",
  },
  plugins,
  modules,
};