import React from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <div className="fixed w-4/5 top-6 left-1/2 transform -translate-x-1/2 z-50 bg-black/30 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-purple-500/30 flex items-center justify-center">
      <motion.h1
        whileHover={{ scale: 1.1, color: "#a78bfa" }} // scale and color change on hover
        transition={{ duration: 0.3 }}
        className="text-lg font-semibold text-white cursor-pointer tracking-wide"
      >
        ProjectShowcase
      </motion.h1>
    </div>
  );
};

export default Navbar;
