import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { file, filename } = req.body;

    // Upload the image to Supabase Storage
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filename, file, {
        contentType: file.type,
      });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Get the URL of the uploaded image
    const url = supabase.storage.from('images').getPublicUrl(filename).publicURL;

    return res.status(200).json({ url });
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
