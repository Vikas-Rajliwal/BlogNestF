import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./FollowButton.css";

function FollowButton(props) {
  const params = useParams();
  const userId = props.userId || params.userId; // authorId
  const [isFollowing, setIsFollowing] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const token = Cookies.get("token");
  const URL = import.meta.env.VITE_API_URL;

  // console.log("URL:", URL);
  // ✅ Get Logged-in User ID
  useEffect(() => {
    const id = Cookies.get("Id");
    if (id) setLoggedInUserId(id);
  }, []);

  // ✅ Fetch follower & following count
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const followerRes = await axios.get(
          `${URL}/api/v1/follow/status/${userId}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFollowerCount(followerRes.data.followerCount);
        setFollowingCount(followerRes.data.followingCount);
        // console.log("Follower Count:", followerRes.data.followerCount);
        // console.log("Following Count:", followerRes.data.followingCount);
      } catch (error) {
        console.error("Error fetching counts:", error.message);
      }
    };

    fetchCounts();
  }, [userId, isFollowing]); // Update on user change or follow/unfollow

  // ✅ Fetch follow status
  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const res = await axios.get(
          `${URL}/api/v1/follow/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setIsFollowing(res.data.isFollowing);
      } catch (err) {
        console.error("Failed to fetch follow status", err);
      }
    };

    fetchFollowStatus();
  }, [userId]);

  // ✅ Handle Follow/Unfollow
  const handleFollow = async () => {
    try {
      const res = await axios.post(
        `${URL}/api/v1/follow/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        setIsFollowing(true);
        setFollowerCount((prev) => prev + 1);
      } else if (res.status === 202) {
        setIsFollowing(false);
        setFollowerCount((prev) => prev - 1);
      }
    } catch (err) {
      console.error("Follow/unfollow failed", err);
    }
  };

  return (
    <div className="follow-container">
      {/* ✅ Show button only for other users */}
      {loggedInUserId !== userId && (
        <button onClick={handleFollow} className="follow-button">
          {isFollowing ? "Following" : "Follow"}
        </button>
      )}

      {/* ✅ Display counts */}
      <div className="follow-counts">
        <p>Followers: {followerCount}</p>
        <p>Following: {followingCount}</p>
      </div>
    </div>
  );
}

export default FollowButton;
