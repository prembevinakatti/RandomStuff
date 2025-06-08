import Login from "@/components/Auth/Login";
import RegisterPage from "@/components/Auth/Register";
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


    </Routes>
  );
};

export default AppRoutes;
