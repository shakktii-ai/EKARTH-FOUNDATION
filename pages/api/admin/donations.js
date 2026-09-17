import connectDB from "../../../lib/db";
import Donation from "../../../models/Donation";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();
      const donations = await Donation.find().sort({ date: -1 });
      res.status(200).json(donations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).send("Method not allowed");
  }
}
