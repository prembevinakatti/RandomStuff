import { useEffect } from "react";
import { socket } from "../socket";

const useNotificationListener = (userId, onReceive) => {
  useEffect(() => {
    if (!userId) return;

    socket.emit("join", userId);

    socket.on("newNotification", (data) => {
      console.log("🔔 Received notification:", data);
      onReceive(data);
    });

    return () => {
      socket.off("newNotification");
    };
  }, [userId, onReceive]);
};

export default useNotificationListener;
