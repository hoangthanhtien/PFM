const db = require("../models");
const { Wallet, Income, Expense, WalletType } = db;

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

const addUserWallet = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { walletName, description, totalBalance } = req.body;
    const wallet = await Wallet.create({
      walletName,
      totalBalance: totalBalance || 0,
      UserId: userId,
      description,
    });
    res.send(wallet);
  } catch (error) {
    logger.error(`Error while adding user's wallet: ${error.stack}`);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateUserWallet = async (req, res) => {
  try {
    const { id: walletId } = req.params;
    const { walletName, description, totalBalance } = req.body;
    const wallet = await Wallet.update(
      {
        walletName,
        totalBalance: totalBalance,
        description,
      },
      {
        where: {
          id: walletId,
        },
      }
    );
    res.send(wallet);
  } catch (error) {
    logger.error(`Error while updating user's wallet: ${error.stack}`);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteUserWallet = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id: walletId } = req.params;
    const wallet = await Wallet.findOne({
      where: {
        id: walletId,
      },
    });
    if (!wallet) {
      return res.status(400).send({
        message: "Wallet not found",
      });
    } else {
      if (wallet.UserId !== userId) {
        return res.status(403).send({
          message: "You can't delete this wallet",
        });
      }
    }
    await wallet.destroy();
    res.send({
      message: `Wallet ${walletId} has been deleted`,
    });
  } catch (error) {
    logger.error(`Error while deleting user's wallet: ${error.stack}`);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getWalletDetails = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id: walletId } = req.params;
    const wallet = await Wallet.findOne({
      where: {
        id: walletId,
      },
      include: [{ model: Income }, { model: Expense }, { model: WalletType }],
    });
    if (!wallet) {
      return res.status(400).send({
        message: "Wallet not found",
      });
    } else {
      if (wallet.UserId !== userId) {
        return res.status(403).send({
          message: "You can't view this wallet",
        });
      }
    }
    res.send(wallet);
  } catch (error) {
    logger.error(`Error while getting wallet details: ${error.stack}`);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAllUserWallet,
  addUserWallet,
  updateUserWallet,
  deleteUserWallet,
  getWalletDetails,
};
