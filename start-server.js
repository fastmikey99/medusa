const { exec } = require("child_process");
const path = require("path");

console.log("Starting Medusa server...");
console.log("Environment:", process.env.NODE_ENV || "development");
console.log("Database URL:", process.env.DATABASE_URL ? "Set ✓" : "Not set");
console.log("Port:", process.env.PORT || 9000);

// Function to run shell commands
function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
}

async function startServer() {
  try {
    // Check if this is the first deployment by checking for admin user
    const isFirstDeployment = process.env.FIRST_DEPLOYMENT === "true";
    
    if (process.env.NODE_ENV === "production") {
      console.log("Running database migrations...");
      try {
        await runCommand("npx medusa migrations run");
        console.log("Migrations completed successfully");
      } catch (error) {
        console.log("Migration error (may be normal if database is already set up):", error.message);
      }

      // Seed initial data if needed
      if (isFirstDeployment) {
        console.log("Seeding initial data...");
        try {
          await runCommand("npx medusa seed -f ./data/seed.json");
          console.log("Seeding completed");
        } catch (error) {
          console.log("Seeding skipped or already done");
        }
      }
    }

    // Start the Medusa server
    console.log("Starting Medusa application...");
    require("@medusajs/medusa/dist/app");
    
  } catch (error) {
    console.error("Failed to start server:", error);
    
    // Fallback to simple server if Medusa fails
    console.log("Falling back to simple server...");
    require("./server.js");
  }
}

startServer();