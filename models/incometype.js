'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IncomeType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Income, {through: "incomeIncomeTypes",foreignKey: "incomeTypeId"})
    }
  }
  IncomeType.init({
    incomeTypeName: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'incomeType',
    modelName: 'IncomeType',
  });
  return IncomeType;
};