import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // const handleGoogleLogin = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://randomstuff-bjgb.onrender.com/api/randomstuff/oauth/google/callback`
  //     );

  //     console.log(response.data);
  //   } catch (error) {
  //     console.log("Error Logging with Google  : ", error);
  //   }
  // };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://randomstuff-bjgb.onrender.com/api/randomstuff/auth/login",
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
        if (response.data.user.isVerified) {
          if (response.data.user.profileId) {
            navigate("/home");
          } else {
            navigate("/profile-create");
          }
        } else {
          navigate("/otp-verification");
        }
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
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-8 p-6">
        {/* Left Section */}
        <div className="space-y-6 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Dive Into RandomStuff <br />
            Build. Share. Repeat.
          </h1>
          <p className="text-gray-400 text-lg">
            Whether you're just starting out or shipping your 50th side project,
            RandomStuff is where devs hang out, collaborate, and grow.
            <br />
            Show off your work, explore ideas, and connect with builders like
            you.
          </p>
        </div>

        {/* Right Login Card with loader + animation */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl shadow-xl w-full min-h-[350px] transition-all flex flex-col justify-center"
        >
          {initialLoading ? (
            <div className="flex flex-col items-center justify-center h-[200px] gap-4">
              <div className="w-10 h-10 border-4 border-lime-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-lime-400 text-sm font-medium animate-pulse">
                Loading login form...
              </p>
            </div>
          ) : (
            <>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-2 transition-all"
              >
                Welcome Back, Builder 👋
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 mb-6"
              >
                Log in to manage your projects and keep building cool stuff.
              </motion.p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="text-sm mb-1 block">Email address</label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="you@example.com"
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-md bg-[#1a1a1a] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="text-sm mb-1 block">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                      })}
                      placeholder="••••••••"
                      disabled={loading}
                      className="w-full px-4 py-3 rounded-md bg-[#1a1a1a] border border-[#333] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-400"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: 0.6 }}
                  className="w-full py-3 rounded-full bg-[#BAFF38] hover:bg-lime-300 transition-all font-bold text-black shadow-md hover:shadow-lime-500/40 disabled:opacity-60"
                >
                  {loading ? "Logging in..." : "Login"}
                </motion.button>
              </form>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Separator className="my-4 bg-gray-600" />
              </motion.div>

              {/* <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex flex-col gap-3"
              >
                <button
                  onClick={() => {
                    handleGoogleLogin();
                  }}
                  className="flex items-center justify-center gap-3 w-full py-3 border border-gray-700 rounded-full bg-[#1a1a1a] text-white hover:bg-[#111] transition"
                >
                  <FaGoogle /> Login with Google
                </button>
                <button className="flex items-center justify-center gap-3 w-full py-3 border border-gray-700 rounded-full bg-[#1a1a1a] text-white hover:bg-[#111] transition">
                  <FaGithub /> Login with GitHub
                </button>
              </motion.div> */}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-2 text-sm text-center text-gray-400 space-y-2"
              >
                <p>
                  Don’t have an account?{" "}
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    onClick={() => navigate("/register")}
                    className="text-lime-400 cursor-pointer hover:underline"
                  >
                    Sign up
                  </motion.span>
                </p>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
