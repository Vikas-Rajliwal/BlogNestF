import { use, useEffect, useState } from "react";
import "./HomeBody.css";
import axios from "axios";
import BlogCart from "../BlogCart/BlogCart.jsx";
function HomeBody() {
  return (
    <div className="home-body">
      <div className="hero-section">
        <h1>Welcome to Blog Nest — A Home for Writers and Readers</h1>
        <p>Stay updated with the latest thoughts and experiences shared by our writers.</p>
      </div>
     
      <BlogCart />
    </div>
  );
}
export default HomeBody;
