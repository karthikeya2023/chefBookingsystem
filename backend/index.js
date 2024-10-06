const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const connectToDatabase = require("./src/config/database");
const cors = require("cors");
const chefRoutes = require("./src/routes/chefRoutes");
const authRoutes = require("./src/routes/authRoutes");
const recipeRoutes = require("./src/routes/recipeRoutes");
const bookChefRoutes = require("./src/routes/bookingRoutes");

const helmet = require("helmet");
dotenv.config();
const helmetCsp = require("helmet-csp");
const rateLimit = require("express-rate-limit");
const app = express();

//** Middleware */
app.use(helmet()); // Set security headers
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 600, // Limit each IP to 100 requests per windowMs
});
app.use(express.json());

app.use(
  helmetCsp({
    directives: {
      defaultSrc: ["'self'"], // Allow resources to be loaded from the same origin by default
      scriptSrc: ["'self'", "trusted-scripts.com"], // Define trusted sources for scripts
      // Add other CSP directives as needed
    },
  })
);
app.use(limiter); // Rate limiting
const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
//**  Set up session and flash middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

// Initialize Passport

// Connect to MongoDB
connectToDatabase(); // Call the database connection function
// Start the server
const PORT = process.env.PORT || 5173;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
app.use("/api/chefs", chefRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/recipe", recipeRoutes);
app.use("/api/booking", bookChefRoutes);

// Error handling for app.listen
server.on("error", (error) => {
  console.error("Server error:", error);
});
