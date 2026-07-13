import { Phone, MessageSquare, Calendar, DollarSign } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface FloatingSidebarProps {
  onQuickBook: () => void;
  onScrollToFleet: () => void;
}

export default function FloatingSidebar({ onQuickBook, onScrollToFleet }: FloatingSidebarProps) {
  return (
    <div className="hidden lg:flex fixed right-0 top-1/3 z-50 flex-col gap-1 shadow-2xl">
      {/* Call Now */}
      <a
        href={`tel:${CONTACT_INFO.phone}`}
        className="group flex flex-col items-center justify-center w-18 h-18 bg-neutral-900/95 hover:bg-amber-500 border-l border-y border-neutral-800 hover:border-amber-500 text-neutral-400 hover:text-neutral-950 transition-all duration-300 text-center p-2 rounded-l-xl"
      >
        <Phone className="w-5 h-5 fill-current mb-1" />
        <span className="text-[9px] font-bold uppercase tracking-wider">Call Now</span>
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/923485144199?text=Hello%20H%26M%20Brothers%2C%20I%20am%20interested%20in%20a%20car%20rental.`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center justify-center w-18 h-18 bg-neutral-900/95 hover:bg-emerald-500 border-l border-y border-neutral-800 hover:border-emerald-500 text-neutral-400 hover:text-white transition-all duration-300 text-center p-2 rounded-l-xl"
      >
        <MessageSquare className="w-5 h-5 fill-current mb-1" />
        <span className="text-[9px] font-bold uppercase tracking-wider">WhatsApp</span>
      </a>

      {/* Quick Book */}
      <button
        onClick={onQuickBook}
        className="group flex flex-col items-center justify-center w-18 h-18 bg-neutral-900/95 hover:bg-amber-500 border-l border-y border-neutral-800 hover:border-amber-500 text-neutral-400 hover:text-neutral-950 transition-all duration-300 text-center p-2 rounded-l-xl cursor-pointer"
      >
        <Calendar className="w-5 h-5 mb-1" />
        <span className="text-[9px] font-bold uppercase tracking-wider">Quick Book</span>
      </button>

      {/* Pricing */}
      <button
        onClick={onScrollToFleet}
        className="group flex flex-col items-center justify-center w-18 h-18 bg-neutral-900/95 hover:bg-amber-500 border-l border-y border-neutral-800 hover:border-amber-500 text-neutral-400 hover:text-neutral-950 transition-all duration-300 text-center p-2 rounded-l-xl cursor-pointer"
      >
        <DollarSign className="w-5 h-5 mb-1" />
        <span className="text-[9px] font-bold uppercase tracking-wider">Pricing</span>
      </button>
    </div>
  );
}
