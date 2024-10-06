// chefModel.js

const mongoose = require("mongoose");

const chefSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  abilities: [String],
  documentUrl: String,
  approved: Boolean,
  isChef: { type: Boolean, default: false }, // Indicates if the user is a chef
  profileUrl: String, // New property for profile URL
  imageURL: String, // Adding imageURL property
  experience:String,
  specialistDishes:[{
    name:String,
    imageUrl:String
  }],
  proposals: [
    {
      pricing: {
        chef_at_home: Number,
        chef_at_small_event: Number,
        chef_at_big_event: Number,
      },
      availability: [
        {
          start_date: Date,
          end_date: Date,
          location:String,
        },
      ],
    },
  ],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
});

module.exports = mongoose.model("Chef", chefSchema);
