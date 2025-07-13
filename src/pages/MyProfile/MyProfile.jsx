import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./MyProfile.css"; // Optional styling
import { Link } from "react-router-dom";
import FollowButton from "../../Components/FollowButton/FollowButton";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function MyProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [userIdForFollowButton, setUserIdForFollowButton] = useState(null);
  const token = Cookies.get("token");
  const navigate = useNavigate();
     const URL = import.meta.env.VITE_API_URL;

    // console.log("URL:", URL);
  const backToBlogs = () => {
    navigate("/");
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${URL}/api/v1/user/myprofile`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = res.data.data.user;
        const userBlogs = res.data.data.blogs;
        const userIdForFollowButton = res.data.data.user._id;

        setUser(userData);
        setBlogs(userBlogs);
        setUserIdForFollowButton(userIdForFollowButton);
        // console.log("User ID for Follow Button:", userIdForFollowButton);
        // console.log("User:", userData);
        // console.log("Blogs:", userBlogs);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [userId]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-page">
        <button onClick={backToBlogs} className="back-button">
            ← Back to Blogs
        </button>
      <div className="user-info">
        {/* <img
          src={user.profileImageURL}
          alt={user.fullName}
          className="profile-img"
        /> */}
        <h2>{user.fullName}</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <FollowButton userId={userIdForFollowButton} />
       <button className="saved-collection-button">
          <Link to="/Mysaved">Saved Collection</Link>
        </button>
      </div>

      <div className="user-blogs">
        <h3>{user.fullName}'s Blogs</h3>
        {blogs.length === 0 ? (
          <p>No blogs posted yet.</p>
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

export default MyProfile;
