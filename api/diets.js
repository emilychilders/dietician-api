import { createClient } from '@supabase/supabase-js';
import dietaryGuides from './data/dietaryGuides.js';

export default async function handler(req, res) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: 'Supabase not configured' });
  }

  if (req.method === 'GET') {
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data, error } = await supabase
      .from('dietary_guides')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const adminSecret = req.headers['x-admin-secret'];
    if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const rows = dietaryGuides.map((guide) => ({
      id: guide.id,
      label: guide.label,
      category: guide.category,
      description: guide.description,
      avoid_ingredients: guide.avoidIngredients,
      safe_alternatives: guide.safeAlternatives,
      ai_prompt: guide.aiPrompt,
      sources: guide.sources,
      sort_order: guide.sortOrder,
      is_active: true,
    }));

    const { data, error } = await supabase
      .from('dietary_guides')
      .upsert(rows, { onConflict: 'id' })
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ seeded: data.length });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
