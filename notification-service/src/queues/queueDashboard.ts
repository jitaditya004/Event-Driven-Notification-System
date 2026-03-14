import { Router } from "express"
import { createBullBoard } from "@bull-board/api"
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter"
import { ExpressAdapter } from "@bull-board/express"

import { notificationQueue } from "@/queues/notification.queue"

const serverAdapter = new ExpressAdapter()

serverAdapter.setBasePath("/admin/queues")

createBullBoard({
  queues: [
    new BullMQAdapter(notificationQueue)
  ],
  serverAdapter
})

export const bullBoardRouter = serverAdapter.getRouter()


//http://localhost:4000/admin/queues