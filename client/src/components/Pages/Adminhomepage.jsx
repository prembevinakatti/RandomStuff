import React from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaCode,
  FaDollarSign,
  FaChartLine,
  FaProjectDiagram,
} from "react-icons/fa";

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const AdminHomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <h1 className="text-4xl font-bold text-sky-300">Welcome, Admin</h1>
        <p className="text-gray-400 mt-2">
          Oversee projects, sales, and users on the platform.
        </p>
      </motion.div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[
          {
            icon: <FaUsers className="text-3xl text-sky-400 mb-3 mx-auto" />,
            title: "User Management",
            desc: "Approve or remove developers and buyers.",
          },
          {
            icon: (
              <FaProjectDiagram className="text-3xl text-sky-400 mb-3 mx-auto" />
            ),
            title: "Project Listings",
            desc: "Review and manage submitted projects.",
          },
          {
            icon: (
              <FaDollarSign className="text-3xl text-sky-400 mb-3 mx-auto" />
            ),
            title: "Sales Monitoring",
            desc: "Track purchases and earnings from projects.",
          },
          {
            icon: <FaCode className="text-3xl text-sky-400 mb-3 mx-auto" />,
            title: "Code Reviews",
            desc: "Inspect project code for quality & security.",
          },
          {
            icon: (
              <FaChartLine className="text-3xl text-sky-400 mb-3 mx-auto" />
            ),
            title: "Analytics",
            desc: "View traffic, user growth, and sales data.",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="initial"
            animate="animate"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-white/5 border border-sky-500 rounded-xl p-6 text-center backdrop-blur-lg shadow-[0_0_10px_rgba(56,189,248,0.2)]"
          >
            {card.icon}
            <h3 className="text-xl font-semibold text-sky-200">{card.title}</h3>
            <p className="text-sm text-gray-400 mt-1">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminHomePage;
