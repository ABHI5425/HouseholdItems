const express = require('express');
const app = express();

app.use(express.json());

let subscriptions = [];

module.exports = (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ status: 'success' });
};
