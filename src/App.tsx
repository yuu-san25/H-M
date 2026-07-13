import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ShowcaseBento from './components/ShowcaseBento';
import CarCard from './components/CarCard';
import BookingModal from './components/BookingModal';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import FAQs from './components/FAQs';
import AboutContact from './components/AboutContact';
import FloatingSidebar from './components/FloatingSidebar';
import CitiesAndBooking from './components/CitiesAndBooking';
import NorthernTours from './components/NorthernTours';
import AdvancePayment from './components/AdvancePayment';
import OneWayDropCalculator from './components/OneWayDropCalculator';
import RideSlideshow from './components/RideSlideshow';
import { FLEET, CONTACT_INFO, REVIEWS } from './data';
import { Car, Review } from './types';
import { ShieldAlert, Phone, Sparkles, Star, ShieldCheck, Heart, ArrowUp, ChevronRight } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);

  const [selectedFilters, setSelectedFilters] = useState<{ category: string; driverOnly: boolean }>({
    category: 'All',
    driverOnly: false
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll height to display "scroll to top" button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleHeroSearch = (filters: { category: string; driverOnly: boolean }) => {
    setSelectedFilters(filters);
    setCurrentPage('fleet');
    scrollToTop();
  };

  const handleBookTrigger = (car: Car) => {
    setSelectedCar(car);
    setBookingModalOpen(true);
  };

  const handleInstantBookTrigger = () => {
    // Select Land Cruiser as default for instant bookings
    const defaultCar = FLEET.find(c => c.id === 'toyota-land-cruiser') || FLEET[0];
    handleBookTrigger(defaultCar);
  };

  const handleSectionNavigate = (sectionId: string) => {
    if (['fleet', 'services', 'reviews', 'faqs', 'contact'].includes(sectionId)) {
      setCurrentPage(sectionId);
    } else {
      setCurrentPage('home');
    }
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleReviewAdd = (newReview: { author: string; rating: number; comment: string; vehicleRented: string }) => {
    const formattedReview: Review = {
      id: `rev-${Date.now()}`,
      author: newReview.author,
      rating: newReview.rating,
      date: 'Just now',
      comment: newReview.comment,
      vehicleRented: newReview.vehicleRented
    };
    setReviews([formattedReview, ...reviews]);
  };

  const handleFilterCategory = (category: string) => {
    setSelectedFilters({ ...selectedFilters, category });
    setCurrentPage('fleet');
    scrollToTop();
  };

  // Filter the Fleet
  const filteredFleet = FLEET.filter((car) => {
    // Category match
    const categoryMatch = selectedFilters.category === 'All' || car.category === selectedFilters.category;
    
    // Driver option match (for this fleet list, all cars are chauffeur-driven by default but can check flag)
    const driverMatch = !selectedFilters.driverOnly || car.specs.withDriverOnly;
    
    // Search keyword match
    const searchMatch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        car.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));

    return categoryMatch && driverMatch && searchMatch;
  });

  const categories = ['All', 'Elite VIP', 'Premium Off-Road', 'Executive Sedan', 'Budget Sedan'];

  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950 relative">
      
      {/* Navbar */}
      <Navbar
        onRentClick={handleInstantBookTrigger}
        activePage={currentPage}
        onPageChange={(pageId) => {
          setCurrentPage(pageId);
          scrollToTop();
        }}
      />

      {/* Premium Sticky Right Sidebar on Desktop */}
      <FloatingSidebar 
        onQuickBook={handleInstantBookTrigger}
        onScrollToFleet={() => {
          setCurrentPage('fleet');
          scrollToTop();
        }}
      />

      {/* Main Page Rendering Router */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <div>
            {/* Hero Header */}
            <Hero
              onSearch={handleHeroSearch}
              onInstantBook={handleInstantBookTrigger}
            />

            {/* Flagship Bento Showcase */}
            <ShowcaseBento
              onInstantBook={handleInstantBookTrigger}
              onFilterCategory={handleFilterCategory}
              onScrollToSection={handleSectionNavigate}
            />

            {/* Featured Fleet Slideshow on Homepage */}
            <RideSlideshow 
              onBook={handleBookTrigger} 
              onViewAll={() => { 
                setCurrentPage('fleet'); 
                scrollToTop(); 
              }} 
            />

            {/* One-Way Intercity Drops Dynamic Calculator */}
            <OneWayDropCalculator 
              onSuccessBooking={(details) => {
                const activeCar = FLEET.find(c => details.includes(c.name)) || FLEET[0];
                setSelectedCar({
                  ...activeCar,
                  name: `${activeCar.name} (One-Way Drop)`,
                  description: details
                });
                setBookingModalOpen(true);
              }}
            />

            {/* Cities & Quick Booking (Side-by-Side as per ChatGPT design) */}
            <CitiesAndBooking 
              onSuccessBooking={(details) => console.log('Quick booking created:', details)}
              onInstantBook={handleInstantBookTrigger}
            />

            {/* Northern Pakistan Tourism Packages */}
            <NorthernTours 
              onBookTour={(tourName) => {
                // Select Land Cruiser or Prado as default for tours
                const tourCar = FLEET.find(c => c.id === 'toyota-land-cruiser') || FLEET[0];
                setSelectedCar({
                  ...tourCar,
                  name: `${tourCar.name} (${tourName})`,
                  description: `Customized tour package booking for ${tourName}. Includes mountain-experienced professional chauffeur, complete fuel management options, and continuous support.`
                });
                setBookingModalOpen(true);
              }}
            />

            {/* Advance Payment Details & Bank Credentials (Highly accurate local touch) */}
            <AdvancePayment />

            {/* Services Specialties Brief */}
            <div className="bg-neutral-900 relative py-8 border-t border-neutral-950">
              <Services />
            </div>

            {/* Testimonials Slideshow Brief (Without submission form on Home) */}
            <div className="bg-neutral-950">
              <Testimonials reviews={reviews.slice(0, 3)} onAddReview={handleReviewAdd} showForm={false} />
            </div>
          </div>
        )}

        {currentPage === 'fleet' && (
          <div>
            {/* Fleet Page Title Header */}
            <div className="py-20 pt-32 bg-neutral-900/40 border-b border-neutral-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono block mb-3">EXECUTIVE CAR DIRECTORY</span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none tracking-tighter uppercase">OUR LUXURY & TOURS FLEET</h1>
                <p className="text-zinc-400 text-xs sm:text-sm mt-3 max-w-xl leading-relaxed font-sans">
                  Browse our showroom-condition elite fleet. Each vehicle is pre-cleared, deeply detailed, and operated by professional, highly-trained chauffeurs across Rawalpindi, Islamabad, and Lahore.
                </p>
                <div className="w-16 h-1 bg-amber-500 mt-5 rounded-full" />
              </div>
            </div>

            {/* Fleet Section */}
            <section id="fleet" className="py-16 bg-neutral-950 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Interactive Filters Bar */}
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
                  
                  {/* Left: Category chips */}
                  <div className="flex flex-wrap gap-2 justify-start w-full md:w-auto">
                    {categories.map((cat) => {
                      const isActive = selectedFilters.category === cat;
                      const count = cat === 'All' 
                        ? FLEET.length 
                        : FLEET.filter(c => c.category === cat).length;

                      return (
                        <button
                          key={cat}
                          onClick={() => setSelectedFilters({ ...selectedFilters, category: cat })}
                          className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                            isActive
                              ? 'bg-amber-400 text-neutral-950 border-amber-400 font-bold shadow-lg shadow-amber-500/10'
                              : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white'
                          }`}
                        >
                          <span>{cat}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isActive ? 'bg-neutral-950/20 text-neutral-950' : 'bg-neutral-900 text-neutral-500'}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right: Search Input & Driver option check */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto md:max-w-md">
                    {/* Text Search */}
                    <div className="relative w-full">
                      <input
                        type="text"
                        placeholder="Search model, e.g. Civic, Prado, City..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none placeholder-neutral-600 font-medium"
                      />
                      {searchTerm && (
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs font-bold"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Chauffeur checkbox toggle */}
                    <label className="flex items-center gap-2 text-xs font-semibold text-neutral-300 w-full sm:w-auto flex-shrink-0 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedFilters.driverOnly}
                        onChange={(e) => setSelectedFilters({ ...selectedFilters, driverOnly: e.target.checked })}
                        className="w-4 h-4 rounded border-neutral-800 bg-neutral-950 text-amber-500 focus:ring-amber-500 cursor-pointer"
                      />
                      <span className="text-neutral-400 hover:text-white transition-colors">Chauffeur Service Only</span>
                    </label>
                  </div>

                </div>

                {/* Cars Grid */}
                {filteredFleet.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredFleet.map((car) => (
                      <CarCard
                        key={car.id}
                        car={car}
                        onBook={handleBookTrigger}
                      />
                    ))}
                  </div>
                ) : (
                  /* Fleet fallback state */
                  <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
                    <span className="text-4xl">🚗</span>
                    <h3 className="font-serif text-xl font-bold text-white">No Matching Fleet Found</h3>
                    <p className="text-sm text-neutral-400 font-sans">
                      None of our standard catalog items match your filter. However, we have partner agencies across Rawalpindi/Islamabad and can procure specialty bulletproof options or customized protocols instantly.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedFilters({ category: 'All', driverOnly: false });
                        setSearchTerm('');
                      }}
                      className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-5 py-2.5 rounded-xl transition-all text-xs uppercase tracking-wider"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}

                {/* Special VIP Protocol Banner */}
                <div className="mt-16 bg-gradient-to-r from-neutral-950 via-amber-950/15 to-neutral-950 border border-amber-500/20 rounded-3xl p-6 sm:p-10 text-left relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                  {/* Subtle shiny star sparkle */}
                  <div className="absolute top-2 right-4 text-amber-400/10">
                    <Sparkles className="w-24 h-24 rotate-12" />
                  </div>

                  <div className="space-y-3 relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-md text-amber-400 text-[10px] uppercase font-mono font-bold tracking-wider">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Bespoke Executive Protocol Desk</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                      Planning high-profile security or synchronized convoys?
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed font-sans">
                      H&M Brothers provides customized government/security agency clearance documents, armed personal security guards, and synchronized same-color Land Cruiser LC300 convoy setups. Open 24/7.
                    </p>
                  </div>

                  <a
                    href="https://wa.me/923485144199?text=Hello%20H%26M%20Brothers%2C%20I%20am%20interested%20in%20setting%20up%20a%20VIP%20protocol%20convoy%20with%20security%20guards."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-6 py-3.5 rounded-xl transition-all shadow-md shadow-amber-500/10 hover:shadow-amber-500/25 text-xs sm:text-sm uppercase tracking-wider w-full md:w-auto text-center flex-shrink-0"
                  >
                    Contact Protocol Desk
                  </a>
                </div>

              </div>
            </section>
          </div>
        )}

        {currentPage === 'one-way-drop' && (
          <div>
            {/* One-Way Page Title Header */}
            <div className="py-20 pt-32 bg-neutral-900/40 border-b border-neutral-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono block mb-3">ONE-WAY INTERCITY FARES</span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none tracking-tighter uppercase">DYNAMIC DROPS CALCULATOR</h1>
                <p className="text-zinc-400 text-xs sm:text-sm mt-3 max-w-xl leading-relaxed font-sans">
                  Instantly estimate and lock fixed-rate, one-way drops across major routes in Pakistan. Includes premium fuel options, motorway tolls, and professional driver returning allowances with zero hidden fees.
                </p>
                <div className="w-16 h-1 bg-amber-500 mt-5 rounded-full" />
              </div>
            </div>

            <div className="py-4 bg-neutral-950">
              <OneWayDropCalculator
                onSuccessBooking={(details) => {
                  // Prepopulate custom booking details or display alert
                  const activeCar = FLEET.find(c => details.includes(c.name)) || FLEET[0];
                  setSelectedCar({
                    ...activeCar,
                    name: `${activeCar.name} (One-Way Drop)`,
                    description: details
                  });
                  setBookingModalOpen(true);
                }}
              />
            </div>
          </div>
        )}

        {currentPage === 'services' && (
          <div>
            {/* Services Page Title Header */}
            <div className="py-20 pt-32 bg-neutral-900/40 border-b border-neutral-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono block mb-3">EXCLUSIVE SOLUTIONS</span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none tracking-tighter uppercase">VIP SERVICES & TOURISM</h1>
                <p className="text-zinc-400 text-xs sm:text-sm mt-3 max-w-xl leading-relaxed font-sans">
                  From customized wedding decor convoy entries to high-elevation Northern tours and executive diplomatic-level protocol escorts, experience transport solutions engineered for ultimate satisfaction.
                </p>
                <div className="w-16 h-1 bg-amber-500 mt-5 rounded-full" />
              </div>
            </div>

            <div className="py-8 bg-neutral-950">
              <Services />
            </div>
          </div>
        )}

        {currentPage === 'reviews' && (
          <div>
            {/* Reviews Page Title Header */}
            <div className="py-20 pt-32 bg-neutral-900/40 border-b border-neutral-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono block mb-3">TRUST & RELIABILITY</span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none tracking-tighter uppercase">CLIENT TESTIMONIALS & FEEDBACK</h1>
                <p className="text-zinc-400 text-xs sm:text-sm mt-3 max-w-xl leading-relaxed font-sans">
                  Read 100% verified experiences from our esteemed guests, overseas tourists, and corporate executives. Share your own live review below to instantly publish.
                </p>
                <div className="w-16 h-1 bg-amber-500 mt-5 rounded-full" />
              </div>
            </div>

            <div>
              <Testimonials reviews={reviews} onAddReview={handleReviewAdd} showForm={true} />
            </div>
          </div>
        )}

        {currentPage === 'faqs' && (
          <div>
            {/* FAQs Page Title Header */}
            <div className="py-20 pt-32 bg-neutral-900/40 border-b border-neutral-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono block mb-3">HELP DESK</span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none tracking-tighter uppercase">FREQUENTLY ASKED QUESTIONS</h1>
                <p className="text-zinc-400 text-xs sm:text-sm mt-3 max-w-xl leading-relaxed font-sans">
                  Learn about standard fuel guidelines, out-station driver allowances, document validation rules, CNIC compliance, and custom wedding setups in Punjab & Lahore.
                </p>
                <div className="w-16 h-1 bg-amber-500 mt-5 rounded-full" />
              </div>
            </div>

            <div className="py-8 bg-neutral-950">
              <FAQs />
            </div>
          </div>
        )}

        {currentPage === 'contact' && (
          <div>
            {/* Contact Page Title Header */}
            <div className="py-20 pt-32 bg-neutral-900/40 border-b border-neutral-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono block mb-3">RESERVE A VEHICLE</span>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none tracking-tighter uppercase">CONTACT OUR RAWALPINDI DESK</h1>
                <p className="text-zinc-400 text-xs sm:text-sm mt-3 max-w-xl leading-relaxed font-sans">
                  Visit us at GPO Chowk near UBL Bank, Saddar, Rawalpindi. Submit your itinerary details below or connect on WhatsApp for immediate active dispatch.
                </p>
                <div className="w-16 h-1 bg-amber-500 mt-5 rounded-full" />
              </div>
            </div>

            <div className="py-8 bg-neutral-950">
              <AboutContact />
            </div>
          </div>
        )}
      </main>

      {/* Majestic Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-16 text-neutral-400 text-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left mb-12">
            
            {/* Column 1: Brand */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold tracking-wider text-white">
                  H&M <span className="text-amber-400 font-sans">BROTHERS</span>
                </span>
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-normal font-sans">
                Saddar Rawalpindi’s premier car rental and premium tourism company. Serving local citizens, overseas Pakistanis, corporate delegates, and wedding protocols with high-end SUVs, bulletproof configurations, and professional chauffeurs.
              </p>
              
              {/* Google average review badge */}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-white font-bold text-xs">{CONTACT_INFO.rating} Stars</span>
                <span className="text-neutral-600">•</span>
                <span className="text-neutral-500 text-xs">({reviews.length + 37} Verifiable Reviews)</span>
              </div>
            </div>

            {/* Column 2: Quick Navigation */}
            <div>
              <h4 className="font-serif text-white font-bold mb-4 uppercase tracking-wider text-xs font-mono">Our Fleet Links</h4>
              <ul className="space-y-2.5 text-xs font-semibold">
                <li>
                  <button onClick={() => { setCurrentPage('fleet'); setSelectedFilters({ category: 'Elite VIP', driverOnly: false }); scrollToTop(); }} className="hover:text-amber-400 transition-colors cursor-pointer">
                    Toyota Land Cruiser V8
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentPage('fleet'); setSelectedFilters({ category: 'Elite VIP', driverOnly: false }); scrollToTop(); }} className="hover:text-amber-400 transition-colors cursor-pointer">
                    Audi A6 Prestige
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentPage('fleet'); setSelectedFilters({ category: 'Premium Off-Road', driverOnly: false }); scrollToTop(); }} className="hover:text-amber-400 transition-colors cursor-pointer">
                    Toyota Prado Black SUV
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentPage('fleet'); setSelectedFilters({ category: 'Premium Off-Road', driverOnly: false }); scrollToTop(); }} className="hover:text-amber-400 transition-colors cursor-pointer">
                    Toyota Fortuner White SUV
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentPage('fleet'); setSelectedFilters({ category: 'Executive Sedan', driverOnly: false }); scrollToTop(); }} className="hover:text-amber-400 transition-colors cursor-pointer">
                    Toyota Corolla Grande
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Corporate Services */}
            <div>
              <h4 className="font-serif text-white font-bold mb-4 uppercase tracking-wider text-xs font-mono">VIP Services</h4>
              <ul className="space-y-2.5 text-xs font-semibold">
                <li>
                  <button onClick={() => { setCurrentPage('services'); scrollToTop(); }} className="hover:text-amber-400 transition-colors cursor-pointer">
                    Wedding Convoy entries
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentPage('services'); scrollToTop(); }} className="hover:text-amber-400 transition-colors cursor-pointer">
                    Northern Pakistan Tourism
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentPage('services'); scrollToTop(); }} className="hover:text-amber-400 transition-colors cursor-pointer">
                    Bulletproof Security VIP Protocol
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCurrentPage('services'); scrollToTop(); }} className="hover:text-amber-400 transition-colors cursor-pointer">
                    24/7 Airport Transfers ISB
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Location details */}
            <div className="space-y-4">
              <h4 className="font-serif text-white font-bold uppercase tracking-wider text-xs font-mono">Rawalpindi Desk</h4>
              <p className="text-xs leading-relaxed text-neutral-400 font-sans">
                Gpo chowk, near Ubl Bank, Saddar,<br />
                Rawalpindi, Punjab, 46000
              </p>
              
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold block">Contact Number:</span>
                <p className="text-sm font-bold text-white font-sans">
                  <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-amber-400 transition-colors">
                    {CONTACT_INFO.phoneFormatted}
                  </a>
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full text-[10px] font-mono font-bold border border-emerald-500/20">
                <span>OPEN 24 HOURS</span>
              </div>
            </div>

          </div>

          <hr className="border-neutral-900 my-8" />

          {/* Legal/Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 gap-4 text-center">
            <p>© {new Date().getFullYear()} H&M Brothers Rental And tourism. All rights reserved.</p>
            <div className="flex gap-4 font-sans font-semibold">
              <button onClick={() => { setCurrentPage('contact'); scrollToTop(); }} className="hover:underline hover:text-white">Terms of Lease</button>
              <span>|</span>
              <button onClick={() => { setCurrentPage('contact'); scrollToTop(); }} className="hover:underline hover:text-white">Privacy Protocol</button>
              <span>|</span>
              <span className="flex items-center gap-0.5 text-amber-400">
                <span>Open 24/7</span>
                <Heart className="w-3 h-3 fill-amber-400 animate-pulse" />
                <span>Rawalpindi Saddar Desk</span>
              </span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Scroll To Top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            id="scroll-to-top-btn"
            className="p-3 bg-neutral-900 border border-neutral-800 text-amber-400 hover:text-white rounded-xl transition-all shadow-lg hover:bg-neutral-800 cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating WhatsApp Quick booking */}
        <a
          href="https://wa.me/923485144199?text=Hello%20H%26M%20Brothers%2C%20I%20am%20interested%20in%20booking%20a%20luxury%20car%20rental."
          target="_blank"
          rel="noopener noreferrer"
          id="floating-whatsapp-btn"
          className="p-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full transition-all shadow-xl shadow-emerald-600/20 hover:scale-105"
          title="Chat on WhatsApp"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.695-1.047-5.228-2.951-7.136C17.279 1.53 14.76 1.48 12.013 1.48c-5.56 0-10.08 4.524-10.084 10.088-.001 1.884.501 3.73 1.455 5.372l-.988 3.605 3.663-.96zm12.062-7.855c-.328-.164-1.942-.958-2.242-1.069-.301-.11-.52-.164-.738.164-.219.329-.848 1.069-1.039 1.288-.192.219-.383.246-.711.082-.328-.164-1.386-.511-2.64-1.63-1.012-.903-1.694-2.018-1.892-2.347-.197-.329-.021-.507.143-.671.148-.147.328-.383.493-.574.164-.192.219-.329.328-.548.11-.219.055-.411-.027-.575-.082-.164-.738-1.78-1.01-2.438-.266-.643-.535-.556-.738-.556h-.629c-.219 0-.575.082-.876.411-.301.329-1.149 1.123-1.149 2.739 0 1.616 1.177 3.178 1.341 3.397.164.22 2.316 3.537 5.611 4.961.783.339 1.396.541 1.873.693.787.251 1.503.215 2.069.13.63-.095 1.942-.794 2.216-1.56.274-.767.274-1.424.192-1.56-.083-.137-.301-.219-.629-.383z" />
          </svg>
        </a>
      </div>

      {/* Booking Modal (Controlled slide over / overlay) */}
      {bookingModalOpen && (
        <BookingModal
          car={selectedCar}
          onClose={() => setBookingModalOpen(false)}
        />
      )}

    </div>
  );
}
