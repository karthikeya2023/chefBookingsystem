// bookingRoutes.js

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Routes
router.get('/user/:userId', bookingController.getBookingsByUserId);
router.get('/chef/:chefId', bookingController.getBookingsByChefId);
router.get('/allbookings', bookingController.getAllBookings);
router.post('/bookachef', bookingController.bookChef);
router.post('/approve/:bookingId', bookingController.approveBooking)
router.get("/bookings/:bookingId", bookingController.getBookingById);

module.exports = router;
