const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet.controller");
const { AuthMiddlewares } = require("../middlewares");

router.get("/", AuthMiddlewares.authUser, walletController.getAllUserWallet);

module.exports = router;
