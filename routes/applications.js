const express = require("express");
const pool = require("../db"); // PostgreSQL connection
const router = express.Router();

// POST /applications → Submit a job application
router.post("/", async (req, res) => {
    try {
        const { job_id, applicant_name, applicant_email, cover_letter } = req.body;

        // Check if all required fields are provided
        if (!job_id || !applicant_name || !applicant_email || !cover_letter) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        // Validate job_id exists before inserting application
        const jobCheck = await pool.query("SELECT * FROM jobs WHERE id = $1", [job_id]);
        if (jobCheck.rows.length === 0) {
            return res.status(400).json({ error: `Job with id ${job_id} does not exist.` });
        }

        // Insert application into the database
        const result = await pool.query(
            "INSERT INTO applications (job_id, applicant_name, applicant_email, cover_letter) VALUES ($1, $2, $3, $4) RETURNING *",
            [job_id, applicant_name, applicant_email, cover_letter]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
});

// GET /applications → Fetch all applications
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM applications ORDER BY submitted_at DESC");
        res.json(result.rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /applications/:job_id → Get applications for a specific job
router.get("/:job_id", async (req, res) => {
    try {
        const { job_id } = req.params;

        // ❗ Check if job_id exists before querying applications
        const jobCheck = await pool.query("SELECT * FROM jobs WHERE id = $1", [job_id]);
        if (jobCheck.rows.length === 0) {
            return res.status(400).json({ error: `Job with id ${job_id} does not exist.` });
        }

        const result = await pool.query("SELECT * FROM applications WHERE job_id = $1 ORDER BY submitted_at DESC", [job_id]);
        res.json(result.rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
