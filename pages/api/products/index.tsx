import { supabase } from '../../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data: products, error } = await supabase.from('products').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const { name, description, price, imageUrl } = req.body;
    const { data: product, error } = await supabase
      .from('products')
      .insert([{ name, description, price, image_url: imageUrl }])
      .single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(product);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
