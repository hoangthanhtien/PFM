const db = require("../models");
const Wallet = db.Wallet;

const { logger } = require("../services");

const getAllUserWallet = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const results = await Wallet.findAll({
      where: {
        UserId: userId,
      },
    });
    res.send(results);
  } catch (error) {
    logger.error(`Error while getting all user's wallet: ${error.stack}`);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAllUserWallet,
};
