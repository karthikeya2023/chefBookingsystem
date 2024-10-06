const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
  recipeTitle: {
    type: String,
  },
  description: {
    type: String,
  },
  timeTaken: {
    type: String, // Assuming you store time taken as a string for flexibility
  },
  servings: {
    type: Number,
  },
  good_for:{
    type:String,
  },
  steps: [
    {
      type: String,
    },
  ],
  ingredients: [
    {
      type: String,
    },
  ],
  chef_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chef",
  },
  youtube_url: String,
  imageURL:String,
  reviews: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      review_text: {
        type: String,
      },
      comment: String,
    },
  ],
});

module.exports = mongoose.model("Recipe", recipeSchema);
