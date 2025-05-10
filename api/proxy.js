export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  try {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzYVx4iHkf174H91fLkysYcgjrfnll9EkN3RV49zLQt9AwIboBqWjsjg_K67PiaoLsQDw/exec';
    const response = await fetch(scriptUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { Authorization: req.headers.authorization })
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ status: 'error', message: 'Failed to proxy request' });
  }
}
