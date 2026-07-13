import { motion } from 'motion/react';
import { Compass, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

interface NorthernToursProps {
  onBookTour: (tourName: string) => void;
}

export default function NorthernTours({ onBookTour }: NorthernToursProps) {
  const tours = [
    {
      name: 'Hunza Valley Tour',
      duration: '5 Days / 4 Nights',
      price: 45000,
      image: 'https://i.ibb.co/MXyLmTB/muhammad-khubaib-sarfraz-hk-WB8-PN-8-MU-unsplash.jpg',
      description: 'Rakaposhi views, Attabad Lake cruise, Karimabad ancient forts, and high pass exploration.'
    },
    {
      name: 'Skardu Tour',
      duration: '4 Days / 3 Nights',
      price: 38000,
      image: 'https://i.ibb.co/F4F1rTzd/images.jpg',
      description: 'Shangrila Resort, Cold Desert organic dunes, Manthokha waterfall, and Sadpara Lake.'
    },
    {
      name: 'Naran Kaghan Tour',
      duration: '3 Days / 2 Nights',
      price: 25000,
      image: 'https://i.ibb.co/0y8KZczL/images-1.jpg',
      description: 'Saif-ul-Malook legendary lake, Babusar Pass views, and fast flowing Kunhar River rafting.'
    },
    {
      name: 'Swat Valley Tour',
      duration: '3 Days / 2 Nights',
      price: 22000,
      image: 'https://i.ibb.co/mVTXfp0g/1-B51g-K3sc-DM4-H-d-JU1t-Ud-QA.jpg',
      description: 'Fizagat Park, Malam Jabba ski chairlift, Kalam forest walks, and pristine Ushu Valley.'
    },
    {
      name: 'Neelum Valley Tour',
      duration: '3 Days / 2 Nights',
      price: 28000,
      image: 'https://i.ibb.co/PSR9WLr/Gemini-Generated-Image-fyvgttfyvgttfyvg.png',
      description: 'Kutton waterfall, Keran border sightseeing, Sharda ancient university, and Arang Kel cable car.'
    }
  ];

  return (
    <section id="northern-tours" className="py-20 bg-neutral-900 border-t border-neutral-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.015),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 text-left">
          <div>
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono block mb-2">Unforgettable Journeys, Lifetime Memories</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight uppercase">
              Explore Northern Areas With Us
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-2 max-w-xl">
              H&M Brothers provides tailored tourism excursions to spectacular Northern Pakistan. Safely driven by seasoned mountain-veteran chauffeurs in high-clearance SUVs.
            </p>
          </div>
          
          <button 
            onClick={() => onBookTour('Custom Northern Area Tour')}
            className="group inline-flex items-center gap-1.5 border-2 border-neutral-800 hover:border-amber-500 hover:text-white text-neutral-400 font-bold px-5 py-2.5 rounded-lg transition-all text-xs uppercase tracking-wider cursor-pointer"
          >
            <span>Custom Itinerary Desk</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Tours Horizontal Slider / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {tours.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-neutral-950/80 border border-neutral-800/80 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent pointer-events-none" />
                
                {/* Duration Tag */}
                <span className="absolute bottom-3 left-3 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 text-[10px] font-bold text-neutral-300 px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-500" />
                  {t.duration}
                </span>
              </div>

              <div className="p-4 text-left flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-serif text-base font-black text-white group-hover:text-amber-400 transition-colors">
                    {t.name}
                  </h3>
                  <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-3">
                    {t.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-900 flex items-center justify-between">
                  <div className="leading-none">
                    <span className="text-[9px] text-neutral-500 font-bold block mb-0.5 uppercase">Premium Cost</span>
                    <strong className="text-amber-400 font-sans text-sm font-black">
                      Rs. {t.price.toLocaleString()}
                    </strong>
                  </div>
                  
                  <button
                    onClick={() => onBookTour(t.name)}
                    className="bg-neutral-900 group-hover:bg-amber-500 text-amber-500 group-hover:text-neutral-950 font-bold text-[10px] px-3 py-2 rounded transition-all uppercase cursor-pointer"
                  >
                    Book Tour
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
