import Character from "../database/models/character";
import Comment from "../database/models/comment";
import { Op } from "sequelize";

const resolvers = {
  Query: {
    getAllCharacters: async () => {
      return await Character.findAll({
        include: [{ model: Comment, as: "comments" }],
      });
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
  Mutation: {
    addComment: async (
      _: any,
      { characterId, comment }: { characterId: number; comment: string }
    ) => {
      // Validar que el personaje existe
      const character = await Character.findByPk(characterId);
      if (!character) {
        throw new Error("Character not found");
      }

      // Crear el comentario
      const newComment = await Comment.create({ characterId, comment });
      return newComment;
    },
  },
};

export default resolvers;
