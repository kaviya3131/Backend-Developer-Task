const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const jobsRouter = require("./routes/jobs");
const applicationsRouter = require("./routes/applications");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend

// Routes
app.use("/jobs", jobsRouter);
app.use("/applications", applicationsRouter);

// Serve index.html for the frontend
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
