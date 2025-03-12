const express = require("express");
const pool = require("../db");
const router = express.Router();

// Get all jobs
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM jobs ORDER BY created_at DESC");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get job by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Create a new job
router.post("/", async (req, res) => {
    try {
        const { title, description, company, location } = req.body;
        const result = await pool.query(
            "INSERT INTO jobs (title, description, company, location) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, description, company, location]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
