import AdminLoginPage from "@/components/Auth/AdminLoginPage";
import Login from "@/components/Auth/Login";
import OtpVerificationPage from "@/components/Auth/OtpVerificationPage";
import ProfileCreate from "@/components/Auth/ProfilePages/ProfileCreate";
import RegisterPage from "@/components/Auth/Register";
import AdminHomePage from "@/components/Pages/Adminhomepage";
import LandingPage from "@/components/Pages/LandingPage";
import SettingsPage from "@/components/Pages/SettingsPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/admin-login" element={<AdminLoginPage />} />
      <Route path="/admin-home" element={<AdminHomePage />} />
      <Route path="/profile-create" element={<ProfileCreate />} />
      <Route path="/otp-verification" element={<OtpVerificationPage />} />
    </Routes>
  );
};

export default AppRoutes;
