// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const galleryRoutes = require('./routes/galleryRoutes');
const eventRoutes = require('./routes/eventRoutes');

app.use('/api/gallery', galleryRoutes);
app.use('/api/events', eventRoutes);

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Madhunamma Backend is Live');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
