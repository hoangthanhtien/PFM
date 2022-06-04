const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getAllUsers);
router.post("/create", userController.registerUser);
router.post("/:id/update", userController.updateUser);
router.get("/verify-create/:secretKey", userController.verifyUser);
router.delete("/:id/delete", userController.deleteUser);

router.post("/login", userController.loginUser);
router.get("/current", userController.authUser);
router.get("/logout", userController.logOutUser);

module.exports = router;
