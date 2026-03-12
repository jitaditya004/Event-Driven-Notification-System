import "dotenv/config"
import { prisma } from "@/lib/prisma"
import { eventBus } from "@/events/eventBus"
import "@/modules/notification/notification.handler"


async function test() {
  const user = await prisma.user.create({
    data: {
      email: "test@test.com"
    }
  })

  eventBus.emit("USER_REGISTERED", {
    userId: user.id
  })

  console.log("Event emitted for user:", user.id)
}

test()

//npx ts-node -r tsconfig-paths/register src/testEvent.ts