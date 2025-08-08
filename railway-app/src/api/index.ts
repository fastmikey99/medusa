import { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { getConfigFile } from "medusa-core-utils";
import { ConfigModule } from "@medusajs/medusa/dist/types/global";

export default (rootDirectory: string): Router | Router[] => {
  const router = Router();
  
  const config = getConfigFile<ConfigModule>(rootDirectory, "medusa-config") as ConfigModule;
  const { projectConfig } = config;

  const storeCorsOptions = {
    origin: projectConfig.store_cors?.split(",") || [],
    credentials: true,
  };

  const adminCorsOptions = {
    origin: projectConfig.admin_cors?.split(",") || [],
    credentials: true,
  };

  // Add custom routes here
  router.use("/store", cors(storeCorsOptions), bodyParser.json());
  router.use("/admin", cors(adminCorsOptions), bodyParser.json());

  // Health check endpoint
  router.get("/health", (req, res) => {
    res.status(200).json({ 
      status: "healthy",
      timestamp: new Date().toISOString()
    });
  });

  return router;
};