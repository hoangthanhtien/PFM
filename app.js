require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/user.route");
const walletRoutes = require("./routes/wallet.route");
const { redisClient } = require("./services");
const { sequelize } = require("./models");
const logger = require("./services/logger");

app.use(express.json());
// Routes
app.use("/api/users", userRoutes);
app.use("/api/wallets", walletRoutes);

app.get("/check_health", (req, res) => res.send("OK"));

const initDatabases = async () => {
  // Test the database connection
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  await redisClient.connect();
  // Automatically sync database models on development environment
  if (process.env.ENVIRONMENT === "DEVELOP") {
    console.log("Syncing database models");
    try {
      await sequelize.sync({ alter: true });
      console.log("Database models synced successfully");
    } catch (error) {
      console.error("Unable to sync database models:", error);
    }
  }
};

initDatabases();

module.exports = app;
