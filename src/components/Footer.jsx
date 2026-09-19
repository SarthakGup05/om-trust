import { Phone, MessageSquare, Mail, MapPin, Heart } from 'lucide-react'

export default function Footer() {
  const TRUST_PHONE = '+91 8948038888'
  const TRUST_WHATSAPP = '918948038888'
  const TRUST_EMAIL = 'anitasinghrathore@gmail.com'
  const TRUST_ADDRESS = '21/1100, Sector 21, Indira Nagar, Lucknow - 226012'
  const TRUST_LANDMARK = 'Opposite Sherwood College'

  return (
    <footer className="bg-[#143B2B] text-white pt-12 pb-6 border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-8 border-b border-white/10 text-left">
          
          {/* Column 1: Organization Branding (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/OM trust logo.webp"
                alt="Om Charitable Trust"
                className="w-12 h-12 object-contain bg-white rounded-xl p-1 shadow-md"
              />
              <div>
                <span className="font-heading font-extrabold text-xl text-[#FFF9F0] block leading-tight">
                  Om Charitable Trust
                </span>
                <span className="text-xs text-[#F5C284] tracking-wider uppercase font-semibold">
                  Serving Humanity
                </span>
              </div>
            </div>

            <p className="font-body text-xs sm:text-sm text-[#F1F6F1]/80 leading-relaxed max-w-sm">
              A grassroots charitable organization working selflessly for food security, elder care dignity, women self-reliance, and animal protection across our communities.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#F5C284]">
              <Heart className="w-3.5 h-3.5 fill-current text-[#D98B3A]" />
              <span>Small Acts. Shared Responsibility. Lasting Change.</span>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[#F5C284]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F1F6F1]/80 font-medium">
              <li>
                <a href="#home" className="hover:text-[#D98B3A] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D98B3A] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#journey" className="hover:text-[#D98B3A] transition-colors">
                  Our Journey
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D98B3A] transition-colors">
                  Areas of Work
                </a>
              </li>
              <li>
                <a href="#volunteer" className="hover:text-[#D98B3A] transition-colors">
                  Get Involved
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#D98B3A] transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D98B3A] transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Areas of Work (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[#F5C284]">
              Where We Serve
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F1F6F1]/80 font-medium">
              <li>
                <a href="#services" className="hover:text-[#D98B3A] transition-colors">
                  Food & Nutrition (Annadanam)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D98B3A] transition-colors">
                  Elderly & Care Home Aid
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D98B3A] transition-colors">
                  Women Empowerment & SHGs
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D98B3A] transition-colors">
                  Animal Welfare & Gaushala Care
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D98B3A] transition-colors">
                  Environmental Greening Drives
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Phone (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[#F5C284]">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#F1F6F1]/85">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D98B3A] shrink-0" />
                <a href={`tel:${TRUST_PHONE.replace(/\s+/g, '')}`} className="hover:text-[#D98B3A] transition-colors">
                  {TRUST_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#D98B3A] shrink-0" />
                <a
                  href={`https://wa.me/${TRUST_WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D98B3A] transition-colors"
                >
                  WhatsApp: {TRUST_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D98B3A] shrink-0" />
                <a href={`mailto:${TRUST_EMAIL}`} className="hover:text-[#D98B3A] transition-colors break-all">
                  {TRUST_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D98B3A] shrink-0 mt-0.5" />
                <div className="text-left text-xs leading-relaxed text-[#F1F6F1]/90">
                  <p>{TRUST_ADDRESS}</p>
                  <p className="text-[#F5C284] text-[11px] font-medium">{TRUST_LANDMARK}</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright, Developer Credit & Disclaimer Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F1F6F1]/70">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} Om Charitable Trust. All Rights Reserved.
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-[#F1F6F1]/85">
            <span>Built with</span>
            <span className="inline-block text-rose-500 animate-pulse text-sm select-none" aria-label="love">
              ❤️
            </span>
            <span>by</span>
            <a
              href="https://saarthak.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5C284] hover:text-[#D98B3A] font-semibold underline underline-offset-4 decoration-[#F5C284]/50 hover:decoration-[#D98B3A] transition-colors"
            >
              Saarthak
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-4 text-[11px] sm:text-xs text-center">
            <span className="text-[#F5C284] font-medium">Approval Under Section 80G(5)(vi) & 12AA of Income Tax Act, 1961</span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="text-[#F1F6F1]/60">Registered Non-Profit Charitable Trust</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
