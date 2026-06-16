import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import jwt from "jsonwebtoken";
import cookie from "cookie";

let io: Server;

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const rawCookie = socket.handshake.headers.cookie;

    if (!rawCookie) {
      return next(new Error("Unauthorized"));
    }

    const cookies = cookie.parse(rawCookie);

    const token = cookies.accessToken;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    socket.data.userId = payload.userId;

    next();
  });

  io.on("connection", (socket) => {
    console.log("connected", socket.data.userId);

    socket.join(socket.data.userId);
  });

  return io;
};

export function getIO() {
  if (!io) {
    throw new Error("Socket not initialized");
  }

  return io;
}
