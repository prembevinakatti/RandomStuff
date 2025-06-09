import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaCode, FaDollarSign, FaChartLine, FaProjectDiagram } from 'react-icons/fa';

const AdminHomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-purple-300">Welcome, Admin</h1>
        <p className="text-gray-400 mt-2">Oversee projects, sales, and users on the platform.</p>
      </motion.div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 bg-opacity-60 border border-purple-600 rounded-xl p-6 text-center"
        >
          <FaUsers className="text-3xl text-purple-400 mb-3 mx-auto" />
          <h3 className="text-xl font-semibold">User Management</h3>
          <p className="text-sm text-gray-400">Approve or remove developers and buyers.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 bg-opacity-60 border border-purple-600 rounded-xl p-6 text-center"
        >
          <FaProjectDiagram className="text-3xl text-purple-400 mb-3 mx-auto" />
          <h3 className="text-xl font-semibold">Project Listings</h3>
          <p className="text-sm text-gray-400">Review and manage submitted projects.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 bg-opacity-60 border border-purple-600 rounded-xl p-6 text-center"
        >
          <FaDollarSign className="text-3xl text-purple-400 mb-3 mx-auto" />
          <h3 className="text-xl font-semibold">Sales Monitoring</h3>
          <p className="text-sm text-gray-400">Track purchases and earnings from projects.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 bg-opacity-60 border border-purple-600 rounded-xl p-6 text-center"
        >
          <FaCode className="text-3xl text-purple-400 mb-3 mx-auto" />
          <h3 className="text-xl font-semibold">Code Reviews</h3>
          <p className="text-sm text-gray-400">Inspect project code for quality & security.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 bg-opacity-60 border border-purple-600 rounded-xl p-6 text-center"
        >
          <FaChartLine className="text-3xl text-purple-400 mb-3 mx-auto" />
          <h3 className="text-xl font-semibold">Analytics</h3>
          <p className="text-sm text-gray-400">View traffic, user growth, and sales data.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminHomePage;
