// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const ViewChef = () => {
//   const [chef, setChef] = useState(null);
//   const { id } = useParams();

//   const fetchChefData = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/chefs/view/${id}`
//       );
//       const data = await response.json();
//       setChef(data);
//     } catch (error) {
//       console.error("Error fetching chef data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchChefData();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <div className="row">
//         <div className="col-md-8 offset-md-2">
//           {chef && (
//             <div className="card">
//               <div className="card-body">
//                 <div className="row">
//                   <div className="col-md-4 text-center">
//                     <img
//                       src={chef.profileUrl }
//                       alt={`${chef.name}'s profile`}
//                       className="img-fluid rounded-circle mb-3"
//                       style={{ width: "150px", height: "150px", objectFit: "cover" }}
//                     />
//                     <h4>{chef.name}</h4>
//                     <span
//                       className={`badge ${
//                         chef.approved ? "bg-success" : "bg-danger"
//                       }`}
//                     >
//                       {chef.approved ? "Approved" : "Pending/Rejected"}
//                     </span>
//                   </div>
//                   <div className="col-md-8">
//                     <h5 className="card-title">Chef Details</h5>
//                     <p><strong>Email:</strong> {chef.email}</p>
//                     <p><strong>Mobile:</strong> {chef.mobile}</p>
//                     <p>
//                       <strong>Abilities:</strong>{" "}
//                       {chef.abilities && chef.abilities.length > 0
//                         ? chef.abilities.join(", ")
//                         : "No abilities listed"}
//                     </p>
//                   </div>
//                 </div>

//                 <hr />

//                 <h5 className="mt-4">Proposals:</h5>
//                 {chef.proposals && chef.proposals.length > 0 ? (
//                   chef.proposals.map((proposal) => (
//                     <div key={proposal._id} className="card mt-3">
//                       <div className="card-body">
//                         <h6>Pricing:</h6>
//                         <ul>
//                           <li>Chef at Home: ${proposal.pricing.chef_at_home}</li>
//                           <li>Chef at Small Event: ${proposal.pricing.chef_at_small_event}</li>
//                           <li>Chef at Big Event: ${proposal.pricing.chef_at_big_event}</li>
//                         </ul>
//                         <h6>Availability:</h6>
//                         {proposal.availability && proposal.availability.length > 0 ? (
//                           <ul>
//                             {proposal.availability.map((avail) => (
//                               <li key={avail._id}>
//                                 {new Date(avail.start_date).toLocaleDateString()} to{" "}
//                                 {new Date(avail.end_date).toLocaleDateString()}
//                               </li>
//                             ))}
//                           </ul>
//                         ) : (
//                           <p>No availability listed</p>
//                         )}
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No proposals available</p>
//                 )}
//               </div>
//             </div>
            
//           )}
//         </div>
//       </div>
//     </div>
    
//   );
// };

// export default ViewChef;


// <div className="d-flex flex-column gap-3">
// <label htmlFor="" className="fs-5 fw-bold text-uppercase">
//   Add Your Review
// </label>
// <textarea
//   type="text"
//   className="form-control w-50 border-dark "
//   placeholder="Comment"
//   name="review_text"
//   aria-label="Email"
//   aria-describedby="basic-addon1"
//   value={reviewText}
//   onChange={handleReviewTextChange}
// />
// <button
//   className="type-submit btn btn-success"
//   style={{ width: "120px" }}
//   onClick={handleReviewSubmit}
// >
//   Submit
// </button>
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../chefView.css';

const ViewChef = () => {
  const [chef, setChef] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleBooking = () => {
  if (isLoggedIn) {
    navigate("/book/chef");
  } else {
    navigate("/login");
  }
  };

  const fetchChefData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/chefs/view/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setChef(data);
      } else {
        console.error("Error fetching chef data:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching chef data:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/chefs/${id}/reviews`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched reviews:", data);
        setReviews(data);
      } else {
        console.error("Error fetching reviews:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchChefData();
    fetchReviews();
  }, [id]);

  useEffect(() => {
    console.log("Reviews updated:", reviews);
  }, [reviews]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    console.log("Submitting review:", newReview);
    try {
      const response = await fetch(`http://localhost:3000/api/chefs/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: newReview }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Review submitted successfully:", data);
        setNewReview("");
        fetchReviews();
      } else {
        const errorData = await response.json();
        console.error("Error submitting review:", errorData);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!chef) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <img
                src={chef.profileUrl}
                alt={`${chef.name}'s profile`}
                className="img-fluid rounded-circle mb-3"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
              <h2>{chef.name}</h2>
              <span
                className={`badge ${
                  chef.approved ? "bg-success" : "bg-danger"
                }`}
              >
                {chef.approved ? "Approved" : "Pending/Rejected"}
              </span>
            </div>
            <div className="col-md-8">
              <h3>Chef Details</h3>
              <p><strong>Email:</strong> {chef.email}</p>
              <p><strong>Mobile:</strong> {chef.mobile}</p>
              <p>
                <strong>Abilities:</strong>{" "}
                {chef.abilities && chef.abilities.length > 0
                  ? chef.abilities.join(", ")
                  : "No abilities listed"}
              </p>
              <p><strong>Experience:</strong> {chef.experience || "Not specified"}</p>
            </div>
          </div>

          <hr />

          <h3>Specialist Dishes:</h3>
          <div className="row">
            {chef.specialistDishes && chef.specialistDishes.length > 0 ? (
              chef.specialistDishes.map((dish, index) => (
                <div key={index} className="col-md-4 mb-3">
                  <div className="card">
                    <img
                      src={dish.imageUrl}
                      alt={dish.name}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{dish.name}</h5>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col">
                <p>No specialist dishes listed</p>
              </div>
            )}
          </div>

          <hr />

          <h3>Proposals:</h3>
          {chef.proposals && chef.proposals.length > 0 ? (
            chef.proposals.map((proposal, index) => (
              <div key={index} className="card mt-3">
                <div className="card-body">
                  <h5>Pricing:</h5>
                  <ul>
                    <li>Chef at Home: ${proposal.pricing.chef_at_home}</li>
                    <li>Chef at Small Event: ${proposal.pricing.chef_at_small_event}</li>
                    <li>Chef at Big Event: ${proposal.pricing.chef_at_big_event}</li>
                  </ul>
                  <h5>Availability:</h5>
                  
                  {proposal.availability && proposal.availability.length > 0 ? (
                    <ul>
                      {proposal.availability.map((avail, idx) => (
                        <li key={idx}>
                          {new Date(avail.start_date).toLocaleDateString()} to{" "}
                          {new Date(avail.end_date).toLocaleDateString()}<br></br>
                          {avail.location && (
                            <span> Location: {avail.location}</span>
                          )}
                        </li>
                       
                      ))}
                    </ul>
                    
                  ) : (
                    <p>No availability listed</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No proposals available</p>
          )}

          <hr />
          <button 
            className="book-now-btn" 
            onClick={handleBooking}>
            Book Now
          </button>
         </div>
      </div>
    </div>
  );
};

export default ViewChef;