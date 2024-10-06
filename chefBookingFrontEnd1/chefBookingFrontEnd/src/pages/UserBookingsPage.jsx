import React from "react";
import Header from "../components/Header";
import Bookings from "../components/Bookings";
import Footer from "../components/Footer";
import WhatsAppIcon from "../components/WhatsAppIcon";
import UserProfile from "../components/userProfile";

function UserBookingsPage() {
  return (
    <>
      <Header />
      <UserProfile/>
      <Bookings />
      <WhatsAppIcon />
      <Footer />
    </>
  );
}

export default UserBookingsPage;
