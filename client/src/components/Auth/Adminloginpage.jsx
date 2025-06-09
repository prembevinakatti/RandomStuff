import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

const AdminLoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Admin Login Data:", data);
    // Handle login logic here (e.g., API call)
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-gray-800 bg-opacity-40 backdrop-blur-md p-8 rounded-xl border border-purple-600"
      >
        <h2 className="text-3xl font-bold text-purple-300 text-center mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1 text-purple-200">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email"
                }
              })}
              id="email"
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 bg-opacity-30 border border-purple-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="admin@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm mb-1 text-purple-200">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters required" }
              })}
              id="password"
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 bg-opacity-30 border border-purple-500 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
