// /api/subscribe.js
const express = require('express');
const app = express();

app.use(express.json());

// In-memory storage (replace with a database for production)
let subscriptions = [];

module.exports = (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ status: 'success' });
};
