import crypto from "crypto";
import connectDB from "../../../lib/db";
import Donation from "../../../models/Donation";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body;

  try {
    // Verify signature
    const text = razorpay_payment_id + "|" + razorpay_subscription_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    // Update donation status to success
    await connectDB();
    const donation = await Donation.findOneAndUpdate(
      { subscriptionId: razorpay_subscription_id },
      { 
        paymentId: razorpay_payment_id,
        status: "success" 
      },
      { new: true }
    );

    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Payment verified successfully",
      donation 
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: error.message });
  }
}