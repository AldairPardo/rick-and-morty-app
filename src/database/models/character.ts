import { DataTypes, Model } from "sequelize";
import connection from "../config/dbConnection";
import { getCharacters } from "../../services/apiService";

class Character extends Model {
    public id!: number;
    public image?: string;
    public name!: string;
    public status?: string;
    public species?: string;
    public gender?: string;
    public origin?: string;
    public isFavorite?: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

 Character.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
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
    isFavorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    sequelize: connection,
    modelName: 'Character',
    timestamps: true,
});

async function initializeCharacters() {
    const characters = await getCharacters(1);
    if (characters.length > 0) {
        for (const character of characters) {
            const characterExists = await Character.findByPk(character.id);
            if(!!characterExists) {
                await characterExists.update(character);
            } else {
                await Character.create(character);
            }
        }
        console.log("Characters updated successfully.");
    } else {
        console.log("No characters found to update.");
    }
}

export { initializeCharacters };

export default Character;
