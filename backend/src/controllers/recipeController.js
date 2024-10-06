const Recipe = require("../model/recipeModel");
const User = require("../model/userModel");
// Add a new recipe
exports.addRecipe = async (req, res) => {
  try {
    // Check if the user is authorized (role === chef or admin)
    const userId = req.params.userId; // Assuming userId is passed as a parameter

    const user = await User.findById(userId);

    if (!user || (user.role !== "chef" && user.role !== "admin")) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Create a new recipe based on the request body
    const {
      recipeTitle,
      description,
      timeTaken,
      servings,
      healthyFor,
      steps,
      ingredients,
      youtube_url,
      imageURL, // Adding imageURL property

    } = req.body;

    const recipe = new Recipe({
      recipeTitle,
      description,
      timeTaken,
      servings,
      steps,
      good_for:healthyFor,
      ingredients,
      chef_id: userId, // Assuming the logged-in user is the chef creating the recipe
      youtube_url,
      imageURL
    });

    // Save the recipe to the database
    await recipe.save();

    res.status(201).json({ message: "Recipe added successfully", recipe });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Other controller methods remain unchanged...

// Edit recipe details
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.recipe_id,
      req.body,
      { new: true }
    );
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipe_id;

    // Find the recipe by ID and delete it
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted successfully", recipe: deletedRecipe });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipe_id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Add a review to a recipe
exports.addReviewToRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipe_id;
    const { review_text, userId } = req.body; // Extract userId from request body

    // Find the recipe by ID
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Create a new review object
    const newReview = {
      review_text,
      user_id: userId, // Store the user ID with the review
    };

    // Add the review to the recipe's reviews array
    recipe.reviews.push(newReview);

    // Save the updated recipe
    await recipe.save();

    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reviews for a recipe
exports.getAllReviewsForRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipe_id;

    // Find the recipe by ID and populate the user_id field in the reviews array
    const recipe = await Recipe.findById(recipeId).populate({
      path: "reviews",
      populate: {
        path: "user_id",
        model: "User", // Use the User model
        select: "name", // Assuming the name field exists in the User schema
      },
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Return the reviews for the recipe with user names
    res.json(recipe.reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getRecipesByChefId = async (req, res) => {
  try {
    const chefId = req.params.chef_id; // Assuming chefId is passed as a parameter

    // Find recipes where the chef_id matches the provided chefId
    const recipes = await Recipe.find({ chef_id: chefId });

    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ message: "Recipes not found for this chef" });
    }

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
exports.latest=async (req, res) => {
  try {
    const latestRecipe = await Recipe.findOne().sort({ createdAt: -1 });
    if (!latestRecipe) {
      return res.status(404).json({ message: 'No recipes found' });
    }
    res.json(latestRecipe);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};