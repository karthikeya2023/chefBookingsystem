import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import Logo from "../assets/chef555.png";
import "../Header.css";

function Header() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
 const handleChangePassword=()=>{

 };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-profile')) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderRoleSpecificLinks = () => {
    if (userData?.role === "chef") {
      return (
        <>
          <a href="/add/recipe">Add A Recipe</a>
          <a href="/dashboard/chef">Chef Dashboard</a>
        </>
      );
    } else if (userData?.role === "admin") {
      return (
      <>
      <a href="/admin">Admin Dashboard</a>
      <a href="/add/recipe">Add A Recipe</a>
      <a href="/">Home</a>
      <a href="/chefs">Book Online</a>
      <a href="/book/chef">Book A Chef</a>
      <a href="/recipes">Recipes</a>
      <a href="/AboutUs">About</a>
      <a href="/Healthcarework">Healthcare</a>
      </>);
    }
    else if (userData?.role === "user") {
      return (
      <>
      <a href="/">Home</a>
      <a href="/chefs">Book Online</a>
      <a href="/book/chef">Book A Chef</a>
      <a href="/recipes">Recipes</a>
      <a href="/AboutUs">About</a>
      <a href="/Healthcarework">Healthcare</a>
      </>);
    }
    return null;
  };

  return (
    <header className="header">
      <div className="header-top">
        <h1 className="logo-text">CHEFVEDA</h1>
      </div>
      <div className="header-content">
        <img src={Logo} alt="CHEFVEDA" className="logo-image" />
        <nav className="nav-menu">
          {renderRoleSpecificLinks()}
        </nav>
        <div className="user-actions">
          
          {isLoggedIn ? (
            <div className="user-profile" onClick={toggleDropdown}>
              {userData?.photo ? (
                <img
                  src={userData.photo}
                  alt="User Profile"
                  className="user-photo"
                />
              ) : (
              <span className="user-initial">
                {userData?.name ? userData.name[0].toUpperCase() : 'U'}
              </span>
              )}
              {dropdownOpen && (
                <div className="dropdown-menu">
                  {userData?.role === "user" && (
                    <a href="/user/bookings">User Bookings</a>
                  )}
                  {userData?.role === "chef" && (
                    <a href={`/view/chef/${userData.chefID}`}>View Profile</a>
                  )}
                  <button onClick={handleLogout}>Logout</button>
                  {/* <button onClick={handleChangePassword}>changePassword</button>  */}
                </div>
              )}
            </div>
          ) : (
            <a href="/login" className="login-btn">Login</a>
          )}
        </div>
      </div>
      <div className="header-border"></div>
    </header>
  );
}

export default Header;
// import React from "react";
// import Logo from "../assets/chef555.png";
// import { useNavigate } from "react-router-dom";
// import { BiUserCircle } from "react-icons/bi";
// import { FaBell } from "react-icons/fa";
//  // Import the CSS file for styling

// function Header() {
//   const navigate = useNavigate();

//   // Check if there's a token in the local storage
//   const isLoggedIn = !!localStorage.getItem("token");
//   const handleBooking = () => {
//     if (isLoggedIn) {
//       navigate("/book/chef");
//     } else {
//       // Redirect to login page if not logged in
//       navigate("/login");
//     }
//   };

//   // Function to handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     // Perform any other logout-related actions if necessary
//     // For example, redirecting the user to the login page
//     navigate("/");
//   };
//   const userData = JSON.parse(localStorage.getItem("user"));
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg custom-navbar">
//         <div className="container">
//           <a className="navbar-brand" href="/">
//             <img src={Logo} alt="CHEFVEDA" width={100} height={70} />
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <a className="nav-link fs-5 fw-bold text-uppercase" href="/">
//                   Home
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a
//                   className="nav-link fs-5 fw-bold text-uppercase"
//                   href="/book/online"
//                 >
//                   Book Online
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a
//                   className="nav-link fs-5 fw-bold text-uppercase"
//                   href="/book/chef"
//                 >
//                   Book A Chef
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a
//                   className="nav-link fs-5 fw-bold text-uppercase"
//                   href="/recipes"
//                 >
//                   Recipes
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a
//                   className="nav-link fs-5 fw-bold text-uppercase"
//                   href="/AboutUs"
//                 >
//                   About
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link fs-5 fw-bold text-uppercase" href="/blog">
//                   Blog
//                 </a>
//               </li>
//               {userData?.role === "chef" && (
//                 <li className="nav-item">
//                   <a
//                     className="nav-link fs-5 fw-bold text-uppercase"
//                     href="/add/recipe"
//                   >
//                     Add A Recipe
//                   </a>
//                 </li>
//               )}
//               {userData?.role === "admin" && (
//                 <li className="nav-item">
//                   <a
//                     className="nav-link fs-5 fw-bold text-uppercase"
//                     href="/admin"
//                   >
//                     Admin Dashboard
//                   </a>
//                 </li>
//               )}
//               {userData?.role === "chef" && (
//                 <li className="nav-item">
//                   <a
//                     className="nav-link fs-5 fw-bold text-uppercase"
//                     href="/dashboard/chef"
//                   >
//                     Chef Dashboard
//                   </a>
//                 </li>
//               )}
//             </ul>
//             {userData?.role === "user" ? (
//               <a href="/user/bookings" className="text-dark">
//                 <BiUserCircle
//                   size={40}
//                   className="me-3"
//                   style={{ cursor: "pointer" }}
//                 />
//               </a>
//             ) : (
//               ""
//             )}
//             {userData?.role === "chef" ? (
//               <div
//                 className="text-dark"
//                 onClick={() => navigate(`/view/chef/${userData.chefID}`)}
//               >
//                 <BiUserCircle
//                   size={40}
//                   className="me-3"
//                   style={{ cursor: "pointer" }}
//                 />
//               </div>
//             ) : (
//               ""
//             )}
//             <FaBell size={30} className="me-3" style={{ cursor: "pointer" }} />
//             <button
//               className="btn btn-success text-uppercase me-3"
//               type="submit"
//               onClick={handleBooking}
//             >
//               Book A Chef
//             </button>
//             <form className="d-flex gap-3" role="search">
//               {isLoggedIn ? (
//                 <>
//                   <button
//                     className="btn btn-danger text-uppercase"
//                     type="button"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     className="btn btn-success text-uppercase"
//                     type="submit"
//                   >
//                     <a
//                       href="/login"
//                       className="text-white"
//                       style={{ textDecoration: "none" }}
//                     >
//                       Login
//                     </a>
//                   </button>
//                 </>
//               )}
//             </form>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

// export default Header;





/*
import React from "react";
import Logo from "../assets/chef555.png";
import { useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";

function Header() {
  const navigate = useNavigate();

  // Check if there's a token in the local storage
  const isLoggedIn = !!localStorage.getItem("token");
  const handleBooking = () => {
    if (isLoggedIn) {
      navigate("/book/chef");
    } else {
      // Redirect to login page if not logged in
      navigate("/login");
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Perform any other logout-related actions if necessary
    // For example, redirecting the user to the login page
    navigate("/");
  };
  const userData = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-warning-subtle py-3 ">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={Logo} alt="" width={100} height={70} />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active fs-5 fw-bold text-uppercase "
                  aria-current="page"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link fs-5 fw-bold text-uppercase"
                  href="/recipes"
                >
                  Recipes
                </a>
              </li>

              {userData?.role == "chef" ? (
                <li className="nav-item">
                  <a
                    className="nav-link fs-5 fw-bold text-uppercase"
                    href="/add/recipe"
                  >
                    Add A Recipe
                  </a>
                </li>
              ) : (
                ""
              )}
              {userData?.role == "admin" ? (
                <li className="nav-item">
                  <a
                    className="nav-link fs-5 fw-bold text-uppercase"
                    href="/add/recipe"
                  >
                    Add A Recipe
                  </a>
                </li>
              ) : (
                ""
              )}
              {userData?.role == "admin" ? (
                <li className="nav-item">
                  <a
                    className="nav-link fs-5 fw-bold text-uppercase"
                    href="/admin"
                  >
                    Admin Dasboard
                  </a>
                </li>
              ) : (
                ""
              )}
              {userData?.role == "chef" ? (
                <li className="nav-item">
                  <a
                    className="nav-link fs-5 fw-bold text-uppercase"
                    href="/dashboard/chef"
                  >
                    Chef Dashboard
                  </a>
                </li>
              ) : (
                ""
              )}
            </ul>
            {userData?.role == "user" ? (
              <a href="/user/bookings" className="text-dark">
                <BiUserCircle
                  size={40}
                  className="me-3"
                  style={{ cursor: "pointer" }}
                />
              </a>
            ) : (
              ""
            )}
            {userData?.role == "chef" ? (
              <div
                className="text-dark"
                onClick={()=>navigate(`/view/chef/${userData.chefID}`)}
              >
                <BiUserCircle
                  size={40}
                  className="me-3"
                  style={{ cursor: "pointer" }}
                />
              </div>
            ) : (
              ""
            )}

            <button
              className="btn btn-success text-uppercase me-3"
              type="submit"
              onClick={handleBooking}
            >
              Book A Chef
            </button>

            <form className="d-flex gap-3" role="search">
              {isLoggedIn ? (
                <>
                  <button
                    className="btn btn-danger text-uppercase"
                    type="button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-success text-uppercase"
                    type="submit"
                  >
                    <a
                      href="/login"
                      className="text-white"
                      style={{ textDecoration: "none" }}
                    >
                      Login
                    </a>
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
*/