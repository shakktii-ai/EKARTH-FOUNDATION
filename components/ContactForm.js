import { Mail, Phone, MapPin, Building, ShieldCheck, Info } from "lucide-react";
import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    subject: 'General Inquiry / CSR / Support',
    message: '',
    acceptPrivacy: false
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    if (!formData.acceptPrivacy) {
      setStatus({ 
        type: 'error', 
        message: 'Please accept the privacy policy to continue.' 
      });
      setIsSubmitting(false);
      return;
    }

    try {
      let token = '';
      if (executeRecaptcha) {
        token = await executeRecaptcha('contact_form_submit');
      }
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.organisation,
          message: formData.message,
          subject: formData.subject || 'Contact Form Submission',
          'g-recaptcha-response': token
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: 'Thank you for reaching out! Your message has been sent to Ekarth Foundation successfully.' 
        });
        setFormData({ 
          name: '', 
          email: '', 
          phone: '',
          organisation: '',
          subject: 'General Inquiry / CSR / Support',
          message: '',
          acceptPrivacy: false
        });
      } else {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.message || 'Failed to send message. Please reach us directly at ekarthfoundation@gmail.com.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="min-h-screen pt-28 sm:pt-36 bg-[#0A1A10] text-[#E3F1C3] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 font-manrope">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Section: Details */}
          <div>
            <p className="text-xs sm:text-sm font-semibold mb-3 uppercase tracking-widest text-[#C2D6AA]">
              Contact Us
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-snug mb-4 text-white">
              Get Involved with <br />
              <span className="font-semibold text-[#E3F1C3]">Ekarth Foundation</span>
            </h1>
            <p className="text-sm sm:text-base text-[#C2D6AA] font-light leading-relaxed mb-8">
              Whether you are a donor, CSR partner, school, institution, volunteer or supporter, we would be glad to connect with you.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="tel:+919922899786"
                className="inline-flex items-center gap-2 bg-[#E3F1C3] text-[#0A1A10] px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm shadow hover:bg-white transition"
              >
                <Phone size={16} /> Call Us: 99228 99786
              </a>
              <a
                href="mailto:ekarthfoundation@gmail.com"
                className="inline-flex items-center gap-2 border border-[#E3F1C3]/40 text-[#E3F1C3] px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm hover:border-[#E3F1C3] transition"
              >
                <Mail size={16} /> Email Us
              </a>
            </div>

            <div className="space-y-6 text-sm text-[#C2D6AA]">
              {/* Registered Office */}
              <div className="bg-white/5 border border-[#E3F1C3]/20 rounded-2xl p-5">
                <h3 className="text-base font-semibold text-[#E3F1C3] mb-2 flex items-center gap-2">
                  <MapPin size={18} className="text-[#E3F1C3]" /> Registered Office
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 font-light leading-relaxed">
                  1001 Manishkunj Plot No. 34,<br />
                  S. No. 129, CTS No. 802,<br />
                  Kothrud, Pune - 411038, Maharashtra, India
                </p>
              </div>

              {/* Corporate Office */}
              <div className="bg-white/5 border border-[#E3F1C3]/20 rounded-2xl p-5">
                <h3 className="text-base font-semibold text-[#E3F1C3] mb-2 flex items-center gap-2">
                  <Building size={18} className="text-[#E3F1C3]" /> Corporate Office
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 font-light leading-relaxed">
                  Shop No. 36/11, Sant Dnyaneshwar Nagar,<br />
                  Near Karnataka School,<br />
                  Zudlo Erandwane, Pune, Maharashtra.
                </p>
              </div>

              {/* Governance & Tax Details */}
              <div className="bg-white/5 border border-[#E3F1C3]/20 rounded-2xl p-5 space-y-2">
                <h3 className="text-base font-semibold text-[#E3F1C3] mb-2 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#E3F1C3]" /> Registration &amp; Tax Status
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 font-light">
                  <strong className="text-[#E3F1C3]">CIN:</strong> U88900PN2025NPL246146
                </p>
                <p className="text-xs sm:text-sm text-gray-200 font-light">
                  <strong className="text-[#E3F1C3]">Tax Exemption:</strong> Registered under Section 12A &amp; 80G of the Income Tax Act
                </p>
                <p className="text-xs sm:text-sm text-gray-200 font-light">
                  <strong className="text-[#E3F1C3]">Phones:</strong> +91 99228 99786 / +91 92255 77889
                </p>
                <p className="text-xs sm:text-sm text-gray-200 font-light">
                  <strong className="text-[#E3F1C3]">Email:</strong> ekarthfoundation@gmail.com
                </p>
              </div>
            </div>
          </div>

          {/* Right Section: Form */}
          <div className="bg-white/5 border border-[#E3F1C3]/30 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-light text-white mb-2">Send us a Message</h3>
            <p className="text-xs sm:text-sm text-[#C2D6AA] mb-6">
              Fill in the form below and our team will get back to you promptly.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs sm:text-sm mb-1.5 text-[#E3F1C3]">Your Full Name *</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-[#E3F1C3]/40 text-[#E3F1C3] placeholder-[#9BAE8B]
                             rounded-xl focus:outline-none focus:border-[#E3F1C3] focus:ring-1 focus:ring-[#E3F1C3] transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm mb-1.5 text-[#E3F1C3]">Email Address *</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-[#E3F1C3]/40 text-[#E3F1C3] placeholder-[#9BAE8B]
                               rounded-xl focus:outline-none focus:border-[#E3F1C3] focus:ring-1 focus:ring-[#E3F1C3] transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm mb-1.5 text-[#E3F1C3]">Phone Number *</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="10-digit mobile number"
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-[#E3F1C3]/40 text-[#E3F1C3] placeholder-[#9BAE8B]
                               rounded-xl focus:outline-none focus:border-[#E3F1C3] focus:ring-1 focus:ring-[#E3F1C3] transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm mb-1.5 text-[#E3F1C3]">Organisation / Institution (Optional)</label>
                <input
                  name="organisation"
                  value={formData.organisation}
                  onChange={handleChange}
                  type="text"
                  placeholder="Company, School, or Individual"
                  className="w-full px-4 py-3 bg-black/30 border border-[#E3F1C3]/40 text-[#E3F1C3] placeholder-[#9BAE8B]
                             rounded-xl focus:outline-none focus:border-[#E3F1C3] focus:ring-1 focus:ring-[#E3F1C3] transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm mb-1.5 text-[#E3F1C3]">Subject / Purpose *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0A1A10] border border-[#E3F1C3]/40 text-[#E3F1C3]
                             rounded-xl focus:outline-none focus:border-[#E3F1C3] focus:ring-1 focus:ring-[#E3F1C3] transition-all text-sm"
                >
                  <option value="CSR Partnership">CSR Partnership</option>
                  <option value="Student Scholarship Inquiry">Student Scholarship Inquiry</option>
                  <option value="School / Institutional Tie-Up">School / Institutional Tie-Up</option>
                  <option value="Healthcare Camp Inquiry">Healthcare Camp Inquiry</option>
                  <option value="Donation / Support">Donation / Support</option>
                  <option value="Volunteering">Volunteering</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm mb-1.5 text-[#E3F1C3]">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="How can we assist or collaborate with you?"
                  required
                  className="w-full px-4 py-3 bg-black/30 border border-[#E3F1C3]/40 text-[#E3F1C3] placeholder-[#9BAE8B]
                             rounded-xl focus:outline-none focus:border-[#E3F1C3] focus:ring-1 focus:ring-[#E3F1C3] transition-all text-sm"
                />
              </div>

              <div className="space-y-4 pt-2">
                <label className="flex items-start text-xs text-[#C2D6AA] cursor-pointer">
                  <input
                    name="acceptPrivacy"
                    checked={formData.acceptPrivacy}
                    onChange={handleChange}
                    type="checkbox"
                    required
                    className="mr-2.5 mt-0.5 w-4 h-4 border border-[#E3F1C3]/50 bg-transparent rounded-sm checked:bg-[#E3F1C3] checked:border-[#E3F1C3] focus:ring-0 focus:outline-none transition"
                  />
                  <span>
                    I confirm my details and accept the Ekarth Foundation{" "}
                    <a href="/privacy-policy" className="text-[#E3F1C3] underline hover:text-white">Privacy Policy</a>.
                  </span>
                </label>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-[#E3F1C3] hover:bg-white text-[#0A1A10] font-medium py-3 rounded-xl hover:scale-[1.01] hover:shadow-[0_0_15px_#E3F1C3]/40 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting Message...' : 'Submit Message'}
                </button>
              </div>
            </form>

            {status.message && (
              <div 
                className={`mt-4 p-4 rounded-xl text-sm ${
                  status.type === 'error' 
                    ? 'bg-red-900/40 text-red-200 border border-red-500/50' 
                    : 'bg-green-900/40 text-green-200 border border-green-500/50'
                }`}
              >
                {status.message}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
