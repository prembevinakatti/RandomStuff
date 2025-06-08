import Login from "@/components/Auth/Login";
import RegisterPage from "@/components/Auth/Register";
import LandingPage from "@/components/Pages/LandingPage";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />


    </Routes>
  );
};

export default AppRoutes;
