import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Paper,
  IconButton,
  Chip
} from '@mui/material';
import { 
  Forum as ForumIcon,
  PersonOutline as PersonIcon,
  Send as SendIcon,
  ThumbUp as ThumbUpIcon,
  ChatBubble as ReplyIcon
} from '@mui/icons-material';
import { communityService } from '../services/api';

function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: 'John Doe' // In a real app, this would come from authentication
  });
  
  // Mock user ID (in a real app, this would come from authentication)
  const userId = "user123";
  
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await communityService.getPosts();
      console.log('Fetched posts:', response);
      
      // Handle different response formats
      let postsData = [];
      if (Array.isArray(response)) {
        postsData = response;
      } else if (response && response.data) {
        postsData = Array.isArray(response.data) ? response.data : [];
      }
      
      console.log('Posts data to display:', postsData);
      setPosts(postsData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load community posts. Please try again later.");
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  const handleAddPost = async () => {
    try {
      if (!newPost.title.trim() || !newPost.content.trim()) {
        alert("Please fill in both title and content for your post");
        return;
      }

      const postToAdd = {
        ...newPost,
        userId,
        publishDate: new Date().toISOString(),
        replies: []
      };
      
      console.log('Adding post:', postToAdd);
      await communityService.addPost(postToAdd);
      
      // Close dialog and reset form
      setOpenDialog(false);
      setNewPost({
        title: '',
        content: '',
        author: 'John Doe'
      });
      
      // Force a refresh of the posts
      setTimeout(() => {
        fetchPosts();
      }, 500);
    } catch (err) {
      console.error("Error adding post:", err);
      alert(`Failed to add post: ${err.message}`);
    }
  };

  const handleAddReply = async (postId) => {
    try {
      if (!replyText.trim()) {
        alert("Please enter a reply");
        return;
      }

      const replyData = {
        postId,
        content: replyText,
        author: 'John Doe', // In a real app, this would come from authentication
        date: new Date().toISOString()
      };
      
      console.log('Adding reply:', replyData);
      await communityService.addReply(postId, replyData);
      
      // Reset form and replyingTo state
      setReplyText('');
      setReplyingTo(null);
      
      // Force a refresh of the posts
      setTimeout(() => {
        fetchPosts();
      }, 500);
    } catch (err) {
      console.error("Error adding reply:", err);
      alert(`Failed to add reply: ${err.message}`);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value
    });
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error" variant="h6">{error}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => fetchPosts()}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <div>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Community Forum
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Connect with others, share tips, and learn from the community's financial wisdom.
          </Typography>
        </div>
        <Button 
          variant="contained" 
          onClick={() => setOpenDialog(true)}
          startIcon={<ForumIcon />}
        >
          New Discussion
        </Button>
      </Box>
      
      {/* Forum Posts */}
      {posts.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 5 }}>
          <CardContent>
            <ForumIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No discussions yet
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Be the first to start a discussion in our community!
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => setOpenDialog(true)}
            >
              Start a Discussion
            </Button>
          </CardContent>
        </Card>
      ) : (
        <List sx={{ width: '100%' }}>
          {posts.map((post) => (
            <Paper key={post._id || post.id} sx={{ mb: 3, overflow: 'hidden' }}>
              <ListItem 
                alignItems="flex-start"
                sx={{ 
                  p: 3,
                  backgroundColor: '#f9f9f9',
                  borderBottom: '1px solid #e0e0e0'
                }}
              >
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <Avatar 
                    sx={{ bgcolor: 'primary.main', mr: 2 }}
                  >
                    <PersonIcon />
                  </Avatar>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="h6" fontWeight="bold">
                      {post.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Posted by {post.author} • {new Date(post.publishDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                      {post.content}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip 
                        icon={<ThumbUpIcon fontSize="small" />} 
                        label="Like" 
                        variant="outlined" 
                        size="small"
                        clickable
                      />
                      <Chip 
                        icon={<ReplyIcon fontSize="small" />} 
                        label="Reply" 
                        variant="outlined" 
                        size="small"
                        clickable
                        onClick={() => setReplyingTo(post._id || post.id)}
                      />
                    </Box>
                  </Box>
                </Box>
              </ListItem>

              {/* Replies section */}
              <Box sx={{ px: 3, py: 1 }}>
                {post.replies && post.replies.length > 0 && (
                  <List sx={{ ml: 7 }}>
                    {post.replies.map((reply, index) => (
                      <ListItem 
                        key={index} 
                        alignItems="flex-start"
                        sx={{ 
                          py: 2,
                          borderBottom: index < post.replies.length - 1 ? '1px solid #f0f0f0' : 'none'
                        }}
                      >
                        <Avatar sx={{ bgcolor: 'secondary.light', mr: 2, width: 32, height: 32 }}>
                          <PersonIcon fontSize="small" />
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {reply.author}
                            <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                              {new Date(reply.date).toLocaleDateString()}
                            </Typography>
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {reply.content}
                          </Typography>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                )}

                {/* Reply input field */}
                {replyingTo === (post._id || post.id) && (
                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 7, my: 2 }}>
                    <TextField
                      fullWidth
                      placeholder="Write a reply..."
                      size="small"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      variant="outlined"
                    />
                    <IconButton 
                      color="primary" 
                      sx={{ ml: 1 }}
                      onClick={() => handleAddReply(post._id || post.id)}
                    >
                      <SendIcon />
                    </IconButton>
                    <Button 
                      variant="text" 
                      color="inherit" 
                      size="small"
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText('');
                      }}
                      sx={{ ml: 1 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
              </Box>
            </Paper>
          ))}
        </List>
      )}
      
      {/* New Discussion Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Start a New Discussion</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Title"
                fullWidth
                value={newPost.title}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="content"
                label="Content"
                fullWidth
                multiline
                rows={6}
                value={newPost.content}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddPost} variant="contained">Post Discussion</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Community;