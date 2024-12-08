import axios from "axios";
import Character from "../database/models/character";

//API URL
const API_URL = "https://rickandmortyapi.com/api/character";

interface CharacterDTO {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: {
        name: string;
    };
    location: {
        name: string;
    };
    image: string;
}

export const getCharacters = async (page: number = 1) => {
    try {
        const characters = await axios
            .get(`${API_URL}?page=${page}`)
            .then((response) => response.data.results.slice(0, 15))
            .then((results) =>
                results.map((character: CharacterDTO) => ({
                    id: character.id,
                    name: character.name,
                    status: character.status,
                    species: character.species,
                    gender: character.gender,
                    origin: character.origin.name,
                    location: character.location.name,
                    image: character.image,
                }))
            );
        return characters;
    } catch (error) {
        console.error("Error al obtener personajes:", error);
        throw error;
    }
};

