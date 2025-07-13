import "./BlogCart.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton/LikeButton.jsx";
import SavePostButton from "../savePostButton/savePostButton.jsx";
import CommentSection from "../comment/Comment.jsx";
import Cookies from "js-cookie";
function BlogCart() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  useEffect(() => {
    const URL = import.meta.env.VITE_API_URL;

    // console.log("URL:", URL);

    axios
      .get(`${URL}/api/v1/blog/`)
      .then((response) => {
        setPosts(response.data.data);
        // console.log("Posts fetched:", response.data);
        // console.log(`user name: ${response.data.data[0].createdBy.fullName}`);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);
  const token = Cookies.get("token");
  if (loading) {
    return <div>Loading...</div>;
  }

  if (selectedPost) {
    // Detailed view of selected post
    return (
      <div className="post-detail">
        <button onClick={() => setSelectedPost(null)}>← Back to posts</button>
        <h1>{selectedPost.tittle}</h1>
        <img
          src={selectedPost.coverImageURL}
          alt={selectedPost.tittle}
          className="post-detail-image"
        />
        <p>{selectedPost.body}</p>
        <Link to={`/profile/${selectedPost.createdBy?._id}`}>
          {selectedPost.createdBy?.fullName || "User"}
        </Link>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(selectedPost.createdAt).toLocaleDateString()}
        </p>
        <div className="action-buttons">
          {/* <LikeButton blog={selectedPost._id} /> */}
          {/* <SavePostButton blog={selectedPost._id} /> */}
          {token ? <LikeButton blog={selectedPost._id}/> : null}
          {token ? <SavePostButton blog={selectedPost._id} /> : null}

        </div>
        <CommentSection blog={selectedPost._id} />
      </div>
    );
  }

  return (
    <>
      <div className="posts-container">
        {posts.map((posts) => (
          <div key={posts._id} className="post-card">
            <h2
              className="post-title"
              onClick={() => setSelectedPost(posts)}
              style={{
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              {posts.tittle}
            </h2>

            <img
              src={posts.coverImageURL}
              alt={posts.tittle}
              className="posts-image"
            />
            <p>{posts.body.slice(0, 20)}...</p>
            <Link to={`/profile/${posts.createdBy?._id}`}>
              {posts.createdBy?.fullName || "User"}
            </Link>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(posts.createdAt).toLocaleDateString()}
            </p>
            <div className="action-buttons">
              {/* <LikeButton blog={posts._id} /> */}
              {/* <SavePostButton blog={posts._id} /> */}
              {token ? <LikeButton blog={posts._id} /> : null}
              {token ? <SavePostButton blog={posts._id} /> : null}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BlogCart;
