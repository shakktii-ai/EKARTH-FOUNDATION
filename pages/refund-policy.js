import Head from "next/head";

export default function RefundPolicy() {
  return (
    <>
      <Head>
        <title>Refund & Donation Policy - Ekarth Foundation</title>
        <meta
          name="description"
          content="Donation and Refund Policy of Ekarth Foundation, Pune (Maharashtra)"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-blue-700 mb-4">
            Ekarth Foundation
          </h1>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Donation & Refund Policy
          </h2>
          <p className="text-sm text-right text-gray-500 mb-8">
            CIN: U88900PN2025NPL246146 | Registered Section 8 Non-Profit
          </p>

          <div className="space-y-6 text-gray-700">
            <p>
              At <strong>Ekarth Foundation</strong>, we are deeply grateful for your 
              generous contributions that enable us to provide educational scholarships, 
              school supplies, hospital assistance, and skill development to students in need. 
              Please review this policy before making your voluntary contribution.
            </p>

            <section className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <h3 className="font-bold text-yellow-800 text-lg mb-2">Important Notice</h3>
              <p>
                All charitable contributions made to Ekarth Foundation are voluntary and utilized 
                promptly for educational and social welfare programs. As per standard non-profit practice, 
                donations are considered final.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Donation Guidelines</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Donations are directed toward our verified education and healthcare programs</li>
                <li>Ekarth Foundation is registered under Section 12A and Section 80G of the Income Tax Act</li>
                <li>Eligible Indian donors receive 80G tax benefit certificates upon providing PAN details</li>
                <li>We do not offer commercial products or return services in exchange for charitable gifts</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Exceptional Payment Inquiries</h3>
              <p className="mb-3">
                In the rare event of a technical glitch, duplicate transaction, or unauthorized payment processing, 
                please reach out to us within 7 days of the payment date with the following details:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Full name of donor</li>
                <li>Date of payment and amount transferred</li>
                <li>Payment gateway / Razorpay transaction ID</li>
                <li>Description of the technical issue</li>
              </ul>
              <p>
                Our finance desk will review the gateway logs and resolve genuine duplicate transaction claims promptly.
              </p>
            </section>

            <section className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Contact Information</h3>
              <p className="mb-2">For any payment or 80G receipt inquiries:</p>
              <p className="flex items-center">
                <span className="mr-2">📧</span>
                <a 
                  href="mailto:ekarthfoundation@gmail.com" 
                  className="text-blue-600 hover:underline"
                >
                  ekarthfoundation@gmail.com
                </a>
              </p>
              <p className="flex items-center mt-1">
                <span className="mr-2">📞</span>
                <a 
                  href="tel:+919922899786" 
                  className="text-blue-600 hover:underline"
                >
                  +91 99228 99786
                </a>
                <span className="mx-2">/</span>
                <a 
                  href="tel:+919225577889" 
                  className="text-blue-600 hover:underline"
                >
                  +91 92255 77889
                </a>
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Recurring Donations</h3>
              <p>
                If you have set up a recurring monthly subscription, you can modify or cancel future scheduled cycles at any time by contacting our support team with your subscription ID at least 3 business days prior to the debit date.
              </p>
            </section>

            <section className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Commitment to Transparency</h3>
              <p>
                Every rupee entrusted to Ekarth Foundation is deployed with complete accountability, adhering strictly to our 4-step direct disbursement framework to ensure transparent impact for underprivileged students.
              </p>
              <p className="mt-3">
                Thank you for partnering with Ekarth Foundation to empower young minds and nurture brighter futures.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Ekarth Foundation</h3>
            <p className="text-sm text-gray-600 font-medium">CIN: U88900PN2025NPL246146 | Registered under Section 12A & 80G</p>
            <p className="text-sm text-gray-600 mt-2"><strong>Registered Office:</strong> 1001 Manishkunj Plot No. 34, S. No. 129, CTS No. 802, Kothrud, Pune - 411038, Maharashtra, India</p>
            <p className="text-sm text-gray-600 mt-1"><strong>Corporate Office:</strong> Shop No. 36/11, Sant Dnyaneshwar Nagar, Near Karnataka School, Zudlo Erandwane, Pune</p>
          </div>
        </div>
      </div>
    </>
  );
}
