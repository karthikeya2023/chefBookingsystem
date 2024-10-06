// recipeRoutes.js

const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");

// Routes
router.post("/add/:userId", recipeController.addRecipe);
router.post("/:recipe_id/review", recipeController.addReviewToRecipe);
router.put("/edit/:recipe_id", recipeController.updateRecipe);
router.delete("/:recipe_id", recipeController.deleteRecipe);
router.get("/", recipeController.getAllRecipes);
router.get("/:recipe_id", recipeController.getRecipeById);
router.get("/:recipe_id/reviews", recipeController.getAllReviewsForRecipe);
// Define route to get recipes by chef ID
router.get("/recipes/chef/:chef_id", recipeController.getRecipesByChefId);
router.get('/latest',recipeController.latest)

module.exports = router;
