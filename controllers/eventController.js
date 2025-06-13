// backend/controllers/eventController.js
const Event = require('../models/Event');

exports.addEvent = async (req, res) => {
  try {
    const { name, occasion, date } = req.body;
    const newEvent = new Event({ name, occasion, date });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add event' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};
