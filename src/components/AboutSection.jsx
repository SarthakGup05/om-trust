import { Heart, Target, Eye, Users, Utensils, Award, ShieldCheck } from 'lucide-react'

export default function AboutSection() {
  const stats = [
    {
      label: 'Years of Service',
      value: '5+',
      description: 'Dedicated community service',
      icon: Award,
    },
    {
      label: 'Food & Relief Drives',
      value: '250+',
      description: 'Annadanam & nutrition drives',
      icon: Utensils,
    },
    {
      label: 'Active Volunteers',
      value: '500+',
      description: 'Compassionate changemakers',
      icon: Users,
    },
    {
      label: 'Lives Supported',
      value: '15,000+',
      description: 'Meals and care provided',
      icon: Heart,
    },
  ]

  return (
    <section id="about" className="py-12 lg:py-16 bg-[#FFF9F0] relative overflow-hidden">
      {/* Decorative subtle ambient glows */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-[#F1F6F1] rounded-full filter blur-3xl -z-10 opacity-70" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#D98B3A]/5 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F6F1] border border-[#1F5D42]/15 text-[#1F5D42] text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D98B3A]" />
            <span>About Om Charitable Trust</span>
          </div>
          
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#1F5D42] tracking-tight leading-tight">
            Rooted in Compassion, Driven by Community
          </h2>
          
          <p className="font-body text-base sm:text-lg text-[#24332B]/80 leading-relaxed">
            Founded with the belief that selfless service strengthens communities, Om Charitable Trust works directly at the grassroots level to bring food security, elder dignity, women empowerment, and care to those who need it most.
          </p>
        </div>

        {/* Two-Column Story & Mission Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-12">
          
          {/* Left Column: Visual Showcase with Official Logo Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-[#F1F6F1]">
              <img
                src="/images/about.webp"
                alt="Om Charitable Trust team and initiatives"
                className="w-full h-full object-cover object-top"
              />
              
              {/* Floating Official Trust Emblem Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-[#1F5D42]/10 flex items-center gap-3.5">
                <img
                  src="/OM trust logo.webp"
                  alt="Om Charitable Trust Emblem"
                  className="w-12 h-12 object-contain shrink-0"
                />
                <div className="text-left">
                  <div className="font-heading font-extrabold text-sm text-[#1F5D42]">
                    Om Charitable Trust
                  </div>
                  <div className="text-xs text-[#24332B]/75 leading-tight mt-0.5">
                    Registered Community NGO serving humanity with transparent action.
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Corner Experience Pill */}
            <div className="hidden sm:flex absolute -top-3 -right-3 bg-[#D98B3A] text-white px-3.5 py-2 rounded-2xl shadow-lg items-center gap-2 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Grassroots Action</span>
            </div>
          </div>

          {/* Right Column: Mission, Vision, and Philosophy */}
          <div className="lg:col-span-7 space-y-4 text-left">
            
            {/* Mission Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#1F5D42]/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#F1F6F1] flex items-center justify-center text-[#1F5D42] shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-[#1F5D42]">
                    Our Mission
                  </h3>
                  <p className="font-body text-sm sm:text-base text-[#24332B]/80 leading-relaxed">
                    To eliminate hunger through community kitchens, extend healthcare and assistive care to vulnerable elders, foster self-reliance for women, and protect our environment and local animals.
                  </p>
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#1F5D42]/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#F1F6F1] flex items-center justify-center text-[#D98B3A] shrink-0">
                  <Eye className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-[#1F5D42]">
                    Our Vision
                  </h3>
                  <p className="font-body text-sm sm:text-base text-[#24332B]/80 leading-relaxed">
                    A compassionate, equitable society where every person has access to nutritious food, seniors live with dignity, women lead self-reliant lives, and community welfare is a shared civic responsibility.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Philosophy Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F1F6F1] border border-[#1F5D42]/15 text-left space-y-1.5">
              <h4 className="font-heading font-bold text-base sm:text-lg text-[#1F5D42]">
                Our Core Philosophy: Small Acts, Lasting Change
              </h4>
              <p className="font-body text-xs sm:text-sm text-[#24332B]/85 leading-relaxed">
                We believe genuine charity is personal, transparent, and direct. Every initiative is led by active community volunteers working on the ground to ensure that help reaches those who need it with unconditional dignity and respect.
              </p>
            </div>

          </div>

        </div>

        {/* Impact Statistics Grid */}
        <div className="pt-6 border-t border-[#1F5D42]/10">
          <div className="text-center mb-6">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#1F5D42]">
              Verified Community Footprint
            </h3>
            <p className="text-xs sm:text-sm text-[#24332B]/70 mt-1">
              Consistent, measurable grassroots impact across our initiatives
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {stats.map((stat, i) => {
              const IconComp = stat.icon
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-[#1F5D42]/10 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#F1F6F1] text-[#1F5D42] mb-2">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-[#1F5D42] mb-0.5">
                    {stat.value}
                  </div>
                  <div className="font-body font-semibold text-xs sm:text-sm text-[#24332B] mb-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-[#24332B]/60">
                    {stat.description}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
