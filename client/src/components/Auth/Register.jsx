import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const starsArray = Array(50).fill(0);

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Registration Data:", data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center relative overflow-hidden px-6">
      {/* Stars Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-pulse" />
        {starsArray.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3, scale: 1 }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
              filter: ["brightness(1)", "brightness(2.5)", "brightness(1)"],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
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

      {/* Glowing Orbs */}
      <motion.div animate={{ y: [0, -20, 0], x: [0, 10, 0, -10, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-24 left-10 w-24 h-24 bg-pink-500 rounded-full opacity-30 blur-2xl mix-blend-screen" />
      <motion.div animate={{ y: [0, -20, 0], x: [0, -15, 0, 15, 0] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} className="absolute bottom-28 right-10 w-32 h-32 bg-indigo-600 rounded-full opacity-20 blur-3xl mix-blend-screen" />

      {/* Register Form Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 p-8 rounded-xl w-full max-w-md border border-purple-500 bg-opacity-10 backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold text-purple-300 text-center mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm text-purple-200 mb-1">
              Username
            </label>
            <input
              {...register("username", { required: "Username is required" })}
              id="username"
              className="w-full p-3 rounded-lg bg-gray-900 bg-opacity-30 text-white border border-purple-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Choose a username"
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm text-purple-200 mb-1">
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              id="email"
              className="w-full p-3 rounded-lg bg-gray-900 bg-opacity-30 text-white border border-purple-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm text-purple-200 mb-1">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              id="password"
              type="password"
              className="w-full p-3 rounded-lg bg-gray-900 bg-opacity-30 text-white border border-purple-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Create a password"
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
            Register
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
