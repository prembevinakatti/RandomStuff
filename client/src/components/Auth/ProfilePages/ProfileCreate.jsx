import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const steps = ["Address", "Profession", "Social"];

const ProfileCreate = () => {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    contactno: "",
    profileimage: "",
    address: { city: "", state: "", country: "", pincode: "" },
    professioninfo: {
      occupation: "",
      organization: "",
      experience: "",
      skills: "",
      education: "",
    },
    social: { linkedin: "", github: "", portfolio: "" },
    projects: { totalprojects: "", projectsforshowcase: "" },
  });

  const handleChange = (e, nestedKey) => {
    const { name, value } = e.target;
    if (nestedKey) {
      setFormData((prev) => ({
        ...prev,
        [nestedKey]: { ...prev[nestedKey], [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSkip = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/profile", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response.data);
      toast.success("Profile created successfully!");
    } catch (error) {
      console.log("Error creating profile: ", error);
      toast.error("Failed to create profile.");
    }
  };

  const renderStep = () => {
    const inputClass =
      "w-full p-3 rounded-lg bg-gray-900 bg-opacity-30 text-white border border-sky-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-300";

    switch (step) {
      case 0:
        return (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.address.city}
              onChange={(e) => handleChange(e, "address")}
              className={inputClass}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.address.state}
              onChange={(e) => handleChange(e, "address")}
              className={inputClass}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.address.country}
              onChange={(e) => handleChange(e, "address")}
              className={inputClass}
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.address.pincode}
              onChange={(e) => handleChange(e, "address")}
              className={inputClass}
            />
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="occupation"
              placeholder="Occupation"
              value={formData.professioninfo.occupation}
              onChange={(e) => handleChange(e, "professioninfo")}
              className={inputClass}
            />
            <input
              type="text"
              name="organization"
              placeholder="Organization"
              value={formData.professioninfo.organization}
              onChange={(e) => handleChange(e, "professioninfo")}
              className={inputClass}
            />
            <input
              type="text"
              name="experience"
              placeholder="Experience"
              value={formData.professioninfo.experience}
              onChange={(e) => handleChange(e, "professioninfo")}
              className={inputClass}
            />
            <input
              type="text"
              name="skills"
              placeholder="Skills"
              value={formData.professioninfo.skills}
              onChange={(e) => handleChange(e, "professioninfo")}
              className={inputClass}
            />
            <input
              type="text"
              name="education"
              placeholder="Education"
              value={formData.professioninfo.education}
              onChange={(e) => handleChange(e, "professioninfo")}
              className={inputClass}
            />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn"
              value={formData.social.linkedin}
              onChange={(e) => handleChange(e, "social")}
              className={inputClass}
            />
            <input
              type="text"
              name="github"
              placeholder="GitHub"
              value={formData.social.github}
              onChange={(e) => handleChange(e, "social")}
              className={inputClass}
            />
            <input
              type="text"
              name="portfolio"
              placeholder="Portfolio"
              value={formData.social.portfolio}
              onChange={(e) => handleChange(e, "social")}
              className={inputClass}
            />
          </div>
        );

      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden p-8">
      {/* 🔵 Animated Blurry Blue Blob (Top Left) */}
      <motion.div
        className="absolute rounded-full bg-sky-500 blur-3xl opacity-50"
        style={{
          width: "400px",
          height: "400px",
          top: "-100px",
          left: "-100px",
        }}
        animate={{
          x: [0, 100, -100, 0],
          y: [0, 100, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* 🔵 Animated Blurry Blue Blob (Bottom Right) */}
      <motion.div
        className="absolute rounded-full bg-sky-700 blur-3xl opacity-60"
        style={{
          width: "300px",
          height: "300px",
          bottom: "-50px",
          right: "-50px",
        }}
        animate={{
          x: [0, -80, 80, 0],
          y: [0, -80, 80, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-transparent border border-sky-300 backdrop-blur-md p-6 rounded-xl w-full max-w-md shadow-[0_0_20px_rgba(0,191,255,0.6)]"
      >
        <h2 className="text-xl font-bold mb-4 text-center">{steps[step]}</h2>
        {renderStep()}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleSkip}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded transition"
          >
            {step === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </motion.div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default ProfileCreate;
