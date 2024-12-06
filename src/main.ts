import express from "express";
import { ApolloServer } from "apollo-server-express";
import connection from "./database/config/dbConnection";
require("dotenv").config();

async function startServer() {
    const app = express();
    const PORT = process.env.PORT || 4000;
    const server = new ApolloServer({
        typeDefs: `
        type Query {
        hello: String
        }
    `,
        resolvers: {
            Query: {
                hello: () => "Hello world!",
            },
        },
    });

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

    app.use(express.json());
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}/graphql`);
    });
}

startServer();