import axios from "axios";
import "./SignUpPage.css";
import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/");
  };
  const URL = import.meta.env.VITE_API_URL;
  // console.log("URL:", URL); // Debugging line to check URL
  const [responseMessage, setResponseMessage] = useState("");
  
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form Data:", formData); // Debugging line to check form data
      const res = await axios.post(
        `${URL}/api/v1/user/signup`,
        formData
      );
      console.log(res);
      const result = await res.data;
      console.log(result);
      console.log("status", result.statusCode); // Debugging line to check result
      if (result.statusCode <= 400) {
        setResponseMessage("✅ Signup successful!");
        setFormData({ fullName: "", email: "", password: "" }); // clear form
        setTimeout(() => navigate("/logIn"), 1500);
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
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

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

export default SignUpPage;
