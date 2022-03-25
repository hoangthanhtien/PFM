"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wallet.init(
    {
      walletName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalBalance: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      walletStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "wallet",
      modelName: "Wallet",
    }
  );
  return Wallet;
};
