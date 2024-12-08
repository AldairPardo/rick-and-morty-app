import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import connection from "./database/config/dbConnection";
import { readFileSync } from "fs";
import path from "path";
import resolvers from "./resolvers/CharacterResolver";
import requestLogger from "./middlewares/requestLogger";
import { initializeCharacters } from "./database/models/character";
var cron = require('node-cron');

require("dotenv").config();

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 4000;

  // Middleware for logging requests
  app.use(requestLogger);
  
  const typeDefs = gql(
    readFileSync(
      path.join(__dirname, "schemas", "characterSchema.graphql"),
      "utf-8"
    )
  );

  const server = new ApolloServer(
    {
      typeDefs,
      resolvers
    }
  );

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  (async () => {
    try {
      await connection.authenticate();
      console.log("Database connection established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  })();

  // Configura el cron job para ejecutar initializeCharacters cada 12 horas
  cron.schedule("0 */12 * * *", async () => {
    console.log("Running cron job to initialize characters...");
    initializeCharacters();
  });

  app.use(express.json());
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

startServer();