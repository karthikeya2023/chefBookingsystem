// import React, { useState } from "react";

// function ChefSignup() {
//   const initialFormData = {
//     name: "",
//     email: "",
//     mobile: "",
//     documentUrl: "",
//     abilities: "",
//     profileUrl: "",
//   };

//   const [formData, setFormData] = useState(initialFormData);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const abilitiesArray = formData.abilities
//       .split(",")
//       .map((item) => item.trim());
//     const formDataWithAbilities = {
//       ...formData,
//       abilities: abilitiesArray,
//     };

//     try {
//       const response = await fetch("http://localhost:3000/api/chefs/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formDataWithAbilities),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       // Reset form after successful submission
//       setFormData(initialFormData);

//       // Optionally, you can handle further actions upon successful submission
//       console.log("Form data submitted successfully:", formDataWithAbilities);
//     } catch (error) {
//       console.error("Error submitting form data:", error);
//       // Optionally, you can handle error states or display an error message to the user
//     }
//   };

//   return (
//     <>
//       <h1 className="text-center pt-5">Welcome to Book a Chef</h1>
//       <p className="text-center fs-6 pt-2">
//         Fill Out the Below Details to register as a chef
//       </p>
//       <form className="container pt-3 pb-5" onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">
//             Name
//           </label>
//           <input
//             type="text"
//             className="form-control border border-dark"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">
//             Email
//           </label>
//           <input
//             type="email"
//             className="form-control border border-dark"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="mobile" className="form-label">
//             Mobile
//           </label>
//           <input
//             type="tel"
//             className="form-control border border-dark"
//             name="mobile"
//             value={formData.mobile}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="documentUrl" className="form-label">
//             Document URL
//           </label>
//           <input
//             type="url"
//             className="form-control border border-dark"
//             name="documentUrl"
//             value={formData.documentUrl}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="documentUrl" className="form-label">
//             Profile Pic URL
//           </label>
//           <input
//             type="url"
//             className="form-control border border-dark"
//             name="profileUrl"
//             value={formData.profileUrl}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="abilities" className="form-label">
//             Abilities of Chef (comma separated)
//           </label>
//           <textarea
//             className="form-control border border-dark"
//             name="abilities"
//             rows="3"
//             value={formData.abilities}
//             onChange={handleChange}
//           ></textarea>
//         </div>

//         <button
//           type="submit"
//           className="btn btn-primary btn-lg  text-uppercase mt-3"
//         >
//           Submit
//         </button>
//       </form>
//     </>
//   );
// }

// export default ChefSignup;

import React, { useState } from "react";
import "../ChefSignup.css"; // Make sure to create this CSS file

function ChefSignup() {
  const initialFormData = {
    name: "",
    email: "",
    mobile: "",
    documentUrl: "",
    profileUrl: "",
    abilities: "",
    experience: "",
    specialistDishes: [{ name: "", imageUrl: "" }],
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDishChange = (index, field, value) => {
    const updatedDishes = [...formData.specialistDishes];
    updatedDishes[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      specialistDishes: updatedDishes,
    }));
  };

  const addDish = () => {
    setFormData((prevData) => ({
      ...prevData,
      specialistDishes: [...prevData.specialistDishes, { name: "", imageUrl: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const abilitiesArray = formData.abilities
      .split(",")
      .map((item) => item.trim());
    const formDataWithAbilities = {
      ...formData,
      abilities: abilitiesArray,
    };

    try {
      const response = await fetch("http://localhost:3000/api/chefs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithAbilities),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setFormData(initialFormData);
      console.log("Form data submitted successfully:", formDataWithAbilities);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <div className="chef-signup">
      <div className="container">
        <h1>Welcome to CHEFVEDA</h1>
        <p>Fill Out the Below Details to register as a chef</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="documentUrl">Document URL</label>
            <input
              type="url"
              id="documentUrl"
              name="documentUrl"
              value={formData.documentUrl}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="profileUrl">Profile Pic URL</label>
            <input
              type="url"
              id="profileUrl"
              name="profileUrl"
              value={formData.profileUrl}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="abilities">Abilities of Chef (comma separated)</label>
            <textarea
              id="abilities"
              name="abilities"
              value={formData.abilities}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="experience">Chef Experience</label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Specialist Dishes</label>
            {formData.specialistDishes.map((dish, index) => (
              <div key={index} className="specialist-dish">
                <input
                  type="text"
                  placeholder="Dish Name"
                  value={dish.name}
                  onChange={(e) => handleDishChange(index, 'name', e.target.value)}
                />
                <input
                  type="url"
                  placeholder="Dish Image URL"
                  value={dish.imageUrl}
                  onChange={(e) => handleDishChange(index, 'imageUrl', e.target.value)}
                />
              </div>
            ))}
            <button type="button" className="btn-secondary" onClick={addDish}>
              Add Another Dish
            </button>
          </div>

          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChefSignup;
