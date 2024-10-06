// import React from "react";
// import Logo from "../assets/chef555.png";
// function Footer() {
//   return (
//     <div className="bg-warning-subtle border-top border-3 border-white  ">
//       <div className="container ">
//         <div className="d-flex py-5 gap-5">
//           <img src={Logo} alt="" width={150} height={100} />
//           <div className="d-flex flex-column gap-2 "> 
//             <h5>
//               <a href="" className="text-dark">Home</a>
//             </h5>
//             <h5>
//               <a href="/aboutus" className="text-dark">About Us</a>
//             </h5>
   
//             <h5>
//               <a href="" className="text-dark">Recipes</a>
//             </h5>
//           </div>

//         </div>
//       </div>
//         <div className="py-3 text-center border-top border-3 bg-info-subtle border-white"> Allrights reserved to &copy; Book a chef </div>
//     </div>
//   );
// }

// export default Footer;
import React from "react";
import '../footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div  className="line"></div>
      <div className="footer-content">
        <div className="footer-logo">
          <h2>CHEFVEDA</h2>
        </div>
        <div className="footer-contact">
          <p>123-456-7890</p>
          <p>info@mysite.com</p>
        </div>
        <div className="footer-address">
          <p>Baba Heights, Gate 4, </p>
           <p> Paramount Hills,
             Toli Chowki, Hyderabad
          </p>
        </div>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/aboutus">About Us</a>
        </div>
      </div>
      <div className="footer-divider"></div>
    </footer>
  );
}

export default Footer;