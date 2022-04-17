// Import models
const db = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const User = db.User;
// const User = require("../models");
// Import helper functions
const getAllUsers = async (req, res, next) => {
  res.send("In getAllUsers");
};

/**
 * @description Hanling user creation
 * @param req
 * @param res
 * @param {Function} next
 * @return {Promise<void>}
 */
const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log({
      firstName,
      lastName,
      email,
    });
    const { hashedPassword, salt } = await hashPassword(password);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      salt,
    });
    res.send(newUser);
  } catch (error) {
    console.log("[Error]", error.stack);
  }
};

module.exports = {
  getAllUsers,
  createUser,
};
