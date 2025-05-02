const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    console.log('Posts fetched:', posts); // Debug log
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: err.message });
  }
});

// Create post
router.post('/', auth, async (req, res) => {
  console.log('Received post request:', req.body); // Debug log
  console.log('User from token:', req.user); // Debug log
  
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.user.id, // Make sure this matches the token payload
    category: req.body.category || 'General'
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;