import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";

import React, { use, useState } from "react";
import { redirect } from "react-router-dom";

const LogInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState("");
  const URL = import.meta.env.VITE_API_URL;

  // console.log("URL:", URL);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const backToHome = () => {
    navigate("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${URL}/api/v1/user/signin`, formData, {
        withCredentials: true, // Include cookies in the request
      });

      const result = await res.data;
      // console.log(result);

      if (result.success === true) {
        setResponseMessage("✅ Signup successful!");
        setFormData({ email: "", password: "" }); // clear form

        // Redirect to home

        setTimeout(() => navigate("/"), 500);
      } else {
        setResponseMessage(`❌ ${result.message}`);
      }
    } catch (err) {
      console.error(err);
      setResponseMessage("❌ Error occurred while signing up.");
    }
  };

  return (
    <div className="container mt-4">
      <p className="back-to-home" onClick={backToHome}>
        ← Back to Home
      </p>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {responseMessage && (
        <div className="mt-3 alert alert-info">{responseMessage}</div>
      )}
    </div>
  );
};

export default LogInPage;
