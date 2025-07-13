import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
// import { FaBookmark, FaRegBookmark } from "react-icons/fa"; // Optional icons

function SavePostButton({ blogId }) {
  const [isSaved, setIsSaved] = useState(false);
  const token = Cookies.get("token");
  const URL = import.meta.env.VITE_API_URL;

  // console.log("URL:", URL);
  // ✅ Check if the post is already saved (initial state)
  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const res = await axios.get(
          `${URL}/api/v1/save/${blogId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (res.status === 200 && res.data.isSaved) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      } catch (error) {
        console.error("Error checking saved status:", error.message);
      }
    };

    if (blogId) checkSavedStatus();
  }, [blogId]);

  // ✅ Toggle Save/Unsave Post
  const handleSave = async () => {
    try {
      const res = await axios.post(
        `${URL}/api/v1/save/${blogId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        setIsSaved(true);
      } else if (res.status === 200) {
        setIsSaved(false);
      }
    } catch (err) {
      console.error("Failed to save/unsave post:", err.message);
    }
  };

  return (
    <div className="save-button-container">
      <button className="icon-button" onClick={handleSave}>
        <FaBookmark className="icon" />
        {isSaved ? "Saved" : "Save"} 
      </button>
    </div>
  );
}

export default SavePostButton;
