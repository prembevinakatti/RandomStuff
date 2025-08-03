import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const steps = ["address", "professioninfo", "social"];

const techOptions = [
  "JavaScript",
  "React",
  "Node.js",
  "MongoDB",
  "Python",
  "TypeScript",
  "Tailwind CSS",
  "Docker",
  "Kubernetes",
  "PostgreSQL",
  "GraphQL",
  "Next.js",
  "Express.js",
  "Vue.js",
  "Angular",
  "Java",
  "Spring Boot",
  "Firebase",
  "AWS",
  "Azure",
  "SASS/SCSS",
  "Redis",
  "MySQL",
  "CI/CD",
  "Jenkins",
  "Git",
  "Figma",
  "Linux",
  "Nginx",
  "WebSockets",
  "Webpack",
  "Babel",
  "Prisma",
  "Supabase",
  "Vite",
  "Flutter",
  "Django",
  "Flask",
  "Ruby on Rails",
  "Other",
];

const filterEmptyFields = (obj) => {
  const cleaned = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      const nested = filterEmptyFields(value);
      if (Object.keys(nested).length > 0) cleaned[key] = nested;
    } else if (value !== "") {
      cleaned[key] = value;
    }
  });
  return cleaned;
};

const ProfileCreate = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contactno: "",
    profileimage: "",
    address: { city: "", state: "", country: "", pincode: "" },
    professioninfo: {
      occupation: "",
      organization: "",
      experience: "",
      skills: [], // array now
      education: "",
    },
    social: { linkedin: "", github: "", portfolio: "" },
    projects: { totalprojects: "", projectsforshowcase: "" },
  });

  const handleChange = (e, nestedKey) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [nestedKey]: { ...prev[nestedKey], [name]: value },
    }));
  };

  const handleAddSkill = (skill) => {
    if (!formData.professioninfo.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        professioninfo: {
          ...prev.professioninfo,
          skills: [...prev.professioninfo.skills, skill],
        },
      }));
    }
  };

  const handleRemoveSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      professioninfo: {
        ...prev.professioninfo,
        skills: prev.professioninfo.skills.filter((s) => s !== skill),
      },
    }));
  };

  const handleSkip = () => {
    if (step < steps.length - 1) setStep((prev) => prev + 1);
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
      const cleaned = filterEmptyFields({
        ...formData,
        professioninfo: {
          ...formData.professioninfo,
          skills: formData.professioninfo.skills.join(", "),
        },
      });

      const response = await axios.post(
        "https://randomstuff-bjgb.onrender.com/api/randomstuff/profile/createProfile",
        { data: cleaned },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Profile created successfully!");
        setTimeout(() => navigate("/home"), 2000);
      }
    } catch (error) {
      toast.error("Failed to create profile.");
      console.log("Error in Profile Creation : ", error);
    }
  };

  const inputClass =
    "w-full px-4 py-2 rounded-md bg-zinc-800 text-white border border-white/10";

  const renderStep = () => {
    const currentKey = steps[step];
    return (
      <div className="space-y-4">
        {Object.entries(formData[currentKey]).map(([field, value]) => {
          if (currentKey === "professioninfo" && field === "skills") {
            return (
              <div key={field}>
                <label className="text-sm text-gray-300 mb-1 block capitalize">
                  {field}
                </label>
                <Select onValueChange={handleAddSkill}>
                  <SelectTrigger className="w-full bg-black/5 text-white border-white/10">
                    <SelectValue placeholder="Select a skill" />
                  </SelectTrigger>
                  <SelectContent className="bg-black text-white border-white/10">
                    {techOptions.map((skill) => (
                      <SelectItem
                        key={skill}
                        value={skill}
                        className="hover:bg-lime-400 hover:text-black cursor-pointer"
                      >
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {value.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {value.map((skill) => (
                      <span
                        key={skill}
                        className="bg-lime-400 text-black px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="text-black hover:text-red-600 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          if (field === "experience") {
            return (
              <div key={field}>
                <label className="text-sm text-gray-300 mb-1 block capitalize">
                  {field}
                </label>
                <select
                  name={field}
                  value={value}
                  onChange={(e) => handleChange(e, currentKey)}
                  className={inputClass}
                >
                  <option value="">Select Experience</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
            );
          }

          return (
            <div key={field}>
              <label className="text-sm text-gray-300 mb-1 block capitalize">
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={value}
                onChange={(e) => handleChange(e, currentKey)}
                className={inputClass}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center py-16 justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        {/* Step indicator */}
        <div className="flex justify-center mb-6 gap-2">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition ${
                i === step ? "bg-lime-400 scale-110" : "bg-gray-600"
              }`}
            />
          ))}
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">
          Step {step + 1} of {steps.length}:{" "}
          <span className="text-lime-400 capitalize">{steps[step]}</span>
        </h2>

        {renderStep()}

        <div className="flex justify-between mt-6">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            Skip
          </Button>
          <Button
            onClick={handleNext}
            className="bg-lime-400 hover:bg-lime-300 text-black font-semibold shadow-md"
          >
            {step === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </motion.div>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default ProfileCreate;
