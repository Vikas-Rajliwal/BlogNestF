import { useState } from "react";
// import NavBar from './Components/NavBar'
import "./App.css";
import Home from "./pages/Home/Home.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import LogInPage from "./pages/LogIn/LogIn.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute.jsx";
import BlogPostForm from "./pages/BlogPostForm/BlogPostForm.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import MyProfile from "./pages/MyProfile/MyProfile.jsx";
import SavedCollection from "./pages/SavedCollection/SavedCollection.jsx";
// import { Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/logIn" element={<LogInPage />} />
         <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path ="/add-blog" element={
          <PrivateRoute>
            <BlogPostForm />
          </PrivateRoute>
        } />
       
        <Route path="/MyProfile" element={
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        } />
        <Route path="/Mysaved" element={
          // <SavedCollection/>
          <PrivateRoute>
            <SavedCollection />
          </PrivateRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;
