import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import '../chefs.css';

function Chefs() {
  const [chefs, setChefs] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/api/chefs/")
      .then((response) => response.json())
      .then((data) => {
        setChefs(data.slice(0, 3)); // Limit to 3 chefs for the homepage
      })
      .catch((error) => console.error("Error fetching chef data:", error));
  }, []);
  const handleChefClick=(chefId)=>{
    navigate(`/view/chef/${chefId}`)
  }
  return (
    <div className="chefs-section">
      <div className="container">
        <div className="chefs-header">
          <h2>Explore the Chefs</h2>
          <Link to="/chefs" className="all-chefs-link">All Chefs →</Link>
        </div>
        <div className="chefs-grid">
          {chefs.map((chef) => (
            <div key={chef._id} className="chef-card">
              <img 
              src={chef.profileUrl} 
              alt={chef.name} 
              className="chef-image" 
              onClick={() => handleChefClick(chef._id)}
              />
              <h3 className="chef-name">{chef.name}</h3>
              <p className="chef-email">{chef.email}</p>
              <p className="chef-mobile">Mobile No: {chef.mobile}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Chefs;