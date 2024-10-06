// import React, { useState, useEffect } from "react";
// import { BsArrowBarRight } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";

// function Recipes() {
//   const [recipes, setRecipes] = useState([]);
//   const navigate = useNavigate();
// console.log(recipes)
//   useEffect(() => {
//     fetchRecipes();
//   }, []);

//   const fetchRecipes = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/api/recipe/");
//       if (!response.ok) {
//         throw new Error("Failed to fetch recipes");
//       }
//       const data = await response.json();
//       setRecipes(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <div className="bg-success-subtle py-5">
//         <div className="d-flex container justify-content-between">
//           <h2 className="text-center">Explore the Recipes</h2>
//           <a href="/recipes" className="fs-5 text-upper">
//             All Recipes <BsArrowBarRight />
//           </a>
//         </div>
//         {recipes.length === 0 ? (
//           <p className="text-center fs-2 ">No recipes found</p>
//         ) : (
//           <div className="d-flex flex-wrap container gap-4 align-items-center justify-content-center pt-4">
//             {recipes.map((recipe) => (
//               <div
//                 className="card p-3 shadow"
//                 style={{ width: "18rem" }}
//                 key={recipe._id}
//               >
//                 <img
//                   src={
//                     typeof recipe.imageURL === "string"
//                       ? recipe.imageURL
//                       : "https://placehold.co/300"
//                   }
//                   className="card-img-top"
//                   alt={recipe.recipeTitle}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{recipe.recipeTitle}</h5>
//                   <p className="card-text">{recipe.description}</p>
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => navigate(`/view/recipe/${recipe._id}`)}
//                   >
//                     View Recipe
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Recipes;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Recipes.css";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/recipe/");
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const firstRecipe = recipes[0];

  return (
    <div className="recipes-container">
      
      <h1 className="recipes-header">MAKE YOUR FOOD</h1>
     
      {!firstRecipe ? (
        <p className="no-recipes">No recipes found</p>
      ) : (
        <div className="recipe-showcase">
          
          <div className="recipe-image">
            <img
              src={firstRecipe.imageURL || "https://placehold.co/300"}
              alt={firstRecipe.recipeTitle}
            />
          </div>
          <div className="recipe-details">
            <div className="info-grid">
              <div className="info-item">
                <h4>NAME OF THE DISH</h4>
                <p>{firstRecipe.recipeTitle}</p>
              </div>
              <div className="info-item">
                <h4>SERVERS</h4>
                <p>{firstRecipe.servings}</p>
              </div>
              <div className="info-item">
                <h4>TIME TAKEN</h4>
                <p>{firstRecipe.timeTaken}</p>
              </div>
              <div className="info-item">
                <h4>HEALTHY FOR</h4>
                <p>{firstRecipe.good_for}</p>
              </div>
            </div>
          </div>
          
        </div>
      
      )}
       <a href="/recipes" className="all-recipes-link">All Recipes →</a> 
    </div>
  );
}

export default Recipes;