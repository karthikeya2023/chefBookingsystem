import React, { useRef } from "react";
import "../heroSection.css";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/heroSection.png"; // Adjust the path if necessary
import Services from "./Services";

function HeroSection() {

  const servicesRef = useRef(null);

  const handleClick = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          EXPERIENCE<br />EXCELLENCE
        </h1>
        <p className="hero-subtitle">Culinary Delights</p>
        <button onClick={handleClick}className="discover">Discover</button>
      </div>
      <div className="hero-image-container">
        <img src={heroImage} alt="Culinary Excellence" className="hero-image" />
      </div>
      <div Services ref={servicesRef} />
    </div>
  );
}

export default HeroSection;