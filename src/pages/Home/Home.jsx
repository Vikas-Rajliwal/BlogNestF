import "./Home.css";
import HomeBody from "../../Components/HomeBody/HomeBody";
import BlogPage from "../BlogPostForm/BlogPostForm.jsx";
import NavBar from "../../Components/NavBar/Navbar.jsx";
import { BrowserRouter } from "react-router-dom";
function Home() {
  return (
    <>
    <NavBar />
    <HomeBody />
    </>
  );
}

export default Home;
