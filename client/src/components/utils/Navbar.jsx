import React from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.div
      className="fixed w-4/5 top-6 left-1/2 transform -translate-x-1/2 z-50 bg-black/30 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-sky-300 flex items-center justify-center"
      style={{
        "--border-color": "lightblue",
        "--glow-color": "rgba(0, 191, 255, 0.4)",
      }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        whileHover={{ scale: 1.1, color: "#87CEEB" }} // Light blue color on hover
        transition={{ duration: 0.3 }}
        className="text-lg font-semibold text-white cursor-pointer tracking-wide"
      >
        ProjectShowcase
      </motion.h1>
    </motion.div>
  );
};

export default Navbar;
