import { useState, useEffect } from 'react'
import { Menu, X, Heart } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Get Involved', href: '#get-involved' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFF9F0]/95 backdrop-blur-md shadow-sm border-b border-[#1F5D42]/10 py-3'
          : 'bg-[#FFF9F0] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1F5D42] rounded-lg"
          >
            {/* Official Emblem Logo */}
            <img
              src="/OM trust logo.webp"
              alt="Om Charitable Trust Logo"
              className="w-11 h-11 object-contain shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col text-left">
              <span className="font-heading font-extrabold text-lg sm:text-xl text-[#1F5D42] tracking-tight leading-tight">
                Om Charitable Trust
              </span>
              <span className="text-[11px] font-medium tracking-wide text-[#24332B]/70 uppercase">
                Serving Humanity
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-sm font-medium text-[#24332B] hover:text-[#1F5D42] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1F5D42] hover:after:w-full after:transition-all after:duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Prominent CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D98B3A] hover:bg-[#C47A2D] text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Support Us</span>
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D98B3A] text-white font-medium text-xs shadow-sm"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Support</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#1F5D42] hover:bg-[#F1F6F1] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1F5D42]"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer / Dropdown */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen
            ? 'max-h-96 opacity-100 border-b border-[#1F5D42]/10 bg-[#FFF9F0]'
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#24332B] hover:text-[#1F5D42] hover:bg-[#F1F6F1] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#D98B3A] text-white font-medium shadow-md"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Support Our Work</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
