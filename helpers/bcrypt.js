const bcrypt = require("bcrypt");

/**
 * @description Hash a password before save to database
 * @param {string} password - Plain text password from user
 * @return {object} - Include hashedPassword and salt
 */
async function hashPassword(password) {
  const SALT_ROUND = 10;
  const salt = await bcrypt.genSalt(SALT_ROUND);
  console.log("[salt]", salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("[hashedPassword]", hashedPassword);
  return { hashedPassword, salt };
}

module.exports = {
  hashPassword,
};
