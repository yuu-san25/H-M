import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Car as CarIcon, Info, MessageSquare, ShieldCheck, HelpCircle, CheckCircle, Clock, Compass, DollarSign } from 'lucide-react';
import { FLEET } from '../data';

// Pakistan standard travel locations from Rawalpindi/Islamabad (Hub)
const DESTINATIONS = [
  {
    id: 'murree',
    name: 'Murree / Ayubia',
    distanceKm: 70,
    estimatedHours: 2,
    routeDescription: 'Murree Expressway (N-75)',
    tollsPkr: 200,
    highlights: 'Mall Road, Patriata Chairlift, scenic pine mountains.',
    image: 'https://images.unsplash.com/photo-1622549042984-754f9d78fa15?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'peshawar',
    name: 'Peshawar',
    distanceKm: 180,
    estimatedHours: 2.5,
    routeDescription: 'Peshawar-Islamabad Motorway (M-1)',
    tollsPkr: 550,
    highlights: 'Qissa Khwani Bazar, Bab-e-Peshawar, authentic Charsi Tikka.',
    image: 'https://images.unsplash.com/photo-1598261314486-1ca0a1c1d044?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'abbottabad',
    name: 'Abbottabad / Nathia Gali',
    distanceKm: 125,
    estimatedHours: 3,
    routeDescription: 'Hazara Motorway (M-15)',
    tollsPkr: 350,
    highlights: 'Lalazar Park, Thandiani heights, majestic Nathia Gali cold winds.',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'muzaffarabad',
    name: 'Muzaffarabad (AJK)',
    distanceKm: 140,
    estimatedHours: 3.5,
    routeDescription: 'Murree-Kohala Road & AJK Highway',
    tollsPkr: 300,
    highlights: 'Neelum River confluence, Red Fort, Pir Chinasi peak.',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'lahore',
    name: 'Lahore',
    distanceKm: 380,
    estimatedHours: 4.5,
    routeDescription: 'Lahore-Islamabad Motorway (M-2)',
    tollsPkr: 1100,
    highlights: 'Badshahi Mosque, Minar-e-Pakistan, culinary food streets.',
    image: 'https://images.unsplash.com/photo-1599818815197-29be5cda3f26?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'swat',
    name: 'Swat Valley / Kalam',
    distanceKm: 270,
    estimatedHours: 4.5,
    routeDescription: 'M-16 Swat Expressway',
    tollsPkr: 850,
    highlights: 'Malam Jabba skiing, Mingora Bazar, cold Kalam riverbed.',
    image: 'https://i.ibb.co/mVTXfp0g/1-B51g-K3sc-DM4-H-d-JU1t-Ud-QA.jpg'
  },
  {
    id: 'naran',
    name: 'Naran Valley',
    distanceKm: 240,
    estimatedHours: 5.5,
    routeDescription: 'Hazara Motorway (M-15) & Naran Road',
    tollsPkr: 600,
    highlights: 'Lake Saif-ul-Malook, Babusar Top, River Kunhar trout.',
    image: 'https://i.ibb.co/0y8KZczL/images-1.jpg'
  },
  {
    id: 'hunza',
    name: 'Hunza Valley (Gilgit)',
    distanceKm: 600,
    estimatedHours: 12,
    routeDescription: 'Karakoram Highway (KKH)',
    tollsPkr: 900,
    highlights: 'Attabad Lake turquoise waters, Altit Fort, Passu Cones.',
    image: 'https://i.ibb.co/MXyLmTB/muhammad-khubaib-sarfraz-hk-WB8-PN-8-MU-unsplash.jpg'
  },
  {
    id: 'skardu',
    name: 'Skardu',
    distanceKm: 630,
    estimatedHours: 13,
    routeDescription: 'KKH & Jaglot-Skardu Road',
    tollsPkr: 900,
    highlights: 'Shangrila Resort, Katpana cold desert, Sadpara Lake.',
    image: 'https://i.ibb.co/F4F1rTzd/images.jpg'
  },
  {
    id: 'faisalabad',
    name: 'Faisalabad',
    distanceKm: 320,
    estimatedHours: 4,
    routeDescription: 'Motorway M-4',
    tollsPkr: 950,
    highlights: 'Clock Tower bazaars, textile markets, Chenab Club.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'multan',
    name: 'Multan',
    distanceKm: 545,
    estimatedHours: 6,
    routeDescription: 'Motorway M-4',
    tollsPkr: 1450,
    highlights: 'Sufi shrines, blue pottery, famous mango orchards.',
    image: 'https://images.unsplash.com/photo-1527142879-95b61a0b8226?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'karachi',
    name: 'Karachi',
    distanceKm: 1410,
    estimatedHours: 16,
    routeDescription: 'National Highway N-5 / Motorway M-5 & M-9',
    tollsPkr: 3200,
    highlights: 'Clifton beach, Quaid-e-Azam Mausoleum, port scenery.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400'
  }
];

interface OneWayDropCalculatorProps {
  onSuccessBooking: (details: string) => void;
}

export default function OneWayDropCalculator({ onSuccessBooking }: OneWayDropCalculatorProps) {
  // Calculator States
  const [pickupCity, setPickupCity] = useState('Islamabad');
  const [selectedDestId, setSelectedDestId] = useState('murree');
  const [selectedCarId, setSelectedCarId] = useState(FLEET[0]?.id || '');
  const [customDistanceKm, setCustomDistanceKm] = useState<number | ''>('');
  const [customDestinationName, setCustomDestinationName] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);

  // Booking Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelTime, setTravelTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Selected details
  const selectedDest = useMemo(() => {
    return DESTINATIONS.find(d => d.id === selectedDestId);
  }, [selectedDestId]);

  const selectedCar = useMemo(() => {
    return FLEET.find(c => c.id === selectedCarId);
  }, [selectedCarId]);

  // Pricing Engine Calculations
  const calculatedQuote = useMemo(() => {
    if (!selectedCar) return null;

    let distance = 0;
    let tollTaxes = 0;
    let name = '';
    let driveTime = '';

    if (isCustomMode) {
      distance = Number(customDistanceKm) || 0;
      tollTaxes = Math.round(distance * 2); // rough toll tax estimate
      name = customDestinationName || 'Custom Location';
      // rough drive time: 65km per hour average
      const hours = Math.round((distance / 65) * 10) / 10;
      driveTime = `${hours} Hours`;
    } else if (selectedDest) {
      distance = selectedDest.distanceKm;
      tollTaxes = selectedDest.tollsPkr;
      name = selectedDest.name;
      driveTime = `${selectedDest.estimatedHours} Hours`;
    }

    // VEHICLE RATES MULTIPLIERS FOR ONE WAY DROPS
    // For one-way drops, we charge rate per kilometer that takes into account:
    // 1. One-way fuel expense
    // 2. Chauffeur service & driving strain
    // 3. Driver back-route transit allowance
    // Let's set highly authentic rates per km for different vehicle tiers:
    let ratePerKm = 35; // Budget Sedan standard (e.g. City, GLI)
    let driverReturningAllowance = 3000;

    if (selectedCar.category === 'Executive Sedan') {
      ratePerKm = 50;
      driverReturningAllowance = 4000;
    } else if (selectedCar.category === 'Premium Off-Road' || selectedCar.category === 'Luxury SUV') {
      ratePerKm = 85;
      driverReturningAllowance = 6000;
    } else if (selectedCar.category === 'Elite VIP') {
      ratePerKm = 140;
      driverReturningAllowance = 10000;
    }

    // Distance calculation logic:
    // One way fare includes: (One-way distance * ratePerKm) + returning empty driver allowance + tolls
    const baseVehicleCost = distance * ratePerKm;
    const totalQuote = Math.round(baseVehicleCost + driverReturningAllowance + tollTaxes);

    return {
      distance,
      tollTaxes,
      ratePerKm,
      driverReturningAllowance,
      baseVehicleCost,
      totalQuote,
      name,
      driveTime,
      carName: selectedCar.name
    };
  }, [selectedCar, selectedDest, isCustomMode, customDistanceKm, customDestinationName]);

  const handleCalculateForDestination = (destId: string) => {
    setIsCustomMode(false);
    setSelectedDestId(destId);
    // Smooth scroll to calculator box
    const calcBox = document.getElementById('interactive-calculator-box');
    if (calcBox) {
      calcBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !travelDate) {
      alert('Please fill out Name, Phone, and Travel Date.');
      return;
    }

    if (!calculatedQuote) return;

    const summary = `ONE WAY DROP REQUEST:
Route: ${pickupCity} to ${calculatedQuote.name}
Distance: ${calculatedQuote.distance} km
Vehicle: ${calculatedQuote.carName}
Estimated Quote: Rs. ${calculatedQuote.totalQuote.toLocaleString()}
Client Name: ${fullName}
Phone Number: ${phone}
Date: ${travelDate} ${travelTime}
Special Notes: ${notes}`;

    setIsSubmitted(true);
    onSuccessBooking(summary);
  };

  const handleWhatsAppAction = () => {
    if (!calculatedQuote) return;
    const customMessage = `Hello H&M Brothers Rental. I want to book a One-Way Drop:
- Pickup: ${pickupCity}
- Dropoff: ${calculatedQuote.name}
- Vehicle: ${calculatedQuote.carName}
- Estimated Distance: ${calculatedQuote.distance} km
- Travel Date & Time: ${travelDate || 'Not specified'} ${travelTime || ''}
- Client Name: ${fullName || 'Client'}
- Quote Estimate: Rs. ${calculatedQuote.totalQuote.toLocaleString()}

Please confirm my driver dispatch.`;

    const encodedText = encodeURIComponent(customMessage);
    window.open(`https://wa.me/923485144199?text=${encodedText}`, '_blank');
  };

  return (
    <section id="one-way-drops" className="py-20 bg-neutral-950 border-t border-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.02),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono block">One-Way Drop Service</span>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none uppercase">
            HASSLE-FREE ONE WAY INTERCITY DROPS
          </h2>
          <div className="w-16 h-1 bg-amber-500 rounded-full" />
          <p className="text-neutral-400 text-xs sm:text-sm pt-2 leading-relaxed font-medium">
            Unlike standard rentals, H&M Brothers specializes in dedicated **one-way drop-offs** across Pakistan. 
            No need to pay for multiple days or returning fuel. Choose your destination below, select your vehicle, and get a completely transparent, real-time breakdown of charges.
          </p>
        </div>

        {/* Dynamic Calculator & Booking Container */}
        <div id="interactive-calculator-box" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* CALCULATOR LOGIC PANEL (Left 7 Columns) */}
          <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-amber-500" />
            
            <div className="mb-8">
              <h3 className="font-sans text-xl font-bold text-white uppercase flex items-center gap-2">
                <Navigation className="w-5 h-5 text-amber-500" />
                Intercity Fare Calculator
              </h3>
              <p className="text-xs text-neutral-400 mt-1">Get an instant quote considering standard distance, highway tolls, and returning allowances.</p>
            </div>

            <div className="space-y-6">
              {/* Pickup City Selector */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 font-mono">1. Starting Hub (Pickup)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Islamabad', 'Lahore', 'Karachi', 'Peshawar'].map((city) => (
                    <button
                      key={city}
                      onClick={() => setPickupCity(city)}
                      className={`py-3 px-2 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                        pickupCity === city
                          ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mode Selection: Popular list vs Custom Location */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 font-mono">2. Drop Location Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsCustomMode(false)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                      !isCustomMode
                        ? 'bg-neutral-800 border-neutral-700 text-white'
                        : 'bg-neutral-950 border-neutral-850 text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    Select Famous Destination
                  </button>
                  <button
                    onClick={() => setIsCustomMode(true)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                      isCustomMode
                        ? 'bg-neutral-800 border-neutral-700 text-white'
                        : 'bg-neutral-950 border-neutral-850 text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    Enter Custom Distance (km)
                  </button>
                </div>
              </div>

              {/* Destination inputs */}
              {!isCustomMode ? (
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 font-mono">3. Select Destination</label>
                  <select
                    value={selectedDestId}
                    onChange={(e) => setSelectedDestId(e.target.value)}
                    className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 px-4 py-3.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm font-semibold cursor-pointer"
                  >
                    {DESTINATIONS.map((dest) => (
                      <option key={dest.id} value={dest.id}>
                        {dest.name} ({dest.distanceKm} km • Approx. {dest.estimatedHours}h drive)
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 font-mono">Destination Area Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Abbottabad Bypass, Gilgit"
                      value={customDestinationName}
                      onChange={(e) => setCustomDestinationName(e.target.value)}
                      className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 px-4 py-3 focus:border-amber-500 outline-none text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 font-mono">Estimated Distance (One-Way km)</label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        max="2000"
                        placeholder="e.g. 150"
                        value={customDistanceKm}
                        onChange={(e) => setCustomDistanceKm(e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 pl-4 pr-12 py-3 focus:border-amber-500 outline-none text-sm font-mono font-bold text-amber-400"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 text-xs font-mono font-bold">KM</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Vehicle selector */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2 font-mono">4. Choose Luxury Vehicle</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {FLEET.map((car) => {
                    const isSelected = selectedCarId === car.id;
                    return (
                      <div
                        key={car.id}
                        onClick={() => setSelectedCarId(car.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 text-white'
                            : 'bg-neutral-950 border-neutral-850 text-neutral-400 hover:border-neutral-800 hover:text-neutral-200'
                        }`}
                      >
                        <div className="text-left leading-none">
                          <span className="text-[10px] text-neutral-500 font-bold block mb-1 font-mono uppercase">{car.category}</span>
                          <strong className="text-xs sm:text-sm font-bold block text-white">{car.name}</strong>
                        </div>
                        <div className="mt-2 text-left">
                          <span className="text-[9px] text-neutral-400 font-bold block">Day Rate Ref:</span>
                          <span className="text-xs font-mono text-amber-400 font-bold">Rs. {car.pkrRatePerDay.toLocaleString()}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* TRANSLUCENT FARE BREAKDOWN RECEIPT */}
              {calculatedQuote && (
                <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Estimated Fare Breakdown</span>
                    <span className="text-[10px] bg-neutral-900 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded border border-emerald-900/40">Includes Pro Driver</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center text-neutral-300">
                      <span className="text-neutral-500 font-medium">One-Way Distance ({calculatedQuote.distance} km)</span>
                      <span className="font-mono text-neutral-200">{calculatedQuote.distance} km</span>
                    </div>

                    <div className="flex justify-between items-center text-neutral-300">
                      <span className="text-neutral-500 font-medium">Base Vehicle Rate per km</span>
                      <span className="font-mono text-neutral-200">Rs. {calculatedQuote.ratePerKm} / km</span>
                    </div>

                    <div className="flex justify-between items-center text-neutral-300">
                      <span className="text-neutral-500 font-medium">Base Fuel & Driver Transit Cost</span>
                      <span className="font-mono text-neutral-200">Rs. {calculatedQuote.baseVehicleCost.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center text-neutral-300">
                      <span className="text-neutral-500 font-medium">Driver Back-Route returning allowance</span>
                      <span className="font-mono text-neutral-200">Rs. {calculatedQuote.driverReturningAllowance.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center text-neutral-300">
                      <span className="text-neutral-500 font-medium">Estimated Motorway Toll Taxes</span>
                      <span className="font-mono text-neutral-200">Rs. {calculatedQuote.tollTaxes.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="border-t border-neutral-900 pt-3 flex justify-between items-end">
                    <div className="text-left">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block font-mono">ESTIMATED QUOTE PRICE</span>
                      <span className="text-xs text-neutral-400">Fixed rate including toll, fuel & driver returning</span>
                    </div>
                    <div className="text-right">
                      <strong className="text-xl sm:text-2xl font-mono text-amber-400 font-black">
                        Rs. {calculatedQuote.totalQuote.toLocaleString()}
                      </strong>
                    </div>
                  </div>

                  {/* Informational Box */}
                  <div className="bg-neutral-900/60 border border-neutral-850/60 rounded-xl p-3 flex gap-2.5 text-left">
                    <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-neutral-400 leading-normal">
                      The quote is based on Rawalpindi/Islamabad hub drop-off configurations. High elevation route requirements (e.g. Hunza, Skardu) are completely adjusted for terrain. Drivers are strictly professional, non-smoking, and mountain-cleared.
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* RESERVATION REQUEST FORM (Right 5 Columns) */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-amber-500" />
              
              <div className="mb-6">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono block mb-1">Step 5</span>
                <h3 className="font-sans text-lg font-bold text-white uppercase">Secure Drop Booking</h3>
                <p className="text-[11px] text-neutral-400 mt-1">Submit details below to confirm security clearances and driver allotment.</p>
              </div>

              {isSubmitted ? (
                <div className="bg-emerald-950/25 border border-emerald-500/20 rounded-2xl p-6 text-center space-y-4">
                  <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto text-lg">
                    ✓
                  </div>
                  <h4 className="text-base font-bold text-white uppercase">Reservation Request Placed!</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    Thank you, <strong className="text-amber-400">{fullName}</strong>. We have logged your request for a drop to <strong className="text-amber-400">{calculatedQuote?.name}</strong>. Our Rawalpindi GPO dispatch team will reach you shortly on <strong className="text-amber-400">{phone}</strong>.
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={handleWhatsAppAction}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-lg text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" />
                      <span>Speed Up via WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="w-full bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 font-bold py-2.5 rounded-lg text-[10px] uppercase tracking-wider cursor-pointer"
                    >
                      Modify Booking details
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 font-mono">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Syed Ibraheem"
                      className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 px-4 py-3 focus:border-amber-500 outline-none text-xs font-semibold placeholder-neutral-700"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 font-mono">Active WhatsApp / Phone</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 03485144199"
                      className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 px-4 py-3 focus:border-amber-500 outline-none text-xs font-mono font-semibold placeholder-neutral-700"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 font-mono">Departure Date</label>
                      <input
                        type="date"
                        required
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 px-3 py-3 focus:border-amber-500 outline-none text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 font-mono">Departure Time</label>
                      <input
                        type="time"
                        value={travelTime}
                        onChange={(e) => setTravelTime(e.target.value)}
                        className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 px-3 py-3 focus:border-amber-500 outline-none text-xs font-semibold text-neutral-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 font-mono">Route Special Instructions</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need entry at airport gate, extra luggage carrier, flower décor for bride drop..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 px-4 py-3 focus:border-amber-500 outline-none text-xs placeholder-neutral-700"
                    />
                  </div>

                  {/* Submission CTAs */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black py-4 rounded-xl transition-all text-xs uppercase tracking-widest shadow-lg shadow-amber-500/10 cursor-pointer"
                    >
                      Book This Fare Now
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleWhatsAppAction}
                      className="w-full bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-200 font-bold py-3 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-emerald-500 text-emerald-400" />
                      <span>Instant Book on WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
