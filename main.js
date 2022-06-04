require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const { sequelize } = require("./models");
const { redisClient } = require("./services");
const userRoutes = require("./routes/user.route");
const walletRoutes = require("./routes/wallet.route");
app.get("/check_health", (req, res) => res.send("OK"));

app.listen(port, async () => {
  console.log(`Server listening on port ${port}!`);
  app.use(express.json());

  // Test the database connection
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  // Initialize cache
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
  // Routes
  app.use("/api/users", userRoutes);
  app.use("/api/wallets", walletRoutes);
});
