import { Star, MapPin, ArrowRight, ShieldCheck, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ShowcaseBentoProps {
  onInstantBook: () => void;
  onFilterCategory: (category: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function ShowcaseBento({ onInstantBook, onFilterCategory, onScrollToSection }: ShowcaseBentoProps) {
  return (
    <section className="py-16 bg-[#080808] relative overflow-hidden border-t border-zinc-900">
      {/* Absolute ambient lights for Bento aesthetic */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-left mb-10 max-w-3xl">
          <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-[0.3em] block mb-2">Exclusive Interactive Experience</span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
            Flagship Showcase & Live Operations
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-2 max-w-xl">
            Explore our instant status, active dispatch rating, location hub, and flagship specifications at a single glance.
          </p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px] md:auto-rows-[180px] lg:auto-rows-[180px]">
          
          {/* Card 1: Hero Image Card: Toyota Land Cruiser V8 (col-span-2, row-span-2) */}
          <div 
            onClick={() => {
              onFilterCategory('Elite VIP');
              onScrollToSection('fleet');
            }}
            className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 group cursor-pointer bento-glow transition-all duration-300 shadow-lg hover:border-amber-500/30 flex flex-col justify-end p-6 sm:p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
            
            {/* Background image */}
            <img 
              src="/src/assets/images/land_cruiser_v8_1782836320221.jpg" 
              alt="Toyota Land Cruiser LC300"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 opacity-60"
            />
            
            <div className="relative z-20">
              <span className="px-3 py-1 bg-white text-black text-[10px] font-mono font-bold uppercase rounded-full mb-3 inline-block tracking-wider">
                Flagship Fleet
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-none tracking-tighter">
                LAND CRUISER V8
              </h2>
              <p className="text-zinc-300 text-xs sm:text-sm mt-2 max-w-md font-sans">
                Pinnacle of luxury, security protocols, and authority for Pakistani roads. Custom high-profile escort setups available.
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View Collection Fleet</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Stylized UI wireframe outline overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden sm:block">
              <svg width="350" height="150" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 150 L350 150 L380 180 L20 180 Z" fill="white" />
                <rect x="80" y="100" width="240" height="50" rx="10" fill="white" />
                <path d="M100 100 L140 50 L260 50 L300 100 Z" stroke="white" strokeWidth="4" />
              </svg>
            </div>
          </div>

          {/* Card 2: Fleet Stats/Rating Card (col-span-1, row-span-1) */}
          <div 
            onClick={() => onScrollToSection('reviews')}
            className="md:col-span-1 md:row-span-1 bg-[#121212] rounded-3xl p-6 border border-zinc-800 flex flex-col justify-between text-left cursor-pointer bento-glow hover:border-zinc-700 transition-all"
          >
            <div className="flex justify-between items-start">
              <span className="text-4xl font-black font-serif text-amber-400">4.9</span>
              <div className="flex text-amber-400 bg-amber-400/10 p-1.5 rounded-lg border border-amber-400/20">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Customer Rating</p>
              <p className="text-zinc-300 text-xs italic mt-1 font-sans font-medium line-clamp-1">
                "Best luxury car service in Saddar"
              </p>
            </div>
          </div>

          {/* Card 3: Availability Card (col-span-1, row-span-1) */}
          <div 
            onClick={() => onScrollToSection('contact')}
            className="md:col-span-1 md:row-span-1 bg-white text-black rounded-3xl p-6 flex flex-col justify-between text-left cursor-pointer hover:bg-zinc-100 transition-all shadow-md"
          >
            <div className="w-9 h-9 rounded-full border border-black/10 flex items-center justify-center bg-black/5">
              <div className="w-2.5 h-2.5 bg-green-600 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold leading-none uppercase tracking-tight">
                OPEN 24<br/>HOURS
              </h3>
              <p className="text-[9px] font-mono font-bold mt-1 opacity-60 uppercase tracking-widest">
                Ready for Dispatch
              </p>
            </div>
          </div>

          {/* Card 4: Fleet Mini List (col-span-2, row-span-1) */}
          <div 
            onClick={() => onScrollToSection('fleet')}
            className="md:col-span-2 md:row-span-1 bg-[#121212] border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between text-left cursor-pointer bento-glow hover:border-zinc-700 transition-all"
          >
            <div>
              <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-[0.2em]">Executive Fleet Options</p>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilterCategory('Executive Sedan');
                    onScrollToSection('fleet');
                  }}
                  className="border-l border-zinc-800 hover:border-amber-500 pl-3 transition-colors py-1 group/item"
                >
                  <p className="text-[10px] text-zinc-500 font-medium group-hover/item:text-neutral-400">Sedan Luxe</p>
                  <p className="font-serif font-bold text-white text-xs sm:text-sm tracking-tight group-hover/item:text-amber-400">GRANDE</p>
                </div>
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilterCategory('Premium Off-Road');
                    onScrollToSection('fleet');
                  }}
                  className="border-l border-zinc-800 hover:border-amber-500 pl-3 transition-colors py-1 group/item"
                >
                  <p className="text-[10px] text-zinc-500 font-medium group-hover/item:text-neutral-400">Compact SUV</p>
                  <p className="font-serif font-bold text-white text-xs sm:text-sm tracking-tight group-hover/item:text-amber-400">PRADO</p>
                </div>
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    onFilterCategory('Elite VIP');
                    onScrollToSection('fleet');
                  }}
                  className="border-l border-zinc-800 hover:border-amber-500 pl-3 transition-colors py-1 group/item"
                >
                  <p className="text-[10px] text-zinc-500 font-medium group-hover/item:text-neutral-400">Prestige VIP</p>
                  <p className="font-serif font-bold text-white text-xs sm:text-sm tracking-tight group-hover/item:text-amber-400">VOGUE</p>
                </div>
              </div>
            </div>
            <p className="text-[9px] text-zinc-600 italic">Click on any luxury option to view full specs</p>
          </div>

          {/* Card 5: Location/Address Card (col-span-2, row-span-1) */}
          <div 
            onClick={() => onScrollToSection('contact')}
            className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-6 sm:p-8 flex items-center gap-6 text-left border border-zinc-800 cursor-pointer bento-glow hover:border-zinc-700 transition-all"
          >
            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white tracking-tight">GPO Chowk, Saddar</h4>
              <p className="text-zinc-400 text-xs mt-0.5 leading-snug">Near UBL Bank Branch, Rawalpindi, 46000</p>
              <p className="text-[9px] text-zinc-600 mt-1.5 italic uppercase tracking-widest font-mono">
                Heart of Rawalpindi City
              </p>
            </div>
          </div>

          {/* Card 6: Call to Action Card (col-span-2, row-span-1) */}
          <div className="md:col-span-2 md:row-span-1 bg-white text-black rounded-3xl p-6 sm:p-8 flex justify-between items-center gap-4 text-left shadow-lg">
            <div className="max-w-[65%]">
              <h3 className="font-serif text-2xl sm:text-3xl font-black italic uppercase leading-tight tracking-tighter">
                Ready to Ride?
              </h3>
              <p className="text-xs font-semibold text-zinc-600 mt-1 leading-normal font-sans">
                Instant booking for tourism tours, corporate visits, & VIP protocols.
              </p>
            </div>
            <button 
              onClick={onInstantBook}
              className="px-6 py-3.5 bg-black hover:bg-zinc-900 text-white rounded-full font-mono font-bold text-xs hover:scale-105 transition-transform duration-300 flex items-center gap-1.5 cursor-pointer shadow-md shadow-black/15"
            >
              <span>BOOK NOW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
