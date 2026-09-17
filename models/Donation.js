// import mongoose from "mongoose";

// const donationSchema = new mongoose.Schema({
//   donorName: { type: String, required: true },
//   email: { type: String, required: true },
//   mobile: { type: String, required: true },
//   amount: { type: Number, required: true },
//   paymentId: String,
//   subscriptionId: String,
//   planId: String,
//   status: { type: String, default: "pending" },
//   addhar: Date,
//   pan: String,
//   country: { type: String, default: "India" },
//   state: String,
//   city: String,
//   address: String,
//   pincode: String,
//   date: { type: Date, default: Date.now }
// }, {
//   timestamps: true
// });

// export default mongoose.models.Donation || mongoose.model("Donation", donationSchema);
import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    donorName: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentId: String,
    subscriptionId: String,
    planId: String,
    status: { type: String, default: "pending" },
    aadhaar: { type: String },
    pancard: { type: String },
    taxBenefit: { type: String, enum: ["yes", "no"] },
    country: { type: String, default: "India" },
    state: String,
    city: String,
    address: String,
    pincode: String,
  },
  { timestamps: true }
);

// ✅ Fix for Next.js + Mongoose compiling
export default mongoose.models.Donation || mongoose.model("Donation", DonationSchema);
