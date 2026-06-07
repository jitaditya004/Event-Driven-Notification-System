import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export let io: Server;

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", socket => {
    console.log("socket connected", socket.id);

    socket.on("join", userId => {
      socket.join(userId);

      console.log("user joined", userId);
    });
  });

  return io;
};