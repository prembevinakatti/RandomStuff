import { useSelector } from "react-redux";
import Dock from "./components/utils/Dock";
import Navbar from "./components/utils/Navbar";
import AppRoutes from "./Routes/AppRoutes";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import NotificationPopup from "./components/utils/NotificationPopup";

function App() {
  const { user } = useSelector((store) => store.auth);
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (user?._id) {
      socket.emit("join", user._id);
      console.log("Joining room with ID:", user._id);

      socket.on("newNotification", (populatedNotification) => {
        console.log("from socket : ", populatedNotification);

        if (
          populatedNotification.recipient._id === user._id &&
          populatedNotification.sender._id !== user._id
        ) {
          console.log("🔥 New Notification in App.jsx:", populatedNotification);

          setNotifications((prev) => [populatedNotification, ...prev]);
          setShowPopup(true);

          // Auto-hide popup after 5 seconds
          setTimeout(() => setShowPopup(false), 5000);
        }
      });

      return () => {
        socket.off("newNotification");
      };
    }
  }, [user]);

  return (
    <div className="relative bg-black text-white min-h-screen">
      <Navbar />
      <AppRoutes />
      <Dock />
      {showPopup && (
        <div className="fixed top-16 right-4 z-50">
          <NotificationPopup
            notifications={notifications}
            onClose={() => setShowPopup(false)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
