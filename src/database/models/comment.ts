import { DataTypes } from "sequelize";
import Character from "./character";
import connection from "../config/dbConnection";

const Comment = connection.define("Comment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    characterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Characters',
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

// Relationships
Character.hasMany(Comment, { foreignKey: "characterId", as: "comments" });
Comment.belongsTo(Character, { foreignKey: "characterId", as: "character" });

export default Comment;