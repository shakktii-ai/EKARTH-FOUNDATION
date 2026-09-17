import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Donate() {
  const subscriptionPlans = [
    { id: 'plan_RbMyBIQYgYIcaz', name: 'plan_100c', amount: 100 },
    { id: 'plan_RbMyjy2pXKxJOQ', name: 'plan_200c', amount: 200 },
    { id: 'plan_RbMyz33zvUy88L', name: 'plan_300c', amount: 300 },
    { id: 'plan_RbMzD1taHhJJHh', name: 'plan_500c', amount: 500 },
    { id: 'plan_RbMz0v1qJYspEc', name: 'plan_700c', amount: 700 },
    { id: 'plan_RbMzc8pI5GeYXZ', name: 'plan_1000c', amount: 1000 },
    { id: 'plan_RbMzqLgPsJKMwQ', name: 'plan_1500c', amount: 1500 },
    { id: 'plan_RbN0B2uyfFMDci', name: 'plan_2000c', amount: 2000 },
    { id: 'plan_RbN0Lvx2qeqDaM', name: 'plan_3000c', amount: 3000 },
    { id: 'plan_RbN0WxNjTP2bM4', name: 'plan_5000c', amount: 5000 },
    { id: 'plan_RbN01qkGYt239B', name: 'plan_10000c', amount: 10000 },
    { id: 'plan_RbN0WwuNPzTcoIh', name: 'plan_15000c', amount: 15000 },
  ];

  const [selectedPlan, setSelectedPlan] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    aadhaar: "",
    pancard: "",
    taxBenefit: "",
    country: "India",
    state: "",
    city: "",
    address: "",
    pincode: "",
    agreeTerms: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAadhaarInput = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length > 12) value = value.slice(0, 12); // Limit to 12 digits

    const formattedValue = value.match(/.{1,4}/g)?.join(" ") || ""; // Group xxx xxxx xxxx
    setForm((prev) => ({
      ...prev,
      aadhaar: formattedValue,
    }));
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const validateForm = () => {
    if (!selectedPlan) {
      toast.error("Please select a donation amount");
      return false;
    }
    if (!form.name || !form.email || !form.mobile) {
      toast.error("Please fill in all required fields");
      return false;
    }
    if (!form.agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return false;
    }
    if (form.taxBenefit === "yes") {
      if (!form.aadhaar || !/^\d{4}\s\d{4}\s\d{4}$/.test(form.aadhaar)) {
        toast.error("Please enter a valid Aadhaar number (1234 5678 9012)");
        return false;
      }
      if (!form.pancard || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pancard)) {
        toast.error("Please enter a valid PAN (e.g., ABCDE1234F)");
        return false;
      }
    }
    return true;
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const donationData = {
        ...form,
        amount: selectedPlan ? selectedPlan.amount : null,
      };

      const res = await fetch("/api/razorpay/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });

      if (!res.ok) {
        throw new Error('Failed to create subscription');
      }

      const data = await res.json();

      const options = {
        key: data.key,
        subscription_id: data.subscription_id,
        name: "Ekarth Foundation",
        description: "Monthly Donation - Supporting Education & Healthcare",
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.mobile,
        },
        handler: async function (response) {
          try {
            await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_subscription_id: response.razorpay_subscription_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
          } catch (error) {
            console.error("Error verifying payment:", error);
          }

          toast.success("🎉 Donation started successfully! Thank you for supporting Ekarth Foundation!");

          setForm({
            name: "",
            email: "",
            mobile: "",
            aadhaar: "",
            pancard: "",
            taxBenefit: "",
            country: "India",
            state: "",
            city: "",
            address: "",
            pincode: "",
            agreeTerms: false,
          });
          setSelectedPlan(null);
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        },
        theme: { color: "#2d6a4f" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (error) {
      console.error("Error creating subscription:", error);
      toast.error("Failed to process donation. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Donate | Ekarth Foundation</title>
        <meta name="description" content="Support education scholarships and community welfare with Ekarth Foundation. 80G Tax Benefit eligible." />
      </Head>
      <section className="min-h-[20rem] pt-20 font-manrope font-light bg-[#f8fced] flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 leading-tight">
              Donate
            </h1>
          </div>
          <div className="flex-1 text-gray-700 text-base md:text-lg leading-relaxed max-w-lg">
            <p>
              We believe in the power of collective effort to bring hope,
              change, and educational opportunity to students in need. Join us as we work to
              create a brighter future for all.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Left Side */}
          <div className='font-manrope font-light'>
            <h2 className="text-2xl md:text-3xl font-manrope font-light font-bold mb-6 text-black uppercase">
              Empower a Child&apos;s Education & Future
            </h2>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Education is every child&apos;s fundamental right — it is the single most powerful tool to break the cycle of poverty and unlock human potential. Yet, across Maharashtra and India, thousands of deserving students face the risk of dropping out simply due to unmanageable school fees, exam charges, or lack of learning essentials.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              At <b>Ekarth Foundation</b>, we believe that no aspiring student should be left behind due to financial hardship. Through our direct scholarship programs, school partnerships, education kit distributions, and hospital medical aid, we provide continuous, transparent support to underprivileged children and families.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Every contribution you make helps a child stay in school — funding up to ₹5,000 in school fees, providing textbooks and notebooks, or delivering essential healthcare support that brings relief and stability to struggling households.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed">
              Our initiatives are not just charity — they are investments in young minds, dignity, and nation-building. With your support, we can expand our reach across schools and colleges in Pune and beyond.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Together, let&apos;s build a future where every child is empowered to learn, grow, and achieve their dreams. Your generosity can illuminate a life forever.
            </p>
          </div>

          {/* Right Side Form */}
          <div className="border border-green-500 rounded-lg p-6 md:p-8 shadow-md">
            <h3 className="text-xl font-bold text-center mb-4 uppercase">
              Support the Cause
            </h3>

            <p className="text-center text-gray-700 mb-4 uppercase">
              Make a Difference
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {subscriptionPlans.map((plan) => (
                <label
                  key={plan.id}
                  className={`border px-3 py-2 rounded-full cursor-pointer text-center text-sm ${
                    selectedPlan?.id === plan.id
                      ? "bg-green-500 text-white"
                      : "border-gray-400 hover:border-green-500"
                  }`}
                >
                  <input
                    type="radio"
                    name="amount"
                    value={plan.amount}
                    className="hidden"
                    onChange={() => handlePlanSelect(plan)}
                    checked={selectedPlan?.id === plan.id}
                  />
                  ₹ {plan.amount.toLocaleString('en-IN')}
                </label>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-center text-sm text-blue-800 font-medium">
                📅 Monthly Subscription - 60 Months (5 Years)
              </p>
              <p className="text-center text-xs text-blue-600 mt-1">
                Your selected amount will be charged monthly for 60 months
              </p>
            </div>

            <p className="text-center text-sm text-gray-600 mb-4">
              Your donation directly funds scholarships, educational kits, and skill workshops for deserving students.
            </p>

            <form className="space-y-3" onSubmit={handleDonate}>
              <div className="mb-4">
                <p className="text-center font-semibold mb-3">Do you want to avail 80G tax benefit?</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, taxBenefit: "yes" })}
                    className={`py-3 rounded-full font-semibold transition ${
                      form.taxBenefit === "yes"
                        ? "bg-emerald-500 text-white"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-300"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, taxBenefit: "no" })}
                    className={`py-3 rounded-full font-semibold transition ${
                      form.taxBenefit === "no"
                        ? "bg-emerald-500 text-white"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-300"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {form.taxBenefit === "yes" && (
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="aadhaar"
                    placeholder="Enter Aadhaar No"
                    value={form.aadhaar}
                    onChange={handleAadhaarInput}
                    className="border rounded-full px-4 py-2 bg-emerald-50"
                    maxLength={14}
                    pattern="^(\d{4}\s\d{4}\s\d{4})$"
                    title="Format: 1234 5678 9012"
                  />
                  <input
                    type="text"
                    name="pancard"
                    placeholder="Enter Pancard No"
                    value={form.pancard}
                    onChange={handleInputChange}
                    className="border rounded-full px-4 py-2 bg-emerald-50"
                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Full Name *"
                  value={form.name}
                  onChange={handleInputChange}
                  className="border rounded-full px-4 py-2"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email ID *"
                  value={form.email}
                  onChange={handleInputChange}
                  className="border rounded-full px-4 py-2"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter Mobile No *"
                  value={form.mobile}
                  onChange={handleInputChange}
                  className="border rounded-full px-4 py-2"
                  pattern="[0-9]{10}"
                  required
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={form.country}
                  onChange={handleInputChange}
                  className="border rounded-full px-4 py-2"
                  readOnly
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="state"
                  placeholder="Select State"
                  value={form.state}
                  onChange={handleInputChange}
                  className="border rounded-full px-4 py-2"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleInputChange}
                  className="border rounded-full px-4 py-2"
                />
              </div>

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleInputChange}
                className="w-full border rounded-full px-4 py-2"
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleInputChange}
                className="w-full border rounded-full px-4 py-2"
                pattern="[0-9]{6}"
              />

              <p className="text-xs text-gray-600 mt-4">
                *Your contributions are eligible for tax benefits under Section 80G & 12A of the Income Tax Act as Ekarth Foundation is registered as a non-profit organization (CIN: U88900PN2025NPL246146).
              </p>

              <label className="flex items-start text-xs text-gray-600 mt-2">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={form.agreeTerms}
                  onChange={handleInputChange}
                  className="mt-1 mr-2"
                  required
                />
                You agree that Ekarth Foundation can reach out to you
                through WhatsApp/email/SMS/Phone to provide information on your
                donation, initiatives, & 80G tax receipt. *
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 text-white py-2 rounded-full font-semibold mt-3 hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Donate Now"}
              </button>
            </form>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </div>
      </section>
    </>
  );
}

export default Donate;
