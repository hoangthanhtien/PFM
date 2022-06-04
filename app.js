require("dotenv").config();
const express = require("express");
const app = express();
const userRoutes = require("./routes/user.route");
const walletRoutes = require("./routes/wallet.route");

app.use(express.json());
// Routes
app.use("/api/users", userRoutes);
app.use("/api/wallets", walletRoutes);

app.get("/check_health", (req, res) => res.send("OK"));

module.exports = app;
