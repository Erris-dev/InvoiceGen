import jwt from "jsonwebtoken";

export interface TokenPayload {
  userId: number;
  iat: number;
  exp: number;
}

const JWT_SECRET = process.env.JWT_SECRET!;

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}
