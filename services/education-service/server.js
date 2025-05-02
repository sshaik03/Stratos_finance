const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8007;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Article Schema
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String },
  publishDate: { type: Date, default: Date.now },
  tags: [String]
});

const Article = mongoose.model('Article', articleSchema);

// Community Post Schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  publishDate: { type: Date, default: Date.now },
  replies: [
    {
      content: String,
      author: String,
      date: { type: Date, default: Date.now }
    }
  ]
});

const Post = mongoose.model('Post', postSchema);

// Routes
app.get('/api/education/articles', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    
    const articles = await Article.find(query).sort({ publishDate: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/education/community', async (req, res) => {
  try {
    const posts = await Post.find().sort({ publishDate: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/education/community', async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add this near the end of the file, before the app.listen call

// Add a root route for health check
app.get('/', (req, res) => {
  res.json({ status: 'Education service is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Education service running on port ${PORT}`);
});
