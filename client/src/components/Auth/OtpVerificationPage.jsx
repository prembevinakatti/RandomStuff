import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OtpVerificationPage = () => {
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [resendTimer, setResendTimer] = useState(0);
  const navigate = useNavigate();

  const handleRequestOtp = async () => {
    setIsRequestingOtp(true);
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
        toast.success("OTP sent to email successfully.");
        setStep(1);
        setResendTimer(60);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsRequestingOtp(false);
    }
  };

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
      if (value === "" && index > 0) {
        document.getElementById(`otp-${index - 1}`)?.focus();
      }
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
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
      if (response.data.success) {
        toast.success("OTP verified successfully.");
        if (user.profileId) {
          navigate("/home");
        } else {
          navigate("/profile-create");
        }
      }
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold text-lime-400 text-center mb-3">
          {step === 0 ? "Request OTP" : "Verify OTP"}
        </h2>
        <p className="text-gray-300 text-sm text-center mb-6">
          {step === 0
            ? "Click the button below to request an OTP."
            : "Enter the 6-digit OTP sent to your registered email."}
        </p>

        {step === 0 ? (
          <Button
            onClick={handleRequestOtp}
            disabled={isRequestingOtp}
            className="w-full py-3 rounded-lg bg-lime-400 hover:bg-lime-300 text-black font-semibold"
          >
            {isRequestingOtp ? "Sending..." : "Send OTP"}
          </Button>
        ) : (
          <>
            <div className="flex justify-between gap-2 mb-6">
              {otp.map((digit, i) => (
                <Input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, i)}
                  className="w-12 h-12 text-center text-lg font-semibold text-black bg-white rounded-md"
                />
              ))}
            </div>

            <Button
              onClick={handleVerify}
              disabled={isVerifying}
              className="w-full py-3 rounded-lg bg-lime-400 hover:bg-lime-300 text-black font-semibold"
            >
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </Button>

            <p className="text-sm text-gray-400 text-center mt-4">
              Didn't get the OTP?{" "}
              {resendTimer > 0 ? (
                <span className="text-lime-300 font-semibold">
                  Resend in {resendTimer}s
                </span>
              ) : (
                <button
                  className="text-lime-300 cursor-pointer hover:underline"
                  onClick={handleRequestOtp}
                  disabled={isRequestingOtp}
                >
                  Resend
                </button>
              )}
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default OtpVerificationPage;
