import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { Bounce, toast } from "react-toastify";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const recaptchaRef = useRef(null);
  const [captchaError, setCaptchaError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data) => {
    const token = recaptchaRef.current.getValue();
    if (!token) {
      setCaptchaError("Please verify the captcha");
      return;
    }
    setCaptchaError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/randomstuff/auth/register`,
        { ...data, captcha: token },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Registration successful!", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
        navigate("/login");
        reset();
      } else {
        toast.error(response.data.message || "Registration failed.", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.response?.data?.message || "Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-10">
        {/* Left Info Section */}
        <div className="space-y-6 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold leading-tight"
          >
            🌐 Welcome to Random Stuff
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg"
          >
            A vibrant space for students and developers to explore, share, and
            grow together. Discover mini projects, get inspired, and showcase
            your work.
          </motion.p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-lime-400 text-xl">🧠</span>
              <span className="text-white text-sm">
                Browse 100+ real-world mini project ideas
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lime-400 text-xl">💬</span>
              <span className="text-white text-sm">
                Get feedback & suggestions from peers
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lime-400 text-xl">🚀</span>
              <span className="text-white text-sm">
                Build your dev profile & get noticed
              </span>
            </div>
          </div>
        </div>

        {/* Right Registration Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-xl px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl shadow-xl min-h-[350px] flex flex-col justify-center"
        >
          {initialLoading ? (
            <div className="flex flex-col items-center justify-center h-[200px] gap-4">
              <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-lime-400 text-sm font-medium animate-pulse">
                Preparing your experience...
              </p>
            </div>
          ) : (
            <>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold transition-all text-center mb-2"
              >
                Create Account
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center text-gray-400 mb-6"
              >
                Register to access the platform
              </motion.p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Username */}
                  <div>
                    <label className="text-sm block mb-1">Username</label>
                    <input
                      {...register("username", {
                        required: "Username is required",
                      })}
                      placeholder="Choose a username"
                      className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
                      disabled={isLoading}
                    />
                    {errors.username && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.username.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm block mb-1">Email</label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/,
                          message: "Invalid email",
                        },
                      })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className="text-sm block mb-1">Contact Number</label>
                    <input
                      type="tel"
                      {...register("contactNumber", {
                        required: "Contact number is required",
                        minLength: { value: 7, message: "Too short" },
                        maxLength: { value: 15, message: "Too long" },
                      })}
                      placeholder="Enter your number"
                      className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
                      disabled={isLoading}
                    />
                    {errors.contactNumber && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.contactNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-sm block mb-1">Password</label>
                    <input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Minimum 6 characters",
                        },
                      })}
                      placeholder="Create a password"
                      className="w-full px-4 py-2 rounded-md bg-[#1a1a1a] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
                      disabled={isLoading}
                    />
                    {errors.password && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* reCAPTCHA */}
                <div className="flex justify-center">
                  <ReCAPTCHA
                    sitekey={siteKey}
                    ref={recaptchaRef}
                    className="mt-2 transform scale-90"
                  />
                </div>
                {captchaError && (
                  <p className="text-red-400 text-sm text-center mt-1">
                    {captchaError}
                  </p>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                  className="w-full py-3 bg-[#BAFF38] hover:bg-lime-300 text-black font-semibold rounded-full shadow-md disabled:opacity-60 transition"
                >
                  {isLoading ? "Registering..." : "Register"}
                </motion.button>
              </form>

              <Separator className="my-4 bg-gray-600" />

              {/* Social Auth Buttons */}
              {/* <div className="mt-6 flex flex-col gap-3">
                <button className="flex items-center justify-center gap-3 w-full py-3 border border-gray-700 rounded-full bg-[#1a1a1a] text-white hover:bg-[#111] transition">
                  <FaGoogle /> Register with Google
                </button>

                <button className="flex items-center justify-center gap-3 w-full py-3 border border-gray-700 rounded-full bg-[#1a1a1a] text-white hover:bg-[#111] transition">
                  <FaGithub /> Register with GitHub
                </button>
              </div> */}

              <p className="w-full text-center mt-1">
                Already have an account?{" "}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => navigate("/login")}
                  className="text-lime-400 cursor-pointer hover:underline"
                >
                  LogIn
                </motion.span>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
