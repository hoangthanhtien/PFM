require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const { db } = require("./services");

// Automatically sync database models on development environment
if (process.env.NODE_ENV === "DEVELOP") {
  db.sync({ force: true });
}

app.get("/check_health", (req, res) => res.send("OK"));

app.listen(port, () => console.log(`Server listening on port ${port}!`));
