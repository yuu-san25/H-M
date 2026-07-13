import { Phone, Calendar, DollarSign } from 'lucide-react';
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
        <svg className="w-5 h-5 fill-current mb-1" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.695-1.047-5.228-2.951-7.136C17.279 1.53 14.76 1.48 12.013 1.48c-5.56 0-10.08 4.524-10.084 10.088-.001 1.884.501 3.73 1.455 5.372l-.988 3.605 3.663-.96zm12.062-7.855c-.328-.164-1.942-.958-2.242-1.069-.301-.11-.52-.164-.738.164-.219.329-.848 1.069-1.039 1.288-.192.219-.383.246-.711.082-.328-.164-1.386-.511-2.64-1.63-1.012-.903-1.694-2.018-1.892-2.347-.197-.329-.021-.507.143-.671.148-.147.328-.383.493-.574.164-.192.219-.329.328-.548.11-.219.055-.411-.027-.575-.082-.164-.738-1.78-1.01-2.438-.266-.643-.535-.556-.738-.556h-.629c-.219 0-.575.082-.876.411-.301.329-1.149 1.123-1.149 2.739 0 1.616 1.177 3.178 1.341 3.397.164.22 2.316 3.537 5.611 4.961.783.339 1.396.541 1.873.693.787.251 1.503.215 2.069.13.63-.095 1.942-.794 2.216-1.56.274-.767.274-1.424.192-1.56-.083-.137-.301-.219-.629-.383z" />
        </svg>
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
