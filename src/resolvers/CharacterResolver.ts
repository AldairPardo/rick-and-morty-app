import Character from "../database/models/character";
import { Op } from "sequelize";

const resolvers = {
  Query: {
    getAllCharacters: async () => {
      return await Character.findAll();
    },
    getCharacterById: async (_: any, { id }: { id: number }) => {
      return await Character.findByPk(id);
    },
    filterCharacters: async (_: any, {
      name,
      gender,
      origin,
      status,
      species,
    }: {
      name?: string;
      gender?: string;
      origin?: string;
      status?: string;
      species?: string;
    }) => {
      const filters: any = {};

      // validate filters
      if (name) filters.name = { [Op.like]: `%${name}%` };
      if (gender) filters.gender = gender;
      if (origin) filters.origin = origin;
      if (status) filters.status = status;
      if (species) filters.species = species;

      return await Character.findAll({ where: filters });
    },
  },
};

export default resolvers;
