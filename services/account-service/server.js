const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8002;

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

// Account Schema
const accountSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['checking', 'savings', 'credit', 'investment'], required: true },
  balance: { type: Number, required: true, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

const Account = mongoose.model('Account', accountSchema);

// Routes - Update to handle the correct paths
app.get('/api/accounts', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const accounts = await Account.find({ userId });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/accounts', async (req, res) => {
  try {
    const account = new Account(req.body);
    await account.save();
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/accounts/:id', async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastUpdated: Date.now() },
      { new: true }
    );
    
    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }
    
    res.json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add this near the end of the file, before the app.listen call

// Add a root route for health check
app.get('/', (req, res) => {
  res.json({ status: 'Account service is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Account service running on port ${PORT}`);
});
