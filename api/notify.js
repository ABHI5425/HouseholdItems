// /api/notify.js
const webPush = require('web-push');
const { getAll } = require('./subscriptions');

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

  const subscriptions = getAll();

  if (subscriptions.length === 0) {
    console.log('No subscriptions to notify.');
  }

  subscriptions.forEach((subscription) => {
    webPush.sendNotification(subscription, payload).catch((error) => {
      console.error('Push error:', error);
    });
  });

  res.status(200).json({ status: 'success' });
};
