import { useState, useEffect } from 'react'
import { Menu, X, Heart } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-close mobile menu on desktop resize
  useEffect(() => {
    if (!mobileMenuOpen) return
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileMenuOpen])

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
        isScrolled || mobileMenuOpen
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D98B3A] text-white font-medium text-xs shadow-sm active:scale-95 transition-transform"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Support</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#1F5D42] hover:bg-[#F1F6F1] active:scale-90 transition-all focus:outline-none focus:ring-2 focus:ring-[#1F5D42]"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <Menu
                  className={`w-6 h-6 absolute transition-all duration-300 ease-out ${
                    mobileMenuOpen
                      ? 'opacity-0 rotate-90 scale-75'
                      : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X
                  className={`w-6 h-6 absolute transition-all duration-300 ease-out ${
                    mobileMenuOpen
                      ? 'opacity-100 rotate-0 scale-100'
                      : 'opacity-0 -rotate-90 scale-75'
                  }`}
                />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Smooth Mobile Drawer / Dropdown using Grid 0fr -> 1fr */}
      <div
        className={`lg:hidden grid transition-[grid-template-rows,opacity] duration-300 ease-out border-b border-[#1F5D42]/10 bg-[#FFF9F0] ${
          mobileMenuOpen
            ? 'grid-rows-[1fr] opacity-100 shadow-lg'
            : 'grid-rows-[0fr] opacity-0 border-transparent pointer-events-none'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pt-2 pb-5 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3.5 py-2.5 rounded-xl text-base font-medium text-[#24332B] hover:text-[#1F5D42] hover:bg-[#F1F6F1] active:bg-[#1F5D42]/10 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#D98B3A] hover:bg-[#C47A2D] text-white font-medium shadow-md active:scale-[0.98] transition-all"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Support Our Work</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
