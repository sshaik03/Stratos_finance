const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8004;

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

// Budget Schema
const budgetSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  spent: { type: Number, default: 0 },
  color: { type: String, default: '#4DA1A9' },
  month: { type: Number, required: true },
  year: { type: Number, required: true }
});

const Budget = mongoose.model('Budget', budgetSchema);

// Routes
app.get('/api/budgets', async (req, res) => {
  try {
    const { userId, month, year } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const query = { userId };
    if (month && year) {
      query.month = month;
      query.year = year;
    }
    
    const budgets = await Budget.find(query);
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/budgets', async (req, res) => {
  try {
    const budget = new Budget(req.body);
    await budget.save();
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/budgets/:id', async (req, res) => {
  try {
    const budget = await Budget.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }
    
    res.json(budget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add this near the end of the file, before the app.listen call

// Add a root route for health check
app.get('/', (req, res) => {
  res.json({ status: 'Budget service is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Budget service running on port ${PORT}`);
});
