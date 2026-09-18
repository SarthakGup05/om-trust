import { useState } from 'react'
import { Phone, MessageSquare, Mail, MapPin, Send, CheckCircle2, Clock } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const TRUST_PHONE = '+91 84000 46265'
  const TRUST_WHATSAPP = '918400046265'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all fields before sending.')
      return
    }
    setErrorMsg('')

    const text = `*General Inquiry - Om Charitable Trust*
Name: ${formData.name}
Phone: ${formData.phone}
Message: ${formData.message}`

    const url = `https://wa.me/${TRUST_WHATSAPP}?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-12 lg:py-16 bg-[#F1F6F1] relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1F5D42]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D98B3A]/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1F5D42]/15 text-[#1F5D42] text-xs font-semibold uppercase tracking-wider shadow-sm">
            <MessageSquare className="w-3.5 h-3.5 text-[#D98B3A]" />
            <span>Contact Us</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#1F5D42] tracking-tight leading-tight">
            We Are Always Here to Listen & Connect
          </h2>

          <p className="font-body text-base sm:text-lg text-[#24332B]/80 leading-relaxed">
            Have questions about our initiatives, want to coordinate a donation drive, or invite us to a care home? Contact Om Charitable Trust directly through phone or WhatsApp.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          
          {/* Phone */}
          <a
            href={`tel:${TRUST_PHONE.replace(/\s+/g, '')}`}
            className="bg-white rounded-3xl p-4 sm:p-5 border border-[#1F5D42]/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FFF9F0] text-[#D98B3A] flex items-center justify-center mb-3 group-hover:bg-[#1F5D42] group-hover:text-white transition-colors">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#24332B]/60 mb-0.5">
                Direct Phone
              </div>
              <div className="font-heading font-bold text-base sm:text-lg text-[#1F5D42]">
                {TRUST_PHONE}
              </div>
              <p className="text-xs text-[#24332B]/70 mt-0.5">Available for calls & coordination</p>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${TRUST_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-3xl p-4 sm:p-5 border border-[#1F5D42]/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#F1F6F1] text-[#1F5D42] flex items-center justify-center mb-3 group-hover:bg-[#D98B3A] group-hover:text-white transition-colors">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#24332B]/60 mb-0.5">
                WhatsApp Desk
              </div>
              <div className="font-heading font-bold text-base sm:text-lg text-[#1F5D42]">
                {TRUST_PHONE}
              </div>
              <p className="text-xs text-[#24332B]/70 mt-0.5">Instant chat & drive updates</p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:contact@omcharitabletrust.org"
            className="bg-white rounded-3xl p-4 sm:p-5 border border-[#1F5D42]/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FFF9F0] text-[#D98B3A] flex items-center justify-center mb-3 group-hover:bg-[#1F5D42] group-hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#24332B]/60 mb-0.5">
                Email
              </div>
              <div className="font-heading font-bold text-sm text-[#1F5D42] truncate">
                contact@omcharitabletrust.org
              </div>
              <p className="text-xs text-[#24332B]/70 mt-0.5">For official communications</p>
            </div>
          </a>

          {/* Location */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#1F5D42]/10 shadow-sm text-left flex flex-col justify-between">
            <div className="w-11 h-11 rounded-2xl bg-[#F1F6F1] text-[#1F5D42] flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#24332B]/60 mb-0.5">
                Location
              </div>
              <div className="font-heading font-bold text-base text-[#1F5D42]">
                Uttar Pradesh, India
              </div>
              <p className="text-[11px] text-[#24332B]/60 mt-0.5 italic">
                Registered office details available via WhatsApp
              </p>
            </div>
          </div>

        </div>

        {/* Dual Layout: Contact Form & Google Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Quick Contact Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-[#1F5D42]/10 text-left flex flex-col justify-between">
            <div>
              <div className="border-b border-[#1F5D42]/10 pb-3 mb-5">
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#1F5D42]">
                  Send a Direct Message
                </h3>
                <p className="text-xs sm:text-sm text-[#24332B]/70 mt-1">
                  Fill in your inquiry below and we will connect with you immediately over WhatsApp.
                </p>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#F1F6F1] text-[#1F5D42] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-[#1F5D42]">
                    Message Sent to WhatsApp!
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-[#24332B]/75 max-w-sm mx-auto">
                    We have launched WhatsApp with your formatted message. Our team will respond shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-5 py-2 rounded-full bg-[#1F5D42] text-white text-xs font-semibold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                      {errorMsg}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="font-heading font-bold text-xs text-[#24332B]">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Verma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F0] border border-[#1F5D42]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5D42] text-[#24332B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-heading font-bold text-xs text-[#24332B]">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 84000 46265"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F0] border border-[#1F5D42]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5D42] text-[#24332B]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-heading font-bold text-xs text-[#24332B]">
                      How Can We Help You? *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Write your message or inquiry here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F0] border border-[#1F5D42]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5D42] text-[#24332B] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#1F5D42] hover:bg-[#164430] text-white font-heading font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message via WhatsApp</span>
                  </button>
                </form>
              )}
            </div>

            <div className="pt-3 mt-4 border-t border-[#1F5D42]/10 flex items-center gap-2 text-xs text-[#24332B]/60">
              <Clock className="w-3.5 h-3.5 text-[#D98B3A]" />
              <span>Prompt response from Trust trustees via WhatsApp</span>
            </div>
          </div>

          {/* Google Maps Location Embed */}
          <div className="lg:col-span-6 bg-white rounded-3xl overflow-hidden shadow-xl border border-[#1F5D42]/10 flex flex-col min-h-[340px]">
            <div className="p-4 border-b border-[#1F5D42]/10 flex items-center justify-between bg-[#FFF9F0]">
              <div className="flex items-center gap-2 text-left">
                <MapPin className="w-4 h-4 text-[#D98B3A]" />
                <span className="font-heading font-bold text-sm text-[#1F5D42]">
                  Om Charitable Trust Regional Location
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#24332B]/60 uppercase tracking-wider">
                Uttar Pradesh
              </span>
            </div>

            {/* Google Maps iFrame */}
            <div className="flex-1 w-full relative min-h-[280px]">
              <iframe
                title="Om Charitable Trust Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d456000!2d80.8!3d26.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd991f32b16b%3A0x93ccba8909978be7!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
