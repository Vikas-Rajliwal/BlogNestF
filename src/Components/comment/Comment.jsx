import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Comment.css"; // 👈 Link to CSS
import Cookies from "js-cookie"; // Use js-cookie for cookie management
import { Link } from "react-router-dom"; // For linking to user profiles
function CommentSection({ blog }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
   const URL = import.meta.env.VITE_API_URL;

    // console.log("URL:", URL);
  // Fetch comments on load
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `${URL}/api/v1/comment/${blog}`
        );
        setComments(res.data.data || []);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    if (blog) fetchComments();
  }, [blog]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token"); // or Cookies.get('token')

      await axios.post(
        `${URL}/api/v1/comment/${blog}`,
        { content: comment },
        {
          withCredentials: true, // Include cookies in the request
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // ✅ Re-fetch comments so all fields are populated
      const res = await axios.get(
        `${URL}/api/v1/comment/${blog}`
      );
      setComments(res.data.data || []);
      setComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>

      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment here..."
          rows="3"
          required
        ></textarea>
        <button type="submit">Post Comment</button>
      </form>

      <div className="comments-list">
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map((cmt, index) => (
          <div key={index} className="comment">
            <div className="text">{cmt.content}</div>
            <Link to={`/profile/${cmt.createdBy?._id}`}>
              {cmt.createdBy?.fullName || "User"}
            </Link>
            <div className="time">
              {new Date(cmt.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
