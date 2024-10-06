// import "../login.css";
// return (
//     <div className="login-page">
//       <div className="left-section">
//         <img src={logos} alt="ChefVeda Logo" className="logo" />
//         <h2 className="tagline">Book Your Perfect Chef Anytime, Anywhere</h2>
//       </div>
//       <div className="right-section">
//         <div className="login-form">
//           <h1>LOGIN</h1>
//           {error && <p className="error-message">{error}</p>}
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//             <label htmlFor="password">oldPASSWORD</label>
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">NewPASSWORD</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="signup-link">
//               <Link to="/signup">Don't you have an account click here to signup</Link><br></br>
             
//             </div>
//             <button type="submit" className="submit-btn">Submit</button>
//           </form>
//         </div>
        
//       </div>
//     </div>
//   );
// export 