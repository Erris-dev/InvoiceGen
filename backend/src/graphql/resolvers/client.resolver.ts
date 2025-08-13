import { createClient } from "../../controllers/clientController";
import { Client } from "../../entities/clientEntity";
import { AppDataSource } from "../../db/data";
import { sendRemainder } from "../../lib/sendEmail";

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
    sendRemainder: async (
      _: any,
      args: { clientId: number },
      context: { decodedToken?: { userId: number } }
    ) => {
      const userId = context.decodedToken?.userId;
      if (!userId) throw new Error("Not authenticated");

      // Find the client
      const client = await AppDataSource.getRepository(Client)
        .createQueryBuilder("client")
        .leftJoin("client.users", "user")
        .where("client.id = :clientId", { clientId: args.clientId })
        .andWhere("user.id = :userId", { userId })
        .getOne();

      if (!client) throw new Error("Client not found");

      // Send email
      await sendRemainder(client.email, client.name);

      return `Reminder sent to ${client.name} (${client.email})`;
    },
  },
};
