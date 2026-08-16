import bcrypt from "bcrypt";
import { createUser } from "./auth.repository";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/utils/jwt";

type AuthInput = {
  email: string;
  password: string;
};

export async function registerUser(data: AuthInput) {
  const exists = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (exists) {
    throw new Error("User already exists");
  }

  const user = await createUser({
    email: data.email,
    password: data.password,
  });

  const token = createToken(user.id);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
}

export async function loginUser(data: AuthInput) {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(data.password, user.password);

  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const token = createToken(user.id);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
}
