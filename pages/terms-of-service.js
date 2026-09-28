import Head from "next/head";

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service - Ekarth Foundation</title>
        <meta
          name="description"
          content="Terms of Service for Ekarth Foundation (Pune, Maharashtra)"
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
            Terms of Service
          </h2>
          <p className="text-sm text-right text-gray-500 mb-8">
            CIN: U88900PN2025NPL246146 | Registered Section 8 Non-Profit
          </p>

          <p className="text-gray-700 mb-8 leading-relaxed">
            Welcome to <strong>Ekarth Foundation</strong>. By
            accessing our website, you agree to be bound by these Terms of Service and all applicable laws
            and regulations in India. If you do not agree with any of these terms, you
            are advised not to use or access this site.
          </p>

          {/* 1. Use License */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              1. Informational Use License
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Permission is granted to temporarily access and view the informational materials on Ekarth Foundation&apos;s website for personal, non-commercial educational advocacy and awareness purposes only.
            </p>
          </section>

          {/* 2. Donations */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              2. Voluntary Donations & Tax Status
            </h3>
            <p className="text-gray-700 mb-4">
              All contributions made through our platform are voluntary charitable donations. By making a contribution, you acknowledge that:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                Donations are utilized to support educational scholarships, kit distributions, hospital aid, and youth skill workshops
              </li>
              <li>
                Ekarth Foundation holds registrations under Section 12A & 80G of the Income Tax Act
              </li>
              <li>
                We do not sell commercial merchandise or provide commercial services in exchange for charitable gifts
              </li>
              <li>
                Tax certificates under Section 80G are issued for eligible Indian taxpayers providing their PAN details
              </li>
            </ul>
          </section>

          {/* 3. User Conduct */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              3. Acceptable User Conduct
            </h3>
            <p className="text-gray-700 mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Use the website in violation of any applicable local or national laws</li>
              <li>Impersonate any person or entity or misrepresent affiliation with Ekarth Foundation</li>
              <li>Attempt to interfere with or disrupt website security, servers, or payment gateways</li>
              <li>Transmit any malicious code, automated scraping bots, or harmful digital assets</li>
            </ul>
          </section>

          {/* 4. Intellectual Property */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              4. Intellectual Property
            </h3>
            <p className="text-gray-700 leading-relaxed">
              All branding, logos, mission materials, texts, graphics, and visual design assets on this website are the property of Ekarth Foundation and are protected by copyright and intellectual property standards.
            </p>
          </section>

          {/* 5. Limitation of Liability */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              5. Limitation of Liability
            </h3>
            <p className="text-gray-700 leading-relaxed">
              In no event shall Ekarth Foundation, its directors, or partners be liable for any indirect damages arising from the use or inability to access the website or external links.
            </p>
          </section>

          {/* 6. Modifications */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              6. Updates & Modifications
            </h3>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to revise these terms of service as needed to maintain regulatory alignment. Continued access to the website signifies acceptance of the prevailing terms.
            </p>
          </section>

          {/* 7. Governing Law */}
          <section className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              7. Governing Law & Jurisdiction
            </h3>
            <p className="text-gray-700 leading-relaxed">
              These terms are governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the competent courts in Pune, Maharashtra.
            </p>
          </section>

          <hr className="my-10 border-gray-300" />

          {/* Contact Us */}
          <section>
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">
              Contact Us
            </h3>
            <p className="font-semibold text-gray-800">
              Ekarth Foundation
            </p>
            <p className="text-sm text-gray-600 font-medium">CIN: U88900PN2025NPL246146 | Registered Section 8 Non-Profit</p>
            <p className="text-gray-700 mt-2">
              <strong>Registered Office:</strong> 1001 Manishkunj Plot No. 34, S. No. 129, CTS No. 802, Kothrud, Pune - 411038, Maharashtra, India
            </p>
            <p className="text-gray-700 mt-1">
              <strong>Corporate Office:</strong> Shop No. 36/11, Sant Dnyaneshwar Nagar, Near Karnataka School, Zudlo Erandwane, Pune
            </p>
            <p className="mt-4 text-gray-700">
              📧{" "}
              <a
                href="mailto:info@ekarth.org"
                className="text-blue-600 hover:underline"
              >
                info@ekarth.org
              </a>{" "}
              /{" "}
              <a
                href="mailto:donate@ekarth.org"
                className="text-blue-600 hover:underline"
              >
                donate@ekarth.org
              </a>{" "}
              | 📞{" "}
              <a
                href="tel:+919922899786"
                className="text-blue-600 hover:underline"
              >
                +91 99228 99786
              </a>{" "}
              /{" "}
              <a
                href="tel:+919225577889"
                className="text-blue-600 hover:underline"
              >
                +91 92255 77889
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
