import "dotenv/config"
import { prisma } from "@/lib/prisma"
import { eventBus } from "@/events/eventBus"
import "@/modules/notification/notification.handler"


async function test() {
  const user = await prisma.user.create({
    data: {
      email: `test-${Date.now()}@test.com`
    }
  })

  // const user = await prisma.user.upsert({
  //   where: { email: "test@test.com" },
  //   update: {},
  //   create: {
  //     email: "test@test.com"
  //   }
  // })

  eventBus.emit("USER_REGISTERED", {
    userId: user.id
  })

  console.log("Event emitted for user:", user.id)
}

test()

//npx ts-node -r tsconfig-paths/register src/testEvent.ts