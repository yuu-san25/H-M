import { Car } from '../types';
import { ShieldAlert, Compass, Star, User, Settings, Droplet, UserCheck } from 'lucide-react';

interface CarCardProps {
  key?: string;
  car: Car;
  onBook: (car: Car) => void;
}

export default function CarCard({ car, onBook }: CarCardProps) {
  // Format price as PKR with commas
  const formattedPrice = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0
  }).format(car.pkrRatePerDay);

  const getCategoryColor = (cat: Car['category']) => {
    switch (cat) {
      case 'Elite VIP':
        return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
      case 'Premium Off-Road':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'Executive Sedan':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      default:
        return 'bg-neutral-500/10 border-neutral-500/30 text-neutral-400';
    }
  };

  return (
    <div className="group bg-neutral-900 border border-neutral-800/80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-neutral-700/80 transition-all duration-300 flex flex-col h-full transform hover:scale-[1.01]">
      
      {/* Vehicle Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 to-transparent z-10" />
        <img
          src={car.image}
          alt={car.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category tag */}
        <span className={`absolute top-4 left-4 z-20 text-xs font-semibold px-3 py-1 rounded-full border ${getCategoryColor(car.category)}`}>
          {car.category}
        </span>

        {/* Chauffeur restriction status tag */}
        {car.specs.withDriverOnly ? (
          <span className="absolute top-4 right-4 z-20 flex items-center gap-1 text-[10px] bg-red-500/95 text-white font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
            <ShieldAlert className="w-3.5 h-3.5 fill-white text-red-500" />
            <span>Chauffeur Service Only</span>
          </span>
        ) : (
          <span className="absolute top-4 right-4 z-20 flex items-center gap-1 text-[10px] bg-emerald-500/95 text-white font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Self-Drive Available</span>
          </span>
        )}
      </div>

      {/* Card Details Body */}
      <div className="p-6 flex flex-col flex-grow text-left">
        
        {/* Name and Rating */}
        <div className="mb-3">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
            {car.name}
          </h3>
          <p className="text-xs text-neutral-400 mt-1 line-clamp-2 min-h-[2rem]">
            {car.description}
          </p>
        </div>

        {/* Key Specification Chips */}
        <div className="grid grid-cols-4 gap-2 py-3 border-y border-neutral-800 my-2">
          
          <div className="flex flex-col items-center justify-center p-1.5 bg-neutral-950 rounded-xl border border-neutral-800/50 text-center">
            <Compass className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-[10px] text-neutral-400 uppercase font-mono font-bold">Engine</span>
            <span className="text-[10px] text-white font-bold tracking-tight line-clamp-1">{car.specs.engine.split(' ')[0]}</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1.5 bg-neutral-950 rounded-xl border border-neutral-800/50 text-center">
            <Settings className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-[10px] text-neutral-400 uppercase font-mono font-bold">Trans</span>
            <span className="text-[10px] text-white font-bold tracking-tight line-clamp-1">{car.specs.transmission.split(' ')[0]}</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1.5 bg-neutral-950 rounded-xl border border-neutral-800/50 text-center">
            <User className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-[10px] text-neutral-400 uppercase font-mono font-bold">Capacity</span>
            <span className="text-[10px] text-white font-bold tracking-tight">{car.specs.seats} Seats</span>
          </div>

          <div className="flex flex-col items-center justify-center p-1.5 bg-neutral-950 rounded-xl border border-neutral-800/50 text-center">
            <Droplet className="w-4 h-4 text-amber-400 mb-1" />
            <span className="text-[10px] text-neutral-400 uppercase font-mono font-bold">Fuel</span>
            <span className="text-[10px] text-white font-bold tracking-tight">{car.specs.fuel}</span>
          </div>

        </div>

        {/* Premium features checklist */}
        <div className="my-3 space-y-1.5 flex-grow">
          <p className="text-[10px] uppercase font-bold tracking-wider text-amber-400/80 font-mono mb-2">Key Highlights</p>
          {car.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
              <span className="w-1 h-1 rounded-full bg-amber-400" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Price and CTA footer */}
        <div className="mt-5 pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-2">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono font-bold block">Daily Rate</span>
            <p className="text-lg sm:text-xl font-bold text-amber-400 font-sans">
              {formattedPrice} <span className="text-xs text-neutral-400 font-normal">/ day</span>
            </p>
          </div>
          
          <button
            onClick={() => onBook(car)}
            className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-amber-500/5 hover:shadow-amber-500/15 text-xs uppercase tracking-wider cursor-pointer"
          >
            Rent Car
          </button>
        </div>

      </div>

    </div>
  );
}
