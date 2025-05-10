const subscriptions = [];

module.exports = (req, res) => {
  try {
    const subscription = req.body;

    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ error: 'Invalid subscription object' });
    }

    // For now, we just push to in-memory array
    subscriptions.push(subscription);
    console.log('New push subscription saved:', subscription.endpoint);

    return res.status(201).json({ message: 'Subscription saved successfully' });
  } catch (error) {
    console.error('Error saving subscription:', error);
    return res.status(500).json({ error: 'Failed to save subscription' });
  }
};
