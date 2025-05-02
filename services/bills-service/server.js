const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8005;

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

// Bill Schema
const billSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  paid: { type: Boolean, default: false },
  recurring: { type: Boolean, default: false },
  category: { type: String }
});

const Bill = mongoose.model('Bill', billSchema);

// Routes - Update to handle the correct paths
app.get('/api/bills', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const bills = await Bill.find({ userId }).sort({ dueDate: 1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new bill
app.post('/api/bills', async (req, res) => {
  try {
    console.log('Received request to add bill:', req.body);
    
    // Validate required fields
    const { name, amount, dueDate, userId } = req.body;
    if (!name || !amount || !dueDate || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Create new bill
    const bill = new Bill({
      name,
      amount,
      dueDate,
      userId,
      category: req.body.category || 'other',
      recurring: req.body.recurring || false,
      paid: false
    });
    
    // Save to database
    await bill.save();
    console.log('Bill saved:', bill);
    
    res.status(201).json(bill);
  } catch (error) {
    console.error('Error adding bill:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/bills/:id/pay', async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(
      req.params.id,
      { paid: true },
      { new: true }
    );
    
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    
    res.json(bill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add this near the end of the file, before the app.listen call

// Add a root route for health check
app.get('/', (req, res) => {
  res.json({ status: 'Bills service is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Bills service running on port ${PORT}`);
});
