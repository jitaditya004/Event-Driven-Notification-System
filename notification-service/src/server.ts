import express, { Application } from "express"
import cors from "cors"
import dotenv from "dotenv"
import pinoHttp from "pino-http"

import "@/modules/notification/notification.handler"
import notificationRoutes from "@/modules/notification/notification.routes"


dotenv.config()

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(pinoHttp())

app.get("/health", (_, res) => {
  res.json({ status: "ok" })
})

app.use("/notifications", notificationRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})