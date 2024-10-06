import React from "react";
import "../App.css";
import { FaWhatsapp } from "react-icons/fa6";

function WhatsAppIcon() {
  return (
    <div className="whatsapp-icon">
      <a
        href="https://web.whatsapp.com/send?phone=+919182928474&amp;text=Hi"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={60} style={{ color: "green" }} className="" />
      </a>
    </div>
  );
}

export default WhatsAppIcon;
