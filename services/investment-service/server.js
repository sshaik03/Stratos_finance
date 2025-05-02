const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8006;

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

// Investment Schema
const investmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  currentValue: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now },
  type: { type: String, enum: ['stock', 'bond', 'etf', 'crypto', 'other'], required: true },
  notes: { type: String }
});

const Investment = mongoose.model('Investment', investmentSchema);

// Spare Change Schema
const spareChangeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  amount: { type: Number, required: true },
  investedIn: { type: String }
});

const SpareChange = mongoose.model('SpareChange', spareChangeSchema);

// Routes - UPDATED to match API Gateway routing
app.get('/api', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const investments = await Investment.find({ userId });
    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api', async (req, res) => {
  try {
    const investment = new Investment(req.body);
    await investment.save();
    res.status(201).json(investment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/spare-change', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const spareChanges = await SpareChange.find({ userId })
      .sort({ year: -1, month: -1 })
      .limit(12);
    
    res.json(spareChanges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a root route for health check
app.get('/', (req, res) => {
  res.json({ status: 'Investment service is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Investment service running on port ${PORT}`);
});
