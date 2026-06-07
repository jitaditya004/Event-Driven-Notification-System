import dotenv from "dotenv";
dotenv.config();

import http from "http";

import { app } from "./app";
import { initSocket } from "./socket";
import "@/worker/notification.worker";

const server = http.createServer(app);

initSocket(server);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});