import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../RecipeList.css"; // We'll create this CSS file for custom styles

function RecipeList() {
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

  return (
    <div className="recipe-list-container">
      <h2 className="recipe-list-header">Explore the Wide Range of Recipes</h2>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div className="recipe-card" key={recipe._id}>
            <img
              src={recipe.imageURL || "https://placehold.co/300"}
              alt={recipe.recipeTitle}
              className="recipe-image"
            />
            <div className="recipe-info">
              <h3 className="recipe-title">{recipe.recipeTitle}</h3>
              <div className="recipe-details">
                <div className="detail-item">
                  <span className="detail-label">Time Takes</span>
                  <span className="detail-value">{recipe.timeTaken}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Succulent Starters</span>
                  <span className="detail-value">{recipe.servings}</span>
                </div>
              </div>
              <button
                className="view-recipe-btn"
                onClick={() => navigate(`/view/recipe/${recipe._id}`)}
              >
                VIEW RECIPE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeList;