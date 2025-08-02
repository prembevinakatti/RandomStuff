import Login from "@/components/Auth/Login";
import OtpVerificationPage from "@/components/Auth/OtpVerificationPage";
import ProfileCreate from "@/components/Auth/ProfilePages/ProfileCreate";
import RegisterPage from "@/components/Auth/Register";
import UploadProjectForm from "@/components/Forms/UploadProjectForm";
import AdminHomePage from "@/components/Pages/Adminhomepage";
import ExploreProjectsPage from "@/components/Pages/ExploreProjectsPage";
import LandingPage from "@/components/Pages/LandingPage";
import ProfilePage from "@/components/Pages/ProfilePage";
import SettingsPage from "@/components/Pages/SettingsPage";
import UserHomePage from "@/components/Pages/UserHomePage";
import ProjectDetails from "@/components/utils/ProjectDetails";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/admin-home" element={<AdminHomePage />} />
      <Route path="/profile-create" element={<ProfileCreate />} />
      <Route path="/otp-verification" element={<OtpVerificationPage />} />
      <Route path="/home" element={<UserHomePage />} />
      <Route path="/upload" element={<UploadProjectForm />} />
      <Route path="/explore" element={<ExploreProjectsPage />} />
      <Route path="/projectDetails/:projectId" element={<ProjectDetails />} />
      <Route path="/profile-page" element={<ProfilePage />} />
    </Routes>
  );
};

export default AppRoutes;
