import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditRecipe() {
  const [recipeData, setRecipeData] = useState({
    recipeTitle: "",
    description: "",
    timeTaken: "",
    servings: "",
    steps: [""],
    youtube_url: "",
    ingredients: [""],
    imageURL: "",
  });
  const navigate = useNavigate();
  const { recipeId } = useParams();

  useEffect(() => {
    // Fetch recipe data from API
    fetch(`http://localhost:3000/api/recipe/${recipeId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update state with fetched recipe data
        setRecipeData(data);
      })
      .catch((error) => {
        console.error("Error fetching recipe data:", error);
      });
  }, [recipeId]); // Fetch data when recipeId changes

  const handleStepChange = (index, value) => {
    const updatedSteps = [...recipeData.steps];
    updatedSteps[index] = value;
    setRecipeData({ ...recipeData, steps: updatedSteps });
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...recipeData.ingredients];
    updatedIngredients[index] = value;
    setRecipeData({ ...recipeData, ingredients: updatedIngredients });
  };

  const addStep = () => {
    setRecipeData({ ...recipeData, steps: [...recipeData.steps, ""] });
  };

  const addIngredient = () => {
    setRecipeData({
      ...recipeData,
      ingredients: [...recipeData.ingredients, ""],
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch user ID from localStorage

    // Create a single object containing all form data
    const formData = {
      recipeTitle: recipeData.recipeTitle,
      description: recipeData.description,
      timeTaken: recipeData.timeTaken,
      servings: recipeData.servings,
      steps: recipeData.steps,
      youtube_url: recipeData.youtube_url,
      ingredients: recipeData.ingredients,
      imageURL: recipeData.imageURL,
    };

    // Send a POST request to the API endpoint
    fetch(`http://localhost:3000/api/recipe/edit/${recipeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log("Recipe Edit successfully:", data);
        navigate("/recipes");
        // Optionally, you can redirect the user or perform any other action
      })
      .catch((error) => {
        console.error("There was a problem adding the recipe:", error);
        // Handle errors here
      });
  };

  return (
    <div className="container">
      <div className="rw">
        <div className=" ">
          <h2 className="text-center pt-3">Edit Recipe</h2>
          <form onSubmit={handleSubmit} className="py-5">
            <div className="mb-3">
              <label htmlFor="recipeTitle" className="form-label">
                Recipe Title
              </label>
              <input
                type="text"
                className="form-control"
                name="recipeTitle"
                value={recipeData.recipeTitle}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, recipeTitle: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="youtube_url" className="form-label">
                Youtube URL
              </label>
              <input
                type="text"
                className="form-control"
                name="youtube_url"
                value={recipeData.youtube_url}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, youtube_url: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="imageURL" className="form-label">
                Image URL
              </label>
              <input
                type="text"
                className="form-control"
                name="imageURL"
                value={recipeData.imageURL}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, imageURL: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Recipe Description
              </label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                value={recipeData.description}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, description: e.target.value })
                }
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="timeTaken" className="form-label">
                Time Taken
              </label>
              <input
                type="text"
                className="form-control"
                name="timeTaken"
                value={recipeData.timeTaken}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, timeTaken: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="servings" className="form-label">
                Servings
              </label>
              <input
                type="number"
                className="form-control"
                name="servings"
                value={recipeData.servings}
                onChange={(e) =>
                  setRecipeData({ ...recipeData, servings: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Steps</label>
              {recipeData.steps.map((step, index) => (
                <div key={index} className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={step}
                    name="steps"
                    onChange={(e) => handleStepChange(index, e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={addStep}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
            <div className="mb-3">
              <label className="form-label">Ingredients</label>
              {recipeData.ingredients.map((ingredient, index) => (
                <div key={index} className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={ingredient}
                    name="ingredients"
                    onChange={(e) =>
                      handleIngredientChange(index, e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={addIngredient}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditRecipe;
