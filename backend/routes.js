const express = require('express');
const router = express.Router();

// Import route files
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const shortCreate = require('./routes/shortsCreate');
const fetchShorts = require('./routes/fetchShorts');
const searchShorts = require('./routes/searchShorts');

// Use the routes
router.use(signupRoutes);
router.use(loginRoutes);
router.use(shortCreate);
router.use(fetchShorts);
router.use(searchShorts);

module.exports = router;
