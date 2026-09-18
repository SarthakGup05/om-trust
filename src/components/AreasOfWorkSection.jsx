import { Utensils, HeartHandshake, Sparkles, Trees, CheckCircle2, ArrowRight } from 'lucide-react'

export default function AreasOfWorkSection() {
  const areas = [
    {
      id: 'food-nutrition',
      title: 'Food & Nutrition Support',
      tag: 'Zero Hunger',
      purpose:
        'Help address food insecurity and provide reliable nutritional support to vulnerable communities and families in need.',
      activities: [
        'Community kitchens & Annadanam meal drives',
        'Dry ration distribution kits for underprivileged families',
        'School lunch and nutrition supplements for children',
        'Emergency disaster relief and crisis nutrition packs',
      ],
      icon: Utensils,
      image: '/images/service-food.webp',
      badgeColor: 'bg-[#1F5D42] text-white',
      accentBorder: 'hover:border-[#1F5D42]/40',
    },
    {
      id: 'elderly-care',
      title: 'Elderly & Vulnerable Care',
      tag: 'Elder Dignity',
      purpose:
        'Provide unconditional dignity, warmth, and practical assistance to elderly, widowed, and vulnerable individuals.',
      activities: [
        'Support and living aid for abandoned seniors',
        'Day-care & shelter home infrastructure assistance',
        'Assistive devices: wheelchairs, hearing aids, crutches',
        'Dedicated widow support and medical comfort schemes',
      ],
      icon: HeartHandshake,
      image: '/images/service-elderly.webp',
      badgeColor: 'bg-[#D98B3A] text-white',
      accentBorder: 'hover:border-[#D98B3A]/40',
    },
    {
      id: 'women-empowerment',
      title: 'Women Empowerment & Self-Reliance',
      tag: 'Self-Reliance',
      purpose:
        'Equip women with vocational skills, resources, and health awareness to become financially and socially self-reliant.',
      activities: [
        'Micro-grant assistance for home-based livelihoods',
        'Self-help group (SHG) skill development sessions',
        'Menstrual health and hygiene awareness drives',
        'Essential hygiene kit and health supply distribution',
      ],
      icon: Sparkles,
      image: '/images/service-women.webp',
      badgeColor: 'bg-[#1F5D42] text-white',
      accentBorder: 'hover:border-[#1F5D42]/40',
    },
    {
      id: 'animal-environment',
      title: 'Animal Welfare & Environmental Drives',
      tag: 'Nature & Animals',
      purpose:
        'Promote compassion for stray animals and foster active ecological responsibility within local community neighborhoods.',
      activities: [
        'Stray animal rescue, feeding & medical care',
        'Gaushala fodder and shelter assistance',
        'Native tree plantation and greening drives',
        'Community clean-up and environmental campaigns',
      ],
      icon: Trees,
      image: '/images/service-animals.webp',
      badgeColor: 'bg-[#D98B3A] text-white',
      accentBorder: 'hover:border-[#D98B3A]/40',
    },
  ]

  return (
    <section id="services" className="py-12 lg:py-16 bg-[#FFF9F0] relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#F1F6F1] rounded-full filter blur-3xl -z-10 opacity-70" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#D98B3A]/5 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F6F1] border border-[#1F5D42]/15 text-[#1F5D42] text-xs font-semibold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#1F5D42]"></span>
            <span>Where We Serve</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#1F5D42] tracking-tight leading-tight">
            Our Four Primary Areas of Work
          </h2>

          <p className="font-body text-base sm:text-lg text-[#24332B]/80 leading-relaxed">
            Every initiative led by Om Charitable Trust focuses on practical, verifiable impact. Explore the core pillars that guide our daily community service.
          </p>
        </div>

        {/* 4 Primary Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {areas.map((area) => {
            const IconComp = area.icon

            return (
              <div
                key={area.id}
                className={`bg-white rounded-3xl overflow-hidden border border-[#1F5D42]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1 ${area.accentBorder}`}
              >
                {/* Photo Header */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-[#F1F6F1]">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                  
                  {/* Floating Pillar Tag */}
                  <div className="absolute top-3.5 left-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md ${area.badgeColor}`}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{area.tag}</span>
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-left space-y-4">
                  
                  <div className="space-y-2">
                    <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#1F5D42] group-hover:text-[#D98B3A] transition-colors">
                      {area.title}
                    </h3>

                    {/* Purpose Statement */}
                    <p className="font-body text-xs sm:text-sm text-[#24332B]/80 leading-relaxed">
                      {area.purpose}
                    </p>
                  </div>

                  {/* Core Activities Checklist */}
                  <div className="space-y-2 pt-2 border-t border-[#1F5D42]/10">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#24332B]/60 mb-1">
                      Key Activities:
                    </div>
                    {area.activities.map((act, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#24332B]/85">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1F5D42] shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Action Pathway */}
                  <div className="pt-3 border-t border-[#1F5D42]/10 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#1F5D42]">
                      Transparent Grassroots Action
                    </span>
                    <a
                      href="#volunteer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#D98B3A] hover:text-[#C47A2D] group/btn"
                    >
                      <span>Volunteer in this Area</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>

                </div>
              </div>
            )
          })}
        </div>

        {/* Section Footer Callout */}
        <div className="mt-10 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-3.5 sm:px-7 sm:py-3.5 rounded-3xl sm:rounded-full bg-white border border-[#1F5D42]/15 shadow-sm">
            <span className="font-body text-xs sm:text-sm text-[#24332B] font-medium">
              Want to support a specific initiative or sponsor a community drive?
            </span>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1F5D42] hover:bg-[#164430] text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Contact Us to Support</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D98B3A]" />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
