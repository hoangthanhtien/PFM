'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Income extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Wallet)
      this.belongsToMany(models.IncomeType, {through: "incomeIncomeTypes",foreignKey: 'incomeId'})
    }
  }
  Income.init({
    incomeAmount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false
    },
    incomeRepeatDuration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activeDate: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false
    },
    deactiveDate: {
      type: DataTypes.DATE,
    },
    description: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'income',
    modelName: 'Income'
  });
  return Income;
};