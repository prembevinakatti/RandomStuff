import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiSettings, FiLogOut } from "react-icons/fi";

const Dock = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here
    console.log("User logged out!");
    navigate("/login"); // Redirect to login after logout
  };

  const dockItems = [
    { name: "Home", icon: <FiHome size={24} />, to: "/" },
    { name: "Settings", icon: <FiSettings size={24} />, to: "/settings" },
  ];

  return (
    <div className=" bg-black text-white flex flex-col items-center justify-start  relative overflow-hidden">
      {/* Outlet for nested routing */}

      {/* Dock */}
      <motion.div
        className="fixed bottom-6 flex items-center gap-8 bg-black/30 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-sky-300"
        style={{
          "--border-color": "lightblue",
          "--glow-color": "rgba(0, 191, 255, 0.4)",
        }}
      >
        {dockItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className="relative group flex flex-col items-center justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center"
            >
              {item.icon}
            </motion.div>
            <span className="absolute bottom-10 text-xs text-white bg-black/70 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.name}
            </span>
          </NavLink>
        ))}

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="relative group flex flex-col items-center justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center text-red-400"
          >
            <FiLogOut size={24} />
          </motion.div>
          <span className="absolute bottom-10 text-xs text-white bg-black/70 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Logout
          </span>
        </button>
      </motion.div>
    </div>
  );
};

export default Dock;
