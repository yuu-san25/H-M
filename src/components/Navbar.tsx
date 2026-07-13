import { useState, useEffect } from 'react';
import { Phone, Star, Clock, Menu, X, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface NavbarProps {
  onRentClick: () => void;
  activePage: string;
  onPageChange: (pageId: string) => void;
}

export default function Navbar({ onRentClick, activePage, onPageChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'Our Fleet', id: 'fleet' },
    { label: 'One-Way Drop', id: 'one-way-drop' },
    { label: 'Cities', id: 'cities-booking' },
    { label: 'Booking', id: 'cities-booking-form' },
    { label: 'Payment', id: 'advance-payment' },
    { label: 'Tours & Tourism', id: 'northern-tours' },
    { label: 'VIP Services', id: 'services' },
    { label: 'FAQs', id: 'faqs' },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'home' || id === 'fleet' || id === 'services' || id === 'faqs' || id === 'one-way-drop') {
      onPageChange(id);
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onPageChange('home');
      setMobileMenuOpen(false);
      setTimeout(() => {
        let elementId = id;
        if (id === 'cities-booking-form') {
          elementId = 'cities-booking';
        }
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-900/98 backdrop-blur-md shadow-xl border-b border-neutral-800 py-2'
          : 'bg-neutral-950/80 backdrop-blur-sm lg:backdrop-blur-none lg:bg-gradient-to-b lg:from-neutral-950/90 lg:to-transparent py-0'
      }`}
    >
      {/* 1. TOP BAR (Only visible on desktop/tablet when not scrolled to reduce header clutter) */}
      <div 
        className={`hidden lg:block border-b border-neutral-900/60 bg-neutral-950/95 text-neutral-400 text-[11px] font-mono transition-all duration-300 overflow-hidden ${
          isScrolled ? 'h-0 opacity-0 py-0 border-none' : 'h-10 py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Google Rating Badge */}
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>Google Verified: <strong className="text-white">{CONTACT_INFO.rating}</strong> ({CONTACT_INFO.reviewsCount} reviews)</span>
            </div>
            {/* Live active dispatch */}
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Clock className="w-3 h-3 animate-pulse" />
              <span>SADDAR RAWALPINDI HEAD DESK • ACTIVE NOW</span>
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <span className="text-neutral-500">|</span>
            <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-amber-400 transition-colors">
              📞 Call Desk: {CONTACT_INFO.phoneFormatted}
            </a>
            <span className="text-neutral-500">|</span>
            <a 
              href="https://wa.me/923485144199?text=Hello%20H%26M%20Brothers%2C%20I%20am%20interested%20in%20booking%20a%20luxury%20car%20rental."
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.695-1.047-5.228-2.951-7.136C17.279 1.53 14.76 1.48 12.013 1.48c-5.56 0-10.08 4.524-10.084 10.088-.001 1.884.501 3.73 1.455 5.372l-.988 3.605 3.663-.96zm12.062-7.855c-.328-.164-1.942-.958-2.242-1.069-.301-.11-.52-.164-.738.164-.219.329-.848 1.069-1.039 1.288-.192.219-.383.246-.711.082-.328-.164-1.386-.511-2.64-1.63-1.012-.903-1.694-2.018-1.892-2.347-.197-.329-.021-.507.143-.671.148-.147.328-.383.493-.574.164-.192.219-.329.328-.548.11-.219.055-.411-.027-.575-.082-.164-.738-1.78-1.01-2.438-.266-.643-.535-.556-.738-.556h-.629c-.219 0-.575.082-.876.411-.301.329-1.149 1.123-1.149 2.739 0 1.616 1.177 3.178 1.341 3.397.164.22 2.316 3.537 5.611 4.961.783.339 1.396.541 1.873.693.787.251 1.503.215 2.069.13.63-.095 1.942-.794 2.216-1.56.274-.767.274-1.424.192-1.56-.083-.137-.301-.219-.629-.383z" />
              </svg>
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVBAR BAR */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? 'py-1' : 'py-4'}`}>
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo with clean shield badge */}
          <div 
            className="flex flex-col cursor-pointer group flex-shrink-0"
            onClick={() => handleNavClick('home')}
          >
            <div className="flex items-center gap-1.5">
              <span className="font-sans text-lg sm:text-xl font-black tracking-wider text-white group-hover:text-amber-400 transition-colors uppercase">
                H&M <span className="text-amber-400 group-hover:text-white transition-colors">BROTHERS</span>
              </span>
              <ShieldCheck className="w-4.5 h-4.5 text-amber-400 hidden sm:block" />
            </div>
            <span className="text-[9px] tracking-widest text-neutral-400 uppercase font-mono leading-none mt-1">
              Rental & Tourism • Rawalpindi
            </span>
          </div>

          {/* Desktop Nav Links (Perfect spacing, clean design, zero overlap) */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-3 bg-neutral-950/40 border border-neutral-900/30 px-2.5 py-1.5 rounded-full backdrop-blur-sm">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-[10px] xl:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer py-1 px-2.5 rounded-md ${
                  activePage === item.id 
                    ? 'text-amber-400 bg-amber-500/10 font-black'
                    : 'text-neutral-300 hover:text-amber-400 hover:bg-neutral-900/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side Compact CTAs (Sleek call/WhatsApp buttons instead of raw long numbers) */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
            {/* Sleek WhatsApp Button */}
            <a
              href="https://wa.me/923485144199?text=Hello%20H%26M%20Brothers%2C%20I%20am%20interested%20in%20booking%20a%20luxury%20car%20rental."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-black uppercase tracking-wider px-3 py-2 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-emerald-600/15"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.695-1.047-5.228-2.951-7.136C17.279 1.53 14.76 1.48 12.013 1.48c-5.56 0-10.08 4.524-10.084 10.088-.001 1.884.501 3.73 1.455 5.372l-.988 3.605 3.663-.96zm12.062-7.855c-.328-.164-1.942-.958-2.242-1.069-.301-.11-.52-.164-.738.164-.219.329-.848 1.069-1.039 1.288-.192.219-.383.246-.711.082-.328-.164-1.386-.511-2.64-1.63-1.012-.903-1.694-2.018-1.892-2.347-.197-.329-.021-.507.143-.671.148-.147.328-.383.493-.574.164-.192.219-.329.328-.548.11-.219.055-.411-.027-.575-.082-.164-.738-1.78-1.01-2.438-.266-.643-.535-.556-.738-.556h-.629c-.219 0-.575.082-.876.411-.301.329-1.149 1.123-1.149 2.739 0 1.616 1.177 3.178 1.341 3.397.164.22 2.316 3.537 5.611 4.961.783.339 1.396.541 1.873.693.787.251 1.503.215 2.069.13.63-.095 1.942-.794 2.216-1.56.274-.767.274-1.424.192-1.56-.083-.137-.301-.219-.629-.383z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* Quick Call Button with icon */}
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              id="call-btn-desktop"
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-[11px] font-black uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-amber-500/15"
            >
              <Phone className="w-3.5 h-3.5 fill-neutral-950" />
              <span>Call Us</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              id="call-btn-mobile-quick"
              className="p-2.5 bg-amber-500 text-neutral-950 rounded-xl md:hidden"
              title="Call Now"
            >
              <Phone className="w-4 h-4 fill-neutral-950" />
            </a>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="p-2.5 bg-neutral-900 border border-neutral-800 text-white rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="lg:hidden absolute top-full left-0 w-full bg-neutral-950 border-b border-neutral-800 shadow-2xl py-6 px-4">
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left py-2 px-3 text-sm font-bold uppercase tracking-wider text-neutral-300 hover:text-amber-400 hover:bg-neutral-900 rounded-lg transition-all cursor-pointer"
              >
                {item.label}
              </button>
            ))}

            <hr className="border-neutral-900 my-2" />

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div className="flex items-center gap-2 px-3">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-white font-bold">{CONTACT_INFO.rating}</span>
                <span className="text-neutral-500">•</span>
                <span className="text-neutral-400 text-sm">{CONTACT_INFO.reviewsCount} Google Reviews</span>
              </div>
              <div className="flex items-center gap-2 px-3 text-emerald-400">
                <Clock className="w-4 h-4 animate-pulse" />
                <span className="text-xs uppercase font-semibold tracking-wider">{CONTACT_INFO.hours}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                id="call-btn-mobile-drawer"
                className="flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-neutral-800 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Phone</span>
              </a>
              <button
                onClick={onRentClick}
                id="rent-btn-mobile-drawer"
                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-md"
              >
                Book Car Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
