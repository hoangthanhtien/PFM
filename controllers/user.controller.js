// Helper functions
const { validateEmail, randomString, sendEmail } = require("../helpers");
// Import models
const db = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const User = db.User;
const { redisClient } = require("../services");

const getAllUsers = async (req, res, next) => {
  try {
    const result = await User.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "createdAt",
        "updatedAt",
      ],
    });
    res.send(result);
  } catch (error) {
    console.log("[Error]", error.stack);
  }
};

/**
 * @description Hanling user creation after verifying email
 * @param req
 * @param res
 * @param {Function} next
 * @return {Promise<void>}
 */
const verifyUser = async (req, res) => {
  try {
    const { secretKey } = req.params;
    let userData = await redisClient.get(secretKey);
    if (userData) {
      userData = JSON.parse(userData);
    } else {
      return res.status(400).send({
        message: "Invalid or expired secret key",
      });
    }
    await User.create(userData);
    // Remove secret key from redis
    await redisClient.del(secretKey);
    res.send("Your account has been created successfully");
  } catch (error) {
    console.log("[Error]", error.stack);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).send({
        message: "Invalid email address",
      });
    }
    // Check duplicate email in database
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return res.status(400).send({
        message: "Email is already used",
      });
    }
    const { hashedPassword, salt } = await hashPassword(password);

    const secretKey = randomString(64);
    const userData = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      salt,
    };
    // Cache user data in 10 minutes for email verification
    await redisClient.set(secretKey, JSON.stringify(userData), "EX", 600);
    // Send verification email
    const subject = "Verify your email address";
    const text =
      `Please verify your email address by clicking on the link below\n` +
      `${process.env.DOMAIN}/api/users/verify-create/${secretKey}`;
    const sendTo = email;
    await sendEmail(sendTo, subject, text);
    res.send({
      message: "Please check your email to verify your account",
    });
  } catch (error) {
    console.log("[Error]", error.stack);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id: userId } = req.params;
    const { firstName, lastName, email } = req.body;
    if (email) {
      // Validate email
      if (!validateEmail(email)) {
        return res.send({
          error: "Email is invalid",
        });
      }
      // Check duplicate email in database
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user && user.id !== userId) {
        return res.status(400).send({
          message: "Email is already used",
        });
      }
    }
    const updatedUser = await User.update(
      {
        firstName,
        lastName,
        email,
      },
      {
        where: {
          id: userId,
        },
      }
    );
    res.send(updatedUser);
  } catch (error) {
    console.log("[Error]", error.stack);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id: userId } = req.params;
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }
    await User.destroy({
      where: {
        id: userId,
      },
    });
    return res.send(user);
  } catch (error) {
    console.log("[Error]", error.stack);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAllUsers,
  verifyUser,
  updateUser,
  registerUser,
  deleteUser,
};
