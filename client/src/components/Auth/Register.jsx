import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { Bounce, toast } from "react-toastify";

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
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

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
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Registration successful!", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error(response.data.message || "Registration failed.", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.response?.data?.message || "Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center relative overflow-hidden px-6">
      {/* Stars and background effects can go here */}

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
            <label
              htmlFor="username"
              className="block text-sm text-purple-200 mb-1"
            >
              Username
            </label>
            <input
              {...register("username", { required: "Username is required" })}
              id="username"
              className="w-full p-3 rounded-lg bg-gray-900 bg-opacity-30 text-white border border-purple-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Choose a username"
            />
            {errors.username && (
              <p className="text-red-400 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-purple-200 mb-1"
            >
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
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm text-purple-200 mb-1"
            >
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
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* reCAPTCHA */}
          <div className="w-full flex flex-col items-center justify-center">
            <ReCAPTCHA sitekey={siteKey} ref={recaptchaRef} className="mt-3" />
            {captchaError && (
              <p className="text-red-400 text-sm mt-1">{captchaError}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <span>Registering...</span>
              </div>
            ) : (
              "Register"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
