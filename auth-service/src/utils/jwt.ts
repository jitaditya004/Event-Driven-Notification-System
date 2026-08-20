import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET");
}

const secret: string = JWT_SECRET

export function createToken(userId: string) {
  return jwt.sign({ userId }, secret, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret) as {
    userId: string;
  };
}
