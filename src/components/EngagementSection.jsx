import { useState } from 'react'
import { Heart, HandHeart, CheckCircle2, MessageSquare, Send, ArrowRight, ShieldCheck } from 'lucide-react'

export default function EngagementSection() {
  // Mode: 'volunteer' | 'donate'
  const [activeTab, setActiveTab] = useState('volunteer')

  // Volunteer form state
  const [volunteerData, setVolunteerData] = useState({
    fullName: '',
    phone: '',
    city: '',
    areaOfInterest: 'Food & Nutrition',
    availability: 'Weekend Drives',
    message: '',
  })

  // Donation / Support form state
  const [donateData, setDonateData] = useState({
    fullName: '',
    phone: '',
    city: '',
    supportCategory: 'Sponsor Annadanam / Daily Meals',
    contributionType: 'Financial Contribution',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // WhatsApp Destination Number (Trust contact coordination)
  const TRUST_WHATSAPP = '918400046265' // Official Om Charitable Trust WhatsApp number

  const handleVolunteerSubmit = (e) => {
    e.preventDefault()
    if (!volunteerData.fullName.trim() || !volunteerData.phone.trim() || !volunteerData.city.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Phone, City).')
      return
    }
    setErrorMsg('')

    const text = `*New Volunteer Request - Om Charitable Trust*
Name: ${volunteerData.fullName}
Phone: ${volunteerData.phone}
City: ${volunteerData.city}
Area of Interest: ${volunteerData.areaOfInterest}
Availability: ${volunteerData.availability}
Message: ${volunteerData.message || 'Ready to serve'}`

    const whatsappUrl = `https://wa.me/${TRUST_WHATSAPP}?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, '_blank')
    setSubmitted(true)
  }

  const handleDonateSubmit = (e) => {
    e.preventDefault()
    if (!donateData.fullName.trim() || !donateData.phone.trim() || !donateData.city.trim()) {
      setErrorMsg('Please fill in all required fields (Name/Organization, Phone, City).')
      return
    }
    setErrorMsg('')

    const text = `*New Support & Donation Inquiry - Om Charitable Trust*
Name/Org: ${donateData.fullName}
Phone: ${donateData.phone}
City: ${donateData.city}
Initiative: ${donateData.supportCategory}
Contribution Type: ${donateData.contributionType}
Message: ${donateData.message || 'Interested in supporting'}`

    const whatsappUrl = `https://wa.me/${TRUST_WHATSAPP}?text=${encodeURIComponent(text)}`
    window.open(whatsappUrl, '_blank')
    setSubmitted(true)
  }

  const resetForm = () => {
    setSubmitted(false)
    setErrorMsg('')
  }

  return (
    <section id="volunteer" className="py-12 lg:py-16 bg-[#F1F6F1] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1F5D42]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D98B3A]/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div id="get-involved" className="text-center max-w-3xl mx-auto mb-8 lg:mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1F5D42]/15 text-[#1F5D42] text-xs font-semibold uppercase tracking-wider shadow-sm">
            <HandHeart className="w-3.5 h-3.5 text-[#D98B3A]" />
            <span>Be a Part of the Change</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#1F5D42] tracking-tight leading-tight">
            Step Forward to Make a Difference
          </h2>

          <p className="font-body text-base sm:text-lg text-[#24332B]/80 leading-relaxed">
            Whether you want to lend your time as a grassroots volunteer or financially sponsor a community drive, getting involved with Om Charitable Trust is direct, personal, and transparent.
          </p>

          {/* Unified Tab Switcher (Same layout architecture, yet uniquely tailored) */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex p-1 rounded-2xl bg-white border border-[#1F5D42]/15 shadow-md">
              <button
                type="button"
                onClick={() => { setActiveTab('volunteer'); resetForm(); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  activeTab === 'volunteer'
                    ? 'bg-[#1F5D42] text-white shadow-md'
                    : 'text-[#24332B]/70 hover:text-[#1F5D42]'
                }`}
              >
                <HandHeart className="w-4 h-4" />
                <span>Become a Volunteer</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('donate'); resetForm(); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  activeTab === 'donate'
                    ? 'bg-[#D98B3A] text-white shadow-md'
                    : 'text-[#24332B]/70 hover:text-[#D98B3A]'
                }`}
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Support Our Work (Donate)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Unified Dual Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Visual Documentary Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white h-full min-h-[320px] bg-[#143B2B] flex flex-col justify-end p-5 sm:p-6">
              <img
                src="/images/volunteer-donation.webp"
                alt="Om Charitable Trust volunteer community packaging drive"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              {/* Dynamic Overlay Info based on activeTab */}
              <div className="relative z-10 text-white space-y-2.5 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#F5C284]">
                  {activeTab === 'volunteer' ? 'Grassroots Volunteer Team' : 'Direct Community Sponsorship'}
                </div>

                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#FFF9F0] leading-snug">
                  {activeTab === 'volunteer'
                    ? 'Hands That Serve, Hearts That Care'
                    : 'Transparent Giving, Real-World Impact'}
                </h3>

                <p className="font-body text-xs sm:text-sm text-[#F1F6F1]/90 leading-relaxed">
                  {activeTab === 'volunteer'
                    ? 'Join a passionate group of volunteers directly serving at community kitchens, elder care homes, women support programs, and animal rescues.'
                    : 'Every rupee contributed is dedicated directly to grassroots relief items, hot nutritious meals, and essential senior amenities with zero middleman deductions.'}
                </p>

                <div className="pt-1 flex items-center gap-2.5 text-xs text-[#F5C284]">
                  <CheckCircle2 className="w-4 h-4 text-[#D98B3A]" />
                  <span>100% Direct WhatsApp Coordination</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Form (Same Form Shell, Distinct Specialized Fields) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border border-[#1F5D42]/10 flex-1 flex flex-col justify-between text-left">
              
              {submitted ? (
                /* Success Confirmation State */
                <div className="py-12 text-center space-y-6 flex-1 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#F1F6F1] text-[#1F5D42] flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-10 h-10 text-[#1F5D42]" />
                  </div>
                  <div className="space-y-2 max-w-md">
                    <h3 className="font-heading font-extrabold text-2xl text-[#1F5D42]">
                      Thank You for Reaching Out!
                    </h3>
                    <p className="font-body text-sm text-[#24332B]/80 leading-relaxed">
                      We have opened WhatsApp to connect you directly with our trustees and coordination desk. Your willingness to serve strengthens our entire community.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1F5D42] text-white text-xs font-semibold shadow hover:bg-[#164430] transition-colors"
                  >
                    <span>Send Another Inquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                /* Interactive Form Fields */
                <form
                  onSubmit={activeTab === 'volunteer' ? handleVolunteerSubmit : handleDonateSubmit}
                  className="space-y-5"
                >
                  {/* Form Header Title */}
                  <div className="border-b border-[#1F5D42]/10 pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#1F5D42]">
                          {activeTab === 'volunteer'
                            ? 'Volunteer Interest Application'
                            : 'Support & Donation Inquiry'}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#24332B]/70 mt-1">
                          {activeTab === 'volunteer'
                            ? 'Submit your details to join our next grassroots relief drive.'
                            : 'Direct coordination via WhatsApp for material or financial support.'}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                          activeTab === 'volunteer'
                            ? 'bg-[#1F5D42]/10 text-[#1F5D42]'
                            : 'bg-[#D98B3A]/15 text-[#D98B3A]'
                        }`}
                      >
                        {activeTab === 'volunteer' ? 'Volunteer' : 'Donation'}
                      </span>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                      {errorMsg}
                    </div>
                  )}

                  {/* Field Row 1: Name & Phone (Common to both) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-heading font-bold text-xs text-[#24332B]">
                        {activeTab === 'volunteer' ? 'Full Name *' : 'Name / Organization *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={activeTab === 'volunteer' ? 'e.g. Ramesh Patel' : 'e.g. Ananya Sharma or Sharma Corp'}
                        value={activeTab === 'volunteer' ? volunteerData.fullName : donateData.fullName}
                        onChange={(e) =>
                          activeTab === 'volunteer'
                            ? setVolunteerData({ ...volunteerData, fullName: e.target.value })
                            : setDonateData({ ...donateData, fullName: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#FFF9F0] border border-[#1F5D42]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5D42] text-[#24332B]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-heading font-bold text-xs text-[#24332B]">
                        WhatsApp Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={activeTab === 'volunteer' ? volunteerData.phone : donateData.phone}
                        onChange={(e) =>
                          activeTab === 'volunteer'
                            ? setVolunteerData({ ...volunteerData, phone: e.target.value })
                            : setDonateData({ ...donateData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#FFF9F0] border border-[#1F5D42]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5D42] text-[#24332B]"
                      />
                    </div>
                  </div>

                  {/* Field Row 2: City & Dynamic Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-heading font-bold text-xs text-[#24332B]">
                        City / Location *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ahmedabad, Surat, etc."
                        value={activeTab === 'volunteer' ? volunteerData.city : donateData.city}
                        onChange={(e) =>
                          activeTab === 'volunteer'
                            ? setVolunteerData({ ...volunteerData, city: e.target.value })
                            : setDonateData({ ...donateData, city: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#FFF9F0] border border-[#1F5D42]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5D42] text-[#24332B]"
                      />
                    </div>

                    {/* Dynamic Field: Area of Interest (Volunteer) vs Support Category (Donation) */}
                    <div className="space-y-1.5">
                      <label className="font-heading font-bold text-xs text-[#24332B]">
                        {activeTab === 'volunteer' ? 'Area of Interest *' : 'Initiative to Support *'}
                      </label>
                      {activeTab === 'volunteer' ? (
                        <select
                          value={volunteerData.areaOfInterest}
                          onChange={(e) => setVolunteerData({ ...volunteerData, areaOfInterest: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#FFF9F0] border border-[#1F5D42]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5D42] text-[#24332B]"
                        >
                          <option value="Food & Nutrition">Food & Nutrition Support</option>
                          <option value="Elderly & Vulnerable Care">Elderly & Vulnerable Care</option>
                          <option value="Women Empowerment">Women Empowerment</option>
                          <option value="Animal Welfare">Animal Welfare</option>
                          <option value="Environmental Drives">Environmental Drives</option>
                          <option value="Other">Other / General Volunteer</option>
                        </select>
                      ) : (
                        <select
                          value={donateData.supportCategory}
                          onChange={(e) => setDonateData({ ...donateData, supportCategory: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#FFF9F0] border border-[#1F5D42]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#D98B3A] text-[#24332B]"
                        >
                          <option value="Sponsor Annadanam / Daily Meals">Sponsor Annadanam / Daily Meals</option>
                          <option value="Elder Care Cots & Bedding Support">Elder Care Cots & Bedding Support</option>
                          <option value="Women Empowerment Micro-Grants">Women Empowerment Micro-Grants</option>
                          <option value="Animal Rescue & Gaushala Aid">Animal Rescue & Gaushala Aid</option>
                          <option value="General Relief & Welfare Fund">General Relief & Welfare Fund</option>
                        </select>
                      )}
                    </div>
                  </div>

                  {/* Field Row 3: Availability (Volunteer) vs Contribution Type (Donation) */}
                  <div className="space-y-1.5">
                    <label className="font-heading font-bold text-xs text-[#24332B]">
                      {activeTab === 'volunteer' ? 'Availability Preference' : 'Preferred Contribution Mode'}
                    </label>
                    {activeTab === 'volunteer' ? (
                      <div className="grid grid-cols-3 gap-2">
                        {['Weekend Drives', 'Flexible / On-Call', 'Regular Weekly'].map((avail) => (
                          <button
                            key={avail}
                            type="button"
                            onClick={() => setVolunteerData({ ...volunteerData, availability: avail })}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              volunteerData.availability === avail
                                ? 'bg-[#1F5D42] text-white border-[#1F5D42]'
                                : 'bg-[#FFF9F0] text-[#24332B]/70 border-[#1F5D42]/15 hover:border-[#1F5D42]'
                            }`}
                          >
                            {avail}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {['Financial Support', 'Material / Rations', 'Group Sponsor'].map((cType) => (
                          <button
                            key={cType}
                            type="button"
                            onClick={() => setDonateData({ ...donateData, contributionType: cType })}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                              donateData.contributionType === cType
                                ? 'bg-[#D98B3A] text-white border-[#D98B3A]'
                                : 'bg-[#FFF9F0] text-[#24332B]/70 border-[#1F5D42]/15 hover:border-[#D98B3A]'
                            }`}
                          >
                            {cType}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label className="font-heading font-bold text-xs text-[#24332B]">
                      {activeTab === 'volunteer'
                        ? 'Message / Skills you want to share (Optional)'
                        : 'Message / Specific questions or requirements (Optional)'}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={
                        activeTab === 'volunteer'
                          ? 'Tell us about your background or how you would like to help...'
                          : 'Share any details about how you would like to sponsor or contribute...'
                      }
                      value={activeTab === 'volunteer' ? volunteerData.message : donateData.message}
                      onChange={(e) =>
                        activeTab === 'volunteer'
                          ? setVolunteerData({ ...volunteerData, message: e.target.value })
                          : setDonateData({ ...donateData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#FFF9F0] border border-[#1F5D42]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F5D42] text-[#24332B] resize-none"
                    />
                  </div>

                  {/* Submit Button & Direct WhatsApp Trigger */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className={`w-full py-4 rounded-2xl text-white font-heading font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                        activeTab === 'volunteer'
                          ? 'bg-[#1F5D42] hover:bg-[#164430]'
                          : 'bg-[#D98B3A] hover:bg-[#C47A2D]'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>
                        {activeTab === 'volunteer'
                          ? 'Submit Volunteer Request via WhatsApp'
                          : 'Send Support Inquiry via WhatsApp'}
                      </span>
                      <Send className="w-4 h-4 ml-1" />
                    </button>

                    <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-[#24332B]/60">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#1F5D42]" />
                      <span>No online payments or logins. Direct connection with Trust trustees.</span>
                    </div>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
