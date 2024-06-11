import { supabase } from '../../../src/lib/supabaseClient';
import { NextApiRequest, NextApiResponse } from 'next';
import ProductInfo from '../../../src/types'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data: product, error } = await supabase
      .from<ProductInfo>('products')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(product);
  } else if (req.method === 'PUT') {
    const {
      id,
      name,
      description,
      full_price,
      sale_price,
      images,
      sizes,
      categories,
      tags,
      sold_to_date,
      stock,
      sku
    } = req.body as ProductInfo;

    const { data: product, error } = await supabase
      .from<ProductInfo>('products')
      .update({
        id,
        name,
        description,
        full_price,
        sale_price,
        images,
        sizes,
        categories,
        tags,
        sold_to_date,
        stock,
        sku,
        updated_at: new Date(), 
      })
      .eq('id', id)
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(product);
  } else if (req.method === 'DELETE') {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    res.status(204).end();
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
