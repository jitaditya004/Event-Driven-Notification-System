import express, { Application } from "express"
import cors from "cors"
import dotenv from "dotenv"
import pinoHttp from "pino-http"
dotenv.config()

import "@/modules/notification/notification.handler"
import notificationRoutes from "@/modules/notification/notification.routes"
import "@/worker/notification.worker"
import { bullBoardRouter } from "@/queues/queueDashboard"


const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(pinoHttp())

app.get("/health", (_, res) => {
  res.json({ status: "ok" })
})

app.use("/notifications", notificationRoutes)
app.use("/admin/queues", bullBoardRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})