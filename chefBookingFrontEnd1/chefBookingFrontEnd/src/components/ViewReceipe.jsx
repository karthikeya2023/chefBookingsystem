import React, { useEffect, useState } from "react";
import { CiTimer } from "react-icons/ci";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdPerson2 } from "react-icons/md";
import { useParams } from "react-router-dom";
import "../ViewRecipe.css";

function ViewRecipe() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const userId = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/recipe/${recipeId}`);
        if (!response.ok) throw new Error("Failed to fetch recipe");
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
    fetchReviews();
  }, [recipeId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/recipe/${recipeId}/reviews`);
      if (!response.ok) throw new Error("Failed to fetch reviews");
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleReviewSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/recipe/${recipeId}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review_text: reviewText, userId: userId._id }),
      });
      if (!response.ok) throw new Error("Failed to add review");
      setReviewText("");
      fetchReviews();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="recipe-container">
      <div className="recipe-header">
        <div className="recipe-image">
          <img src={recipe.imageURL || "https://placehold.co/300"} alt={recipe.recipeTitle} />
        </div>
        <div className="recipe-details">
          <h2 className="dish-name">Name of the Dish</h2>
          <p className="dish-title">{recipe.recipeTitle}</p>
          <div className="recipe-info">
            <div className="info-item">
              <p>Serves</p>
              <div><BsFillPeopleFill /> {recipe.servings}</div>
            </div>
            <div className="info-item">
              <p>Time Taken</p>
              <div><CiTimer /> {recipe.timeTaken}</div>
            </div>
            <div className="info-item">
              <p>Healthy For</p>
              <div>{recipe.good_for}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="recipe-body">
        <div className="ingredients">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        <div className="instructions">
          <h2>How To Make It</h2>
          {recipe.steps.map((step, index) => (
            <div key={index} className="step">
              <h3>Step {index + 1}</h3>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="reviews-section">
        <h2>Reviews</h2>
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <div className="review-header">
              <MdPerson2 size={30} />
              <h5>{review.user_id?.name || "Anonymous"}</h5>
            </div>
            <p>{review.review_text}</p>
          </div>
        ))}

        <div className="add-review">
          <h3>Add Your Review</h3>
          <textarea
            value={reviewText}
            onChange={handleReviewTextChange}
            placeholder="Write your review here..."
          />
          <button onClick={handleReviewSubmit}>Submit Review</button>
        </div>
      </div>
    </div>
  );
}

export default ViewRecipe;
