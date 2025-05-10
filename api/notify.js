// /api/notify.js
const express = require('express');
const webPush = require('web-push');
const app = express();

app.use(express.json());

// In-memory storage (from subscribe.js)
let subscriptions = [];

webPush.setVapidDetails(
  'mailto:loiuythnfhser@mailinator.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

module.exports = (req, res) => {
  const { item } = req.body;
  const payload = JSON.stringify({
    title: 'New Item Added to Basket',
    body: `${item.name} (${item.quantity} ${item.unit}) added by a user`
  });

  subscriptions.forEach((subscription) => {
    webPush.sendNotification(subscription, payload).catch((error) => {
      console.error('Push error:', error);
    });
  });

  res.status(200).json({ status: 'success' });
};
