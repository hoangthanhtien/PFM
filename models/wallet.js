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
      this.belongsTo(models.User)
      this.belongsToMany(models.WalletType, {through: 'walletWalletTypes', foreignKey: 'walletId'})
      this.hasMany(models.Income)
      this.hasMany(models.Expense)
    }
  }
  Wallet.init(
    {
      walletName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      totalBalance: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      isActive: {
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
