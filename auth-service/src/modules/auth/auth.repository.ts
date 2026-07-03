import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

type CreateUserData = {
  email: string;
  password: string;
};

export const createUser = async (data: CreateUserData) => {
  return prisma.$transaction(async (tx) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await tx.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });

    await tx.outboxEvent.create({
      data: {
        eventType: "USER_CREATED",
        payload: {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
        },
      },
    });

    return user;
  });
};
