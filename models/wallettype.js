'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WalletType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Wallet, {through: 'walletWalletTypes', foreignKey: 'walletTypeId'})
    }
  }
  WalletType.init({
    walletTypeName: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    tableName: "walletType",
    modelName: 'WalletType',
  });
  return WalletType;
};