import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import axios from "axios";

const starsArray = Array(60).fill(0);

const SettingsPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { currentPassword, newPassword, confirmNewPassword } = data;

    if (newPassword !== confirmNewPassword) {
      alert("New password and confirmation do not match");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/randomstuff/auth/changePassword`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      alert("Password changed successfully!");
      reset(); // reset form fields
    } catch (error) {
      console.log("Error changing password in frontend:", error);
      alert("Error changing password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center relative overflow-hidden px-6 py-12">
      {/* Stars Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5 absolute inset-0"
          style={{
            animationDuration: "12s",
            animationDirection: "reverse",
            animationIterationCount: "infinite",
            animationName: "pulse",
          }}
        />
        <div className="absolute inset-0 pointer-events-none">
          {starsArray.map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.3, scale: 1, filter: "brightness(1)" }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
                filter: ["brightness(1)", "brightness(2.5)", "brightness(1)"],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 6,
                ease: "easeInOut",
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
      </div>

      {/* Floating Orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 15, 0, -15, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-28 h-28 bg-purple-600 rounded-full opacity-40 blur-2xl mix-blend-screen"
      />
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 15, 0, -15, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-28 right-20 w-40 h-40 bg-indigo-600 rounded-full opacity-30 blur-3xl mix-blend-screen"
      />
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 15, 0, -15, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-48 right-32 w-32 h-32 bg-pink-600 rounded-full opacity-20 blur-2xl mix-blend-screen"
      />

      {/* Settings Panel */}
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-2xl bg-gray-900 bg-opacity-80 rounded-xl mt-10 p-8 shadow-lg"
      >
        <h1 className="text-3xl font-extrabold mb-6 text-purple-400 text-center drop-shadow-lg">
          Settings
        </h1>

        <div className="space-y-6">
          {/* Password */}
          <div className="flex items-center justify-between border-b border-gray-700 pb-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-medium">Password</h2>
              <p className="text-gray-400 text-sm">
                Update your password for security.
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition">
                  Change
                </button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 rounded-lg p-6 max-w-md mx-auto shadow-lg">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-white mb-2">
                    Change Your Password
                  </DialogTitle>
                  <DialogDescription className="text-gray-400 mb-6">
                    Enter your current password and choose a new one.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="password"
                    placeholder="Current Password"
                    {...register("currentPassword", { required: true })}
                    className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {errors.currentPassword && (
                    <span className="text-red-400 text-sm">
                      Current password is required
                    </span>
                  )}
                  <input
                    type="password"
                    placeholder="New Password"
                    {...register("newPassword", {
                      required: true,
                      minLength: 6,
                    })}
                    className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {errors.newPassword && (
                    <span className="text-red-400 text-sm">
                      New password is required (min 6 chars)
                    </span>
                  )}
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    {...register("confirmNewPassword", { required: true })}
                    className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {errors.confirmNewPassword && (
                    <span className="text-red-400 text-sm">
                      Confirmation is required
                    </span>
                  )}
                  <DialogFooter className="flex justify-end mt-4 gap-2">
                    <button
                      type="submit"
                      className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
                    >
                      Save
                    </button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between border-b border-gray-700 pb-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-medium">Notifications</h2>
              <p className="text-gray-400 text-sm">
                Toggle notifications on or off.
              </p>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-14 h-8 rounded-full flex items-center transition-colors duration-300 focus:outline-none ${
                notificationsEnabled ? "bg-purple-600" : "bg-gray-600"
              }`}
            >
              <span
                className={`inline-block w-6 h-6 transform bg-white rounded-full shadow-md transition-transform ${
                  notificationsEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
