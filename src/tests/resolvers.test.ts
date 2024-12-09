import { ApolloServer, gql } from "apollo-server-express";
import RedisClient from "../services/redisClient";
import resolvers from "../resolvers/CharacterResolver";
import { readFileSync } from "fs";
import path from "path";

const redis = RedisClient.getInstance();

afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Timeout for close async functions
    await redis.quit();
});


const typeDefs = gql(
    readFileSync(
        path.join(__dirname, "../schemas", "characterSchema.graphql"),
        "utf-8"
    )
);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
        redis,
    }),
});

describe("GraphQL Resolvers", () => {
    it("should get a character by ID", async () => {
        const characterId = 1;
        const response = await server.executeOperation({
            query: `query getCharacterById($id: Int!) {
        getCharacterById(id: $id) {
          id
          name
          comments {
            id
            comment
          }
        }
      }`,
            variables: { id: characterId },
        });

        expect(response.errors).toBeUndefined();
        expect(response?.data?.getCharacterById).toBeDefined();
        expect(response?.data?.getCharacterById.id).toBe(characterId);
    });

    it("should filter characters", async () => {
        const response = await server.executeOperation({
            query: `query filterCharacters($name: String) {
        filterCharacters(name: $name) {
          id
          name
        }
      }`,
            variables: { name: "Rick" },
        });

        expect(response.errors).toBeUndefined();
        expect(response?.data?.filterCharacters).toBeDefined();
        expect(Array.isArray(response?.data?.filterCharacters)).toBe(true);
    });
});
