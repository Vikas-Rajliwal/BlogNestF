import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SavedCollection.css"; // Optional styling
import { useNavigate } from "react-router-dom";
function SavedCollection() {
  //   const { userId } = useParams();
  //   const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
const URL = import.meta.env.VITE_API_URL;
console.log("URL:", URL);
  const backToBlogs = () => {
    navigate("/");
  };
  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const res = await axios.get(
          `${URL}/api/v1/save/mySavedPosts`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      const savedPosts = res.data.data;

    // Extract blogId from each saved post
    const extractedBlogs = savedPosts.map(post => post.blogId);

    setBlogs(extractedBlogs);

    // console.log("Saved Blogs:", extractedBlogs);
      } catch (err) {
        console.error("Error fetching saved posts:", err);
      }
    };

    fetchSavedPosts();
  }, []);

  if (!blogs) return <p>No saved posts...</p>;

  return (
    <div className="profile-page">
      <button onClick={backToBlogs} className="back-button">
       ← Back to Blogs
      </button>

      <div className="user-blogs">
        <h3> Blogs</h3>
        {blogs.length === 0 ? (
          <p>No saved blogs yet.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-preview">
              <h4>{blog.tittle}</h4>{" "}
              {/* Typo in field name is preserved as per your API */}
              <img
                src={blog.coverImageURL}
                alt={blog.tittle}
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
              />
              <p>
                {blog.body
                  ? blog.body
                  : "No content available."}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SavedCollection;
