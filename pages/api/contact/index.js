import dbConnect from '../../../lib/db';
import Contact from '../../../models/Contact';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        // In a real app, you would want to add authentication here
        const contacts = await Contact.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: contacts });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const contact = await Contact.create(req.body);
        res.status(201).json({ success: true, data: contact });
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
