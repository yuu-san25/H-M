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
      if (window.scrollY > 20) {
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
    { label: 'VIP Services', id: 'services' },
    { label: 'Client Reviews', id: 'reviews' },
    { label: 'FAQs', id: 'faqs' },
    { label: 'Contact Us', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    onPageChange(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-900/95 backdrop-blur-md shadow-lg border-b border-neutral-800 py-3'
          : 'bg-gradient-to-b from-neutral-950/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex flex-col cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white group-hover:text-amber-400 transition-colors">
                H&M <span className="text-amber-400 font-sans group-hover:text-white transition-colors">BROTHERS</span>
              </span>
              <ShieldCheck className="w-5 h-5 text-amber-400 hidden sm:block" />
            </div>
            <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-mono">
              Rental & Tourism • Rawalpindi
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                  activePage === item.id 
                    ? 'text-amber-400 font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-amber-400'
                    : 'text-neutral-300 hover:text-amber-400 hover:font-medium after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 after:transition-all hover:after:w-full'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Right Side CTA and Badges */}
          <div className="hidden md:flex items-center gap-5">
            {/* Google Rating Badge */}
            <div className="flex items-center gap-1.5 bg-neutral-800/80 border border-neutral-700/50 px-3 py-1.5 rounded-full text-xs text-neutral-200">
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold ml-1">{CONTACT_INFO.rating}</span>
              </div>
              <span className="text-neutral-500">|</span>
              <span className="text-neutral-400 font-medium">({CONTACT_INFO.reviewsCount} Google Reviews)</span>
            </div>

            {/* Status indicators */}
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1.5 rounded-full border border-emerald-500/20">
              <Clock className="w-3.5 h-3.5 animate-pulse" />
              <span className="font-semibold uppercase tracking-wider text-[10px]">{CONTACT_INFO.hours}</span>
            </div>

            {/* Quick Call */}
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              id="call-btn-desktop"
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.03] shadow-md shadow-amber-500/20"
            >
              <Phone className="w-4 h-4 fill-neutral-950" />
              <span>{CONTACT_INFO.phone}</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              id="call-btn-mobile-quick"
              className="p-2.5 bg-amber-500 text-neutral-950 rounded-lg md:hidden"
              title="Call Now"
            >
              <Phone className="w-4 h-4 fill-neutral-950" />
            </a>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="p-2.5 bg-neutral-800 border border-neutral-700 text-white rounded-lg hover:bg-neutral-700 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="lg:hidden absolute top-full left-0 w-full bg-neutral-950 border-b border-neutral-800 shadow-2xl py-6 px-4 animate-fade-in">
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left py-2 px-3 text-lg font-medium text-neutral-300 hover:text-amber-400 hover:bg-neutral-900 rounded-lg transition-all"
              >
                {item.label}
              </button>
            ))}

            <hr className="border-neutral-800 my-2" />

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
                className="flex items-center justify-center gap-2 bg-neutral-800 border border-neutral-700 text-white py-3 rounded-lg font-medium hover:bg-neutral-700 transition-all text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call Phone</span>
              </a>
              <button
                onClick={onRentClick}
                id="rent-btn-mobile-drawer"
                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 py-3 rounded-lg font-semibold transition-all text-sm shadow-md"
              >
                Book Car Now
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
