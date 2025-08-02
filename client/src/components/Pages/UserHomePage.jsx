import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import useGetAllProjects from "@/hooks/useGetAllProjects";

const UserHomePage = () => {
  const { projects, loading, error } = useGetAllProjects();
  const navigate = useNavigate();

  const featuredProjects = useMemo(() => {
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [projects]);

  console.log(featuredProjects);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleNavigate = (projId) => {
    navigate(`/projectDetails/${projId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 md:px-10 py-15 font-sans">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center space-y-6 mb-16">
        <h1 className="text-4xl md:text-6xl mt-3 font-extrabold tracking-tight leading-tight">
          Welcome Back, <span className="text-[#BAFF38]">Creator</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Ready to build something new or explore others' work?
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/upload"
            className="px-6 py-3 bg-[#BAFF38] hover:bg-lime-300 text-black font-semibold rounded-full transition"
          >
            Upload Your Project
          </Link>
          <Link
            to="/explore"
            className="px-6 py-3 border border-gray-700 rounded-full hover:bg-gray-800 transition"
          >
            Browse Projects
          </Link>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-20">
        {featuredProjects.map((proj) => (
          <motion.div
            onClick={() => handleNavigate(proj._id)}
            key={proj.id}
            className="bg-[#111] border cursor-pointer border-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={proj.projectImages?.[0]}
              alt={proj.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{proj.projectTitle}</h3>
              <p className="text-sm text-gray-500">by {proj.userId.username}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Continue Building Section */}
      <section className="text-center max-w-xl mx-auto mb-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Continue Building Your Ideas
        </h2>
        <p className="text-gray-400 mb-6">
          Pick up where you left off or get inspired by trending tech projects.
        </p>
        <Link
          to="/profile-page"
          className="bg-[#BAFF38] text-black px-6 py-3 rounded-full font-semibold hover:bg-lime-300 transition"
        >
          Go to My Projects
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-sm text-gray-600 text-center">
        © {new Date().getFullYear()} ProjectVerse • Built with ❤️ by Onkar
      </footer>
    </div>
  );
};

export default UserHomePage;
