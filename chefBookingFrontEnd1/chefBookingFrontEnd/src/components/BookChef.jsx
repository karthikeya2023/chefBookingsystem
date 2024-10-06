import React, { useEffect, useState } from "react";
import { LuChefHat } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function BookChef() {
  const [formData, setFormData] = useState({
    eventType: "",
    address: "",
    mobile: "",
    pincode: "",
    eventDate: "",
    chefId: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChefSelect = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      chefId: value,
    }));
  };

  const navigate = useNavigate();

  const [chefs, setChefs] = useState([]);

  // Fetch chef data from the API
  useEffect(() => {
    fetch("http://localhost:3000/api/chefs/")
      .then((response) => response.json())
      .then((data) => {
        // Update chefs state with data from the API
        setChefs(data);
      })
      .catch((error) => console.error("Error fetching chef data:", error));
  }, []); // Empty dependency array to run effect only once when component mounts
  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch userId from localStorage
    const userData = JSON.parse(localStorage.getItem("user"));

    // Combine userId with form data
    const bookingData = {
      ...formData,
      userId: userData._id,
      bookingDate: new Date().toISOString(), // Add booking date
    };

    // Send booking request to the API
    fetch("http://localhost:3000/api/booking/bookachef", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful booking response here
        console.log("Booking successful:", data);
        navigate("/home");
        // Redirect or perform any other action as needed
      })
      .catch((error) => {
        console.error("Error sending booking request:", error);
        // Handle error, show error message to the user, etc.
      });
  };

  return (
    <div className="container">
      <h2 className="text-center pt-5">Book Your Chef </h2>
      <form onSubmit={handleSubmit}>
        <p className="text-muted">Select Your Event Type</p>
        <div className="d-flex justify-content-center justify-content-md-start gap-3">
          <div className="bg-light p-3 shadow-sm border rounded-4 d-flex flex-column gap-2 justify-content-center align-items-center">
            <LuChefHat size={35} />
            <h6>Chef at Your Home</h6>
            <input
              type="radio"
              name="eventType"
              value="Chef at Your Home"
              onChange={handleChange}
              required
            />
          </div>
          <div className="bg-light p-3 shadow-sm border rounded-4 d-flex flex-column gap-2 justify-content-center align-items-center">
            <LuChefHat size={35} />
            <h6>Chef at Small Event</h6>
            <input
              type="radio"
              name="eventType"
              value="Chef at Small Event"
              onChange={handleChange}
              required
            />
          </div>
          <div className="bg-light p-3 shadow-sm border rounded-4 d-flex flex-column gap-2 justify-content-center align-items-center">
            <LuChefHat size={35} />
            <h6>Chef at Big Event</h6>
            <input
              type="radio"
              name="eventType"
              value="Chef at Big Event"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label htmlFor="selectedChef" className="my-3">
          Select Your Chef
        </label>
        <div className="d-flex flex-  container gap-4 py-5 align-items-center justify-content-center pt-4">
          {/* Map through chefs data and render each chef */}
          {chefs.map((chef) => (
            <div
              className="card p-2 shadow-sm "
              key={chef?.id}
              style={{ width: "18rem" }}
            >
              <img
                src={chef?.profileUrl}
                className="card-img-top rounded-circle"
                alt={chef.name}
              />
              <div className="card-body">
                <h5 className="card-title">{chef.name}</h5>
                <p className="card-text">
                  <span className="fw-bold">
                    Specialties: <br />
                  </span>
                  {chef.abilities &&
                    chef?.abilities.map((ability, index) => (
                      <span key={index}>
                        {ability}
                        {index !== chef.abilities.length - 1 ? ", " : ""}
                      </span>
                    ))}
                </p>
                <div className="d-flex justify-content-between">
                  <label htmlFor="">
                    Select this{" "}
                    <input
                      type="radio"
                      name="chefId"
                      value={chef._id}
                      onChange={handleChefSelect}
                    />
                  </label>

                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/view/chef/${chef._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div></div>
        <label htmlFor="eventDate">Event Date</label>
        <input
          type="date"
          name="eventDate"
          id="eventDate"
          className="form-control mb-3"
          value={formData.eventDate}
          onChange={handleChange}
          required
        />

        <label htmlFor="name " className="">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <label htmlFor="mobile">Mobile Number</label>
        <input
          type="tel"
          name="mobile"
          id="mobile"
          className="form-control mb-3"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        <label htmlFor="address" className="mt-3">
          Address
        </label>
        <textarea
          type="text-area"
          name="address"
          id="address"
          value={formData.address}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />

        <label htmlFor="pincode">Pincode</label>
        <input
          type="text"
          name="pincode"
          id="pincode"
          className="form-control mb-3"
          value={formData.pincode}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default BookChef;
