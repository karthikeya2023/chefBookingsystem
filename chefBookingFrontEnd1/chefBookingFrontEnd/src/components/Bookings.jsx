import React, { useEffect, useState } from "react";

function getStatusBadge(status) {
  switch (status) {
    case "pending":
      return <span className="badge bg-danger">Waiting For Chef Approval</span>;
    case "approved":
      return (
        <span className="badge bg-success">Your booking was approved</span>
      );
    case "confirmed":
      return <span className="badge bg-primary">Confirmed</span>;
    default:
      return <span className="badge bg-secondary">{status}</span>;
  }
}

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings data from API using userId from localStorage


    const userId = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:3000/api/booking/user/${userId._id}`)
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array to run effect only once on component mount

  return (
    <>
    
      <h1 className="text-center py-5">My Bookings</h1>
      <div className="container d-flex gap-5  pb-5 mb-5 ">
        {bookings.map((booking) => (
          <div className="card" key={booking._id}>
            <div className="card-body">
              <h5 className="card-title">{booking.name}</h5>
              <p className="card-text">{getStatusBadge(booking.status)}</p>

              <p className="card-text">
                <strong>Booking Date:</strong>{" "}
                {new Date(booking.bookingDate).toLocaleDateString()}
              </p>
              <p className="card-text">
                <strong>Event Date:</strong>{" "}
                {new Date(booking.eventDate).toLocaleDateString()}
              </p>
              <p className="card-text">
                <strong>Event Type:</strong> {booking.eventType}
              </p>
              <p className="card-text">
                <strong>Address:</strong> {booking.address}
              </p>
              <p className="card-text">
                <strong>Name:</strong> {booking.userId.name}
              </p>
              <p className="card-text">
                <strong>Email:</strong> {booking.userId.email}
              </p>
              <p className="card-text">
                <strong>Mobile:</strong> {booking.mobile}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Bookings;
