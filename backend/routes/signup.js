const express = require('express');
const router = express.Router();
const db = require('../db/dbConnection');

// Route to handle user signup
router.post('/api/signup', (req, res) => {
    const { username, password, email } = req.body;

    // Check if username or email already exists
    const checkQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(checkQuery, [username, email], (err, results) => {
        if (err) {
            console.error('Error checking user existence:', err);
            res.status(500).json({ status: 'Error checking user existence', status_code: 500 });
            return;
        }
        if (results.length > 0) {
            res.status(400).json({ status: 'Username or email already exists', status_code: 400 });
            return;
        }

        // Insert new user
        const insertQuery = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        db.query(insertQuery, [username, password, email], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                res.status(500).json({ status: 'Error creating account', status_code: 500 });
                return;
            }
            res.status(200).json({ status: 'Account successfully created', status_code: 200, user_id: result.insertId });
        });
    });
});

module.exports = router;
