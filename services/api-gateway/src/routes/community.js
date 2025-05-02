const express = require('express');
const router = express.Router();
const axios = require('axios');

const COMMUNITY_SERVICE_URL = process.env.COMMUNITY_SERVICE_URL;

router.get('/posts', async (req, res) => {
  try {
    const response = await axios.get(`${COMMUNITY_SERVICE_URL}/api/posts`);
    res.json(response.data);
  } catch (error) {
    console.error('Community service error:', error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

module.exports = router;