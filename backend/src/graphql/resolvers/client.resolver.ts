import { createClient } from "../../controllers/clientController";
import { Client } from "../../entities/clientEntity";
import { AppDataSource } from "../../db/data";

export const clientResolver = {
  Query: {
    myClients: async (
      _: any,
      __: any,
      context: { decodedToken?: { userId: number } }
    ) => {
      const userId = context.decodedToken?.userId;
      if (!userId) throw new Error("Not authenticated");

      return await AppDataSource.getRepository(Client)
        .createQueryBuilder("client")
        .leftJoinAndSelect("client.invoices", "invoice")
        .leftJoin("client.users", "user") // Many-to-Many
        .where("user.id = :userId", { userId })
        .getMany();
    },
  },
  Mutation: {
    createClient: async (
      _: any,
      args: { name: string; email: string; phone: string; address: string },
      context: { decodedToken?: { userId: number } }
    ) => {
      const userId = context.decodedToken?.userId;
      if (!userId) throw new Error("Not authenticated");

      // Use userId in your service to associate client
      return createClient(args, userId);
    },
  },
};
