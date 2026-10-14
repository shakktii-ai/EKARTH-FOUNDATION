import connectDB from "../../../lib/db.js";
import Donation from "../../../models/Donation.js";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();
      const donations = await Donation.find().sort({ createdAt: -1, date: -1 });
      return res.status(200).json(donations);
    } catch (error) {
      console.error("Error fetching admin donations:", error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).send("Method not allowed");
  }
}

// reload
