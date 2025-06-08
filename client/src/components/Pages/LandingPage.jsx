import React from "react";
import { motion } from "framer-motion";

const starsArray = Array(60).fill(0);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center relative overflow-hidden px-6">

      {/* Stars Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 absolute inset-0"
          style={{
            animationDuration: "12s",
            animationDirection: "reverse",
            animationIterationCount: "infinite",
            animationName: "pulse",
          }}
        />

        {/* Twinkling Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {starsArray.map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.3, scale: 1, filter: "brightness(1)" }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
                filter: ["brightness(1)", "brightness(2.5)", "brightness(1)"],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 6,
                ease: "easeInOut",
              }}
              className="bg-white rounded-full absolute"
              style={{
                width: 2.5,
                height: 2.5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                filter: "drop-shadow(0 0 3px white)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Glowing Orbs */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-28 h-28 bg-purple-600 rounded-full opacity-40 blur-2xl mix-blend-screen"
      />
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-28 right-20 w-40 h-40 bg-indigo-600 rounded-full opacity-30 blur-3xl mix-blend-screen"
      />
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-48 right-32 w-32 h-32 bg-pink-600 rounded-full opacity-20 blur-2xl mix-blend-screen"
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center max-w-3xl z-10 px-4"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-wide">
          <span className="text-purple-400 drop-shadow-lg">ProjectShowcase</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
          🚀 A galaxy of student and developer projects—showcase, discover, or sell your code across the universe.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(139,92,246,0.8)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300"
          >
            Explore Projects
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgb(139 92 246)",
              color: "#fff",
              boxShadow: "0 0 20px rgba(139,92,246,0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border border-purple-400 text-purple-300 font-semibold py-3 px-8 rounded-lg transition-all duration-300"
          >
            Start Selling
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
