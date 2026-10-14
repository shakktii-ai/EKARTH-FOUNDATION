import crypto from "crypto";
import connectDB from "../../../lib/db";
import Donation from "../../../models/Donation";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_subscription_id,
    razorpay_signature,
    order_id,
    payment_id,
  } = req.body;

  const targetOrderId = razorpay_order_id || order_id || razorpay_subscription_id;
  const targetPaymentId = razorpay_payment_id || payment_id;
  const targetSignature = razorpay_signature;

  if (!targetOrderId || !targetPaymentId || !targetSignature) {
    return res.status(400).json({
      success: false,
      error: "Missing required payment verification fields",
    });
  }

  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_secret) {
    return res.status(500).json({
      success: false,
      error: "Razorpay key secret not configured on server",
    });
  }

  try {
    const text = targetOrderId + "|" + targetPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(text)
      .digest("hex");

    const isValid = expectedSignature === targetSignature;

    if (!isValid) {
      return res.status(400).json({
        success: false,
        error: "Invalid signature: generated signature does not match",
      });
    }

    try {
      await connectDB();
      const donation = await Donation.findOneAndUpdate(
        { $or: [{ orderId: targetOrderId }, { subscriptionId: targetOrderId }] },
        { 
          paymentId: targetPaymentId,
          signature: targetSignature,
          status: "success",
        },
        { new: true }
      );

      return res.status(200).json({ 
        success: true, 
        message: "Payment verified successfully",
        order_id: targetOrderId,
        payment_id: targetPaymentId,
        donation,
      });
    } catch (dbErr) {
      return res.status(200).json({ 
        success: true, 
        message: "Payment verified successfully",
        order_id: targetOrderId,
        payment_id: targetPaymentId,
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}