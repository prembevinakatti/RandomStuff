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
              className="p-2 rounded text-white placeholder:text-white border border-purple-500"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.address.state}
              onChange={(e) => handleChange(e, "address")}
              className="p-2 rounded text-white placeholder:text-white border border-purple-500"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.address.country}
              onChange={(e) => handleChange(e, "address")}
              className="p-2 rounded text-white placeholder:text-white border border-purple-500"
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.address.pincode}
              onChange={(e) => handleChange(e, "address")}
              className="p-2 rounded text-white placeholder:text-white border border-purple-500"
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
              className="p-2 rounded text-white placeholder:text-white border border-purple-500"
            />
            <input
              type="text"
              name="organization"
              placeholder="Organization"
              value={formData.professioninfo.organization}
              onChange={(e) => handleChange(e, "professioninfo")}
              className="p-2 rounded text-white placeholder:text-white border border-purple-500"
            />
            <input
              type="text"
              name="experience"
              placeholder="Experience"
              value={formData.professioninfo.experience}
              onChange={(e) => handleChange(e, "professioninfo")}
              className="p-2 rounded text-white placeholder:text-white border border-purple-500"
            />
            <input
              type="text"
              name="skills"
              placeholder="Skills"
              value={formData.professioninfo.skills}
              onChange={(e) => handleChange(e, "professioninfo")}
              className="p-2 rounded text-white placeholder:text-white border border-purple-500"
            />
            <input
              type="text"
              name="education"
              placeholder="Education"
              value={formData.professioninfo.education}
              onChange={(e) => handleChange(e, "professioninfo")}
              className="p-2 rounded text-white placeholder:text-white border border-purple-500"
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
              className="p-2 rounded text-white placeholder:text-white border border-purple-500"
            />
            <input
              type="text"
              name="github"
              placeholder="GitHub"
              value={formData.social.github}
              onChange={(e) => handleChange(e, "social")}
              className="p-2 rounded text-white placeholder:text-white border border-purple-500"
            />
            <input
              type="text"
              name="portfolio"
              placeholder="Portfolio"
              value={formData.social.portfolio}
              onChange={(e) => handleChange(e, "social")}
              className="p-2 rounded text-white placeholder:text-white border border-purple-500"
            />
          </div>
        );

      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center justify-center relative p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/5 border border-purple-500 p-6 rounded-xl w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4 text-center">{steps[step]}</h2>
        {renderStep()}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleSkip}
            className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 transition"
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
