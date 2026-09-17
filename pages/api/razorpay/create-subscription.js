// // import Razorpay from "razorpay";
// // import connectDB from "../../../lib/db";
// // import Donation from "../../../models/Donation";

// // export default async function handler(req, res) {
// //   if (req.method !== "POST") return res.status(405).send("Method not allowed");

// //   const { name, email, mobile, planId, amount, dob, pan, country, state, city, address, pincode } = req.body;

// //   try {
// //     const razorpay = new Razorpay({
// //       key_id: process.env.RAZORPAY_KEY_ID,
// //       key_secret: process.env.RAZORPAY_KEY_SECRET
// //     });

// //     let finalPlanId = planId;

// //     // If no predefined plan is selected, create a custom plan
// //     if (!planId && amount) {
// //       const plan = await razorpay.plans.create({
// //         period: "monthly",
// //         interval: 1,
// //         item: {
// //           name: `Monthly Donation Plan - ₹${amount}`,
// //           amount: amount * 100, // Convert to paise
// //           currency: "INR",
// //           description: "Recurring monthly donation"
// //         }
// //       });
// //       finalPlanId = plan.id;
// //     }

// //     if (!finalPlanId) {
// //       return res.status(400).json({ error: "Plan ID or amount is required" });
// //     }

// //     // Create a subscription with the plan
// //     const subscription = await razorpay.subscriptions.create({
// //       plan_id: finalPlanId,
// //       total_count: 60, // 60 monthly payments (5 years)
// //       customer_notify: 1,
// //       notes: {
// //         name: name,
// //         email: email,
// //         mobile: mobile,
// //         pan: pan || "",
// //         address: address || "",
// //         city: city || "",
// //         state: state || "",
// //         pincode: pincode || "",
// //       }
// //     });

// //     // Save initial donation record to database
// //     await connectDB();
// //     await Donation.create({
// //       donorName: name,
// //       email: email,
// //       mobile: mobile,
// //       amount: amount,
// //       subscriptionId: subscription.id,
// //       planId: finalPlanId,
// //       status: "created",
// //       dob: dob || null,
// //       pan: pan || null,
// //       country: country || "India",
// //       state: state || null,
// //       city: city || null,
// //       address: address || null,
// //       pincode: pincode || null,
// //     });

// //     res.status(200).json({
// //       subscription_id: subscription.id,
// //       key: process.env.RAZORPAY_KEY_ID
// //     });
// //   } catch (error) {
// //     console.error("Error creating subscription:", error);
// //     res.status(500).json({ error: error.message });
// //   }
// // }


// import Razorpay from "razorpay";
// import connectDB from "../../../lib/db";
// import Donation from "../../../models/Donation";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).send("Method not allowed");

//   const { name, email, mobile, planId, amount, addhar, pan, country, state, city, address, pincode } = req.body;

//   try {
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET
//     });

//     let finalPlanId = planId;
//     let finalAmount = amount;

//     // ALWAYS create a new plan dynamically to avoid ID mismatch issues
//     if (amount) {
//       try {
//         const plan = await razorpay.plans.create({
//           period: "monthly",
//           interval: 1,
//           item: {
//             name: `Monthly Donation - ₹${amount}`,
//             amount: amount * 100, // Convert to paise
//             currency: "INR",
//             description: "5 Year Monthly Donation Subscription"
//           }
//         });
//         finalPlanId = plan.id;
//         console.log("Created new plan:", finalPlanId);
//       } catch (planError) {
//         console.error("Error creating plan:", planError);
//         return res.status(500).json({ 
//           error: "Failed to create subscription plan", 
//           details: planError.message 
//         });
//       }
//     }

//     if (!finalPlanId) {
//       return res.status(400).json({ error: "Amount is required to create subscription" });
//     }

//     // Create subscription with the newly created plan
//     const subscription = await razorpay.subscriptions.create({
//       plan_id: finalPlanId,
//       total_count: 60, // 60 monthly payments (5 years)
//       customer_notify: 1,
//       notes: {
//         name: name,
//         email: email,
//         mobile: mobile,
//         addhar: addhar || "",
//         pan: pan || "",
//         address: address || "",
//         city: city || "",
//         state: state || "",
//         pincode: pincode || "",
//       }
//     });

//     // Save donation record to database
//     await connectDB();
//     await Donation.create({
//       donorName: name,
//       email: email,
//       mobile: mobile,
//       amount: finalAmount,
//       subscriptionId: subscription.id,
//       planId: finalPlanId,
//       status: "created",
//       addhar: addhar || null,
//       pan: pan || null,
//       country: country || "India",
//       state: state || null,
//       city: city || null,
//       address: address || null,
//       pincode: pincode || null,
//     });

//     res.status(200).json({
//       subscription_id: subscription.id,
//       key: process.env.RAZORPAY_KEY_ID
//     });
//   } catch (error) {
//     console.error("Error creating subscription:", error);
//     res.status(500).json({ 
//       error: "Subscription creation failed", 
//       details: error.message,
//       statusCode: error.statusCode || 500
//     });
//   }
// }


import Razorpay from "razorpay";
import connectDB from "../../../lib/db";
import Donation from "../../../models/Donation";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const {
    name,
    email,
    mobile,
    planId,
    amount,
    aadhaar,
    pancard,
    taxBenefit,
    country,
    state,
    city,
    address,
    pincode,
  } = req.body;

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    let finalPlanId = planId;

    // Create a dynamic plan only if no predefined plan is provided
    if (!planId && amount) {
      const plan = await razorpay.plans.create({
        period: "monthly",
        interval: 1,
        item: {
          name: `Monthly Donation - ₹${amount}`,
          amount: amount * 100, // INR to paise
          currency: "INR",
          description: "5-Year Monthly Donation Subscription",
        },
      });
      finalPlanId = plan.id;
    }

    if (!finalPlanId) {
      return res.status(400).json({ error: "Amount and planId are required" });
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: finalPlanId,
      total_count: 60,
      customer_notify: 1,
      notes: {
        name,
        email,
        mobile,
        aadhaar,
        pancard,
        taxBenefit,
        address,
        city,
        state,
        pincode,
      },
    });

    await connectDB();
    await Donation.create({
      donorName: name,
      email,
      mobile,
      amount,
      subscriptionId: subscription.id,
      planId: finalPlanId,
      status: "created",
      aadhaar,
      pancard,
      taxBenefit,
      country: country || "India",
      state,
      city,
      address,
      pincode,
    });

    return res.status(200).json({
      subscription_id: subscription.id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error creating subscription:", error);
    return res.status(500).json({
      error: "Subscription creation failed",
      details: error.message || "Unknown error",
    });
  }
}
