import dbConnect from '../../../lib/db';
import Blog from '../../../models/Blog';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();
  try {
    if (req.query.type === 'slug') {
      // Handle slug-based lookup
      const blog = await Blog.findOne({ slug: id });
      if (!blog) {
        return res.status(404).json({ success: false, message: 'Blog not found' });
      }
      return res.status(200).json({ success: true, data: blog });
    }

  switch (method) {
    case 'GET':
      try {
        const blog = await Blog.findById(id);
        if (!blog) {
          return res.status(404).json({ success: false, error: 'Blog not found' });
        }
        res.status(200).json({ success: true, data: blog });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'PUT':
      try {
        // In a real app, you would want to add authentication here
        const blog = await Blog.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!blog) {
          return res.status(404).json({ success: false, error: 'Blog not found' });
        }
        res.status(200).json({ success: true, data: blog });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        // In a real app, you would want to add authentication here
        const deletedBlog = await Blog.deleteOne({ _id: id });
        if (!deletedBlog.deletedCount) {
          return res.status(404).json({ success: false, error: 'Blog not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ success: false, error: `Method ${method} not allowed` });
      break;
  }
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
