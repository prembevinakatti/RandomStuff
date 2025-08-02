import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotificationPopup = ({ notifications, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[28rem] max-w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-2xl rounded-3xl z-50 overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700"
    >
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold tracking-wide text-gray-800 dark:text-white">
          🔔 Notifications
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition duration-200 text-xl"
        >
          &times;
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto custom-scrollbar">
        {notifications.length === 0 ? (
          <p className="p-6 text-center text-gray-600 dark:text-gray-400 text-sm">
            No new notifications
          </p>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {notifications.map((notif, i) => (
              <li
                key={i}
                className="px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
              >
                <Link to={notif.link} onClick={onClose} className="block">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {notif.sender.username} {notif.message}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                    {new Date(notif.createdAt).toLocaleString()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default NotificationPopup;
