import { useState } from "react";
import NotificationPopup from "./NotificationPopup";
import useNotificationListener from "@/hooks/useNotificationListener";

const NotificationBell = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Socket listener
  useNotificationListener(userId, (newNotif) => {
    setNotifications((prev) => [newNotif, ...prev]);
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative">
      <button
        className="relative p-2"
        onClick={() => setShowPopup((prev) => !prev)}
      >
        <span>🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">
            {unreadCount}
          </span>
        )}
      </button>

      {showPopup && (
        <NotificationPopup
          notifications={notifications}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default NotificationBell;
