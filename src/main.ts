import express from "express";
import { ApolloServer } from "apollo-server-express";
require("dotenv").config();

async function startServer() {
    const app = express();
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

    app.listen(4000, () => {
        console.log("Server is running on http://localhost:4000/graphql");
    });
}

startServer();