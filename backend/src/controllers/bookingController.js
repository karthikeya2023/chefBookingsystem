// bookingController.js

const Booking = require("../model/bookingModel");
const Chef = require("../model/chefModel");
const User = require("../model/userModel");

// Get bookings based on userId with complete user information
exports.getBookingsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ userId }).populate("userId");
    console.log(bookings); // Log bookings to see if it contains user information
    res.json(bookings);
  } catch (error) {
    console.error("Error in getBookingsByUserId:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get bookings based on chefId with complete chef information
exports.getBookingsByChefId = async (req, res) => {
  try {
    const chefId = req.params.chefId;
    const bookings = await Booking.find({ chefId })
      .populate("chefId", "name email abilities proposals")
      .populate("userId", "name email");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// bookingController.js
exports.bookChef = async (req, res) => {
  try {
    const {
      userId,
      chefId,
      bookingDate,
      eventDate,
      eventType,
      mobile,
      name,
      address,
    } = req.body;

    // Check if the chef exists
    const chef = await Chef.findById(chefId);
    if (!chef) {
      return res.status(404).json({ message: "Chef not found" });
    }

    // Check if the event type matches one of the pricing categories provided by the chef
    // const pricingCategories = Object.keys(chef.proposals[0].pricing);
    // if (!pricingCategories.includes(eventType)) {
    //   return res.status(400).json({ message: "Invalid event type" });
    // }

    // Create a new booking
    const booking = new Booking({
      userId,
      chefId,
      bookingDate,
      eventDate,
      eventType,
      mobile,
      name,
      address, // Include the address field in the booking
      status: "pending",
    });
    await booking.save();

    // Update the chef's bookings array
    chef.bookings.push(booking._id);
    await chef.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.approveBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    // Find the booking by ID
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update the booking status to 'approved'
    booking.status = "approved";
    await booking.save();

    res.status(200).json({ message: "Booking approved successfully", booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
