'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Wallet)
      this.belongsToMany(models.ExpenseType, {through: "expenseExpenseTypes", foreignKey:"expenseId"})
    }
  }
  Expense.init({
    expenseAmount: DataTypes.FLOAT,
    expenseRepeatDuration: DataTypes.STRING,
    activeDate: DataTypes.DATE,
    deactiveDate: DataTypes.DATE,
    description: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'expense',
    modelName: 'Expense',
  });
  return Expense;
};