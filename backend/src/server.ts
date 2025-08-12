import "reflect-metadata";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { userTypeDef } from "./graphql/typeDefs/user.schema";
import { clientTypeDef } from "./graphql/typeDefs/client.schema";
import { invoiceTypeDef } from "./graphql/typeDefs/invoice.schema";
import paymentTypeDef from "./graphql/typeDefs/payment.schema";
import { userResolver } from "./graphql/resolvers/user.resolver";
import { createConnection } from "./db/data";
import { verifyToken, TokenPayload } from "./lib/utils";
import { invoiceResolver } from "./graphql/resolvers/invoice.resolver";
import { clientResolver } from "./graphql/resolvers/client.resolver";

interface MyContext {
  res: express.Response;
  req: express.Request;
  decodedToken: TokenPayload | null;
}

const server = new ApolloServer<MyContext>({
  typeDefs: [userTypeDef, clientTypeDef, paymentTypeDef, invoiceTypeDef],
  resolvers: [userResolver, invoiceResolver, clientResolver],
});

async function startServer() {
  await createConnection();
  console.log("Database connection established.");

  await server.start();
  const app = express();
  app.use(
    "/graphql",
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
    cookieParser(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<MyContext> => {
        const token = req.cookies.token || "";
        const decodedToken = await verifyToken(token);
        return { req, res, decodedToken };
      },
    })
  ); // Start the server

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);
}

startServer();
