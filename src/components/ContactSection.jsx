import { useState } from 'react'
import { Phone, MessageSquare, Mail, MapPin, Send, CheckCircle2, Clock, Loader2 } from 'lucide-react'
import { submitToWeb3Forms, isValidPhone } from '../services/web3forms'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const TRUST_PHONE = '+91 8948038888'
  const TRUST_WHATSAPP = '918948038888'
  const TRUST_EMAIL = 'anitasinghrathore@gmail.com'

  const handleSubmit = async (e) => {
    e.preventDefault()

    const trimmedName = formData.name.trim()
    const trimmedPhone = formData.phone.trim()
    const trimmedMessage = formData.message.trim()

    if (!trimmedName || trimmedName.length < 2) {
      setErrorMsg('Please enter your name (at least 2 characters).')
      return
    }

    if (!trimmedPhone || !isValidPhone(trimmedPhone)) {
      setErrorMsg('Please enter a valid phone number (at least 10 digits).')
      return
    }

    if (!trimmedMessage) {
      setErrorMsg('Please enter your message.')
      return
    }

    setErrorMsg('')
    setIsSubmitting(true)

    try {
      await submitToWeb3Forms({
        subject: 'New Contact Inquiry - Om Charitable Trust',
        formType: 'Contact Us',
        data: {
          'Name': trimmedName,
          'Phone': trimmedPhone,
          'Message': trimmedMessage,
        },
      })

      setSubmitted(true)
      setFormData({ name: '', phone: '', message: '' })
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong while sending your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-12 lg:py-16 bg-[#F1F6F1] relative overflow-hidden">
      {/* Decorative ambient background glows (hidden on mobile for performance) */}
      <div className="hidden md:block absolute top-0 right-1/4 w-96 h-96 bg-[#1F5D42]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 left-1/4 w-96 h-96 bg-[#D98B3A]/10 rounded-full filter blur-3xl pointer-events-none" />

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
            Have questions about our initiatives, want to coordinate a donation drive, or invite us to a care home? Visit our registered office or contact Om Charitable Trust directly through phone or WhatsApp.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
          
          {/* Phone */}
          <a
            href={`tel:${TRUST_PHONE.replace(/\s+/g, '')}`}
            className="bg-white rounded-3xl p-4 sm:p-5 border border-[#1F5D42]/10 shadow-sm md:hover:shadow-md md:hover:-translate-y-1 transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FFF9F0] text-[#D98B3A] flex items-center justify-center mb-3 md:group-hover:bg-[#1F5D42] md:group-hover:text-white transition-colors">
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
            className="bg-white rounded-3xl p-4 sm:p-5 border border-[#1F5D42]/10 shadow-sm md:hover:shadow-md md:hover:-translate-y-1 transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#F1F6F1] text-[#1F5D42] flex items-center justify-center mb-3 md:group-hover:bg-[#D98B3A] md:group-hover:text-white transition-colors">
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
            href={`mailto:${TRUST_EMAIL}`}
            className="bg-white rounded-3xl p-4 sm:p-5 border border-[#1F5D42]/10 shadow-sm md:hover:shadow-md md:hover:-translate-y-1 transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FFF9F0] text-[#D98B3A] flex items-center justify-center mb-3 md:group-hover:bg-[#1F5D42] md:group-hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#24332B]/60 mb-0.5">
                Official Email
              </div>
              <div className="font-heading font-bold text-sm text-[#1F5D42] break-all">
                {TRUST_EMAIL}
              </div>
              <p className="text-xs text-[#24332B]/70 mt-0.5">Official communication desk</p>
            </div>
          </a>

          {/* Location */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#1F5D42]/10 shadow-sm text-left flex flex-col justify-between">
            <div className="w-11 h-11 rounded-2xl bg-[#F1F6F1] text-[#1F5D42] flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#24332B]/60 mb-0.5">
                Registered Office
              </div>
              <div className="font-heading font-bold text-sm sm:text-base text-[#1F5D42] leading-snug">
                21/1100, Sector 21, Indira Nagar
              </div>
              <p className="text-xs text-[#24332B]/80 mt-0.5 font-medium">
                Lucknow 226012
              </p>
              <p className="text-[11px] text-[#D98B3A] font-semibold mt-0.5">
                (Opposite Sherwood College)
              </p>
            </div>
          </div>

        </div>

        {/* Regulatory & Tax Exemption Banner */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-white border border-[#1F5D42]/15 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-[#1F5D42] text-white text-xs font-heading font-bold tracking-wider uppercase">
              Registered NGO
            </span>
            <span className="text-xs sm:text-sm text-[#24332B]/85 font-medium">
              Approval Under Section <strong>80G(5)(vi)</strong> & Registration under Section <strong>12AA</strong> Of The Income Tax Act, 1961
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[#1F5D42] bg-[#F1F6F1] px-3 py-1 rounded-full border border-[#1F5D42]/20 whitespace-nowrap">
            Tax Exemption Eligible
          </span>
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
                  Fill in your inquiry below and our team will receive your message directly.
                </p>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#F1F6F1] text-[#1F5D42] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-heading font-bold text-lg text-[#1F5D42]">
                    Message Sent Successfully!
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-[#24332B]/75 max-w-sm mx-auto">
                    Thank you for contacting Om Charitable Trust. We will get back to you soon.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-full bg-[#1F5D42] text-white text-xs font-semibold hover:bg-[#164430] transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={`https://wa.me/${TRUST_WHATSAPP}?text=${encodeURIComponent('Hello Om Charitable Trust, I just submitted an inquiry through your website.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-[#FFF9F0] border border-[#1F5D42]/20 text-[#1F5D42] text-xs font-semibold hover:bg-[#F1F6F1] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>Also Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

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
                      placeholder="+91 8948038888"
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
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#1F5D42] hover:bg-[#164430] disabled:opacity-75 disabled:cursor-not-allowed text-white font-heading font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="pt-3 mt-4 border-t border-[#1F5D42]/10 flex items-center gap-2 text-xs text-[#24332B]/60">
              <Clock className="w-3.5 h-3.5 text-[#D98B3A]" />
              <span>Prompt response directly from Om Charitable Trust trustees</span>
            </div>
          </div>

          {/* Google Maps Location Embed */}
          <div className="lg:col-span-6 bg-white rounded-3xl overflow-hidden shadow-xl border border-[#1F5D42]/10 flex flex-col min-h-[340px]">
            <div className="p-4 border-b border-[#1F5D42]/10 flex items-center justify-between bg-[#FFF9F0]">
              <div className="flex items-center gap-2 text-left">
                <MapPin className="w-4 h-4 text-[#D98B3A]" />
                <span className="font-heading font-bold text-sm text-[#1F5D42]">
                  Registered Office Location
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#24332B]/60 uppercase tracking-wider">
                Indira Nagar, Lucknow
              </span>
            </div>

            {/* Google Maps iFrame */}
            <div className="flex-1 w-full relative min-h-[280px]">
              <iframe
                title="Om Charitable Trust Location"
                src="https://maps.google.com/maps?q=21%2F1100%2C+Sector+21%2C+Indira+Nagar%2C+Lucknow%2C+Uttar+Pradesh+226012&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
