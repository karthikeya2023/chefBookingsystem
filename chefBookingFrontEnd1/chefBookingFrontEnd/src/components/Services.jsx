import React from "react";
import { Link } from "react-router-dom";  // Make sure to import Link from react-router-dom
import PersonalizedMenus from "../assets/personalised-menu.png";
import CookingClasses from "../assets/cooking-classes.png";
import MealPrepServices from "../assets/meal-prep-services.png";
import BirthdayImage from "../assets/Birthday.webp";
import HouseWarmingImage from "../assets/houseWarming.webp";
import GuestsImage from "../assets/guests.webp";
import PoojaAtHomeImage from "../assets/poojaAtHome.webp";
import '../services.css'

function Services() {
  return (
    <>
      <div className="services-section">
 
        <div className="services-container">
          <h2 className="services-heading" >Our Services</h2>
          <p className="services-description">
            Discover a world of exquisite culinary experiences with ChefVeda. Explore a variety of delectable
            recipes and their detailed procedures tailored to tantalize your taste buds.
          </p>
          <div className="services-list">
            <ServiceCard
              image={PersonalizedMenus}
              title="Personalized Menus"
              description="Indulge in customized menus curated just for you. From intimate dinners to lavish events, savor every bite of our meticulously crafted dishes."
            />
            <ServiceCard
              image={CookingClasses}
              title="Cooking Classes"
              description="Embark on a culinary journey with our interactive cooking classes. Learn the secrets behind each recipe and master the art of creating gourmet delights."
            />
            <ServiceCard
              image={MealPrepServices}
              title="Meal Prep Services"
              description="Simplify your life with our meal prep services. Enjoy wholesome and delicious meals prepared with care, ready to be savored at your convenience."
            />
          </div>
        </div>
      </div>

      <div className="upcoming-events-section">
        <div className="container">
          <h2 className="upcoming-events-heading">Upcoming Events</h2>
          <div className="events-grid">
            <EventCard
              image={BirthdayImage}
              title="Birthday"
            />
            <EventCard
              image={HouseWarmingImage}
              title="House warming"
            />
            <EventCard
              image={GuestsImage}
              title="Guests"
            />
            <EventCard
              image={PoojaAtHomeImage}
              title="Pooja At Home"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function ServiceCard({ image, title, description }) {
  return (
    <div className="rounded-lg shadow-md p-6 text-center flex flex-col items-center max-w-xs">
      <img src={image} alt={title} className="w-24 h-20 rounded-full mb-4" />
      <h3 className="text-xl font-semibold text-purple-800 mb-2">{title}</h3>
      <p className="service-description">{description}</p>
    </div>
  );
}


function EventCard({ image, title }) {
  return (
    <Link to="/chefs" className="event-card">
      <img src={image} alt={title} className="event-image" />
      <h3 className="event-title">{title}</h3>
    </Link>
  );
}

export default Services;