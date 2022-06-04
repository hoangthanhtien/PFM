const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet.controller");
const { AuthMiddlewares } = require("../middlewares");

router.get("/", AuthMiddlewares.authUser, walletController.getAllUserWallet);
router.get("/:id", AuthMiddlewares.authUser, walletController.getWalletDetails);
router.post(
  "/create",
  AuthMiddlewares.authUser,
  walletController.addUserWallet
);
router.put(
  "/update/:id",
  AuthMiddlewares.authUser,
  walletController.updateUserWallet
);
router.delete(
  "/:id",
  AuthMiddlewares.authUser,
  walletController.deleteUserWallet
);

module.exports = router;
