import { prisma } from "@/lib/prisma"

type CreateUserData = {
  email: string
}

export const createUserWithOutbox = async (data: CreateUserData) => {
  return prisma.$transaction(async tx => {
    const user = await tx.user.create({
      data: {
        email: data.email
      }
    })

    await tx.outboxEvent.create({
      data: {
        eventType: "USER_REGISTERED",
        payload: {
          userId: user.id,
          email: user.email
        }
      }
    })

    return user
  })
}