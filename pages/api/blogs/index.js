import dbConnect from '../../../lib/db';
import Blog from '../../../models/Blog';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: blogs });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        // In a real app, you would want to add authentication here
        const blog = await Blog.create(req.body);
        res.status(201).json({ success: true, data: blog });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ success: false, error: `Method ${method} not allowed` });
      break;
  }
}
