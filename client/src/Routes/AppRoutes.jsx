import AdminLoginPage from "@/components/Auth/Adminloginpage";
import Login from "@/components/Auth/Login";
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
      <Route path="/adminloginpage" element={<AdminLoginPage />} />
      <Route path="/adminhomepage" element={<AdminHomePage />} />



    </Routes>
  );
};

export default AppRoutes;
