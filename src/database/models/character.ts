import { DataTypes } from "sequelize";
import connection from "../config/dbConnection";

const Character = connection.define("Character", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    species: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

export default Character;