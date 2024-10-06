import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewBooking = () => {
  // State to hold chef data
  const [booking, setBooking] = useState(null);

  const { id } = useParams();
  // Function to fetch chef data
  const fetchBookingData = async () => {
    try {
      // Make API call to fetch chef data
      const response = await fetch(
        `http://localhost:3000/api/booking/bookings/${id}`
      );
      const data = await response.json();

      // Update component state with fetched chef data
      setBooking(data);
    } catch (error) {
      console.error("Error fetching chef data:", error);
    }
  };

  // Fetch chef data when component mounts
  useEffect(() => {
    fetchBookingData();
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

  // Render chef details if data is available
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          {booking && (
            <div>
              <h2>Chef Details</h2>
              <div className="card my-5">
                <div className="card-body">
                  <h5 className="card-title d-flex justify-content-between ">
                    {booking.name}
                    <h6>
                      <span
                        className={`badge ${
                          booking.status ==="approved" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {booking.status
                          ? "Waiting for Chef approval"
                          : "Your status is pending/rejected"}
                      </span>
                    </h6>
                  </h5>
                  <p className="card-text">
                    <strong>Event Date:</strong>{" "}
                    {new Date(booking.eventDate).toISOString().substr(0, 10)}
                  </p>
                  <p className="card-text">
                    <strong>Address:</strong> {booking.address}
                  </p>
                  <p className="card-text">
                    <strong>Event:</strong> {booking.eventType}
                  </p>{" "}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBooking;
