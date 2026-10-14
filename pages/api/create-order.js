import Razorpay from "razorpay";
import connectDB from "../../lib/db.js";
import Donation from "../../models/Donation.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    return res.status(401).json({ error: "Razorpay credentials not configured or unauthorized" });
  }

  const {
    amount,
    currency = "INR",
    receipt,
    name,
    email,
    mobile,
    aadhaar,
    pancard,
    pan,
    taxBenefit,
    country,
    state,
    city,
    address,
    pincode,
  } = req.body;

  const amountInPaise = Math.round(Number(amount));
  if (!amountInPaise || isNaN(amountInPaise) || amountInPaise < 100) {
    return res.status(400).json({
      error: "Invalid amount. Minimum amount must be at least 100 paise (\u20B9 1).",
    });
  }

  const cleanPan = ((pancard || pan || "").toUpperCase().trim()) || null;
  const cleanAadhaar = (aadhaar || "").trim() || null;

  const receiptId = String(receipt || (`rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`)).slice(0, 40);

  try {
    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: currency || "INR",
      receipt: receiptId,
      notes: {
        name: name || "",
        email: email || "",
        mobile: mobile || "",
        pan: cleanPan || "",
        aadhaar: cleanAadhaar || "",
        taxBenefit: taxBenefit || (cleanPan ? "yes" : "no"),
      },
    });

    // Save initial donation record in MongoDB
    try {
      await connectDB();
      await Donation.create({
        donorName: name || "Anonymous Donor",
        email: email || "unknown@ekarth.org",
        mobile: mobile || "0000000000",
        amount: amountInPaise / 100,
        orderId: order.id,
        receipt: order.receipt,
        currency: order.currency,
        status: "created",
        aadhaar: cleanAadhaar,
        pancard: cleanPan,
        pan: cleanPan,
        taxBenefit: taxBenefit || (cleanPan ? "yes" : "no"),
        country: country || "India",
        state: state || null,
        city: city || null,
        address: address || null,
        pincode: pincode || null,
      });
    } catch (dbError) {
      console.warn("Could not save initial donation record to DB (will retry on verification):", dbError.message);
    }

    return res.status(200).json({
      order_id: order.id,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      key: key_id,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return res.status(error.statusCode || 500).json({
      error: "Failed to create Razorpay order",
      details: error.error?.description || error.message || "Unknown error",
    });
  }
}
