import crypto from "crypto";
import connectDB from "../../lib/db.js";
import Donation from "../../models/Donation.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    order_id,
    payment_id,
  } = req.body;

  const targetOrderId = razorpay_order_id || order_id;
  const targetPaymentId = razorpay_payment_id || payment_id;
  const targetSignature = razorpay_signature;

  // Validation: Missing fields
  if (!targetOrderId || !targetPaymentId || !targetSignature) {
    return res.status(400).json({
      success: false,
      error: "Missing required verification fields (order_id, payment_id, or signature)",
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
    // Generate HMAC-SHA256 signature
    const text = targetOrderId + "|" + targetPaymentId;
    const generatedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(text)
      .digest("hex");

    // Strict signature comparison
    const isValid = generatedSignature === targetSignature;

    if (!isValid) {
      // Signature mismatch: return 400, do NOT mark as paid
      return res.status(400).json({
        success: false,
        error: "Signature verification failed: generated signature does not match razorpay_signature",
      });
    }

    // On valid signature, update donation in database
    let donation = null;
    try {
      await connectDB();
      donation = await Donation.findOneAndUpdate(
        { orderId: targetOrderId },
        {
          paymentId: targetPaymentId,
          signature: targetSignature,
          status: "success",
        },
        { new: true }
      );
    } catch (dbErr) {
      console.warn("Could not update donation in DB:", dbErr.message);
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order_id: targetOrderId,
      payment_id: targetPaymentId,
      donation,
    });
  } catch (error) {
    console.error("Error in signature verification:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error during signature verification",
      details: error.message,
    });
  }
}