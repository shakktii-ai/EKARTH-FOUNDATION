import dbConnect from '../../../lib/db';
import Contact from '../../../models/Contact';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  try {
    switch (method) {
      case 'GET':
        try {
          const contact = await Contact.findById(id);
          if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
          }
          res.status(200).json({ success: true, data: contact });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
        break;

      case 'PUT':
        try {
          const { status, notes } = req.body;
          
          // Only allow updating status and notes
          const updateData = {};
          if (status) updateData.status = status;
          if (notes) updateData.notes = notes;
          
          const contact = await Contact.findByIdAndUpdate(
            id,
            { 
              ...updateData,
              updatedAt: new Date() // Explicitly update the updatedAt field
            },
            { new: true, runValidators: true }
          );
          
          if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
          }
          
          res.status(200).json({ success: true, data: contact });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
        break;

      case 'DELETE':
        try {
          const deletedContact = await Contact.deleteOne({ _id: id });
          if (!deletedContact.deletedCount) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
          }
          res.status(200).json({ success: true, data: {} });
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).json({ success: false, message: `Method ${method} not allowed` });
        break;
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
}