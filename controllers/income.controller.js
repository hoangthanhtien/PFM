const { Op } = require("sequelize");
const db = require("../models");
const { Income, Wallet } = db;
const { logger } = require("../services");

const getAllWalletIncome = (req, res) => {
  try {
    const { wallet_id: walletId } = req.params;
    const {id: userId} = req.user;
    const wallet = await Wallet.findOne({
        where: {
            id: walletId,
        },
    });

    if(!wallet){
        return res.status(400).send({
            message: "Wallet not found",
        });
    }

    if(wallet && wallet.UserId !== userId){
        return res.status(403).send({
            message: "You can't view this wallet's incomes",
        });
    }

    // const { startDate, endDate } = req.query;
    const incomes = await Income.findAll({
      where: {
        WalletId: walletId,
        // createdAt: {
        //   [Op.between]: [startDate, endDate],
        // },
      },
    });
    res.send(incomes);
  } catch (error) {
    logger.error(`Error while getting all wallet's incomes: ${error.stack}`);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const createIncome = (req, res) => {
  try {
    const { id: userId } = req.user;
    const { wallet_id: walletId } = req.params;

    const wallet = await Wallet.findOne({
      where: {
        id: walletId,
      },
    });
    if (wallet.UserId !== userId) {
      return res.status(403).send({
        message: "You are not authorized to view this wallet",
      });
    }

    const {
      amount: incomeAmount,
      duration: incomeRepeatDuration,
      active_date: activeDate,
      deactive_date: deactiveDate,
      description: description,
    } = req.body;

    const income = await Income.create({
      incomeAmount,
      incomeRepeatDuration,
      activeDate,
      deactiveDate,
      description,
      WalletId: walletId,
    });

    res.send(income);
  } catch (error) {
    logger.error(`Error while creating income: ${error.stack}`);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAllWalletIncome,
  createIncome,
};
