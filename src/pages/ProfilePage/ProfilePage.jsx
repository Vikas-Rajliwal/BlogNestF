import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProfilePage.css'; // Optional styling
import FollowButton from '../../Components/FollowButton/FollowButton';
import { useNavigate } from 'react-router-dom';
function ProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;
  // console.log("URL:", URL);
  const backToBlogs = () => {
    navigate('/');
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${URL}/api/v1/user/${userId}`);
        const userData = res.data.data.user;
        const userBlogs = res.data.data.relatedBlogs;
        
        setUser(userData);
        setBlogs(userBlogs);

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
        <p><strong>Email:</strong> {user.email}</p>
        <FollowButton userId={user._id} />
      </div>

      <div className="user-blogs">
        <h3>{user.fullName}'s Blogs</h3>
        {blogs.length === 0 ? (
          <p>No blogs posted yet.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-preview">
              <h4>{blog.tittle}</h4> {/* Typo in field name is preserved as per your API */}
              <img
                src={blog.coverImageURL}
                alt={blog.tittle}
                style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
              />
              <p>{blog.body ? blog.body.slice(0, 100) + "..." : "No content available."}</p>
              <p><strong>Date:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
