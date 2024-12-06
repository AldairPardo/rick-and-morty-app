import { DataTypes } from "sequelize";
import connection from "../config/dbConnection";
import { getCharacters } from "../../services/apiService";

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
    await initializeCharacters();
})();

export default Character;