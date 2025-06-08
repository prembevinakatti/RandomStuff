import React, { useState } from "react"; // 🟡 Added useState
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const generateStars = (count) =>
  Array.from({ length: count }, () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    duration: 4 + Math.random() * 4,
    delay: Math.random() * 5,
  }));

const starsArray = generateStars(50);

const LoginPage = () => {
  const [loading, setLoading] = useState(false); // 🟡 loading state
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // 🟡 Start loading
    try {
      const response = await axios.post(
        `http://localhost:3000/api/randomstuff/auth/login`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
        console.log("Login successful!");
      } else {
        toast.error("Invalid username or password", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log("Error in login in frontend:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false); // 🟡 Stop loading
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center relative overflow-hidden px-6">
      {/* ... (Background and Star Animation remain unchanged) */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 p-8 rounded-xl w-full max-w-md border border-purple-500 bg-black bg-opacity-40 backdrop-blur-md"
      >
        <h2 className="text-3xl font-bold text-purple-300 text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm text-purple-200 mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-3 rounded-lg bg-gray-900 bg-opacity-30 text-white border border-purple-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              disabled={loading} // 🟡 Disable while loading
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm text-purple-200 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-3 rounded-lg bg-gray-900 bg-opacity-30 text-white border border-purple-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              disabled={loading} // 🟡 Disable while loading
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading} // 🟡 Disable while loading
            className={`w-full ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
            } text-white font-bold py-3 px-6 rounded-lg transition-all duration-300`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
