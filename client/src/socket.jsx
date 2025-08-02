import { io } from "socket.io-client";
export const socket = io("https://randomstuff-bjgb.onrender.com", {
  withCredentials: true,
});
