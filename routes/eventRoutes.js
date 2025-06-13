const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Create new event
router.post('/', async (req, res) => {
  const { name, date, type } = req.body;
  try {
    const event = new Event({ name, date, type });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
