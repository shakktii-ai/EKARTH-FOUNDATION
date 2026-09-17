import crypto from "crypto";
import connectDB from "../../../lib/db";
import Donation from "../../../models/Donation";

export const config = {
  api: {
    bodyParser: false,
  },
};

const getRawBody = (req) =>
  new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
  });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const rawBody = await getRawBody(req);
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(rawBody);
  const digest = shasum.digest("hex");

  if (digest !== signature) {
    return res.status(400).json({ error: "Invalid signature" });
  }

  const body = JSON.parse(rawBody);
  const event = body.event;
  const payment = body.payload?.payment?.entity;

  await connectDB();

  if (event === "subscription.charged") {
    // Update existing donation record or create new one for recurring payment
    const existingDonation = await Donation.findOne({ 
      subscriptionId: payment.subscription_id 
    });

    if (existingDonation && existingDonation.status === "created") {
      // Update the initial donation record with payment info
      await Donation.findByIdAndUpdate(existingDonation._id, {
        paymentId: payment.id,
        status: "success",
      });
    } else {
      // Create a new record for subsequent recurring payments
      await Donation.create({
        donorName: existingDonation?.donorName || "Recurring Donor",
        email: existingDonation?.email || "unknown",
        mobile: existingDonation?.mobile || "unknown",
        amount: payment.amount / 100,
        paymentId: payment.id,
        subscriptionId: payment.subscription_id,
        planId: existingDonation?.planId || null,
        status: "success",
      });
    }
  } else if (event === "payment.failed") {
    const existingDonation = await Donation.findOne({ 
      subscriptionId: payment.subscription_id 
    });

    await Donation.create({
      donorName: existingDonation?.donorName || "Recurring Donor",
      email: existingDonation?.email || "unknown",
      mobile: existingDonation?.mobile || "unknown",
      amount: payment.amount / 100,
      paymentId: payment.id,
      subscriptionId: payment.subscription_id,
      planId: existingDonation?.planId || null,
      status: "failed",
    });
  } else if (event === "subscription.activated") {
    // Update subscription status when activated
    const subscription = body.payload?.subscription?.entity;
    await Donation.findOneAndUpdate(
      { subscriptionId: subscription.id },
      { status: "active" }
    );
  } else if (event === "subscription.cancelled") {
    // Update subscription status when cancelled
    const subscription = body.payload?.subscription?.entity;
    await Donation.findOneAndUpdate(
      { subscriptionId: subscription.id },
      { status: "cancelled" }
    );
  }

  res.status(200).json({ success: true });
}
