import { socket } from "@/socket";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetAllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await axios.get(
          "https://randomstuff-bjgb.onrender.com/api/randomstuff/project/getAllProjects",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setProjects(response.data.projects || []);
      } catch (err) {
        console.error("Error fetching projects", err);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProjects();

    socket.on("newProjectUpload", (newProject) => {
      setProjects((prev) => [newProject, ...prev]);
    });

    return () => socket.off("newProjectUpload");
  }, []);

  return { projects, loading, error };
};

export default useGetAllProjects;
