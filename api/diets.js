import dietaryGuides from './data/dietaryGuides.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');

  return res.status(200).json(dietaryGuides);
}
