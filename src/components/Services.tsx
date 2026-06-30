import { Gift, Compass, ShieldAlert, Clock, Plane, ShieldCheck, Heart } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Heart className="w-6 h-6 text-amber-400" />,
      title: 'Wedding Protocol & Decoration',
      description: 'Make your big day spectacular. We offer coordinated entries with matching black Land Cruisers or white Prados. Includes complete decoration coordination at your venue or near our Saddar office.',
      badge: 'Highly Popular'
    },
    {
      icon: <Compass className="w-6 h-6 text-amber-400" />,
      title: 'Northern Pakistan Tours',
      description: 'Dreaming of Hunza, Skardu, Naran, or Swat? Rent a luxury 4x4 Prado with drivers who have 10+ years of mountain navigation experience. Absolute comfort combined with safety on challenging terrains.',
      badge: 'All-Terrain Comfort'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      title: 'VIP & Corporate Protocols',
      description: 'Top-tier bulletproof configurations, Range Rovers, and Land Cruisers for government delegates, foreign clients, or premium business visits. Seamless security coordination with armed guards.',
      badge: 'Executive Standard'
    },
    {
      icon: <Plane className="w-6 h-6 text-amber-400" />,
      title: '24/7 Airport Transfers',
      description: 'Executive pick-up and drop-offs between Islamabad International Airport (ISB) and Rawalpindi Saddar, DHA, Bahria Town, or surrounding cities with luggage security assistance.',
      badge: 'On-Time Guarantee'
    }
  ];

  return (
    <section id="services" className="py-24 bg-neutral-950 relative overflow-hidden">
      
      {/* Decorative ambient spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono block mb-3">Our Core Specialties</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Tailored Tourism & Protocol <br className="hidden sm:block" />
            Services for Every Occasion
          </h2>
          <div className="w-16 h-1.5 bg-amber-500 rounded-full mt-5" />
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700/80 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 transform hover:scale-[1.01] shadow-lg hover:shadow-2xl relative group"
            >
              {/* Highlight bar */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl" />
              
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-neutral-950 border border-neutral-800 rounded-2xl flex items-center justify-center shadow-inner">
                    {service.icon}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider font-mono text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded-md">
                    {service.badge}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800/60 flex items-center text-xs font-semibold text-amber-400 hover:text-white transition-colors cursor-pointer gap-1.5">
                <span>Inquire About Service</span>
                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
