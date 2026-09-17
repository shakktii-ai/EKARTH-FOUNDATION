import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Ekarth Foundation</title>
        <meta
          name="description"
          content="Privacy Policy, Terms & Conditions, and Donation Policy of Ekarth Foundation (Pune, Maharashtra)"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-2xl p-8">
          {/* Header */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-6">
            Ekarth Foundation
          </h1>

          <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">
            Terms, Privacy & Donation Policy
          </h2>

          <p className="text-right text-gray-500 mb-6 text-sm">
            CIN: U88900PN2025NPL246146 | Section 8 Non-Profit
          </p>

          <p className="mb-6">
            At <strong>Ekarth Foundation</strong>, we are committed to
            protecting your privacy and maintaining absolute transparency in our
            educational and charitable operations. This document outlines our Terms of Use, Privacy Policy,
            and Donation/Refund Policy collectively.
          </p>

          {/* Terms & Conditions */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-blue-600 mt-6 mb-4">
              Terms & Conditions
            </h2>
            <p className="mb-4">
              By using our website &ldquo;Ekarth Foundation&rdquo;, you
              agree to be bound by these Terms of Service. We operate as a
              registered Section 8 non-profit organization under the Companies Act, and all donations are voluntary
              contributions toward education scholarships, student welfare, hospital aid, and skill development programs.
            </p>

            <h3 className="font-bold mt-4 mb-1">1. Acceptance of Terms</h3>
            <p className="mb-3">
              By accessing our website and contributing, you agree to follow
              these terms, our mission objectives, and all applicable Indian laws.
            </p>

            <h3 className="font-bold mt-4 mb-1">2. Non-Profit Operations</h3>
            <p className="mb-3">
              We do not sell commercial products or services. Our digital platform is solely for
              raising awareness, facilitating charitable donations, and sharing educational impact.
            </p>

            <h3 className="font-bold mt-4 mb-1">3. Modifications</h3>
            <p className="mb-3">
              We may update this document periodically to reflect legal and organizational standards. Continued use of our
              services implies acceptance of the updated terms.
            </p>

            <h3 className="font-bold mt-4 mb-1">4. Contact Information</h3>
            <p>
              For questions regarding our terms or programs:
              <br />
              📧{" "}
              <a
                href="mailto:ekarthfoundation@gmail.com"
                className="text-blue-600 underline"
              >
                ekarthfoundation@gmail.com
              </a>{" "}
              | 📞{" "}
              <a href="tel:+919922899786" className="text-blue-600 underline">
                +91 99228 99786
              </a>{" "}
              /{" "}
              <a href="tel:+919225577889" className="text-blue-600 underline">
                +91 92255 77889
              </a>
            </p>
          </section>

          <hr className="my-8 border-gray-300" />

          {/* Privacy Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-blue-600 mt-6 mb-4">
              Privacy Policy
            </h2>

            <h3 className="font-bold mt-4 mb-1">1. Information We Collect</h3>

            <h4 className="font-semibold mt-2 mb-1">1.1 Information You Provide:</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Donor & Contact Name</li>
              <li>Email address and Phone Number</li>
              <li>Address details: State, City, PIN Code</li>
              <li>PAN Card and Aadhaar details (voluntarily provided for 80G tax exemption receipts)</li>
            </ul>

            <h4 className="font-semibold mt-2 mb-1">1.2 Automatically Collected Data:</h4>
            <ul className="list-disc pl-6 mb-4">
              <li>Device and browser information</li>
              <li>Usage statistics and page interaction data</li>
              <li>IP address for security verification</li>
            </ul>

            <h4 className="font-semibold mt-2 mb-1">1.3 Payment Security:</h4>
            <p className="mb-4">
              All payment transactions and subscriptions are processed through RBI-authorized, encrypted payment gateways. We never store debit/credit card numbers or net banking credentials on our servers.
            </p>

            <h3 className="font-bold mt-4 mb-1">2. How We Use Your Information</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Process voluntary educational donations and issue Section 80G receipts</li>
              <li>Verify donor communications and send project impact updates</li>
              <li>Coordinate scholarship distribution with partnered educational institutions</li>
              <li>Comply with Section 8 corporate governance and Income Tax reporting mandates</li>
            </ul>

            <h3 className="font-bold mt-4 mb-1">3. Data Sharing & Confidentiality</h3>
            <p>We do not sell, trade, or rent donor personal information. Data is strictly shared with:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Certified payment processors for transaction completion</li>
              <li>Tax and regulatory authorities as required by Indian law</li>
            </ul>

            <h3 className="font-bold mt-4 mb-1">4. Data Security</h3>
            <p className="mb-3">
              We employ SSL/TLS encryption and strict administrative security controls to protect donor data from unauthorized access or disclosure.
            </p>

            <h3 className="font-bold mt-4 mb-1">5. Your Rights</h3>
            <p>You may at any time:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Request details of your historical contributions</li>
              <li>Update your contact information or communication preferences</li>
              <li>Request duplicate 80G donation tax certificates</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, please write to:
              <br />
              📧{" "}
              <a
                href="mailto:ekarthfoundation@gmail.com"
                className="text-blue-600 underline"
              >
                ekarthfoundation@gmail.com
              </a>
            </p>

            <h3 className="font-bold mt-4 mb-1">6. 80G & 12A Tax Exemptions</h3>
            <p className="mb-4">
              Ekarth Foundation is registered under Section 12A and Section 80G of the Income Tax Act. Donors receive valid 80G receipts for qualifying monetary contributions.
            </p>
          </section>

          <hr className="my-8 border-gray-300" />

          {/* Refund Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-blue-600 mt-6 mb-4">
              Donation & Refund Policy
            </h2>
            <p className="mb-4">
              As a registered non-profit organization, donations made to Ekarth Foundation are utilized directly for educational scholarships, student supplies, and charitable initiatives. Consequently, donations are generally non-refundable once disbursed.
            </p>
            <p className="mb-4">
              If an unintended duplicate payment or banking error occurs, please notify us within 7 days with your transaction proof:
            </p>
            <p className="mb-4">
              📧{" "}
              <a
                href="mailto:ekarthfoundation@gmail.com"
                className="text-blue-600 underline"
              >
                ekarthfoundation@gmail.com
              </a>
              <br />
              📞{" "}
              <a href="tel:+919922899786" className="text-blue-600 underline">
                +91 99228 99786
              </a>
            </p>
            <p>Our team will verify the payment logs with the gateway and address valid duplicate issues promptly.</p>
          </section>

          <hr className="my-8 border-gray-300" />

          {/* Contact Section */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-blue-600 mb-3">Contact Us</h2>
            <h3 className="font-semibold mb-1">Ekarth Foundation</h3>
            <p className="text-gray-700 font-medium">CIN: U88900PN2025NPL246146 | Registered under Section 12A & 80G</p>
            <p className="text-gray-700 mt-2"><strong>Registered Office:</strong> 1001 Manishkunj Plot No. 34, S. No. 129, CTS No. 802, Kothrud, Pune - 411038, Maharashtra, India</p>
            <p className="text-gray-700 mt-1"><strong>Corporate Office:</strong> Shop No. 36/11, Sant Dnyaneshwar Nagar, Near Karnataka School, Zudlo Erandwane, Pune</p>
            <p className="mt-3">
              📧{" "}
              <a
                href="mailto:ekarthfoundation@gmail.com"
                className="text-blue-600 underline"
              >
                ekarthfoundation@gmail.com
              </a>{" "}
              | 📞{" "}
              <a href="tel:+919922899786" className="text-blue-600 underline">
                +91 99228 99786
              </a>{" "}
              /{" "}
              <a href="tel:+919225577889" className="text-blue-600 underline">
                +91 92255 77889
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
