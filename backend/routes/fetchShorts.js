const express = require('express');
const router = express.Router();
const db = require('../db/dbConnection');
const authenticateToken = require('../middleware/authMiddleware'); 

// Route to get the default feed
router.get('/api/shorts/feed', authenticateToken, (req, res) => {
    // SQL query to fetch and sort shorts
    const query = `
        SELECT id AS short_id, category, title, author, publish_date, content, actual_content_link, image, upvote AS votes_upvote, downvote AS votes_downvote
        FROM shorts
        ORDER BY publish_date DESC, upvote DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching shorts feed:', err);
            return res.status(500).json({ message: 'Error retrieving shorts feed', status_code: 500 });
        }

        // Respond with the list of shorts
        res.status(200).json(results);
    });
});

module.exports = router;
