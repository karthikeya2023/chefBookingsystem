// import React, { useState } from "react";
// import axios from "axios";
// import "../App.css";
// import { useNavigate } from "react-router";
// function Signup() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/auth/signup",
//         formData
//       );
//       console.log(response.data); // Assuming your API returns a message upon successful signup
//       navigate("/login");
//       // You can redirect the user to another page or show a success message here
//     } catch (error) {
//       console.error("Signup error:", error);
//       // Handle error, e.g., show error message to the user
//     }
//   };

//   return (
//     <div className="bg-success-subtle py-5 login">
//       <div className="container w-50 shadow p-5 d-flex flex-column justify-content-center ">
//         <h2 className="text-center text-uppercase">Signup</h2>
//         <form onSubmit={handleSubmit}>
//           <label htmlFor="name" className="mb-2 fw-bold fs-5 text-uppercase">
//             Name
//           </label>
//           <div className="input-group mb-3 ">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Name"
//               aria-label="Name"
//               aria-describedby="basic-addon1"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//           </div>
//           <label htmlFor="email" className="mb-2 fw-bold fs-5 text-uppercase">
//             Email
//           </label>
//           <div className="input-group mb-3 ">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Email"
//               aria-label="Email"
//               aria-describedby="basic-addon1"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </div>
//           <label
//             htmlFor="password"
//             className="fw-bold text-uppercase mb-2 fs-5"
//           >
//             Password
//           </label>
//           <div className="input-group mb-3">
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Password"
//               aria-label="Password"
//               aria-describedby="basic-addon2"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//           </div>
//           <label
//             htmlFor="confirmPassword"
//             className="fw-bold text-uppercase mb-2 fs-5"
//           >
//             Confirm Password
//           </label>
//           <div className="input-group mb-3">
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Confirm Password"
//               aria-label="Confirm Password"
//               aria-describedby="basic-addon2"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//             />
//           </div>
//           <p className="text-white">
//             <a href="/login" className="text-dark fw-bold">
//               Do you have an account click here to login
//             </a>
//           </p>
//           <button type="submit" className="btn btn-success text-center mt-2">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup;

import React, { useState } from "react";
import axios from "axios";
import "../signup.css";
import logos from "../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber:"",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setError(error.response?.data?.message || "An error occurred during signup");
    }
  };

  return (
    <div className="signup-page">
      <div className="left-section">
        <img src={logos} alt="ChefVeda Logo" className="logo" />
        <h2 className="tagline">Book Your Perfect Chef Anytime, Anywhere</h2>
      </div>
      <div className="right-section">
        <div className="signup-form">
          <h1>SIGNUP</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">NAME</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">EMAIL</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
            <label htmlFor="phoneNumber">Mobile</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

            <div className="form-group">
              <label htmlFor="password">PASSWORD</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-link">
              <Link to="/login">Do you have an account? Click here to login</Link>
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
        
      </div>
    </div>
  );
}

export default Signup;