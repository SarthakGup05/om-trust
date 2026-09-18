import { Heart, HandHeart, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react'

export default function ImpactMissionSection() {
  const commitments = [
    {
      title: 'Dignity Over Pity',
      desc: 'Treating every elder, woman, and child we serve as family, offering care with unconditional respect.',
      icon: Heart,
    },
    {
      title: 'Pure Grassroots Action',
      desc: 'Zero administrative bloat. Direct volunteer-led distribution in local villages, care homes, and shelters.',
      icon: HandHeart,
    },
    {
      title: 'Shared Responsibility',
      desc: 'Inviting citizens and communities to participate actively in uplifting our collective society.',
      icon: ShieldCheck,
    },
  ]

  return (
    <section id="impact" className="py-12 lg:py-16 bg-[#1F5D42] text-white relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#D98B3A]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#143B2B] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Mission Manifesto & Messaging */}
          <div className="lg:col-span-7 space-y-4 text-left">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#F5C284] text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D98B3A]" />
              <span>Our Guiding Purpose</span>
            </div>

            {/* Primary Heading from PRD */}
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#FFF9F0] tracking-tight leading-tight">
              Small Acts.<br />
              <span className="text-[#D98B3A]">Shared Responsibility.</span><br />
              Lasting Change.
            </h2>

            {/* Mission Statement */}
            <p className="font-body text-base sm:text-lg text-[#F1F6F1]/90 leading-relaxed">
              We believe genuine change does not stem from promises—it is built through consistent, heartfelt acts of service. When food reaches the hungry, when an elder is sheltered, and when women find their voice, society grows stronger together.
            </p>

            {/* 3 Authentic Commitments */}
            <div className="pt-1 space-y-2.5">
              {commitments.map((item, idx) => {
                const IconComp = item.icon
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#D98B3A]/20 text-[#F5C284] flex items-center justify-center shrink-0 mt-0.5">
                      <IconComp className="w-4 h-4 text-[#D98B3A]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm sm:text-base text-[#FFF9F0]">
                        {item.title}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-[#F1F6F1]/75 leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Clear Transition toward Volunteer & Support CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <a
                href="#volunteer"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-[#D98B3A] hover:bg-[#C47A2D] text-white font-medium text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Become a Volunteer</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 text-[#FFF9F0] border border-white/20 font-medium text-sm sm:text-base backdrop-blur-sm transition-all duration-200 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-[#D98B3A]" />
                <span>Support Our Work</span>
              </a>
            </div>

          </div>

          {/* Right Column: Natural Real Documentary Portrait Photograph */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[3/4] sm:aspect-[4/5] bg-[#143B2B] group max-w-md mx-auto lg:max-w-none">
              <img
                src="/images/impact-mission-portrait.webp"
                alt="Om Charitable Trust community volunteers and elders"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Subtle natural vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-80 pointer-events-none" />

              {/* Floating Testimonial / Community Pill */}
              <div className="absolute bottom-5 left-5 right-5 bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-left text-white">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F5C284] mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#D98B3A] animate-pulse"></span>
                  <span>Community in Action</span>
                </div>
                <p className="font-body text-xs sm:text-sm text-[#F1F6F1]/90 italic leading-relaxed">
                  "No act of service is too small. When we stand together, we give hope and dignity to those who need it most."
                </p>
              </div>
            </div>

            {/* Decorative Corner Label */}
            <div className="hidden sm:block absolute -top-4 -left-4 bg-[#D98B3A] text-white px-4 py-2 rounded-2xl shadow-lg text-xs font-bold uppercase tracking-wider">
              Humanity in Service
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
