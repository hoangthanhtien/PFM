'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExpenseType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Expense, {through: "expenseExpenseTypes", foreignKey:"expenseTypeId"})
    }
  }
  ExpenseType.init({
    expenseTypeName: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'expenseType',
    modelName: 'ExpenseType',
  });
  return ExpenseType;
};