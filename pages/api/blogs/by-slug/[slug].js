// pages/api/blogs/by-slug/[slug].js
import dbConnect from '../../../../lib/db';
import Blog from '../../../../models/Blog';

export default async function handler(req, res) {
  const { slug } = req.query;
  const { method } = req;

  if (method !== 'GET') {
    return res.status(405).json({ success: false, message: `Method ${method} not allowed` });
  }

  try {
    await dbConnect();
    
    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    
    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}