const app = require("./app");

const port = process.env.PORT || 8080;
const { sequelize } = require("./models");
const { redisClient } = require("./services");

app.listen(port, async () => {
  console.log(`Server listening on port ${port}!`);

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
});
