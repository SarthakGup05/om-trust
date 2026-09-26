import React, { useState, useEffect } from 'react'
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ExternalLink,
  Share2,
  X,
  Music,
  Camera,
  UtensilsCrossed,
  Check,
  ShieldCheck,
  PartyPopper
} from 'lucide-react'

export default function AnnouncementSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState('/announcementmobile.png')
  const [copied, setCopied] = useState(false)

  const bookingUrl = 'https://in.bookmyshow.com/activities/om-darshan-dandiya-utsav/ET00519226'
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Indira+Gandhi+Pratishthan+Lucknow'

  // Dandiya Utsav 2026 Target: Thursday, 17th October 2026 18:00 IST
  const targetDate = new Date('2026-10-17T18:00:00+05:30').getTime()

  const calculateTimeLeft = () => {
    const now = new Date().getTime()
    const difference = targetDate - now

    if (difference <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00' }
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Modal keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false)
    }
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isModalOpen])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Om Darshan Dandiya Utsav 2026',
          text: 'Join us for Om Darshan Dandiya Utsav presented by Anita Singh Rathore & Om Charitable Trust at Indira Gandhi Pratishthan, Lucknow!',
          url: bookingUrl,
        })
      } catch {
        copyToClipboard()
      }
    } else {
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bookingUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const openLightbox = (imagePath) => {
    setModalImage(imagePath)
    setIsModalOpen(true)
  }

  return (
    <section
      id="announcement"
      className="relative py-14 sm:py-20 lg:py-24 bg-gradient-to-b from-[#102E21] via-[#164430] to-[#102E21] text-white overflow-hidden"
      aria-label="Om Darshan Dandiya Utsav Announcement"
    >
      {/* Ambient Festive Backdrops & Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#D98B3A]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#E51A4C]/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full bg-[radial-gradient(circle_at_center,rgba(217,139,58,0.12)_0%,transparent_75%)]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#FFF9F0 1.5px, transparent 1.5px)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section Badge & Typography */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D98B3A]/25 via-[#D98B3A]/35 to-[#D98B3A]/25 border border-[#D98B3A]/60 backdrop-blur-md text-[#FBE2C0] text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-lg shadow-[#D98B3A]/15 mb-3.5">
            <Sparkles className="w-4 h-4 text-[#D98B3A]" />
            <span>Special Cultural Announcement</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E51A4C]" />
            <span className="text-[#F87171] font-bold">Booking Open</span>
          </div>

          <p className="text-xs sm:text-sm font-medium tracking-widest text-[#F5C284] uppercase">
            Presented by <span className="font-extrabold text-white">Anita Singh Rathore</span>
          </p>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#FFF9F0] tracking-tight mt-2 mb-3 drop-shadow-md">
            Om Darshan Dandiya Utsav
          </h2>

          <div className="flex items-center justify-center gap-3 text-sm sm:text-base font-semibold text-[#F5C284]">
            <span>Dance</span>
            <span className="text-[#D98B3A]/70">•</span>
            <span>Devotion</span>
            <span className="text-[#D98B3A]/70">•</span>
            <span>Togetherness</span>
          </div>

          <p className="mt-3 text-[#F1F6F1]/85 text-sm sm:text-base max-w-2xl mx-auto italic font-light">
            “Let the beats of tradition bring us closer this festive season. Come. Dance. Celebrate.”
          </p>

          {/* Classic Modern Urgency Countdown Timer */}
          <div className="flex flex-col items-center justify-center mt-7 sm:mt-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E51A4C]/15 border border-[#E51A4C]/35 text-[#F87171] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E51A4C] animate-pulse" />
              <span>Event Begins In • Book Your Passes Early</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
              {/* Days */}
              <div className="flex flex-col items-center">
                <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-2xl bg-gradient-to-b from-white/12 via-black/40 to-black/70 border border-[#D98B3A]/35 backdrop-blur-md flex items-center justify-center shadow-lg shadow-black/50 transition-all hover:border-[#D98B3A]/70">
                  <span className="tabular-nums font-mono font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#FFF9F0] tracking-tight">
                    {timeLeft.days}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#F5C284] uppercase mt-2">
                  Days
                </span>
              </div>

              <span className="font-mono text-2xl sm:text-3xl text-[#D98B3A] font-bold pb-6 animate-pulse select-none">:</span>

              {/* Hours */}
              <div className="flex flex-col items-center">
                <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-2xl bg-gradient-to-b from-white/12 via-black/40 to-black/70 border border-[#D98B3A]/35 backdrop-blur-md flex items-center justify-center shadow-lg shadow-black/50 transition-all hover:border-[#D98B3A]/70">
                  <span className="tabular-nums font-mono font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#FFF9F0] tracking-tight">
                    {timeLeft.hours}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#F5C284] uppercase mt-2">
                  Hours
                </span>
              </div>

              <span className="font-mono text-2xl sm:text-3xl text-[#D98B3A] font-bold pb-6 animate-pulse select-none">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-2xl bg-gradient-to-b from-white/12 via-black/40 to-black/70 border border-[#D98B3A]/35 backdrop-blur-md flex items-center justify-center shadow-lg shadow-black/50 transition-all hover:border-[#D98B3A]/70">
                  <span className="tabular-nums font-mono font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#FFF9F0] tracking-tight">
                    {timeLeft.minutes}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#F5C284] uppercase mt-2">
                  Mins
                </span>
              </div>

              <span className="font-mono text-2xl sm:text-3xl text-[#D98B3A] font-bold pb-6 animate-pulse select-none">:</span>

              {/* Seconds */}
              <div className="flex flex-col items-center">
                <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-2xl bg-gradient-to-b from-[#E51A4C]/25 via-black/40 to-black/70 border border-[#E51A4C]/40 backdrop-blur-md flex items-center justify-center shadow-lg shadow-black/50 transition-all hover:border-[#E51A4C]">
                  <span className="tabular-nums font-mono font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#F87171] tracking-tight">
                    {timeLeft.seconds}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#F87171] uppercase mt-2">
                  Secs
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP VIEW: Explicitly Uses WIDE BANNER (/announcementmobile.png)       */}
        {/* ========================================================================= */}
        <div className="hidden md:block space-y-8">
          
          {/* Panoramic Wide Banner Display (Clean & Minimal) */}
          <div className="relative rounded-3xl p-2.5 bg-gradient-to-r from-[#D98B3A]/35 via-[#1F5D42]/60 to-[#D98B3A]/35 border border-[#D98B3A]/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(217,139,58,0.25)]">
            <div className="relative rounded-2xl overflow-hidden aspect-[1774/887] bg-black/80 flex items-center justify-center cursor-pointer">
              <img
                src="/announcementmobile.png"
                alt="Om Darshan Dandiya Utsav Widescreen Announcement Banner"
                className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.01]"
                onClick={() => openLightbox('/announcementmobile.png')}
              />
            </div>
          </div>

          {/* Desktop Event Information & Booking Deck */}
          <div className="grid grid-cols-12 gap-6 items-stretch">
            
            {/* Event Coordinates: Date & Venue */}
            <div className="col-span-7 bg-white/5 border border-white/10 rounded-3xl p-7 backdrop-blur-md flex flex-col justify-between shadow-xl">
              <div className="grid grid-cols-2 gap-6">
                
                {/* Date Card */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D98B3A] to-[#B87028] flex items-center justify-center shrink-0 shadow-lg shadow-[#D98B3A]/25">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-[#F5C284]">
                      Event Date
                    </h4>
                    <p className="text-xl font-heading font-extrabold text-white mt-0.5">
                      Thursday, 17th Oct
                    </p>
                    <p className="text-xs text-[#F1F6F1]/75 flex items-center gap-1.5 mt-1">
                      <Clock className="w-3.5 h-3.5 text-[#D98B3A]" />
                      Dandiya Night • Evening
                    </p>
                  </div>
                </div>

                {/* Venue Card */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1F5D42] to-[#123626] border border-[#1F5D42]/80 flex items-center justify-center shrink-0 shadow-lg">
                    <MapPin className="w-6 h-6 text-[#F5C284]" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-[#F5C284]">
                      Venue Location
                    </h4>
                    <p className="text-xl font-heading font-extrabold text-white mt-0.5 leading-snug">
                      Indira Gandhi Pratishthan
                    </p>
                    <p className="text-xs text-[#F1F6F1]/75 mt-0.5">
                      Gomti Nagar, Lucknow
                    </p>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D98B3A] hover:text-[#F5C284] mt-1.5 underline underline-offset-4"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Highlights Chips */}
              <div className="pt-6 mt-6 border-t border-white/10 grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-black/20 border border-white/5 flex items-center gap-2.5">
                  <UtensilsCrossed className="w-4 h-4 text-[#D98B3A] shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">Food Stalls</p>
                    <p className="text-[10px] text-[#F1F6F1]/60">Festive Treats</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/20 border border-white/5 flex items-center gap-2.5">
                  <Camera className="w-4 h-4 text-[#D98B3A] shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">Photo Booth</p>
                    <p className="text-[10px] text-[#F1F6F1]/60">Royal Decor</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/20 border border-white/5 flex items-center gap-2.5">
                  <Music className="w-4 h-4 text-[#D98B3A] shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-white">Dandiya Nights</p>
                    <p className="text-[10px] text-[#F1F6F1]/60">Garba Beats</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Ticket Booking Deck */}
            <div className="col-span-5 bg-gradient-to-br from-[#2D0A14] via-[#3E0E1B] to-[#1C070E] border border-[#E51A4C]/35 rounded-3xl p-7 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#E51A4C]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E51A4C] animate-ping" />
                    <span className="text-xs uppercase font-extrabold tracking-wider text-[#F87171]">
                      Official Ticketing Partner
                    </span>
                  </div>
                  <PartyPopper className="w-4 h-4 text-[#F5C284]" />
                </div>

                <h3 className="font-heading font-extrabold text-2xl text-white">
                  Reserve Your Passes
                </h3>
                <p className="text-xs sm:text-sm text-[#FFF9F0]/80 leading-relaxed font-light">
                  Direct official booking available on BookMyShow. Secure passes for family, friends, and festive groups.
                </p>
              </div>

              {/* Minimalist Action Row */}
              <div className="space-y-3 pt-5 relative z-10">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] drop-shadow-[0_12px_28px_rgba(217,139,58,0.35)] hover:drop-shadow-[0_16px_36px_rgba(217,139,58,0.55)] cursor-pointer"
                  aria-label="Tickets Available on BookMyShow"
                >
                  <img
                    src="/images.png"
                    alt="Tickets Available on BookMyShow"
                    className="w-full max-w-[380px] h-auto object-contain transition-transform duration-300 group-hover:brightness-105"
                  />
                </a>

                {/* Clean Secondary Actions */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-[#F5C284]" />
                        <span>Share Event</span>
                      </>
                    )}
                  </button>

                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#F5C284]" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* MOBILE / SM DEVICES VIEW: Explicitly Uses PORTRAIT BANNER (/announcement.png) */}
        {/* ========================================================================= */}
        <div className="block md:hidden space-y-6">
          
          {/* Portrait Poster Card (Clean & Modern) */}
          <div className="relative rounded-2xl p-2 bg-gradient-to-b from-[#D98B3A]/35 via-[#1F5D42]/60 to-[#D98B3A]/30 border border-[#D98B3A]/40 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
            <div className="relative rounded-xl overflow-hidden aspect-[2/3] bg-black/60 flex items-center justify-center cursor-pointer">
              <img
                src="/announcement.png"
                alt="Om Darshan Dandiya Utsav Official Portrait Poster"
                className="w-full h-full object-contain"
                onClick={() => openLightbox('/announcement.png')}
              />
            </div>
          </div>

          {/* Mobile Event Details Box */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4 backdrop-blur-md">
            
            {/* Date and Time */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D98B3A] to-[#B87028] flex items-center justify-center shrink-0 shadow-md">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-[11px] uppercase font-bold tracking-wider text-[#F5C284]">
                  Date & Time
                </h4>
                <p className="text-base font-heading font-extrabold text-white">
                  Thursday, 17th October
                </p>
                <p className="text-xs text-[#F1F6F1]/70 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-[#D98B3A]" />
                  Dandiya Night Celebration
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-white/10" />

            {/* Venue */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1F5D42] to-[#123626] border border-[#1F5D42]/60 flex items-center justify-center shrink-0 shadow-md">
                <MapPin className="w-5 h-5 text-[#F5C284]" />
              </div>
              <div className="flex-1">
                <h4 className="text-[11px] uppercase font-bold tracking-wider text-[#F5C284]">
                  Venue
                </h4>
                <p className="text-base font-heading font-extrabold text-white">
                  Indira Gandhi Pratishthan
                </p>
                <p className="text-xs text-[#F1F6F1]/70 mt-0.5">
                  Gomti Nagar, Lucknow
                </p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#D98B3A] hover:text-[#F5C284] mt-1 underline underline-offset-4"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="h-px w-full bg-white/10" />

            {/* Feature Badges */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                <UtensilsCrossed className="w-4 h-4 text-[#D98B3A] mx-auto mb-1" />
                <p className="text-[11px] font-bold text-white">Food Stalls</p>
              </div>
              <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                <Camera className="w-4 h-4 text-[#D98B3A] mx-auto mb-1" />
                <p className="text-[11px] font-bold text-white">Photo Booth</p>
              </div>
              <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                <Music className="w-4 h-4 text-[#D98B3A] mx-auto mb-1" />
                <p className="text-[11px] font-bold text-white">Dandiya</p>
              </div>
            </div>

          </div>

          {/* Mobile Book Now Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#2D0A14] via-[#3E0E1B] to-[#1C070E] border border-[#E51A4C]/40 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#F87171] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E51A4C] animate-ping" />
                BookMyShow Tickets
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>

            {/* Direct CTA */}
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-full transition-all duration-300 active:scale-[0.97] drop-shadow-[0_8px_22px_rgba(217,139,58,0.35)] cursor-pointer py-1"
              aria-label="Tickets Available on BookMyShow"
            >
              <img
                src="/images.png"
                alt="Tickets Available on BookMyShow"
                className="w-full max-w-[340px] h-auto object-contain"
              />
            </a>

            {/* Mobile Share & Directions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleShare}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/10 text-white text-xs font-semibold border border-white/10"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#F5C284]" />
                    <span>Share Event</span>
                  </>
                )}
              </button>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/10 text-white text-xs font-semibold border border-white/10"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F5C284]" />
                <span>Directions</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* MINIMAL LIGHTBOX MODAL                                                   */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-3 sm:p-6"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Poster Full View"
        >
          <div
            className="relative max-w-5xl max-h-[94vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-[#F5C284]">
                Om Darshan Dandiya Utsav
              </span>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
                aria-label="Close view"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Poster Canvas */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 max-h-[72vh] sm:max-h-[76vh] flex items-center justify-center bg-black/60">
              <img
                src={modalImage}
                alt="Om Darshan Dandiya Utsav Poster"
                className="max-h-[72vh] sm:max-h-[76vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Modal Bottom CTA */}
            <div className="w-full pt-4 flex items-center justify-center">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 drop-shadow-[0_10px_25px_rgba(217,139,58,0.45)] cursor-pointer"
                aria-label="Tickets Available on BookMyShow"
              >
                <img
                  src="/images.png"
                  alt="Tickets Available on BookMyShow"
                  className="w-full max-w-[300px] sm:max-w-[340px] h-auto object-contain"
                />
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  )
}
