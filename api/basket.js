let basket = [];

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json({ items: basket });
  } else if (req.method === 'POST') {
    try {
      const item = req.body;
      if (!item || !item.name) {
        return res.status(400).json({ error: 'Invalid item data' });
      }
      basket.push(item);
      res.status(201).json({ message: 'Item added', basket });
    } catch (error) {
      console.error('Error adding to basket:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
