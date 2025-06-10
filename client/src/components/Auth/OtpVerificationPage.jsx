import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const OtpVerificationPage = () => {
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleRequestOtp = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/randomstuff/auth/requestOtp`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success("OTP sent to email successfully.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setStep(1);
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move focus to next box if digit entered
      if (value !== "" && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
      // Move back if empty and index > 0
      if (value === "" && index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        if (prevInput) prevInput.focus();
      }
    }
  };

  const handleVerify = async () => {
    const enteredOtp = Number(otp.join(""));
    try {
      const response = await axios.post(
        `http://localhost:3000/api/randomstuff/auth/verifyOtp`,
        { otp: enteredOtp },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("response", response.data);
      if (response.data.success) {
        toast.success("OTP verified successfully.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("Invalid OTP. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("Error", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black relative overflow-hidden">
      {/* Background Orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0, -10, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        className="absolute top-10 left-10 w-40 h-40 bg-purple-700 rounded-full opacity-20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, -15, 0, 15, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-20 right-20 w-56 h-56 bg-indigo-600 rounded-full opacity-30 blur-3xl"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/5 border border-purple-500 bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center"
      >
        <h1 className="text-2xl font-semibold text-white mb-4">
          OTP Verification
        </h1>
        <p className="text-gray-300 text-center mb-6">
          {step === 0
            ? "Click below to request an OTP for verification."
            : "Please enter the 6-digit OTP sent to your email or phone."}
        </p>

        {step === 0 ? (
          <Button
            onClick={handleRequestOtp}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Request OTP
          </Button>
        ) : (
          <>
            {/* OTP Boxes */}
            <div className="flex justify-between gap-2 mb-4">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  className="w-12 h-12 text-center text-lg font-semibold text-black bg-white"
                />
              ))}
            </div>

            <Button
              onClick={handleVerify}
              className="bg-indigo-600 hover:bg-indigo-700 text-white w-full"
            >
              Verify OTP
            </Button>

            <p className="text-gray-400 text-sm mt-4">
              Didn’t receive the OTP?{" "}
              <button
                onClick={() => toast.info("Resending OTP...")}
                className="text-indigo-400 hover:underline"
              >
                Resend
              </button>
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default OtpVerificationPage;
