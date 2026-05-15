const express = require("express");
const cors = require("cors"); // ✅ added
const cookieParser = require("cookie-parser");

const app = express();

// Enable CORS for the frontend application why we need cors? because our frontend and backend are running on different ports during development, and CORS allows the frontend to make requests to the backend without being blocked by the browser's same-origin policy.
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json()); //why? to parse incoming JSON requests and make the data available in req.body
app.use(cookieParser());

// require routes
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

// use routes
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;