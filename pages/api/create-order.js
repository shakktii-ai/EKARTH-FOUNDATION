import Razorpay from "razorpay";
import connectDB from "../../lib/db.js";
import Donation from "../../models/Donation.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    return res.status(401).json({ error: "Razorpay credentials not configured or unauthorized" });
  }

  const {
    amount, // in paise as per standard Razorpay order request
    currency = "INR",
    receipt,
    name,
    email,
    mobile,
    aadhaar,
    pancard,
    taxBenefit,
    country,
    state,
    city,
    address,
    pincode,
  } = req.body;

  // Validate amount >= 100 paise (minimum ?1)
  const amountInPaise = Math.round(Number(amount));
  if (!amountInPaise || isNaN(amountInPaise) || amountInPaise < 100) {
    return res.status(400).json({
      error: "Invalid amount. Minimum amount must be at least 100 paise (?1).",
    });
  }

  try {
    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const receiptId = receipt || `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const orderOptions = {
      amount: amountInPaise,
      currency: currency || "INR",
      receipt: String(receiptId).slice(0, 40),
      notes: {
        name: name || "",
        email: email || "",
        mobile: mobile || "",
        taxBenefit: taxBenefit || "no",
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    // Save initial donation record to database
    try {
      await connectDB();
      await Donation.create({
        donorName: name || "Anonymous Donor",
        email: email || "unknown@ekarth.org",
        mobile: mobile || "0000000000",
        amount: amountInPaise / 100, // store in rupees
        orderId: order.id,
        receipt: order.receipt,
        currency: order.currency,
        status: "created",
        aadhaar: aadhaar || null,
        pancard: pancard || null,
        taxBenefit: taxBenefit || "no",
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

    // Handle authentication error from Razorpay
    if (
      error.statusCode === 401 ||
      (error.error?.code === "BAD_REQUEST_ERROR" &&
        error.error?.description?.toLowerCase().includes("auth"))
    ) {
      return res.status(401).json({
        error: "Razorpay authentication failed. Please check key_id and key_secret.",
        details: error.error?.description || error.message,
      });
    }

    return res.status(500).json({
      error: "Failed to create Razorpay order",
      details: error.error?.description || error.message || "Unknown error",
    });
  }
}