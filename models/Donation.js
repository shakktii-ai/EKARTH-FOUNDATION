import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    donorName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    amount: { type: Number, required: true },
    orderId: { type: String, index: true },
    paymentId: { type: String, index: true },
    signature: { type: String },
    subscriptionId: { type: String },
    planId: { type: String },
    status: { type: String, default: "pending" },
    aadhaar: { type: String },
    pancard: { type: String },
    pan: { type: String },
    taxBenefit: { type: String, enum: ["yes", "no"], default: "no" },
    country: { type: String, default: "India" },
    state: String,
    city: String,
    address: String,
    pincode: String,
    receipt: String,
    currency: { type: String, default: "INR" },
  },
  { timestamps: true }
);

export default mongoose.models.Donation || mongoose.model("Donation", DonationSchema);
