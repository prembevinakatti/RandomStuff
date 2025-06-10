import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/randomstuff/auth/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
        dispatch(setUser(response.data.user));
        navigate("/dashboard");
      } else {
        toast.error("Invalid username or password", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden p-8">
      {/* 🔵 Animated Blurry Blue Blob (Top Left) */}
      <motion.div
        className="absolute rounded-full bg-sky-500 blur-3xl opacity-50"
        style={{
          width: "400px",
          height: "400px",
          top: "-100px",
          left: "-100px",
        }}
        animate={{
          x: [0, 100, -100, 0],
          y: [0, 100, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* 🔵 Animated Blurry Blue Blob (Bottom Right) */}
      <motion.div
        className="absolute rounded-full bg-sky-700 blur-3xl opacity-60"
        style={{
          width: "300px",
          height: "300px",
          bottom: "-50px",
          right: "-50px",
        }}
        animate={{
          x: [0, -80, 80, 0],
          y: [0, -80, 80, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 p-8 rounded-xl w-full max-w-md border border-sky-300 bg-white/5 backdrop-blur-xl shadow-[0_0_20px_rgba(0,191,255,0.6)]"
        style={{
          "--border-color": "lightblue",
          "--glow-color": "rgba(0, 191, 255, 0.4)",
        }}
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm text-white mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-3 rounded-lg  bg-opacity-30 text-white border border-sky-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:opacity-50"
              placeholder="Enter your email"
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm text-white mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full p-3 rounded-lg  bg-opacity-30 text-white border border-sky-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:opacity-50"
                placeholder="Enter your password"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 text-sm text-white focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-sky-400 hover:bg-sky-500 transition-colors font-bold text-white shadow-md disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Extra links */}
        <div className="text-sm text-center mt-6 space-y-2 text-white">
          <p>
            Forgot your password?{" "}
            <span
              onClick={() => navigate("/forgot-password")}
              className="underline cursor-pointer text-sky-400 hover:text-sky-300"
            >
              Reset here
            </span>
          </p>
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="underline cursor-pointer text-sky-400 hover:text-sky-300"
            >
              Sign up
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
