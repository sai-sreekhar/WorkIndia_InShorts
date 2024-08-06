const constants = require('../constants');

function apiKeyMiddleware(req, res, next) {
    const apiKey = req.headers['api-key'];
    if (apiKey && apiKey === constants.API_KEY) {
        next(); 
    } else {
        res.status(403).json({ message: 'Forbidden: Invalid API key', status_code: 403 });
    }
}

module.exports = apiKeyMiddleware;
