import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const SettingsPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const {
    register,
    handleSubmit,
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
      await axios.post(
        `https://randomstuff-bjgb.onrender.com/api/randomstuff/auth/changePassword`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      alert("Password changed successfully!");
      reset();
    } catch (error) {
      alert("Error changing password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10  text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl p-8 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-md"
      >
        <h1 className="text-3xl font-bold text-center text-lime-400 mb-10">
          Settings
        </h1>

        <div className="space-y-10">
          {/* Change Password Section */}
          <div className="flex justify-between items-start border-b border-white/10 pb-6">
            <div>
              <h2 className="text-lg font-semibold">Change Password</h2>
              <p className="text-sm text-gray-400">
                Update your password regularly to keep your account secure.
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <button className="px-5 py-2 rounded-full font-semibold text-black bg-lime-400 hover:bg-lime-300 transition">
                  Change
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#1a1a1a] text-white rounded-lg p-6 shadow-xl max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">
                    Change Password
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-400">
                    Enter your current and new password.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-4 space-y-4"
                >
                  <input
                    type="password"
                    placeholder="Current Password"
                    {...register("currentPassword", { required: true })}
                    className="w-full px-4 py-2 bg-[#2c2c2c] text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                  {errors.currentPassword && (
                    <p className="text-sm text-red-400">
                      Current password is required.
                    </p>
                  )}

                  <input
                    type="password"
                    placeholder="New Password"
                    {...register("newPassword", {
                      required: true,
                      minLength: 6,
                    })}
                    className="w-full px-4 py-2 bg-[#2c2c2c] text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                  {errors.newPassword && (
                    <p className="text-sm text-red-400">
                      New password must be at least 6 characters.
                    </p>
                  )}

                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    {...register("confirmNewPassword", { required: true })}
                    className="w-full px-4 py-2 bg-[#2c2c2c] text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                  {errors.confirmNewPassword && (
                    <p className="text-sm text-red-400">
                      Please confirm your new password.
                    </p>
                  )}

                  <DialogFooter className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-lime-400 hover:bg-lime-300 text-black font-semibold rounded-full transition"
                    >
                      Save
                    </button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Notifications Toggle */}
          <div className="flex justify-between items-center border-b border-white/10 pb-6">
            <div>
              <h2 className="text-lg font-semibold">Notifications</h2>
              <p className="text-sm text-gray-400">
                Toggle in-app alerts and reminders.
              </p>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-16 h-9 rounded-full px-1 flex items-center transition-colors duration-300 ${
                notificationsEnabled ? "bg-lime-400" : "bg-gray-600"
              }`}
            >
              <span
                className={`w-7 h-7 rounded-full bg-white shadow-md transform transition-transform ${
                  notificationsEnabled ? "translate-x-7" : "translate-x-0"
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
