import React, { useState } from "react";

function AddRecipe() {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeTaken, setTimeTaken] = useState("");
  const [servings, setServings] = useState("");
  const [healthyFor, setHealthyFor] = useState("");
  const [steps, setSteps] = useState([""]);
  const [youtube_url, setYoutube_url] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [imageURL, setImageURL] = useState("");

  const handleStepChange = (index, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("user"));

    // Fetch user ID from localStorage

    // Create a single object containing all form data
    const formData = {
      recipeTitle,
      description,
      timeTaken,
      servings,
      healthyFor,
      steps,
      youtube_url,
      ingredients,
      imageURL,
      // userId, // Include userId in the form data
    };

    // Send a POST request to the API endpoint
    fetch(`http://localhost:3000/api/recipe/add/${userData._id}`, {
      method: "POST",
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
        console.log("Recipe added successfully:", data);
        setRecipeTitle("");
        setDescription("");
        setTimeTaken("");
        setServings("");
        setSteps([""]);
        setYoutube_url("");
        setIngredients([""]);
        setImageURL("");

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
          <h2 className="text-center pt-3">Add Recipe</h2>
          <form onSubmit={handleSubmit} className="py-5">
            <div className="mb-3">
              <label htmlFor="recipeTitle" className="form-label">
                Recipe Title
              </label>
              <input
                type="text"
                className="form-control"
                name="recipeTitle"
                value={recipeTitle}
                onChange={(e) => setRecipeTitle(e.target.value)}
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
                value={youtube_url}
                onChange={(e) => setYoutube_url(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="youtube_url" className="form-label">
                Image URL
              </label>
              <input
                type="text"
                className="form-control"
                name="imageURL"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                value={timeTaken}
                onChange={(e) => setTimeTaken(e.target.value)}
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
                value={servings}
                onChange={(e) => setServings(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="healthyFor" className="form-label">
                  Healthy For
              </label>
              <input
                type="text"
                className="form-control"
                name="healthyFor"
                value={healthyFor}
                onChange={(e) => setHealthyFor(e.target.value)}
                />
            </div>
                            
            
            <div className="mb-3">
              <label className="form-label">Steps</label>
              {steps.map((step, index) => (
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
              {ingredients.map((ingredient, index) => (
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

export default AddRecipe;
