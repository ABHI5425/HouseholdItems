export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const subscription = req.body;

    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ error: 'Invalid subscription object' });
    }

    // If you had a DB or Sheets integration, you'd save it here
    console.log('New push subscription:', subscription.endpoint);

    return res.status(201).json({ message: 'Subscription saved successfully' });
  } catch (err) {
    console.error('Error saving subscription:', err);
    return res.status(500).json({ error: 'Failed to save subscription' });
  }
}
