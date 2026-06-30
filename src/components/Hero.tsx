import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Calendar, ShieldAlert, ChevronRight, Compass, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO, FLEET } from '../data';
import showroomFleetHeroImg from '../assets/images/showroom_fleet_hero_1782841953143.jpg';

interface HeroProps {
  onSearch: (filters: { category: string; driverOnly: boolean }) => void;
  onInstantBook: () => void;
}

export default function Hero({ onSearch, onInstantBook }: HeroProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [driverOption, setDriverOption] = useState('With Driver');

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch({
      category: selectedCategory,
      driverOnly: driverOption === 'With Driver'
    });
    const element = document.getElementById('fleet');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMobileCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onSearch({
      category,
      driverOnly: driverOption === 'With Driver'
    });
    // Scroll to the featured cars immediately
    const element = document.getElementById('fleet');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-neutral-950 pt-16 md:pt-20">
      
      {/* ------------------------------------------------------------- */}
      {/* DESKTOP HERO: HIDDEN ON MOBILE, VISIBLE ON MD+                 */}
      {/* ------------------------------------------------------------- */}
      <div className="hidden md:block absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-neutral-950/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40 z-10" />
        
        {/* Cozy Warm Light Glows mimicking elegant showroom lights */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-amber-500/[0.08] rounded-full blur-[120px] z-10 pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-orange-600/[0.06] rounded-full blur-[100px] z-10 pointer-events-none" />
        
        <img
          src={showroomFleetHeroImg}
          alt="Luxury Car Rental Islamabad Rawalpindi Lahore"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-102"
        />
      </div>

      {/* Desktop Content Grid */}
      <div className="hidden md:grid relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 md:grid-cols-12 gap-12 items-center w-full">
        
        {/* Slogan and Text */}
        <div className="md:col-span-7 flex flex-col items-start gap-6 text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 px-3 py-1.5 rounded-full text-amber-400 text-xs sm:text-sm font-semibold tracking-wider uppercase font-mono"
          >
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>H&M Brothers Rental & Tourism • Rawalpindi</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
          >
            Experience Pakistan with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">
              Elite Protocol & Comfort
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-300 text-base sm:text-lg md:text-xl max-w-xl font-normal leading-relaxed"
          >
            Discover Saddar’s top-rated agency with a majestic fleet of high-end Pakistani SUVs, bulletproof setups, and elite wedding cruisers. Open 24/7 at GPO Chowk.
          </motion.p>

          {/* Core USP Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-lg mt-2"
          >
            <div className="flex items-center gap-2.5 text-neutral-300 bg-neutral-900/80 border border-neutral-800 p-2.5 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-white leading-none">VIP Protocol</p>
                <span className="text-[10px] text-neutral-400">Security Guard Sync</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-300 bg-neutral-900/80 border border-neutral-800 p-2.5 rounded-xl">
              <Calendar className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-white leading-none">Open 24 Hours</p>
                <span className="text-[10px] text-neutral-400">Instant Midnight Dispatch</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-neutral-300 bg-neutral-900/80 border border-neutral-800 p-2.5 rounded-xl col-span-2 sm:col-span-1">
              <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div className="text-left">
                <p className="text-xs font-bold text-white leading-none">Professional Chauffeur</p>
                <span className="text-[10px] text-neutral-400">Mountain Experienced</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-4 w-full sm:w-auto"
          >
            <button
              onClick={onInstantBook}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Instant Fleet Booking</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/923485144199?text=Hello%20H%26M%20Brothers%2C%20I%20am%20interested%20in%20renting%20a%20luxury%20car.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.695-1.047-5.228-2.951-7.136C17.279 1.53 14.76 1.48 12.013 1.48c-5.56 0-10.08 4.524-10.084 10.088-.001 1.884.501 3.73 1.455 5.372l-.988 3.605 3.663-.96zm12.062-7.855c-.328-.164-1.942-.958-2.242-1.069-.301-.11-.52-.164-.738.164-.219.329-.848 1.069-1.039 1.288-.192.219-.383.246-.711.082-.328-.164-1.386-.511-2.64-1.63-1.012-.903-1.694-2.018-1.892-2.347-.197-.329-.021-.507.143-.671.148-.147.328-.383.493-.574.164-.192.219-.329.328-.548.11-.219.055-.411-.027-.575-.082-.164-.738-1.78-1.01-2.438-.266-.643-.535-.556-.738-.556h-.629c-.219 0-.575.082-.876.411-.301.329-1.149 1.123-1.149 2.739 0 1.616 1.177 3.178 1.341 3.397.164.22 2.316 3.537 5.611 4.961.783.339 1.396.541 1.873.693.787.251 1.503.215 2.069.13.63-.095 1.942-.794 2.216-1.56.274-.767.274-1.424.192-1.56-.083-.137-.301-.219-.629-.383z" />
              </svg>
              <span>WhatsApp Chat</span>
            </a>
          </motion.div>

        </div>

        {/* Dynamic Quick Filtering Card */}
        <div className="md:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-md bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Subtle glow border */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500 via-orange-400 to-amber-300" />
            
            <div className="text-left mb-6">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">Find Your Luxury Car</h3>
              <p className="text-sm text-neutral-400 font-medium">Quick filter your high-end Pakistani rental preferences.</p>
            </div>

            <form onSubmit={handleSearchSubmit} className="space-y-5">
              
              {/* Category Filter */}
              <div className="text-left">
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 font-mono">
                  Select Category
                </label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 px-4 py-3.5 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-sm font-medium appearance-none cursor-pointer"
                  >
                    <option value="All">All Categories ({FLEET.length} vehicles)</option>
                    <option value="Elite VIP">Elite VIP Protocol</option>
                    <option value="Premium Off-Road">Premium Off-Road (SUV)</option>
                    <option value="Executive Sedan">Executive Sedan</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-neutral-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Driver Preference */}
              <div className="text-left">
                <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 font-mono">
                  Driver Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['With Driver', 'Self-Drive'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setDriverOption(opt)}
                      className={`py-3 px-4 rounded-xl border font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        driverOption === opt
                          ? 'bg-amber-400/10 border-amber-400 text-amber-400 shadow-inner'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${driverOption === opt ? 'bg-amber-400 animate-pulse' : 'bg-neutral-700'}`} />
                      {opt}
                    </button>
                  ))}
                </div>
                {driverOption === 'Self-Drive' && (
                  <p className="text-[10px] text-neutral-400 mt-2 italic leading-tight">
                    *Note: Land Cruiser V8, Range Rover Vogue, and Fortuner are only rented with our professional chauffeurs.
                  </p>
                )}
              </div>

              {/* Info alert box */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0 animate-ping" />
                <div className="text-left">
                  <p className="text-xs font-bold text-neutral-200">GPO Chowk Location Fast Access</p>
                  <p className="text-[10px] text-neutral-400 leading-normal">Our garage is situated directly in Saddar Rawalpindi for rapid departures.</p>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="search-fleet-submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-bold py-4 rounded-xl transition-all shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 text-sm tracking-wide uppercase font-sans cursor-pointer"
              >
                Search Luxury Fleet
              </button>

            </form>

          </motion.div>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* MOBILE HERO: VISIBLE ONLY ON MOBILE & TABLETS (HIDDEN ON MD+) */}
      {/* ------------------------------------------------------------- */}
      <div className="block md:hidden px-4 py-8 relative z-20 flex flex-col gap-6 w-full text-left">
        
        {/* Subtle Ambient Glow for Mobile */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/[0.06] rounded-full blur-[80px] -z-10 pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-orange-600/[0.04] rounded-full blur-[60px] -z-10 pointer-events-none" />

        {/* 1. Showroom Cars Highlight Card - Imparts Instant Automotive/Rental Vibes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-xl shadow-amber-500/5 aspect-[16/10] bg-neutral-900 group"
        >
          {/* Top subtle golden spotlight overlay */}
          <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pointer-events-none" />
          {/* Lower dark fading overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />
          
          <img
            src={showroomFleetHeroImg}
            alt="H&M Premium Showroom Fleet"
            className="w-full h-full object-cover object-center"
          />
          
          {/* Showroom badge */}
          <div className="absolute bottom-3 left-3 bg-neutral-900/90 backdrop-blur-md border border-amber-500/30 px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-mono">
              Rawalpindi Active Showroom
            </span>
          </div>

          {/* Quick Stats Badge on mobile */}
          <div className="absolute top-3 right-3 bg-neutral-950/85 backdrop-blur-md border border-neutral-800 px-2.5 py-1 rounded-md text-[9px] font-extrabold text-neutral-300 font-mono">
            ⭐ 4.9 RATING • {FLEET.length} VEHICLES
          </div>
        </motion.div>

        {/* 2. Headline & Dynamic Text */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-neutral-900/90 border border-neutral-800 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] font-extrabold text-neutral-300 uppercase tracking-widest font-mono">
              Open 24/7 At GPO Chowk
            </span>
          </div>
          
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
            Pakistan's Elite <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">
              Protocol & Luxury Cars
            </span>
          </h1>
          
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-md font-sans font-medium">
            Saddar’s premier rental agency. Showroom-condition heavy SUVs, bridal cruisers, and luxury sedans with veteran protocol drivers.
          </p>
        </div>

        {/* 3. Side-by-side Mobile Actions */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <button
            onClick={onInstantBook}
            className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3.5 px-2 rounded-xl transition-all shadow-md shadow-amber-500/10 text-xs uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>Book Instant</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <a
            href="https://wa.me/923485144199?text=Hello%20H%26M%20Brothers%2C%20I%20am%20interested%20in%20renting%20a%20luxury%20car."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-2 rounded-xl transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/10"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.695-1.047-5.228-2.951-7.136C17.279 1.53 14.76 1.48 12.013 1.48c-5.56 0-10.08 4.524-10.084 10.088-.001 1.884.501 3.73 1.455 5.372l-.988 3.605 3.663-.96zm12.062-7.855c-.328-.164-1.942-.958-2.242-1.069-.301-.11-.52-.164-.738.164-.219.329-.848 1.069-1.039 1.288-.192.219-.383.246-.711.082-.328-.164-1.386-.511-2.64-1.63-1.012-.903-1.694-2.018-1.892-2.347-.197-.329-.021-.507.143-.671.148-.147.328-.383.493-.574.164-.192.219-.329.328-.548.11-.219.055-.411-.027-.575-.082-.164-.738-1.78-1.01-2.438-.266-.643-.535-.556-.738-.556h-.629c-.219 0-.575.082-.876.411-.301.329-1.149 1.123-1.149 2.739 0 1.616 1.177 3.178 1.341 3.397.164.22 2.316 3.537 5.611 4.961.783.339 1.396.541 1.873.693.787.251 1.503.215 2.069.13.63-.095 1.942-.794 2.216-1.56.274-.767.274-1.424.192-1.56-.083-.137-.301-.219-.629-.383z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>

        {/* 4. Ultra-Slick Mobile Quick Finder */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-lg w-full space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-mono">
              Quick Filter Engine
            </span>
            <span className="text-[10px] text-neutral-400">Tap to search instantly</span>
          </div>

          {/* Quick Horizontal Pill Sliders */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white text-left">Select Vehicle Category</p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
              {[
                { label: 'All Models', value: 'All' },
                { label: 'Elite VIP', value: 'Elite VIP' },
                { label: 'Off-Road SUV', value: 'Premium Off-Road' },
                { label: 'Exec Sedan', value: 'Executive Sedan' }
              ].map((cat) => {
                const isActive = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => handleMobileCategoryClick(cat.value)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer snap-start ${
                      isActive
                        ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-500/10'
                        : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compact Driver Toggle Option */}
          <div className="pt-2 border-t border-neutral-850 flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-semibold font-sans">Require Professional Driver?</span>
            <div className="flex gap-1 bg-neutral-950 p-1 rounded-lg border border-neutral-800">
              {['With Driver', 'Self'].map((opt) => {
                const isSelected = (opt === 'With Driver' && driverOption === 'With Driver') || (opt === 'Self' && driverOption === 'Self-Drive');
                return (
                  <button
                    key={opt}
                    onClick={() => {
                      setDriverOption(opt === 'With Driver' ? 'With Driver' : 'Self-Drive');
                      onSearch({
                        category: selectedCategory,
                        driverOnly: opt === 'With Driver'
                      });
                    }}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                      isSelected ? 'bg-amber-400/10 text-amber-400 border border-amber-500/20' : 'text-neutral-500'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5. GPO Chowk Fast Location Alert (Sleek Mobile Strip) */}
        <div className="bg-neutral-900/60 border border-neutral-850 rounded-xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xs flex-shrink-0 font-mono">
            📍
          </div>
          <div className="text-left leading-tight">
            <p className="text-[11px] font-bold text-white">Saddar, GPO Chowk Office</p>
            <span className="text-[9px] text-neutral-400">Convenient midnight handovers and custom secure protocol parking.</span>
          </div>
        </div>

      </div>

    </section>
  );
}
