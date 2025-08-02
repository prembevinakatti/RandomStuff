import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const techOptions = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "Tailwind CSS",
  "Next.js",
  "TypeScript",
  "Firebase",
  "Python",
  "Django",
  "Solidity",
  "Ethers.js",
  "Web3",
  "Ethereum",
];

const UploadProjectForm = () => {
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mdValue, setMdValue] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [description, setDescription] = useState("");
  const maxChars = 250;
  const navigate = useNavigate();

  const handleDescriptionChange = (e) => {
    const input = e.target.value;
    if (input.length <= maxChars) {
      setDescription(input);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setFormError("");
    setImageError("");
    setIsSubmitting(true);

    if (images.length < 3 || images.length > 10) {
      setImageError("Please upload between 3 and 10 images.");
      setIsSubmitting(false);
      return;
    }

    if (!mdValue || mdValue.trim().length === 0) {
      setError("projectSummary", {
        type: "manual",
        message: "Project summary is required.",
      });
      setIsSubmitting(false);
      return;
    } else {
      clearErrors("projectSummary");
    }

    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));

    try {
      const res = await fetch(
        "http://localhost:3000/api/pinata/upload/upload-images",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await res.json();

      if (!result.success) {
        throw new Error("Image upload failed. Please try again.");
      }

      const payload = {
        projectTitle: data.projectTitle,
        projectSummary: mdValue,
        projectDescription: data.projectDescription,
        githubLink: data.githubLink,
        previewLink: data.previewLink,
        projectTechnologies: selectedTechs,
        projectImages: result.imageUrls,
      };

      const response = await axios.post(
        "http://localhost:3000/api/randomstuff/project/uploadProject",
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
        navigate("/explore");
        reset();
        setMdValue("");
        setSelectedTechs([]);
        setImages([]);
        setImageError("");
        setFormError("");
        setIsPreview(false);
      } else {
        toast.error("Error uploading the Project", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      setFormError(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectTech = (e) => {
    const selected = e.target.value;
    if (selected && !selectedTechs.includes(selected)) {
      setSelectedTechs((prev) => [...prev, selected]);
    }
    e.target.selectedIndex = 0;
  };

  const handleRemoveTech = (tech) => {
    setSelectedTechs((prev) => prev.filter((t) => t !== tech));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length < 3 || files.length > 10) {
      setImageError("You must upload at least 3 and at most 10 images.");
    } else {
      setImageError("");
    }
    setImages(files);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl p-8 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl text-white"
      >
        <h1 className="text-3xl font-bold text-center text-lime-400 mb-8">
          Upload Your Project
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Project Title */}
          <div>
            <input
              type="text"
              placeholder="Project Title"
              {...register("projectTitle", { required: true })}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-md text-white placeholder-gray-400"
            />
            {errors.projectTitle && (
              <p className="text-sm text-red-400 mt-1">Title is required.</p>
            )}
          </div>

          {/* GitHub URL */}
          <div>
            <input
              type="url"
              placeholder="GitHub URL"
              {...register("githubLink")}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-md text-white placeholder-gray-400"
            />
          </div>

          {/* Live Preview URL */}
          <div>
            <input
              type="url"
              placeholder="Live Preview URL"
              {...register("previewLink")}
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-md text-white placeholder-gray-400"
            />
          </div>

          {/* Tech + Image Upload */}
          <div className="col-span-full sm:col-span-2 lg:col-span-3 grid sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              {/* Tech Stack */}
              <div>
                <label className="text-sm text-gray-300 mb-1 block">
                  Select Tech Stack
                </label>
                <select
                  onChange={handleSelectTech}
                  className="w-full px-4 py-2 bg-black border border-white/10 rounded-md text-white"
                >
                  <option value="">-- Select Tech --</option>
                  {techOptions.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
                {selectedTechs.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTechs.map((tech) => (
                      <span
                        key={tech}
                        className="bg-lime-400 text-black px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => handleRemoveTech(tech)}
                          className="text-black hover:text-red-600 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-sm text-gray-300 mb-2 block">
                  Upload 3–10 Project Images
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 bg-black/30 text-white border border-white/10 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-lime-400 file:text-black hover:file:bg-lime-300"
                />
                {imageError && (
                  <p className="text-sm text-red-400 mt-1">{imageError}</p>
                )}
              </div>
            </div>

            {/* Description */}
            {/* Description */}
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Project Description{" "}
                <span className="text-xs text-gray-400">
                  (max 500 characters)
                </span>
              </label>
              <textarea
                {...register("projectDescription", {
                  required: true,
                  maxLength: {
                    value: maxChars,
                    message: "Description must be 500 characters or less.",
                  },
                })}
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Describe your project here..."
                className="w-full h-[140px] px-4 py-3 bg-black/30 border border-white/10 rounded-md text-white placeholder-gray-400 resize-none"
              />
              <div className="text-xs text-gray-400 mt-1 text-right">
                {description.length} / {maxChars} characters
              </div>

              {errors.projectDescription && (
                <p className="text-sm text-red-400 mt-1">
                  {errors.projectDescription.message ||
                    "Description is required."}
                </p>
              )}
            </div>
          </div>

          {/* Markdown Editor */}
          <div className="col-span-full">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-300">
                README.md (Markdown Supported)
              </label>
              <button
                type="button"
                onClick={() => setIsPreview(!isPreview)}
                className="text-sm text-lime-400 hover:text-lime-300"
              >
                {isPreview ? "Edit" : "Preview"}
              </button>
            </div>

            <div className="bg-black/30 border border-white/10 rounded-md">
              {isPreview ? (
                <div className="p-2 h-[500px] overflow-auto">
                  <MDEditor.Markdown
                    source={mdValue || "*Nothing to preview*"}
                  />
                </div>
              ) : (
                <div className="p-2">
                  <MDEditor
                    value={mdValue}
                    onChange={setMdValue}
                    height={350}
                  />
                </div>
              )}
            </div>

            {errors.projectSummary && (
              <p className="text-sm text-red-400 mt-1">
                {errors.projectSummary.message}
              </p>
            )}
          </div>

          {/* General Error */}
          {formError && (
            <p className="col-span-full text-sm text-red-400 text-center mt-2">
              {formError}
            </p>
          )}

          {/* Submit Button */}
          <div className="col-span-full pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-lime-400 hover:bg-lime-300 text-black font-bold rounded-full transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                "Submit Project"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UploadProjectForm;
