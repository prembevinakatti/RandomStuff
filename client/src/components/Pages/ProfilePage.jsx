import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import useGetUserProjects from "@/hooks/useGetUserProjects";
import useGetAllProjects from "@/hooks/useGetAllProjects";
import Slider from "react-slick";
import { FaHeart } from "react-icons/fa";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const techOptions = [
  "JavaScript",
  "React",
  "Node.js",
  "MongoDB",
  "Python",
  "TypeScript",
  "Tailwind CSS",
  "HTML5",
  "CSS3",
  "Other",
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("my");
  const { user } = useSelector((store) => store.auth);
  const [profileDetails, setProfileDetails] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const myProjects = useGetUserProjects();
  const { projects = [] } = useGetAllProjects();
  const likedProjects = projects.filter((project) =>
    project.likes?.includes(user._id)
  );

  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/randomstuff/profile/getProfileByUserId",
        { withCredentials: true }
      );
      const profile = res.data.profile;
      setProfileDetails(profile);

      const skillsArray = profile?.professioninfo?.skills
        ? profile.professioninfo.skills.split(",").map((s) => s.trim())
        : [];
      setSelectedSkills(skillsArray);
      setValue("skills", profile?.professioninfo?.skills || "");
      setValue("occupation", profile?.professioninfo?.occupation || "");
      setValue("organization", profile?.professioninfo?.organization || "");
      setValue("experience", profile?.professioninfo?.experience || "");
      setValue("education", profile?.professioninfo?.education || "");
      setValue("city", profile?.address?.city || "");
      setValue("state", profile?.address?.state || "");
      setValue("country", profile?.address?.country || "");
    };
    fetchProfile();
  }, [user, setValue]);

  const onSubmit = async (data) => {
    console.log("Reaching here : ", data);

    try {
      const updatedData = {
        professioninfo: {
          occupation: data.occupation,
          organization: data.organization,
          experience: data.experience,
          skills: selectedSkills.join(","),
          education: data.education,
        },
        address: { city: data.city, state: data.state, country: data.country },
      };

      console.log(updatedData);

      await axios.put(
        "http://localhost:3000/api/randomstuff/profile/updateProfile",
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setProfileDetails((prev) => ({
        ...prev,
        professioninfo: {
          ...prev.professioninfo,
          ...updatedData.professioninfo,
        },
        address: { ...prev.address, ...updatedData.address },
      }));
      toast.success("Profile Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
      setOpen(false);
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  const handleNavigate = (projectId) => {
    navigate(`/projectDetails/${projectId}`);
  };

  const profile = {
    profileimage: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    name: user?.username,
    occupation: profileDetails?.professioninfo?.occupation,
    organization: profileDetails?.professioninfo?.organization,
    experience: profileDetails?.professioninfo?.experience,
    skills:
      profileDetails?.professioninfo?.skills?.split(",").map((s) => s.trim()) ||
      [],
    education: profileDetails?.professioninfo?.education,
    location: `${profileDetails?.address?.city}, ${profileDetails?.address?.state}, ${profileDetails?.address?.country}`,
    totalProjects: profileDetails?.totalProjects,
  };

  const renderProjectCard = (project) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <motion.div
        onClick={() => handleNavigate(project._id)}
        key={project._id}
        whileHover={{ scale: 1.03 }}
        className="bg-white/5 border cursor-pointer mt-5 border-white/10 rounded-lg overflow-hidden shadow-xl backdrop-blur-sm"
      >
        <Slider {...settings}>
          {project.projectImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt=""
              className="w-full h-40 object-cover"
            />
          ))}
        </Slider>
        <div className="p-4">
          <h3 className="text-white font-semibold">{project.projectTitle}</h3>
          <p className="text-gray-400 text-sm">{project.description}</p>
          <div className="flex justify-between mt-4">
            <div>
              <p>{project.userId.username}</p>
              <p className="text-gray-400">
                {project.userId.profileId?.professioninfo?.occupation}
              </p>
            </div>
            <div className="flex items-center gap-2 text-white">
              <FaHeart className="text-red-400" />
              <span className="text-sm">{project.likes.length}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderProjects = () => {
    const data = activeTab === "my" ? myProjects : likedProjects;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {data.length === 0 ? (
          <div className="text-gray-400 text-center mt-8 p-8 bg-white/5 rounded-lg">
            {activeTab === "my"
              ? "You haven’t uploaded any projects yet."
              : "You haven’t liked any projects yet."}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map(renderProjectCard)}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Header */}
        <div className="relative flex flex-col md:flex-row items-start bg-white/5 border border-white/10 p-6 rounded-2xl shadow-md">
          <img
            src={profile.profileimage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-lime-400"
          />
          <div className="flex-1 ml-6">
            <h1 className="text-3xl font-bold text-lime-400">{profile.name}</h1>
            <p className="text-gray-300 mt-1">{profile.occupation}</p>
            <p className="text-gray-400">{profile.organization}</p>
            <p className="text-gray-500 mt-1">{profile.education}</p>
            <p className="text-xs text-white/60 mt-1">
              📍 {profile.location} • {profile.experience}
            </p>
            <div className="mt-5">
              <p className="text-white font-semibold">Skills:</p>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="bg-lime-400/10 text-lime-300 px-3 py-1 text-sm rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Edit Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="absolute top-4 right-4 px-4 py-2 border transition-all border-lime-400 text-lime-300 rounded-full hover:bg-lime-400 hover:text-black">
              <p onClick={() => setOpen(true)}>✏️ Edit</p>
            </DialogTrigger>
            <DialogContent className="bg-black border border-white/20 rounded-2xl p-6 text-white max-w-xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <DialogHeader>
                  <DialogTitle className="text-lime-400">
                    Edit Profile
                  </DialogTitle>
                  <DialogDescription className="text-gray-400 mb-4">
                    Update your profile information below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    "occupation",
                    "organization",
                    "experience",
                    "education",
                    "city",
                    "state",
                    "country",
                  ].map((field) => (
                    <div key={field}>
                      <Label
                        htmlFor={field}
                        className="text-lime-400 my-2 capitalize"
                      >
                        {field}
                      </Label>
                      <Input id={field} {...register(field)} />
                    </div>
                  ))}
                  {/* Tech Stack Multi-Select */}
                  <div className="col-span-3">
                    <Label className="text-lime-400 mb-1 block">
                      Tech Stack
                    </Label>
                    <Select
                      onValueChange={(skill) => {
                        if (skill && !selectedSkills.includes(skill)) {
                          setSelectedSkills((prev) => [...prev, skill]);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full bg-black/30 text-white border border-white/10 mt-1">
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

                    {selectedSkills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {selectedSkills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-lime-400 text-black px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedSkills((prev) =>
                                  prev.filter((s) => s !== skill)
                                )
                              }
                              className="text-black hover:text-red-600 font-bold"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <DialogClose asChild>
                    <Button variant="outline" className="text-black">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    className="bg-lime-400 text-black hover:bg-lime-300"
                  >
                    Save Changes
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-12">
          {["my", "liked"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-sm font-semibold rounded-full border transition ${
                activeTab === tab
                  ? "bg-lime-400 text-black"
                  : "border-lime-400 text-lime-300 hover:bg-lime-400/10"
              }`}
            >
              {tab === "my" ? "My Projects" : "Liked Projects"}
            </button>
          ))}
        </div>

        {/* Projects */}
        {renderProjects()}
      </motion.div>
    </div>
  );
};

export default ProfilePage;
