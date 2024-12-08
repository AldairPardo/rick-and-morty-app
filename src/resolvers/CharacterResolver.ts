import Character from "../database/models/character";
import Comment from "../database/models/comment";
import { Op } from "sequelize";
import RedisClient from "../services/redisClient";
import crypto from "crypto";

const redis = RedisClient.getInstance(); // Redis instance

const resolvers = {
  Query: {
    getCharacterById: async (_: any, { id }: { id: number }) => {
      const cacheKey = `character:${id}`;
      
      // Verify Caché
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        console.log("Cache hit: getCharacterById");
        return JSON.parse(cachedData);
      }

      // Simulate a delay
      // await new Promise((resolve) => setTimeout(resolve, 6000));

      const character = await Character.findByPk(id, {
        include: [{ model: Comment, as: "comments" }],
        order: [[{ model: Comment, as: "comments" }, "createdAt", "DESC"]],
      });

      // Save on redis 
      if (character) {
        await redis.set(cacheKey, JSON.stringify(character), "EX", 180);
      }

      return character;
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
      //unique hash for the filters
      const filtersHash = crypto
        .createHash("md5")
        .update(JSON.stringify({ name, gender, origin, status, species }))
        .digest("hex");
      const cacheKey = `filterCharacters:${filtersHash}`;

      // Verifica si ya existe un resultado en caché
      const cachedData = await redis.get(cacheKey);
      if (cachedData) {
        console.log("Cache hit: filterCharacters");
        return JSON.parse(cachedData);
      }

      const filters: any = {};
      if (name) filters.name = { [Op.like]: `%${name}%` };
      if (gender) filters.gender = gender;
      if (origin) filters.origin = origin;
      if (status) filters.status = status;
      if (species) filters.species = species;

      const characters = await Character.findAll({ where: filters });

      // Save on redis 
      if (characters.length > 0) {
        await redis.set(cacheKey, JSON.stringify(characters), "EX", 180);
      }

      return characters;
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
