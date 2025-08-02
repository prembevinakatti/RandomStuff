import axios from "axios";
import React, { useEffect, useState } from "react";

const useGetUserProjects = () => {
  const [myProjects, setMyProjects] = useState([]);
  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const repsonse = await axios.get(
          `http://localhost:3000/api/randomstuff/project/getUserProjects`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setMyProjects(repsonse.data.projects);
      } catch (error) {
        console.log("Error Getting User Projects : ", error);
      }
    };
    fetchUserProjects();
  }, []);
  return myProjects;
};

export default useGetUserProjects;
