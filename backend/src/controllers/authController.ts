import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../entities/userEntity";
import { AppDataSource } from "../db/data";

export const registerUser = async (
  args: { username: string; email: string; password: string },
  context: { res: any }
) => {
  try {

    const userRepository = AppDataSource.getRepository(User);
    const { username, email, password } = args;
    const { res } = context;

    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({
      username,
      email,
      password: hashedPassword,
    });
    await userRepository.save(newUser);

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
    });

    return newUser;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Failed to register user");
  }
};

export const loginUser = async (
  args: { email: string; password: string },
  context: { res: any }
) => {
  try {
    const { email, password } = args;
    const { res } = context;

    // Fetch the user from the database
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email });

    if (!user) {
      throw new Error("User not found");
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
    });

    return user;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw new Error("Failed to log in user");
  }
};


