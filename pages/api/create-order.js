import Razorpay from "razorpay";
import connectDB from "../../lib/db.js";
import Donation from "../../models/Donation.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_Tnl0IY0QBPANsf";
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  const {
    amount,
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

  const amountInPaise = Math.round(Number(amount));
  if (!amountInPaise || isNaN(amountInPaise) || amountInPaise < 100) {
    return res.status(400).json({
      error: "Invalid amount. Minimum amount must be at least 100 paise (\u20B9 1).",
    });
  }

  const receiptId = String(receipt || (`rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`)).slice(0, 40);

  let order = null;

  if (key_id && key_secret) {
    try {
      const razorpay = new Razorpay({
        key_id,
        key_secret,
      });

      order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: currency || "INR",
        receipt: receiptId,
        notes: {
          name: name || "",
          email: email || "",
          mobile: mobile || "",
          taxBenefit: taxBenefit || "no",
        },
      });
    } catch (apiError) {
      console.warn("Orders API notice (proceeding with standard modal):", apiError.message || apiError.error?.description);
    }
  }

  const orderId = order?.id || null;

  try {
    await connectDB();
    await Donation.create({
      donorName: name || "Anonymous Donor",
      email: email || "unknown@ekarth.org",
      mobile: mobile || "0000000000",
      amount: amountInPaise / 100,
      orderId: orderId || (`test_ord_${Date.now()}`),
      receipt: receiptId,
      currency: currency || "INR",
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
    console.warn("Could not save initial donation record to DB:", dbError.message);
  }

  return res.status(200).json({
    order_id: orderId,
    id: orderId,
    amount: amountInPaise,
    currency: currency || "INR",
    receipt: receiptId,
    key: key_id,
  });
}
