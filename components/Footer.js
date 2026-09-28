import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#162b1b] text-white px-[5%] py-16 font-manrope">
      <div className="max-w-[1400px] mx-auto">
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          {/* Brand & Mission */}
          <div className="lg:col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative h-12 w-56">
                <Image 
                  src="/ekarth-logo-white.svg" 
                  alt="Ekarth Foundation" 
                  fill 
                  className="object-contain object-left" 
                />
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-300 font-light">
              <p className="font-semibold text-[#EDFFAA]">
                "Empower. Educate. Elevate."
              </p>
              <p className="text-gray-300">
                Supporting Education. Nurturing Futures.
              </p>
              <p className="pt-2 text-xs text-gray-400 leading-relaxed">
                A Pune-based non-profit organisation dedicated to supporting educational aspirations and holistic growth of vulnerable children and adolescents.
              </p>
            </div>
          </div>

          {/* Registered Office & Contact */}
          <div>
            <h3 className="text-base font-medium text-[#EDFFAA] mb-5">
              Registered Office
            </h3>
            <div className="space-y-3 text-sm font-light text-gray-300 leading-relaxed">
              <p>
                1001 Manishkunj Plot No. 34,<br />
                S. No. 129, CTS No. 802,<br />
                Kothrud, Pune - 411038,<br />
                Maharashtra, India
              </p>
              <div className="pt-2 space-y-1">
                <p>
                  <a href="mailto:info@ekarth.org" className="hover:text-[#d4e89e] transition-colors">
                    📧 info@ekarth.org
                  </a>
                </p>
                <p>
                  <a href="mailto:donate@ekarth.org" className="hover:text-[#d4e89e] transition-colors">
                    📧 donate@ekarth.org
                  </a>
                </p>
                <p>
                  <a href="tel:+919922899786" className="hover:text-[#d4e89e] transition-colors">
                    📞 +91 99228 99786
                  </a>
                  {" / "}
                  <a href="tel:+919225577889" className="hover:text-[#d4e89e] transition-colors">
                    92255 77889
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-medium text-[#EDFFAA] mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5 font-light text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-[#d4e89e] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#d4e89e] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#programs" className="hover:text-[#d4e89e] transition-colors">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link href="/#impact" className="hover:text-[#d4e89e] transition-colors">
                  Our Impact
                </Link>
              </li>
              <li>
                <Link href="/#csr" className="hover:text-[#d4e89e] transition-colors">
                  CSR Partnerships
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#d4e89e] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-[#d4e89e] transition-colors text-[#EDFFAA] font-medium">
                  Donate Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Registration */}
          <div>
            <h3 className="text-base font-medium text-[#EDFFAA] mb-5">
              Governance &amp; Trust
            </h3>
            <div className="space-y-3 text-xs sm:text-sm font-light text-gray-300 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <p className="font-semibold text-white mb-1">CIN</p>
                <p className="font-mono text-xs text-[#EDFFAA]">U88900PN2025NPL246146</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <p className="font-semibold text-white mb-1">Tax Exemption</p>
                <p className="text-xs text-gray-300">Registered under Section 12A &amp; 80G of the Income Tax Act</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/15 my-8"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Ekarth Foundation. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 md:gap-6">
            <Link href="/privacy-policy" className="hover:text-[#d4e89e] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-[#d4e89e] transition-colors">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="hover:text-[#d4e89e] transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}