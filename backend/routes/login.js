const express = require("express");
const router = express.Router();
const db = require("../db/dbConnection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const constants = require("../constants");

// Route to handle user login
router.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Query to find the user by username
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res
        .status(500)
        .json({ status: "Error logging in", status_code: 500 });
    }
    if (results.length === 0) {
      // If no user found, return error
      return res
        .status(401)
        .json({
          status: "Incorrect username/password provided. Please retry",
          status_code: 401,
        });
    }

    // User found, retrieve the user data
    const user = results[0];

    // Compare the provided password with the hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res
          .status(500)
          .json({ status: "Error logging in", status_code: 500 });
      }
      if (!isMatch) {
        // If password does not match, return error
        return res
          .status(401)
          .json({
            status: "Incorrect username/password provided. Please retry",
            status_code: 401,
          });
      }

      // Password matched, generate a token
      const userId = user.id;
      const accessToken = jwt.sign({ user_id: userId }, constants.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Send successful response with token
      res.status(200).json({
        status: "Login successful",
        status_code: 200,
        user_id: userId,
        access_token: accessToken,
      });
    });
  });
});

module.exports = router;
