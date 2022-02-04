const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER, //sequelize DataTypes object - integer
      allowNull: false, //doesn't allow null values
      primaryKey: true, // set as primary key
      autoIncrement: true //uses auto increment
    },
    category_name: {
      type: DataTypes.STRING, //sequelize DataTypes object - string
      allowNull: false // doesn't allow null values
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);
module.exports = Category;