import { useState, useEffect } from 'react'
import { Calendar, HeartHandshake, Sparkles, Users, Award, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function JourneySection() {
  const [activeStep, setActiveStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const milestones = [
    {
      step: '01',
      tag: 'The Beginning',
      title: 'Founded with a Purpose',
      subtitle: 'Formal Trust Registration',
      description:
        'Om Charitable Trust was formally established by dedicated community members with a commitment to pure, transparent grassroots service for individuals with nowhere else to turn.',
      highlights: [
        'Formally registered non-profit trust',
        'Transparent community-first governance',
        'Direct aid delivery without intermediaries',
      ],
      icon: Award,
    },
    {
      step: '02',
      tag: 'First Milestone',
      title: 'Early Initiatives',
      subtitle: 'Direct Relief & Nutrition Drives',
      description:
        'Initiated direct personal relief campaigns: food distribution, immediate health assistance, and essential comfort supplies delivered by hand to elderly and vulnerable individuals.',
      highlights: [
        'Regular community Annadanam meals',
        'Emergency food kits for vulnerable families',
        'Personal visits and direct elder care',
      ],
      icon: HeartHandshake,
    },
    {
      step: '03',
      tag: 'Growth Stage',
      title: 'Community Expansion',
      subtitle: 'Ashrams & Shelter Partnerships',
      description:
        'Scaled our reach to partner with shelter homes like Matoshree Vriddhashram, providing vital living infrastructure—mattresses, cots, desert coolers, and healthcare essentials.',
      highlights: [
        'Furnishing elderly shelter homes',
        'Coolers, bedding & daily living support',
        'Expanding regional volunteer networks',
      ],
      icon: Sparkles,
    },
    {
      step: '04',
      tag: 'Present & Beyond',
      title: 'Today & Moving Forward',
      subtitle: 'A Growing Compassion Movement',
      description:
        'Uniting over 500+ passionate volunteers across food drives, elder care, women empowerment, and animal welfare drives, creating lasting community self-reliance.',
      highlights: [
        '500+ active volunteer base',
        'Four comprehensive pillars of service',
        'Ongoing community-led campaigns',
      ],
      icon: Users,
    },
  ]

  // Continuous living timeline progression
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % milestones.length)
    }, 3800)
    return () => clearInterval(timer)
  }, [isPaused, milestones.length])

  return (
    <section
      id="journey"
      className="py-12 lg:py-16 bg-[#F1F6F1] relative overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#1F5D42]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#D98B3A]/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#1F5D42]/15 text-[#1F5D42] text-xs font-semibold uppercase tracking-wider shadow-sm">
            <Calendar className="w-3.5 h-3.5 text-[#D98B3A]" />
            <span>Our Living Journey</span>
            <span className="flex h-2 w-2 relative ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D98B3A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D98B3A]"></span>
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#1F5D42] tracking-tight leading-tight">
            Founded → Early Initiatives → Community Expansion → Today
          </h2>

          <p className="font-body text-base sm:text-lg text-[#24332B]/80 leading-relaxed">
            A continuous timeline showing our evolution from our founding mandate to our ongoing community movement. Click any milestone to explore that chapter.
          </p>
        </div>

        {/* Animated Stepper Track with Thin Line Step Flow (Desktop lg+) */}
        <div className="hidden lg:block relative mb-8">
          
          {/* Thin Background Guideline (Connecting Center of Node 1 to Node 4) */}
          <div className="absolute top-[28px] left-[12.5%] right-[12.5%] h-[2px] bg-[#1F5D42]/15 overflow-hidden">
            {/* Continuous stream beam flowing along the thin track */}
            <div className="timeline-beam-thin" />
          </div>

          {/* Active Step-Flow Thin Animated Progress Line */}
          <div
            className="absolute top-[28px] left-[12.5%] h-[2px] bg-gradient-to-r from-[#1F5D42] via-[#D98B3A] to-[#D98B3A] transition-all duration-700 ease-out z-0"
            style={{
              width: `${(activeStep / (milestones.length - 1)) * 75}%`,
            }}
          >
            {/* Leading Gliding Glowing Dot at the tip of the thin line */}
            <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#D98B3A] ring-4 ring-[#D98B3A]/30 shadow-[0_0_10px_#D98B3A] transition-all duration-700 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
            </div>
          </div>

          {/* Connected Step Nodes */}
          <div className="grid grid-cols-4 gap-6 relative z-10">
            {milestones.map((m, index) => {
              const IconComponent = m.icon
              const isActive = index === activeStep
              const isPast = index < activeStep

              return (
                <button
                  key={m.step}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-none transition-all duration-300"
                >
                  {/* Glowing Node Circle */}
                  <div className="relative mb-3">
                    {isActive && (
                      <div className="absolute -inset-2 rounded-2xl bg-[#D98B3A]/20 animate-pulse" />
                    )}
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all duration-500 ${
                        isActive
                          ? 'bg-[#1F5D42] text-white ring-4 ring-[#D98B3A] ring-offset-2 ring-offset-[#F1F6F1] shadow-[#D98B3A]/40 scale-110'
                          : isPast
                          ? 'bg-[#1F5D42] text-white border-2 border-[#1F5D42]'
                          : 'bg-white text-[#1F5D42] border-2 border-[#1F5D42]/20 group-hover:border-[#D98B3A] group-hover:scale-105'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Stage Label */}
                  <span
                    className={`font-mono text-xs font-bold tracking-wider uppercase transition-colors duration-300 ${
                      isActive
                        ? 'text-[#D98B3A]'
                        : isPast
                        ? 'text-[#1F5D42]'
                        : 'text-[#24332B]/50 group-hover:text-[#1F5D42]'
                    }`}
                  >
                    Stage {m.step}
                  </span>
                  
                  {/* Stage Title */}
                  <span
                    className={`font-heading font-bold text-sm mt-0.5 transition-colors duration-300 ${
                      isActive ? 'text-[#1F5D42]' : 'text-[#24332B]/75 group-hover:text-[#1F5D42]'
                    }`}
                  >
                    {m.title}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Milestones Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {milestones.map((item, index) => {
            const IconComp = item.icon
            const isActive = index === activeStep

            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(index)}
                className={`rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer relative ${
                  isActive
                    ? 'bg-white shadow-2xl ring-2 ring-[#D98B3A] -translate-y-2 border-transparent'
                    : 'bg-white/80 hover:bg-white shadow-sm hover:shadow-lg border border-[#1F5D42]/10 hover:-translate-y-1'
                }`}
              >
                {/* Active Pulsing Indicator Badge */}
                {isActive && (
                  <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#D98B3A] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 animate-bounce">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                    <span>In Focus</span>
                  </div>
                )}

                {/* Top Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-[#1F5D42] text-white'
                          : 'bg-[#F1F6F1] text-[#1F5D42] group-hover:bg-[#1F5D42] group-hover:text-white'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span
                      className={`font-mono text-xl font-black transition-colors ${
                        isActive ? 'text-[#D98B3A]' : 'text-[#1F5D42]/20'
                      }`}
                    >
                      {item.step}
                    </span>
                  </div>

                  <div
                    className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider mb-1.5 border transition-colors ${
                      isActive
                        ? 'bg-[#FFF9F0] text-[#D98B3A] border-[#D98B3A]/40'
                        : 'bg-[#F1F6F1] text-[#1F5D42] border-[#1F5D42]/15'
                    }`}
                  >
                    {item.tag}
                  </div>

                  <h3
                    className={`font-heading font-extrabold text-lg mb-0.5 transition-colors ${
                      isActive ? 'text-[#1F5D42]' : 'text-[#24332B]'
                    }`}
                  >
                    {item.title}
                  </h3>
                  
                  <div className="text-[11px] font-semibold text-[#24332B]/60 mb-2">
                    {item.subtitle}
                  </div>

                  <p className="font-body text-xs text-[#24332B]/80 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-3 border-t border-[#1F5D42]/10 space-y-1.5">
                  {item.highlights.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-left">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 shrink-0 mt-0.5 transition-colors ${
                          isActive ? 'text-[#D98B3A]' : 'text-[#1F5D42]'
                        }`}
                      />
                      <span className="text-xs text-[#24332B]/75 leading-tight">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            )
          })}
        </div>

        {/* Mobile Step Indicators */}
        <div className="flex lg:hidden items-center justify-center gap-2 mt-8">
          {milestones.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveStep(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeStep ? 'w-8 bg-[#D98B3A]' : 'w-2 bg-[#1F5D42]/20'
              }`}
              aria-label={`Go to stage ${i + 1}`}
            />
          ))}
        </div>

        {/* Bottom CTA Callout */}
        <div className="mt-10 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-3.5 sm:px-7 sm:py-3.5 rounded-full bg-white border border-[#1F5D42]/15 shadow-sm">
            <span className="font-body text-sm text-[#24332B] font-medium">
              Want to contribute to our continuing journey?
            </span>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D98B3A] hover:bg-[#C47A2D] text-white text-xs sm:text-sm font-semibold shadow transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Join as a Volunteer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
