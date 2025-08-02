import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiLogOut, FiUser, FiUpload, FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { FaRocket } from "react-icons/fa";
import { setUser } from "@/redux/authSlice";
import { motion } from "framer-motion";

const Dock = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("User logged out");
    dispatch(setUser(null));
    navigate("/login");
  };

  const dockItems = [
    { name: "Home", icon: <FiHome size={24} />, to: "/home" },
    { name: "Explore", icon: <FiSearch size={24} />, to: "/explore" },
    { name: "Upload", icon: <FiUpload size={24} />, to: "/upload" },
    { name: "Profile", icon: <FiUser size={24} />, to: "/profile-page" },
  ];

  return (
    <motion.div
      className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-40 flex items-center gap-8 bg-[#0f0f0f]/60 border border-gray-500 px-8 py-4 rounded-full shadow-lg backdrop-blur-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {user ? (
        <>
          {dockItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className="group flex flex-col text-white items-center justify-center"
            >
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                {item.icon}
              </motion.div>
              <span className="absolute bottom-12 text-xs text-white bg-black/70 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {item.name}
              </span>
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            className="group flex flex-col items-center justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-red-400"
            >
              <FiLogOut size={24} />
            </motion.div>
            <span className="absolute bottom-12 text-xs text-white bg-black/70 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Logout
            </span>
          </button>
        </>
      ) : (
        <motion.button
          onClick={() => navigate("/register")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-[200px]  flex items-center gap-2 cursor-pointer bg-[#BAFF38] text-black font-bold px-6 py-3 rounded-full shadow-md hover:shadow-lime-400/50 transition"
        >
          <FaRocket className="animate-bounce" />
          Explore Projects
        </motion.button>
      )}
    </motion.div>
  );
};

export default Dock;
