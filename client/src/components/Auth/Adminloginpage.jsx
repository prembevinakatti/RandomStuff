import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

const AdminLoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/randomstuff/admin/login",
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
        // navigate("/admin/dashboard");
        // dispatch(setUser(response.data.admin));
      } else {
        toast.error("Invalid admin credentials", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden p-8">
      {/* 🔵 Floating Blob Top Left */}
      <motion.div
        className="absolute rounded-full bg-sky-500 blur-3xl opacity-50"
        style={{ width: "400px", height: "400px", top: "-100px", left: "-100px" }}
        animate={{ x: [0, 100, -100, 0], y: [0, 100, -100, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      {/* 🔵 Floating Blob Bottom Right */}
      <motion.div
        className="absolute rounded-full bg-sky-700 blur-3xl opacity-60"
        style={{ width: "300px", height: "300px", bottom: "-50px", right: "-50px" }}
        animate={{ x: [0, -80, 80, 0], y: [0, -80, 80, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 p-8 rounded-xl w-full max-w-md border border-sky-300 bg-white/5 backdrop-blur-xl shadow-[0_0_20px_rgba(56,189,248,0.6)]"
      >
        <h2 className="text-3xl font-bold text-sky-300 text-center mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-sky-200">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-30 border border-sky-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:opacity-50"
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 text-sky-200">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters required" },
                })}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg bg-black bg-opacity-30 border border-sky-400 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:opacity-50"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-sm text-sky-200"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
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
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
