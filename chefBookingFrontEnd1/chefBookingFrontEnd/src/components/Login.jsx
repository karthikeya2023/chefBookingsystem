import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logos from "../assets/logo.png";
import "../login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      const user = JSON.parse(localStorage.getItem("user"));

      // Redirect based on user's role
      if (user.role === "admin") {
        navigate("/admin");
        window.location.href = "/admin";
      } else if (user.role === "user") {
        window.location.href = "/home";
      } else if (user.role === "chef") {
        window.location.href = "/dashboard/chef";
      } else {
        console.error("Unknown user role:", user.role);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <img src={logos} alt="ChefVeda Logo" className="logo" />
        <h2 className="tagline">Book Your Perfect Chef Anytime, Anywhere</h2>
      </div>
      <div className="right-section">
        <div className="login-form">
          <h1>LOGIN</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="signup-link">
              <Link to="/signup">Don't you have an account click here to signup</Link><br></br>
             
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
        
      </div>
    </div>
  );
}

export default Login;