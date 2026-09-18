import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight, HeartHandshake, Utensils, Heart } from 'lucide-react'

// Default slides configured with PRD Section 5 copy
// The user can supply their actual photographs via the `image` field
const SLIDES = [
  {
    id: 1,
    tag: 'Om Charitable Trust',
    title: 'Serving Humanity, Strengthening Communities',
    description:
      'Working together to create a more compassionate, dignified, and self-reliant society for every individual.',
    primaryCta: { text: 'Get Involved', href: '#volunteer' },
    secondaryCta: { text: 'About Our Mission', href: '#about' },
    icon: HeartHandshake,
    image: '/slider/1.webp',
    accentBadge: 'bg-[#D98B3A]/20 text-[#F5C284] border-[#D98B3A]/30',
  },
  {
    id: 2,
    tag: 'Food & Nutrition Support',
    title: 'No One Should Go Hungry',
    description:
      'From community kitchens and Annadanam drives to emergency relief kits, we stand firmly with families when they need it most.',
    primaryCta: { text: 'Support Our Work', href: '#contact' },
    secondaryCta: { text: 'Explore Food Drives', href: '#services' },
    icon: Utensils,
    image: '/slider/2.webp',
    accentBadge: 'bg-[#D98B3A]/20 text-[#F5C284] border-[#D98B3A]/30',
  },
  {
    id: 3,
    tag: 'Elderly & Vulnerable Care',
    title: 'Care That Reaches Those Who Need It',
    description:
      'Providing assistive care, dignity, and real practical assistance to seniors, women, shelter animals, and our shared environment.',
    primaryCta: { text: 'Become a Volunteer', href: '#volunteer' },
    secondaryCta: { text: 'See Areas of Work', href: '#services' },
    icon: Heart,
    image: '/slider/3.webp',
    accentBadge: 'bg-[#D98B3A]/20 text-[#F5C284] border-[#D98B3A]/30',
  },
]

export default function HeroSlider({ slides = SLIDES }) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [nextSlide, isPaused])

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] flex items-center bg-[#1F5D42] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Slider"
    >
      {/* Slides Container */}
      {slides.map((slide, index) => {
        const isActive = index === current
        const IconComponent = slide.icon

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            aria-hidden={!isActive}
          >
            {/* Background Graphic / Photo Layer */}
            {slide.image ? (
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover object-center"
                />
                {/* Gentle subtle gradient: soft fade on the text area fading out to transparent */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            ) : (
              /* Plain Solid Background */
              <div className="absolute inset-0 bg-[#1F5D42]" />
            )}

            {/* Content Container */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-12 lg:py-16">
              <div className="max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-5 text-white text-left">
                
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border backdrop-blur-md text-xs font-semibold tracking-wide uppercase shadow-sm">
                  {IconComponent && <IconComponent className="w-3.5 h-3.5 text-[#D98B3A]" />}
                  <span className="text-[#FFF9F0]">{slide.tag}</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#FFF9F0] tracking-tight leading-[1.15] drop-shadow-sm">
                  {slide.title}
                </h1>

                {/* Description Subtitle */}
                <p className="font-body text-base sm:text-lg lg:text-xl text-[#F1F6F1]/90 font-normal leading-relaxed max-w-2xl">
                  {slide.description}
                </p>

                {/* Call-to-action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  {slide.primaryCta && (
                    <a
                      href={slide.primaryCta.href}
                      className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full bg-[#D98B3A] hover:bg-[#C47A2D] text-white font-medium text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>{slide.primaryCta.text}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}

                  {slide.secondaryCta && (
                    <a
                      href={slide.secondaryCta.href}
                      className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FFF9F0] border border-white/20 font-medium text-sm sm:text-base backdrop-blur-sm transition-all duration-200"
                    >
                      <span>{slide.secondaryCta.text}</span>
                    </a>
                  )}
                </div>

              </div>
            </div>
          </div>
        )
      })}

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between pointer-events-none px-3 sm:px-6">
        <button
          type="button"
          onClick={prevSlide}
          className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-md transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D98B3A]"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="pointer-events-auto w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-md transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#D98B3A]"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-20 flex items-center justify-center gap-2.5">
        {slides.map((_, index) => {
          const isActive = index === current
          return (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D98B3A] ${
                isActive
                  ? 'w-8 bg-[#D98B3A]'
                  : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive ? 'true' : 'false'}
            />
          )
        })}
      </div>
    </section>
  )
}
