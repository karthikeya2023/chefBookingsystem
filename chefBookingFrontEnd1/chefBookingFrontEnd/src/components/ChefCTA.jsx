import React from "react";
import { useNavigate } from "react-router-dom";
import '../chefCTA.css'

function ChefCTA() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user ? user.role : null;

  return (
    <>
      {role === "chef" ? (
        <div className="text-center bg-warning-subtle py-5">
          <h2 className="mb-4">Login on to your Dashboard!</h2>
          <p className="mb-4">Showcase your culinary skills to the world.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/dashboard/chef")}
          >
   Dashboard
          </button>
        </div>
      ) : (
        <div className="header">
          <h2 className="title">Become a Chef Today!</h2>
          <p className="mb-4">
            Join our platform and showcase your culinary skills to the world.
            Start creating your profile now.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/chef/register")}
          >
            Register as Chef
          </button>
        </div>
      )}
    </>
  );
}

export default ChefCTA;
