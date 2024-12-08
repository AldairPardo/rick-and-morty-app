import Character from "../database/models/character";
import Comment from "../database/models/comment";
import { Op } from "sequelize";

const resolvers = {
  Query: {
    getCharacterById: async (_: any, { id }: { id: number }) => {
      return await Character.findByPk(id, {
        include: [{ model: Comment, as: "comments"}],
        order: [[{ model: Comment, as: "comments" }, 'createdAt', 'DESC']]
      });
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
      //Validate if the character exists
      const character = await Character.findByPk(characterId);
      if (!character) {
        throw new Error("Character not found");
      }

      // Create comment
      await Comment.create({ characterId, comment });
      return await Character.findByPk(characterId, { include: [{ model: Comment, as: "comments"}], order: [[{ model: Comment, as: "comments" }, 'createdAt', 'DESC']] });
    },
    toggleFavorite: async (
      _: any,
      { characterId }: { characterId: number }
    ) => {
      
      //Validate if the character exists
      const character = await Character.findByPk(characterId);
      if (!character) {
        throw new Error("Character not found");
      }

      // Change the value of isFavorite
      character.isFavorite = character.isFavorite ? false : true;
      await character.save();
      return character;
    },

  },
};

export default resolvers;
