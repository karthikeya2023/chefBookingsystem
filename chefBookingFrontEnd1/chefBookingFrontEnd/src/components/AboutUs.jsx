import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import aboutUs from'../assets/aboutUs.png'

// Introduction Section
const Introduction = () => (
  <section className="mt-5">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src={aboutUs}
            className="img-fluid rounded-circle"
            alt="Introduction"
          />
        </div>
        <div className="col-md-6">
          <h2>Welcome to Book a Cook</h2>
          <p>
            At Book a Cook, we connect food enthusiasts with top chefs to create unforgettable dining experiences. Whether you're looking to hire a chef for a special event or seeking a new career opportunity as a chef, we have something for everyone.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// How It Works Section
const HowItWorks = () => (
  <section className="mt-5 bg-light py-5">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6 order-md-2">
          <img 
            src="https://www.pixelstalk.net/wp-content/uploads/2016/10/Cooking-Wallpapers-HD-Free-Download.jpg"
            className="img-fluid rounded-circle"
            alt="How It Works"
          />
        </div>
        <div className="col-md-6 order-md-1">
          <h2>How It Works</h2>
          <div className="row">
            <div className="col-md-12 mb-3">
              <h4>For Users</h4>
              <p>
                Browse through our list of professional chefs, read their profiles and reviews, and book the perfect chef for your event or meal. Our easy-to-use platform ensures a seamless booking experience.
              </p>
            </div>
            <div className="col-md-12">
              <h4>For Chefs</h4>
              <p>
                Sign up and create your profile to showcase your culinary skills. Connect with potential clients, manage your bookings, and take your culinary career to the next level.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Our Mission Section
const OurMission = () => (
  <section className="mt-5">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src="https://img.freepik.com/premium-photo/chef-cooking-restaurant_670382-123139.jpg"
            className="img-fluid rounded-circle"
            alt="Our Mission"
          />
        </div>
        <div className="col-md-6">
          <h2>Our Mission</h2>
          <p>
            Our mission is to revolutionize the way people experience food by making it easy to book talented chefs for any occasion. We aim to support chefs in their culinary careers while providing exceptional service to our users.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// Contact Us Section
const ContactUs = () => (
  <section className="mt-5 bg-light py-5">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6 order-md-2">
          <img
            src="https://img.freepik.com/premium-photo/young-chef-woman-with-tray-isolated-white-background-making-phone-gesture-call-me-back-sign_1368-379169.jpg"
            className="img-fluid rounded-circle"
            alt="Contact Us"
          />
        </div>
        <div className="col-md-6 order-md-1">
          <h2>Contact Us</h2>
          <p>
            Have questions or need assistance? Reach out to us at <a href="mailto:support@bookacook.com">support@bookacook.com</a> or call us at (123) 456-7890. We're here to help!
          </p>
        </div>
      </div>
    </div>
  </section>
);

// AboutUS Component
const AboutUS = () => (
  <>
    <Introduction />
    <HowItWorks />
    <OurMission />
    <ContactUs />
  </>
);

export default AboutUS;
