import { User } from "../../entities/userEntity";
import { AppDataSource } from "../../db/data";
import { registerUser, loginUser } from "../../controllers/authController";

interface ResolverContext {
  res: any;
}

export const userResolver = {
  Query: {
    users: () => {
      // This should ideally fetch users from the database;
      return AppDataSource.getRepository(User).find();
    },

    user: (parent: any, args: { id: string }) => {
      // This should ideally fetch a user by ID from the database;
      return AppDataSource.getRepository(User).findOneBy({ id: parseInt(args.id) });
    },
  },
  Mutation: {
    registerUser: async (
      parent: any,
      args: { username: string; email: string; password: string },
      context: ResolverContext
    ) => registerUser(args, context),

    loginUser: async (
      parent: any,
      args: { email: string; password: string },
      context: ResolverContext
    ) => loginUser(args, context),
    
    logoutUser: (parent: any, args: any, context: ResolverContext) => {
      const { res } = context;
      res.clearCookie("token");
      return true; 
    },
  },
};
