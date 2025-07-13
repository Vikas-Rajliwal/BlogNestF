import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FaHeart } from "react-icons/fa";
import PrivateRoute from "../../PrivateRoute";
import "./LikeButton.css"; // Import your CSS for styling
function LikeButton({ blog }) {
  const [likeCount, setLikeCount] = useState(0);
  const URL = import.meta.env.VITE_API_URL;

  // console.log("URL:", URL);
  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await axios.get(`${URL}/api/v1/like/${blog}`);
        setLikeCount(response.data.data.likeCount); // Adjust based on your backend response
        // console.log("Like Count:", response.data.data.likeCount);
      } catch (error) {
        console.error("Error fetching like count:", error.message);
      }
    };

    if (blog) fetchLikeCount();
  }, [blog]);

  const handleLike = async () => {
    try {
      const token = Cookies.get("token");
      console.log("Token:", token); // Debugging: Check if token is retrieved correctly
      const res = await axios.post(
        `${URL}/api/v1/like/${blog}`,
        {},
        {
          withCredentials: true, // Send cookies (e.g., httpOnly JWT cookie)
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.message);

      // Update like count after like/unlike
      setLikeCount(res.data.data.likeCount);
    } catch (err) {
      console.error("Error liking post:", err.response?.data || err.message);
    }
  };

  return (
    <div className="like-button-container">
      <PrivateRoute>
        <button className="icon-button" onClick={handleLike}>
          <FaHeart className="icon" />
          {likeCount} Like
        </button>
      </PrivateRoute>
    </div>
  );
}

export default LikeButton;
