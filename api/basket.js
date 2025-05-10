let basketStore = [];

const notifySubscribers = require('./notify'); 

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    return res.status(200).json({ items: basketStore });
  }

  if (req.method === 'POST') {
    try {
      const item = req.body;
      if (!item || !item.name) {
        return res.status(400).json({ error: 'Invalid item data' });
      }

      const existingIndex = basketStore.findIndex(i => i.id === item.id);
      if (existingIndex !== -1) {
        basketStore[existingIndex].quantity = Math.round((parseFloat(basketStore[existingIndex].quantity) + parseFloat(item.quantity)) * 10) / 10;
      } else {
        basketStore.push(item);
      }

      
      await notifySubscribers({ title: 'Basket Update', body: `${item.name} added to basket` });

      return res.status(201).json({ message: 'Item added', basket: basketStore });
    } catch (error) {
      console.error('Basket add error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
