const { Router } = require("express");
const User = require("../models/user");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");
const router = Router();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const blog = require("../models/blog");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const verifyJWT = require("../middlewares/jwtVerify");
const ObjectId = mongoose.Types.ObjectId;


router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await User.matchPasswordAndGenerateToken(
      email,
      password
    );

console.log("userid", user._id);
    // First, set cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      path: "/",
    });

    res.cookie("userName", user.fullName, {
      httpOnly: true,
      secure: true,

      sameSite: 'None',
      
      path: "/",
    });
    res.cookie("Id", String(user._id), {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      path: "/",
    });

    // Then send JSON response
    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        
      },
    });

  } catch (error) {
    console.error("Signin error:", error);
    return res.status(400).json({
      statusCode: 400,
      data: null,
      error: "Authentication Error",
      success: false,
    });
  }
});


router.get("/logout", (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

router.get("/myprofile",verifyJWT, async (req, res) => {
  const userId = req.user._id;
  console.log("Fetching profile for user ID:", userId);
  if (!userId) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "User ID is required"));
  }
  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "User not found"));
  }
  console.log("User profile fetched:", user);
  const blogs = await blog.find({ createdBy: userId });
  return res.status(200).json(new ApiResponse(200, { user, blogs }, "Profile fetched successfully"));
});


router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("Fetching user with ID:", userId);
  if (!userId) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "User ID is required"));
  }
  const user = await User.findById(userId);
  // const user = blog.createdBy;

  // if (!user) {
  //   return res
  //     .status(404)
  //     .json(new ApiResponse(404, null, "User not found"));
  // }
  // console.log("Looking  by user:", user);
   const relatedBlogs = await blog.find({
      createdBy: userId,
      
    });
console.log("Related blogs for user:", userId);
  console.log("Blogs found:", relatedBlogs.length);
  console.log("Blogs found:", relatedBlogs);
  return res.status(200).json(new ApiResponse(200, {user, relatedBlogs}, "User fetched successfully"));
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }
  const existUser = await User.findOne({ email: email });
  if (existUser) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "User already exists with this email"));
  }
  await User.create({
    fullName,
    email,
    password,
  });
  return res
    .status(201)
    .json(
      new ApiResponse(201, null, "User created successfully, please sign in")
    );
});

module.exports = router;
