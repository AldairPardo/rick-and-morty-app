import { DataTypes, Model } from "sequelize";
import connection from "../config/dbConnection";
import { getCharacters } from "../../services/apiService";

class Character extends Model {
    public id!: number;
    public name!: string;
    public status?: string;
    public species?: string;
    public gender?: string;
    public origin?: string;
    public isReferred?: boolean;
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
    isReferred: {
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
            await Character.upsert(character);
        }
        console.log("Characters updated successfully.");
    } else {
        console.log("No characters found to update.");
    }
}

(async () => {
    await connection.sync();
    await initializeCharacters();
})();

export default Character;