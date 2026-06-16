const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// ---------------------------------------------------------------------------
// CORS — allow specific origins only (no wildcard in production)
// Add any additional Vercel preview URLs or custom domains here as needed.
// ---------------------------------------------------------------------------
const ALLOWED_ORIGINS = [
  // ── Production ──────────────────────────────────────────────────────────
  "https://luxora-premium-e-commerce-applicati.vercel.app",

  // ── Local development ────────────────────────────────────────────────────
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:8081",
  "http://localhost:8082",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server / curl requests (no Origin header) and whitelisted origins
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error(`CORS policy does not allow origin: ${origin}`));
    }
  },
  credentials: true,                          // required if frontend sends cookies / Authorization headers
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

// Apply CORS middleware — must be before any route definitions
app.use(cors(corsOptions));

// Explicitly handle pre-flight OPTIONS requests for all routes
app.options("*", cors(corsOptions));

app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Luxora Backend Running...");
});

// MongoDB Connection

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo Error:", err);
  });