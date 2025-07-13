import React, { useState } from "react";
import "./BlogPostForm.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function BlogPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const URL = import.meta.env.VITE_API_URL;

  // console.log("URL:", URL);
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !image) {
      setError("All fields are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("tittle", title);
      formData.append("body", content);
      formData.append("coverImageURL", image);
      const token = Cookies.get("token");
      // console.log("Token:", token); // Debugging: Check if token is retrieved correctly
      const res = await axios.post(
        `${URL}/api/v1/blog/upload`,
        formData,
        {
          withCredentials: true, // Send cookies (e.g., httpOnly JWT cookie)
          headers: {
            Authorization: `Bearer ${token}`, // Also send token in header (optional if you rely on cookies)
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Blog submitted successfully:", res.data);
      navigate("/"); // Redirect to home after successful submission
      setError("");
    } catch (err) {
      console.error("Error submitting blog:", err);
      setError("Failed to submit blog post");
    }
  };

  return (
    <div className="blog-post-form">
      <p className="back-to-home" onClick={backToHome}>
        Back to Home
      </p>
      <h2>Add New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default BlogPostForm;
