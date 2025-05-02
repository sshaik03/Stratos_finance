import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Divider,
} from '@mui/material';
import { getAllPosts, createPost } from '../api';

function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getAllPosts();
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch posts');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await createPost(newPost);
      console.log('Post created:', response.data);
      setNewPost({ title: '', content: '' });
      await fetchPosts(); // Refresh posts
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.response?.data?.message || 'Failed to create post');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Community Forum
      </Typography>

      {/* Create Post Form */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Create a New Post
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Content"
              multiline
              rows={4}
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              margin="normal"
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              sx={{ mt: 2 }}
            >
              Post
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Posts List */}
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      
      {posts.map((post) => (
        <Card key={post._id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Posted by {post.author.username} on{' '}
              {new Date(post.createdAt).toLocaleDateString()}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">{post.content}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default Community;