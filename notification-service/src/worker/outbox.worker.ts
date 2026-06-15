
import { prisma } from "@/lib/prisma"
import { eventBus } from "@/events/eventBus"

async function processOutbox() {
  const events = await prisma.outboxEvent.findMany({
    where: {
      status: "PENDING"
    },
    take: 10
  })

  for (const event of events) {

    console.log("Publishing outbox event:", event.eventType)
    try {
      await prisma.outboxEvent.update({
        where: {
          id: event.id
        },
        data: {
          status: "PROCESSING"
        }
      })

      eventBus.emit(
        event.eventType as "USER_REGISTERED",
        event.payload as {
          userId: string
          email: string
        }
      )

      await prisma.outboxEvent.update({
        where: {
          id: event.id
        },
        data: {
          status: "PROCESSED",
          processedAt: new Date()
        }
      })
    } catch {
      await prisma.outboxEvent.update({
        where: {
          id: event.id
        },
        data: {
          status: "FAILED",
          attempts: {
            increment: 1
          }
        }
      })

      console.log("Outbox processed:", event.id)
    }
  }
}

setInterval(processOutbox, 5000)

console.log("Outbox worker running")