import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import useGetAllProjects from "@/hooks/useGetAllProjects";
import { useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ExploreProjectsPage = () => {
  const { projects, loading, error } = useGetAllProjects();
  console.log(projects);

  const navigate = useNavigate();

  const handleProjectClick = (projectid) => {
    navigate(`/projectDetails/${projectid}`);
  };

  return (
    <div className="min-h-screen text-white px-6 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-lime-400 mb-4">
          Explore Creative Projects
        </h1>
        <p className="text-gray-300 text-lg sm:text-xl">
          Dive into a collection of innovative student-made applications,
          portfolios, and tech experiments.
        </p>
      </motion.div>

      {/* Loading and Error */}
      {loading && (
        <p className="text-center text-gray-400 mt-12">Loading projects...</p>
      )}
      {error && <p className="text-center text-red-400 mt-12">{error}</p>}

      {/* Project Grid */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
        >
          {projects?.length > 0 ? (
            [...projects]
              .reverse()
              .map((project, index) => (
                <ProjectCard
                  key={index}
                  project={project}
                  onClick={() => handleProjectClick(project._id)}
                />
              ))
          ) : (
            <p className="text-center col-span-3 text-gray-400">
              No projects found.
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

const ProjectCard = ({ project, onClick }) => {
  const images = project.projectImages || [];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <div
      onClick={onClick}
      className="bg-white/5 border cursor-pointer border-white/10 rounded-xl p-5 shadow-lg hover:shadow-lime-500/10 transition-all duration-300"
    >
      {/* User Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={
            project.userId.profileId.profileimage ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt={project?.userId?.username || "Anonymous"}
          className="w-10 h-10 rounded-full border border-white/20 object-cover"
        />
        <div>
          <p className="font-semibold text-white">
            {project.userId?.username || "Anonymous"}{" "}
          </p>
          <p className="text-xs text-gray-400">
            {project?.userId?.profileId?.professioninfo?.occupation}
          </p>
        </div>
      </div>

      {/* Auto Slider */}
      {images.length > 0 && (
        <div className="mb-4 rounded-md overflow-hidden">
          <Slider {...sliderSettings}>
            {images.map((img, idx) => (
              <div key={idx}>
                <img
                  src={img}
                  alt={`project-img-${idx}`}
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Project Details */}
      <h2 className="text-xl font-semibold text-lime-300 mb-2">
        {project.projectTitle}
      </h2>
      <p className="text-sm text-gray-400">{project.projectDescription}</p>
    </div>
  );
};

export default ExploreProjectsPage;
