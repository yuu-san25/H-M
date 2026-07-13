import React, { useState } from 'react';
import { MapPin, Calendar, Compass, User, Phone, MessageSquare, Check, Landmark } from 'lucide-react';
import { FLEET } from '../data';

interface CitiesAndBookingProps {
  onSuccessBooking: (details: string) => void;
  onInstantBook: () => void;
}

export default function CitiesAndBooking({ onSuccessBooking, onInstantBook }: CitiesAndBookingProps) {
  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Islamabad');
  const [vehicle, setVehicle] = useState(FLEET[0]?.name || '');
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [dropDate, setDropDate] = useState('');
  const [tripType, setTripType] = useState('One Way Drop');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Cities List with placeholder images representing local landmarks/city aesthetic
  const cities = [
    { name: 'Islamabad', image: 'https://i.ibb.co/N21T5g8Q/360-F-274502877-n3-BQGo-AGPRqsjg-KIU4l-B6wns0m-Bu-PTL3.jpg', desc: 'Faisal Mosque & Scenic Margallas' },
    { name: 'Rawalpindi', image: 'https://i.ibb.co/qL8TtN7V/photo-1617129926580-44e96bf7d0dc.avif', desc: 'Saddar GPO & Commercial Hub' },
    { name: 'Lahore', image: 'https://i.ibb.co/Lhcd3DfV/mosque-4432476-640.jpg', desc: 'Badshahi Mosque & Cultural Heart' },
    { name: 'Karachi', image: 'https://i.ibb.co/dsDbx6Hj/premium-photo-1697730376263-90da9f2a1238.avif', desc: 'Mazar-e-Quaid & Coastal Port' },
    { name: 'Peshawar', image: 'https://i.ibb.co/9m4KpHhL/Places-to-visit-in-Peshawar-04-1.jpg', desc: 'Qissa Khwani & Ancient Gateway' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert('Please fill in your Name and Phone Number to submit.');
      return;
    }
    
    setIsSubmitted(true);
    const summary = `Name: ${fullName}, Phone: ${phone}, City: ${city}, Vehicle: ${vehicle}, Pickup: ${pickupLocation} on ${pickupDate}, Drop: ${dropLocation} on ${dropDate}, Type: ${tripType}, Notes: ${notes}`;
    onSuccessBooking(summary);
  };

  return (
    <section id="cities-booking" className="py-20 bg-neutral-950 border-t border-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(245,158,11,0.015),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: OUR CITIES (span 5) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono block mb-2">Our Cities</span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight uppercase">
                We Are Available In All Major Cities
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed">
                H&M Brothers delivers flawless car rental and dedicated out-station chauffeurs across Pakistan. Choose your city and secure your elite premium ride instantly.
              </p>
            </div>

            {/* Cities Scrollable / Grid List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {cities.map((c) => (
                <div 
                  key={c.name}
                  className="group relative h-28 rounded-2xl overflow-hidden border border-neutral-900 hover:border-amber-500/40 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-neutral-950/70 group-hover:bg-neutral-950/60 z-10 transition-colors" />
                  <img 
                    src={c.image} 
                    alt={c.name} 
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="relative z-20 h-full p-4 flex flex-col justify-between items-start">
                    <div>
                      <h4 className="font-sans text-lg font-black text-white">{c.name}</h4>
                      <p className="text-[10px] text-neutral-400 font-medium">{c.desc}</p>
                    </div>
                    
                    <button 
                      onClick={onInstantBook}
                      className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 mt-2 cursor-pointer"
                    >
                      <span>Book Now</span>
                      <span className="text-xs">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: QUICK BOOKING FORM (span 7) */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden text-left">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-amber-500" />
              
              <div className="mb-6">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono block mb-1">Quick Booking</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white uppercase">Book Your Ride Now</h3>
                <p className="text-xs text-neutral-400 mt-1">Get an instant quote & protocol booking confirmation via WhatsApp or Call.</p>
              </div>

              {isSubmitted ? (
                <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-2xl p-8 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto text-xl">
                    ✓
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white">Booking Request Submitted!</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans max-w-md mx-auto">
                    Thank you {fullName}. Your booking request for the <strong className="text-amber-400">{vehicle}</strong> has been logged. We will connect with you on <strong className="text-amber-400">{phone}</strong> within 5 minutes.
                  </p>
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/923485144199?text=Hello%20H%26M%20Brothers%2C%20my%20name%20is%20${encodeURIComponent(fullName)}.%20I%20just%20submitted%20a%20booking%20request%20for%20the%20${encodeURIComponent(vehicle)}%20via%20your%20website.%20Please%20confirm%20my%20reservation.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Speed Up on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Row 1: Full Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 font-mono">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <input 
                          type="text" 
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Your full name" 
                          className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 pl-11 pr-4 py-3.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm placeholder-neutral-700 font-medium"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 font-mono">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <input 
                          type="tel" 
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 03485144199" 
                          className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 pl-11 pr-4 py-3.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm placeholder-neutral-700 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Select City & Select Vehicle */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 font-mono">Select City</label>
                      <select 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 px-4 py-3.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm font-medium cursor-pointer"
                      >
                        <option>Islamabad</option>
                        <option>Rawalpindi</option>
                        <option>Lahore</option>
                        <option>Karachi</option>
                        <option>Peshawar</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 font-mono">Select Vehicle</label>
                      <select 
                        value={vehicle}
                        onChange={(e) => setVehicle(e.target.value)}
                        className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 px-4 py-3.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm font-medium cursor-pointer"
                      >
                        {FLEET.map((car) => (
                          <option key={car.id} value={car.name}>{car.name} (Rs. {car.pkrRatePerDay.toLocaleString()})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Pickup Location & Pickup Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 font-mono">Pickup Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <input 
                          type="text" 
                          value={pickupLocation}
                          onChange={(e) => setPickupLocation(e.target.value)}
                          placeholder="Airport, Hotel, Saddar, etc." 
                          className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 pl-11 pr-4 py-3.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm placeholder-neutral-700 font-medium"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 font-mono">Pickup Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <input 
                          type="date" 
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 pl-11 pr-4 py-3.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm placeholder-neutral-700 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Drop Location & Drop Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 font-mono">Drop Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <input 
                          type="text" 
                          value={dropLocation}
                          onChange={(e) => setDropLocation(e.target.value)}
                          placeholder="Destination drop point" 
                          className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 pl-11 pr-4 py-3.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm placeholder-neutral-700 font-medium"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 font-mono">Drop Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-600" />
                        <input 
                          type="date" 
                          value={dropDate}
                          onChange={(e) => setDropDate(e.target.value)}
                          className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 pl-11 pr-4 py-3.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm placeholder-neutral-700 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Trip Type Checkboxes */}
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 font-mono">Trip Type</label>
                    <div className="flex gap-6">
                      {['Round Trip', 'One Way Drop'].map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer select-none text-xs text-neutral-300">
                          <input 
                            type="radio" 
                            name="tripType"
                            checked={tripType === type}
                            onChange={() => setTripType(type)}
                            className="w-4 h-4 border-neutral-800 bg-neutral-950 text-amber-500 focus:ring-amber-500"
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 font-mono">Additional Notes (Optional)</label>
                    <textarea 
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Special requirements (e.g. VIP protocol escort, flower decoration, personal guard)" 
                      className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 px-4 py-3 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm placeholder-neutral-700 font-medium"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black py-4 rounded-xl transition-all shadow-lg shadow-amber-500/10 text-xs uppercase tracking-widest cursor-pointer"
                  >
                    Submit Booking Request
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
