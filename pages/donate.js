import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PRESET_AMOUNTS = [
  { id: 'amt_500', amount: 500, label: '\u20B9 500' },
  { id: 'amt_1000', amount: 1000, label: '\u20B9 1,000' },
  { id: 'amt_2000', amount: 2000, label: '\u20B9 2,000' },
  { id: 'amt_3000', amount: 3000, label: '\u20B9 3,000' },
  { id: 'amt_5000', amount: 5000, label: '\u20B9 5,000' },
  { id: 'amt_10000', amount: 10000, label: '\u20B9 10,000' },
];

function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    aadhaar: '',
    pancard: '',
    taxBenefit: 'no',
    country: 'India',
    state: '',
    city: '',
    address: '',
    pincode: '',
    agreeTerms: false,
  });

  const [loading, setLoading] = useState(false);

  // Load Razorpay Standard Checkout SDK
  useEffect(() => {
    const scriptId = 'razorpay-checkout-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePanInput = (e) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
    setForm((prev) => ({
      ...prev,
      pancard: val,
    }));
  };

  const handleAadhaarInput = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 12);
    const formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
    setForm((prev) => ({
      ...prev,
      aadhaar: formattedValue,
    }));
  };

  const handleAmountSelect = (amt) => {
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmount(val);
    if (val) {
      setSelectedAmount(Number(val));
    }
  };

  const getEffectiveAmount = () => {
    if (customAmount && Number(customAmount) > 0) {
      return Number(customAmount);
    }
    return selectedAmount || 0;
  };

  const validateForm = () => {
    const amount = getEffectiveAmount();
    if (!amount || amount < 1) {
      toast.error('Please select or enter a valid donation amount (minimum \u20B9 1)');
      return false;
    }
    if (!form.name || !form.name.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!form.email || !form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!form.mobile || !/^\d{10}$/.test(form.mobile.trim())) {
      toast.error('Please enter a valid 10-digit mobile number');
      return false;
    }

    // STRICT REQUIREMENT: BOTH PAN CARD AND AADHAAR CARD ARE COMPULSORY
    const cleanPan = (form.pancard || '').trim().toUpperCase();
    if (!cleanPan) {
      toast.error('PAN Card number is compulsory. Please enter your PAN Card number.');
      return false;
    }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(cleanPan)) {
      toast.error('Please enter a valid 10-digit PAN Card number (e.g. ABCDE1234F)');
      return false;
    }

    const cleanAadhaar = (form.aadhaar || '').replace(/\s/g, '');
    if (!cleanAadhaar) {
      toast.error('Aadhaar Card number is compulsory. Please enter your Aadhaar Card number.');
      return false;
    }
    if (!/^\d{12}$/.test(cleanAadhaar)) {
      toast.error('Please enter a valid 12-digit Aadhaar Card number');
      return false;
    }

    if (!form.agreeTerms) {
      toast.error('Please agree to the terms and conditions');
      return false;
    }

    return true;
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (typeof window === 'undefined' || !window.Razorpay) {
      toast.error('Razorpay SDK is loading. Please try again in a few seconds.');
      return;
    }

    setLoading(true);

    try {
      const donationAmount = getEffectiveAmount();
      const amountInPaise = Math.round(donationAmount * 100);
      const cleanPan = (form.pancard || '').trim().toUpperCase();
      const cleanAadhaar = (form.aadhaar || '').trim();

      // STEP 1: Backend - Create Order with all donor info
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: 'rcpt_' + Date.now(),
          name: form.name.trim(),
          email: form.email.trim(),
          mobile: form.mobile.trim(),
          aadhaar: cleanAadhaar,
          pancard: cleanPan,
          pan: cleanPan,
          taxBenefit: form.taxBenefit || 'no',
          country: form.country,
          state: form.state.trim() || null,
          city: form.city.trim() || null,
          address: form.address.trim() || null,
          pincode: form.pincode.trim() || null,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || 'Failed to initiate donation order');
      }

      const orderData = await res.json();
      const razorpayKey =
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
        orderData.key ||
        'rzp_live_TnlxKKKMW90A9P';

      // STEP 2: Frontend - Razorpay Standard Modal Checkout
      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Ekarth Foundation',
        description: 'One-Time Donation - \u20B9 ' + donationAmount.toLocaleString('en-IN'),
        order_id: orderData.order_id || orderData.id,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.mobile,
        },
        theme: {
          color: '#22c55e',
        },
        // STEP 3: Backend - Verify Signature & save all details
        handler: async function (response) {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                donorInfo: {
                  name: form.name.trim(),
                  email: form.email.trim(),
                  mobile: form.mobile.trim(),
                  amount: donationAmount,
                  pancard: cleanPan,
                  pan: cleanPan,
                  aadhaar: cleanAadhaar,
                  taxBenefit: form.taxBenefit || 'no',
                  address: form.address.trim() || '',
                  city: form.city.trim() || '',
                  state: form.state.trim() || '',
                  pincode: form.pincode.trim() || '',
                  country: form.country || 'India',
                },
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              toast.success('Donation successful! Thank you for supporting Ekarth Foundation!');
              // Reset form
              setForm({
                name: '',
                email: '',
                mobile: '',
                aadhaar: '',
                pancard: '',
                taxBenefit: 'no',
                country: 'India',
                state: '',
                city: '',
                address: '',
                pincode: '',
                agreeTerms: false,
              });
              setCustomAmount('');
              setSelectedAmount(1000);
            } else {
              toast.error(verifyData.error || 'Payment verification failed. Please contact support.');
            }
          } catch (verifyError) {
            console.error('Error verifying payment:', verifyError);
            toast.error('Network error during payment verification.');
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            toast.info('Payment cancelled.');
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', function (failResponse) {
        console.error('Razorpay payment failed:', failResponse.error);
        toast.error(failResponse.error?.description || 'Payment failed. Please try again.');
        setLoading(false);
      });

      rzp.open();
    } catch (error) {
      console.error('Error starting checkout:', error);
      toast.error(error.message || 'Failed to start donation. Please try again.');
      setLoading(false);
    }
  };

  const effectiveAmount = getEffectiveAmount();

  return (
    <>
      <Head>
        <title>Donate | Ekarth Foundation</title>
        <meta
          name='description'
          content='Support education scholarships and community welfare with Ekarth Foundation. 80G Tax Benefit eligible.'
        />
      </Head>

      <section className='min-h-[20rem] pt-20 font-manrope font-light bg-[#f8fced] flex items-center justify-center px-6'>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left'>
          <div className='flex-1'>
            <h1 className='text-4xl md:text-6xl font-light text-gray-900 leading-tight'>
              Donate
            </h1>
          </div>
          <div className='flex-1 text-gray-700 text-base md:text-lg leading-relaxed max-w-lg'>
            <p>
              We believe in the power of collective effort to bring hope, change, and educational opportunity to students in need. Join us as we work to create a brighter future for all.
            </p>
          </div>
        </div>
      </section>

      <section className='bg-white py-16 px-6 md:px-16'>
        <div className='max-w-7xl mx-auto grid md:grid-cols-2 gap-10'>
          {/* Left Side: Impact Story */}
          <div className='font-manrope font-light'>
            <h2 className='text-2xl md:text-3xl font-manrope font-bold mb-6 text-black uppercase'>
              Empower a Child&apos;s Education &amp; Future
            </h2>

            <p className='text-gray-700 mb-4 leading-relaxed'>
              Education is every child&apos;s fundamental right &mdash; it is the single most powerful tool to break the cycle of poverty and unlock human potential. Yet, across Maharashtra and India, thousands of deserving students face the risk of dropping out simply due to unmanageable school fees, exam charges, or lack of learning essentials.
            </p>

            <p className='text-gray-700 mb-4 leading-relaxed'>
              At <b>Ekarth Foundation</b>, we believe that no aspiring student should be left behind due to financial hardship. Through our direct scholarship programs, school partnerships, education kit distributions, and hospital medical aid, we provide continuous, transparent support to underprivileged children and families.
            </p>

            <p className='text-gray-700 mb-4 leading-relaxed'>
              Every contribution you make helps a child stay in school &mdash; funding up to &#8377; 5,000 in school fees, providing textbooks and notebooks, or delivering essential healthcare support that brings relief and stability to struggling households.
            </p>

            <p className='text-gray-700 mb-4 leading-relaxed'>
              Our initiatives are not just charity &mdash; they are investments in young minds, dignity, and nation-building. With your support, we can expand our reach across schools and colleges in Pune and beyond.
            </p>

            <p className='text-gray-700 leading-relaxed'>
              Together, let&apos;s build a future where every child is empowered to learn, grow, and achieve their dreams. Your generosity can illuminate a life forever.
            </p>
          </div>

          {/* Right Side: Donation Form */}
          <div className='border border-green-500 rounded-2xl p-6 md:p-8 shadow-md bg-white'>
            <h3 className='text-xl font-bold text-center mb-1 uppercase text-gray-900'>
              Support the Cause
            </h3>

            <p className='text-center text-sm font-semibold text-emerald-700 mb-5 uppercase tracking-wider'>
              One-Time Contribution
            </p>

            {/* Amount Selection Buttons */}
            <div className='grid grid-cols-3 gap-2.5 mb-4'>
              {PRESET_AMOUNTS.map((preset) => {
                const isSelected = selectedAmount === preset.amount && !customAmount;
                return (
                  <button
                    key={preset.id}
                    type='button'
                    onClick={() => handleAmountSelect(preset.amount)}
                    className={`py-2.5 px-3 rounded-xl border text-sm font-bold transition-all ${
                      isSelected
                        ? 'bg-green-600 text-white border-green-600 shadow-sm'
                        : 'border-gray-300 text-gray-800 hover:border-green-500 hover:bg-green-50'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            {/* Custom Amount Field */}
            <div className='mb-5'>
              <div className='relative'>
                <span className='absolute left-4 top-2.5 text-gray-500 font-bold'>&#8377;</span>
                <input
                  type='text'
                  placeholder='Or enter custom amount in INR'
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className='w-full border border-gray-300 rounded-xl pl-8 pr-4 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500'
                />
              </div>
            </div>

            {/* Trust and Summary Badge */}
            <div className='bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-5 flex items-center justify-between text-xs text-emerald-900'>
              <span className='font-semibold'>
                Contributing: <strong className='text-sm font-extrabold text-emerald-700'>&#8377; {effectiveAmount.toLocaleString('en-IN')}</strong>
              </span>
              <span className='text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200 font-medium'>
                Standard One-Time Checkout
              </span>
            </div>

            <form className='space-y-4' onSubmit={handleDonate}>
              {/* Government ID Verification: BOTH PAN AND AADHAAR ARE COMPULSORY */}
              <div className='border border-emerald-300 bg-emerald-50/50 rounded-2xl p-4'>
                <div className='flex items-center justify-between mb-3'>
                  <div>
                    <label className='text-xs font-bold text-gray-900 uppercase tracking-wider block'>
                      Government ID Verification *
                    </label>
                    <span className='text-[11px] text-gray-600'>
                      Both fields are compulsory for NGO donation compliance
                    </span>
                  </div>
                  <span className='text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs'>
                    Both Compulsory
                  </span>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-3.5'>
                  {/* PAN Card Input */}
                  <div>
                    <label className='block text-xs font-bold text-gray-700 mb-1'>
                      PAN Card Number <span className='text-rose-500 font-bold'>*</span>
                      {form.pancard && /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pancard) && (
                        <span className='text-emerald-600 ml-1.5 font-bold'>&#10003; Valid PAN</span>
                      )}
                    </label>
                    <input
                      type='text'
                      name='pancard'
                      placeholder='Enter 10-digit PAN (e.g. ABCDE1234F) *'
                      value={form.pancard}
                      onChange={handlePanInput}
                      maxLength={10}
                      className='w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white uppercase focus:outline-none focus:ring-2 focus:ring-green-500 font-mono tracking-wider'
                      required
                    />
                    <p className='text-[10px] text-gray-500 mt-1'>
                      Mandatory 10-character alphanumeric PAN
                    </p>
                  </div>

                  {/* Aadhaar Card Input */}
                  <div>
                    <label className='block text-xs font-bold text-gray-700 mb-1'>
                      Aadhaar Card Number <span className='text-rose-500 font-bold'>*</span>
                      {form.aadhaar && form.aadhaar.replace(/\s/g, '').length === 12 && (
                        <span className='text-emerald-600 ml-1.5 font-bold'>&#10003; Valid Aadhaar</span>
                      )}
                    </label>
                    <input
                      type='text'
                      name='aadhaar'
                      placeholder='Enter 12-digit Aadhaar (1234 5678 9012) *'
                      value={form.aadhaar}
                      onChange={handleAadhaarInput}
                      maxLength={14}
                      className='w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 font-mono tracking-wider'
                      required
                    />
                    <p className='text-[10px] text-gray-500 mt-1'>
                      Mandatory 12-digit Aadhaar UID number
                    </p>
                  </div>
                </div>

                <p className='text-[11px] text-emerald-900 bg-white/80 border border-emerald-200/80 rounded-lg p-2 mt-3 leading-normal font-medium'>
                  * Both PAN Card and Aadhaar Card are mandatory for compliance under Income Tax Act &amp; Non-Profit records.
                </p>
              </div>

              {/* Separate Standalone 80G Tax Exemption Toggle */}
              <div className='bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5'>
                <label className='flex items-center justify-between cursor-pointer'>
                  <div className='flex items-center gap-3'>
                    <input
                      type='checkbox'
                      name='taxBenefit'
                      checked={form.taxBenefit === 'yes'}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          taxBenefit: e.target.checked ? 'yes' : 'no',
                        }))
                      }
                      className='w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer'
                    />
                    <div>
                      <span className='text-xs sm:text-sm font-bold text-emerald-950 block'>
                        I want 80G Tax Exemption Certificate
                      </span>
                      <span className='text-[11px] text-emerald-700 block'>
                        Claim 50% tax deduction on your donation under Section 80G of Income Tax Act
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border transition-colors ${
                      form.taxBenefit === 'yes'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-white text-gray-500 border-gray-300'
                    }`}
                  >
                    {form.taxBenefit === 'yes' ? '80G Opted' : 'Optional'}
                  </span>
                </label>
              </div>

              {/* Donor Contact Details */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <input
                  type='text'
                  name='name'
                  placeholder='Full Name *'
                  value={form.name}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500'
                  required
                />
                <input
                  type='email'
                  name='email'
                  placeholder='Email ID *'
                  value={form.email}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500'
                  required
                />
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <input
                  type='tel'
                  name='mobile'
                  placeholder='10-digit Mobile Number *'
                  value={form.mobile}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500'
                  maxLength={10}
                  required
                />
                <input
                  type='text'
                  name='country'
                  placeholder='Country'
                  value={form.country}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-gray-50'
                  readOnly
                />
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <input
                  type='text'
                  name='state'
                  placeholder='State'
                  value={form.state}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500'
                />
                <input
                  type='text'
                  name='city'
                  placeholder='City'
                  value={form.city}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500'
                />
              </div>

              <input
                type='text'
                name='address'
                placeholder='Address (Optional)'
                value={form.address}
                onChange={handleInputChange}
                className='w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500'
              />

              <input
                type='text'
                name='pincode'
                placeholder='Pincode'
                value={form.pincode}
                onChange={handleInputChange}
                className='w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500'
                maxLength={6}
              />

              <p className='text-[11px] text-gray-500 mt-3 leading-relaxed'>
                *Your contributions are eligible for tax benefits under Section 80G &amp; 12A of the Income Tax Act as Ekarth Foundation is registered as a non-profit organization (CIN: U88900PN2025NPL246146).
              </p>

              <label className='flex items-start text-xs text-gray-600 mt-2 cursor-pointer'>
                <input
                  type='checkbox'
                  name='agreeTerms'
                  checked={form.agreeTerms}
                  onChange={handleInputChange}
                  className='mt-0.5 mr-2 rounded text-green-600 focus:ring-green-500 cursor-pointer'
                  required
                />
                <span>
                  You agree that Ekarth Foundation can reach out to you through WhatsApp/email/SMS/Phone to provide donation updates and 80G tax receipt. *
                </span>
              </label>

              <button
                type='submit'
                disabled={loading}
                className='w-full bg-green-600 text-white py-3.5 rounded-xl font-bold mt-4 hover:bg-green-700 transition shadow-sm disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer'
              >
                {loading ? (
                  <>
                    <svg className='animate-spin h-4 w-4 text-white' fill='none' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8H4z'></path>
                    </svg>
                    <span>Processing with Razorpay...</span>
                  </>
                ) : (
                  <span>Donate &#8377; {effectiveAmount.toLocaleString('en-IN')}</span>
                )}
              </button>

              <div className='flex items-center justify-center gap-2 text-[11px] text-gray-500 mt-2'>
                <svg className='w-3.5 h-3.5 text-emerald-600' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v4a1 1 0 102 0V7z' clipRule='evenodd' />
                </svg>
                <span>Secured by 256-Bit Razorpay Standard Checkout &amp; 80G Encrypted Storage</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      <ToastContainer position='top-right' autoClose={4000} />
    </>
  );
}

export default Donate;