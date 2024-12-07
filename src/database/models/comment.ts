import { DataTypes, Model } from "sequelize";
import Character from "./character";
import connection from "../config/dbConnection";

class Comment extends Model {
    public id!: number;
    public characterId!: number;
    public comment!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Comment.init(
    {
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
                model: "Characters",
                key: "id",
            },
            onDelete: "CASCADE",
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
    },
    {
        sequelize: connection,
        modelName: "Comment",
    }
);

// Relationships
Character.hasMany(Comment, { foreignKey: "characterId", as: "comments" });
Comment.belongsTo(Character, { foreignKey: "characterId", as: "character" });

export default Comment;
