import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaGithub, FaShareAlt } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "github-markdown-css/github-markdown-dark.css";
import "highlight.js/styles/github-dark.css"; // For syntax highlighting
import useGetComments from "@/hooks/useGetComments";
import { FaLinkedin } from "react-icons/fa";
import { socket } from "@/socket";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const { user } = useSelector((store) => store.auth);
  // const [comments, setComments] = useState([]);

  const comments = useGetComments(projectId);

  useEffect(() => {
    const handleLikeUpdate = (data) => {
      console.log(data);
      if (data?.projectId === projectId) {
        setLikesCount(data.totalLikes);
      }
    };
    socket.on("projectLikeUpdated", handleLikeUpdate);

    return () => {
      socket.off("projectLikeUpdated", handleLikeUpdate);
    };
  }, [projectId]);

  useEffect(() => {
    const fetchInitialComments = async () => {
      try {
        const res = await axios.get(
          `https://randomstuff-bjgb.onrender.com/api/randomstuff/comment/${projectId}`,
          { withCredentials: true }
        );
        setComments(res.data.comments);
      } catch (error) {
        console.log("Failed to get initial comments:", error.message);
      }
    };

    fetchInitialComments();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const res = await axios.get(
        `https://randomstuff-bjgb.onrender.com/api/randomstuff/project/getProjectById/${projectId}`,
        { withCredentials: true }
      );
      const proj = res.data.project;
      setProject(proj);
      setLikesCount(proj.likes.length);
      setLiked(proj.likes.includes(user._id));
    } catch (error) {
      console.error("Failed to fetch project:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(comments);

  const toggleLike = async () => {
    try {
      const res = await axios.put(
        `https://randomstuff-bjgb.onrender.com/api/randomstuff/project/likeUnlike/${projectId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.liked !== undefined) {
        setLiked(res.data.liked);
      }
    } catch (error) {
      console.error("Failed to like/unlike project:", error.message);
    }
  };

  const handleComment = async () => {
    const trimmedComment = input.trim();
    if (!trimmedComment) return;

    try {
      const response = await axios.post(
        `https://randomstuff-bjgb.onrender.com/api/randomstuff/comment/addComment`,
        {
          projectId: projectId,
          commentedUser: user._id,
          commentText: trimmedComment,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const newComment = response.data.comment;

      // setComments((prev) => [
      //   ...prev,
      //   {
      //     ...newComment,
      //     commentedUser: {
      //       username: user.username,
      //       _id: user._id,
      //     },
      //   },
      // ]);
      setInput("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: project.projectTitle,
      text: "Check out this awesome project!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Share failed:", error.message);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <p className="w-screen h-screen text-center text-gray-400 mt-20">
        Loading project...
      </p>
    );
  }

  if (!project) {
    return <p className="text-center text-red-400 mt-20">Project not found.</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-8xl mx-auto space-y-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Section */}
          <div className="col-span-2 space-y-4">
            {/* Live Preview */}
            <div className="border border-white/10 rounded-xl overflow-hidden">
              <div className="bg-gray-900 px-4 py-2 flex items-center gap-2 text-sm text-gray-400">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <a
                  target="_blank"
                  href={project.previewLink}
                  className="ml-4 cursor-pointer"
                >
                  {project.previewLink || "No link"}
                </a>
              </div>
              <iframe
                src={project.previewLink || "about:blank"}
                title="Live Preview"
                className="w-full h-[550px] bg-white"
              />
            </div>

            {/* Like + Share Buttons */}
            <div className="flex gap-4 items-center">
              <button
                onClick={toggleLike}
                className={`flex items-center gap-2 text-sm px-4 py-2 rounded-full transition-all duration-200 font-semibold 
    ${
      liked
        ? "bg-lime-500 text-white hover:bg-lime-600"
        : "bg-white text-black hover:bg-gray-300"
    }`}
              >
                <FaHeart className="text-lg text-red-500" />
                {liked ? "Liked" : "Like"}
                <span className="ml-1">({likesCount})</span>
              </button>

              {/* Share Buttons */}
              <div className="flex items-center gap-2">
                <FacebookShareButton url={window.location.href}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={window.location.href}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <WhatsappShareButton url={window.location.href}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <LinkedinShareButton url={window.location.href}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-lg">
              <h2 className="text-lime-400 text-xl font-bold mb-4">
                About This Project
              </h2>

              <div className="markdown-body p-5 text-white">
                <ReactMarkdown
                  children={project?.projectSummary}
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeHighlight]}
                />
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white/15 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-lime-400 mb-4">
                Feedback & Suggestions
              </h3>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Write your feedback..."
                  className="flex-1 px-4 py-2 rounded-md bg-black/40 text-white border border-white/10"
                />
                <button
                  onClick={handleComment}
                  className="px-4 py-2 bg-lime-400 hover:bg-lime-300 text-black rounded-md font-semibold"
                >
                  Comment
                </button>
              </div>

              <div className="space-y-4">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div
                      key={index}
                      className="bg-black/30 border border-white/10 rounded-md p-4 flex gap-3"
                    >
                      <img
                        src={comment?.commentedUser?.profileId?.profileimage}
                        alt="avatar"
                        className="w-10 h-10 rounded-full border border-white/20"
                      />
                      <div className="w-full flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-lime-300 mb-1">
                            {comment.commentedUser?.username ??
                              comment.name ??
                              "Guest User"}
                          </p>
                          <p className="text-sm text-gray-300">
                            {comment.commentText}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(comment.createdAt).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">
                    No comments yet. Be the first!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-5 shadow">
              <h2 className="text-2xl font-bold text-lime-400 mb-2">
                {project.projectTitle || "Untitled Project"}
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                {project.projectDescription}
              </p>

              <div className="flex items-center gap-3 mb-2">
                <img
                  src={
                    project.user?.profilePhoto ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  className="w-10 h-10 rounded-full border border-white/20"
                  alt="user"
                />
                <div>
                  <p className="font-medium">
                    {project.userId?.username || "Anonymous"}
                  </p>
                  <p className="text-sm text-lime-300">
                    {project.userId?.profileId?.professioninfo?.occupation}
                  </p>
                </div>
              </div>

              {project.userId?.profileId?.social?.github && (
                <a
                  href={project.userId?.profileId?.social?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex mx-2 items-center gap-2 bg-white text-black px-4 py-2 mt-3 rounded-md font-semibold hover:bg-gray-200"
                >
                  <FaGithub /> GitHub
                </a>
              )}

              {project.userId?.profileId?.social?.linkedin && (
                <a
                  href={project.userId?.profileId?.social?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex mx-2 items-center gap-2 bg-blue-700 text-white px-4 py-2 mt-3 rounded-md font-semibold hover:bg-blue-500"
                >
                  <FaLinkedin />
                  LinkedIn
                </a>
              )}
            </div>

            {/* Tech Stack */}
            {project.projectTechnologies?.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-5">
                <h3 className="text-lg font-semibold text-lime-400 mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.projectTechnologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-lime-500 text-black text-sm px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
