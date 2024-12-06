"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    static associate(models) { }
  }
  Character.init(
    {
      name: DataTypes.STRING,
      status: DataTypes.STRING,
      species: DataTypes.STRING,
      gender: DataTypes.STRING,
      origin: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Character",
    }
  );
  return Character;
};
