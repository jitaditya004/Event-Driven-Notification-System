import bcrypt from "bcrypt";
import { createUser } from "./auth.repository";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/utils/jwt";

type AuthInput = {
  email: string;
  password: string;
};

export async function registerUser(data: AuthInput) {
  if(!data.email?.trim()){
    throw new Error("Email Required");
  }
  if (!data.password?.trim()) {
    throw new Error("Password is required");
  }
  const exists = await prisma.user.findUnique({
    where: {
      email: data.email.trim(),
    },
  });

  if (exists) {
    throw new Error("User already exists");
  }

  const user = await createUser({
    email: data.email.trim(),
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
  if (!data.email?.trim()) {
    throw new Error("Email is required");
  }

  if (!data.password?.trim()) {
    throw new Error("Password is required");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: data.email.trim(),
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
