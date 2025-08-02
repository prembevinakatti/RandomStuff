import axios from "axios";
import { useEffect, useState } from "react";
import { socket } from "../socket"; 

const useGetComments = (projectId) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/randomstuff/comment/getComment/${projectId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setComments(response.data.comments);
      } catch (error) {
        console.log("Error fetching comments from hook: ", error);
      }
    };

    fetchComments();

    const handleNewComment = (data) => {
      if (data.projectId === projectId) {
        setComments((prev) => [
          ...prev,
          {
            commentText: data.commentText,
            createdAt: data.createdAt,
            commentedUser: {
              _id: data.commentedUser?._id ?? "unknown",
              username: data.commentedUser?.username ?? "Anonymous",
            },
          },
        ]);
      }
    };

    socket.on("getComment", handleNewComment);

    return () => {
      socket.off("getComment", handleNewComment);
    };
  }, [projectId]);

  return comments;
};

export default useGetComments;
