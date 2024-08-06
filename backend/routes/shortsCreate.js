const express = require('express');
const router = express.Router();
const db = require('../db/dbConnection');
const authenticateToken = require('../middleware/authMiddleware'); 
const validateApiKey = require('../middleware/apikeyMiddleware'); 

// Route to create a news post
router.post('/api/shorts/create', validateApiKey, authenticateToken, (req, res) => {
    const { category, title, author, publish_date, content, actual_content_link, image, votes } = req.body;

    console.log(req.body);

    // Validate request data
    if (!category || !title || !author || !publish_date || !content) {
        return res.status(400).json({ message: 'Missing required fields', status_code: 400 });
    }

    // Insert new news post into the database
    const query = `
        INSERT INTO shorts (category, title, author, publish_date, content, actual_content_link, image, upvote, downvote)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        category,
        title,
        author,
        new Date(publish_date), // Ensure publish_date is in the proper format
        content,
        actual_content_link || '',
        image || '',
        votes.upvote || 0,
        votes.downvote || 0
    ];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting news post:', err);
            return res.status(500).json({ message: 'Error adding short', status_code: 500 });
        }

        // Respond with success message and the new short_id
        res.status(200).json({
            message: 'Short added successfully',
            short_id: result.insertId,
            status_code: 200
        });
    });
});

module.exports = router;
