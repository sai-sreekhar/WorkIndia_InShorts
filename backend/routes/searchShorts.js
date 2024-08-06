const express = require("express");
const router = express.Router();
const db = require("../db/dbConnection");
const authenticateToken = require("../middleware/authMiddleware");

// Route to filter and search shorts
router.get("/api/shorts/filter", authenticateToken, (req, res) => {
  // Parse query parameter `query` which contains JSON string
  let filterQuery;
  try {
    filterQuery = JSON.parse(req.query.query);
  } catch (error) {
    return res
      .status(400)
      .json({ status: "Invalid query format", status_code: 400 });
  }

  const { filter, search } = filterQuery || {};

  // Base query
  let query = `
        SELECT id AS short_id, category, title, author, publish_date, content, actual_content_link, image, upvote AS votes_upvote, downvote AS votes_downvote
        FROM shorts
    `;

  const conditions = [];

  // Filter conditions
  if (filter) {
    if (filter.category) conditions.push(`category = '${filter.category}'`);
    if (filter.publish_date)
      conditions.push(`publish_date >= '${filter.publish_date}'`);
    if (filter.upvote) conditions.push(`upvote > ${filter.upvote}`);
  }

  // Search conditions
  if (search) {
    if (search.title) conditions.push(`title LIKE '%${search.title}%'`);
    if (search.keyword)
      conditions.push(
        `(title LIKE '%${search.keyword}%' OR content LIKE '%${search.keyword}%')`
      );
    if (search.author) conditions.push(`author LIKE '%${search.author}%'`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  query += `
        ORDER BY publish_date DESC, upvote DESC
    `;

  console.log(query);

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching filtered shorts:", err);
      return res
        .status(500)
        .json({
          message: "Error retrieving filtered shorts",
          status_code: 500,
        });
    }

    if (results.length === 0) {
      return res
        .status(400)
        .json({
          status: "No short matches your search criteria",
          status_code: 400,
        });
    }

    // Add flags for search results
    results = results.map((short) => ({
      ...short,
      contains_title: search.title ? short.title.includes(search.title) : false,
      contains_content: search.keyword
        ? short.content.includes(search.keyword)
        : false,
      contains_author: search.author
        ? short.author.includes(search.author)
        : false,
    }));

    res.status(200).json(results);
  });
});

module.exports = router;
