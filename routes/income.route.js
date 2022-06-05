const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/income.controller");
const { AuthMiddlewares } = require("../middlewares");

router.get(
  "/:wallet_id",
  AuthMiddlewares.authUser,
  incomeController.getAllWalletIncome
);
router.post(
  "/:wallet_id/create",
  AuthMiddlewares.authUser,
  incomeController.createIncome
);

module.exports = router;
