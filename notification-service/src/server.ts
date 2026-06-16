import dotenv from "dotenv";
dotenv.config();

import http from "http";

import { app } from "./app";
import { initSocket } from "./socket";
import { startSocketSubscriber } from "./socket/subscriber";
import { startNotificationHandler } from "@/modules/notification/notification.handler";

const server = http.createServer(app);

initSocket(server);

startSocketSubscriber();
startNotificationHandler();

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
