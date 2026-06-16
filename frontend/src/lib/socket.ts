import { io } from "socket.io-client";
const socketurl=import.meta.env.VITE_SOCKET_URL

export const socket = io(socketurl, {
  autoConnect: false,
  withCredentials: true,
});
