import { Client } from "../entities/clientEntity";
import { User } from "../entities/userEntity";
import { AppDataSource } from "../db/data";

export const createClient = async (
  args: { name: string; email: string; phone: string; address: string },
  userId: number
) => {
  const clientRepository = AppDataSource.getRepository(Client);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });
  if (!user) throw new Error("User not found");

  // Check if a client with the same email exists
  let client = await clientRepository.findOne({
    where: { email: args.email },
    relations: ["users"], // eager load existing user associations
  });

  if (client) {
    // If user not linked already, link them
    const userAlreadyLinked = client.users.some(u => u.id === userId);
    if (!userAlreadyLinked) {
      client.users.push(user);
      await clientRepository.save(client);
    }
    return client; // return existing client
  }

  // No existing client found, create new one
  client = clientRepository.create({
    ...args,
    users: [user],
  });

  await clientRepository.save(client);
  return client;
};