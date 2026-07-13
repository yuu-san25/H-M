import { useState, useEffect, FormEvent } from 'react';
import { Car, BookingDetails } from '../types';
import { X, Calendar, Phone, MapPin, User, Compass, Star, FileText, CheckCircle2, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface BookingModalProps {
  car: Car | null;
  onClose: () => void;
}

export default function BookingModal({ car, onClose }: BookingModalProps) {
  if (!car) return null;

  // Set default dates: tomorrow as pickup, day after tomorrow as dropoff
  const getTomorrowString = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  const getDayAfterTomorrowString = () => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().split('T')[0];
  };

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupDate, setPickupDate] = useState(getTomorrowString());
  const [dropoffDate, setDropoffDate] = useState(getDayAfterTomorrowString());
  const [pickupLocation, setPickupLocation] = useState('Saddar GPO Chowk Office');
  const [destination, setDestination] = useState('Rawalpindi/Islamabad Local');
  const [withDriver, setWithDriver] = useState(car.specs.withDriverOnly);
  const [serviceType, setServiceType] = useState('One Way Drop');
  const [notes, setNotes] = useState('');
  const [successReceipt, setSuccessReceipt] = useState<any | null>(null);

  // Security deposit estimation
  const getSecurityDeposit = (carId: string) => {
    switch (carId) {
      case 'land-cruiser-v8':
        return 150000;
      case 'range-rover-vogue':
        return 200000;
      case 'toyota-prado':
        return 80000;
      case 'toyota-fortuner-legender':
        return 60000;
      case 'toyota-grande':
        return 30000;
      case 'honda-civic-rs':
        return 35000;
      default:
        return 40000;
    }
  };

  // Automatically check driver if car is withDriverOnly
  useEffect(() => {
    if (car.specs.withDriverOnly) {
      setWithDriver(true);
    }
  }, [car]);

  // Calculations
  const calculateDays = () => {
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
    
    const diffTime = end.getTime() - start.getTime();
    if (diffTime < 0) return 0;
    
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive
    return diffDays;
  };

  const rentalDays = calculateDays();
  const baseRent = rentalDays * car.pkrRatePerDay;
  
  // driver cost in Pakistan is typically 2,000 - 2,500 PKR / day if not included in the car base rate
  // Let's charge 2,000 PKR / day as custom helper charge if they opted in on a self-drive car
  const driverDailyFee = car.specs.withDriverOnly ? 0 : (withDriver ? 2500 : 0);
  const driverTotalFee = rentalDays * driverDailyFee;
  
  const totalAmount = baseRent + driverTotalFee;
  const securityDeposit = getSecurityDeposit(car.id);

  const formatPKR = (amount: number) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getWhatsAppMessage = () => {
    const driverText = withDriver ? 'Yes (Chauffeur-Driven)' : 'No (Self-Drive)';
    const totalDays = rentalDays || 1;
    const msg = `Hello *H%26M Brothers Rental And tourism*,

I want to book the following vehicle:
🚗 *Vehicle*: ${car.name}
👤 *Client Name*: ${fullName || 'Guest'}
📞 *Phone*: ${phone || 'N/A'}
🛠️ *Service Type*: ${serviceType}
📅 *Pickup Date*: ${pickupDate}
📅 *Dropoff Date*: ${dropoffDate} (${totalDays} Days)
📍 *Pickup*: ${pickupLocation}
🏔️ *Destination*: ${destination}
👮 *With Chauffeur*: ${driverText}
💰 *Estimated Base Rent*: ${formatPKR(baseRent)}
💳 *Refundable Security*: ${formatPKR(securityDeposit)}

Please confirm the availability for these dates. Thanks!`;
    return `${CONTACT_INFO.whatsappUrl}?text=${msg}`;
  };

  const handleOfficialSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert('Please fill out your Name and Mobile Number to proceed.');
      return;
    }

    const receipt = {
      receiptNo: `HM-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString(),
      carName: car.name,
      fullName,
      phone,
      serviceType,
      pickupDate,
      dropoffDate,
      days: rentalDays,
      pickupLocation,
      destination,
      driverOption: withDriver ? 'Professional Chauffeur Service' : 'Self-Drive',
      baseRent,
      driverTotalFee,
      totalAmount,
      securityDeposit,
      status: 'PRE-CONFIRMED (Awaiting Verification)'
    };
    setSuccessReceipt(receipt);
  };

  const pickupPresets = [
    'Saddar GPO Chowk Office',
    'Islamabad International Airport (ISB)',
    'Rawalpindi Railway Station',
    'G-11 Islamabad',
    'DHA Phase-II Rawalpindi'
  ];

  const destinationPresets = [
    'Rawalpindi/Islamabad Local',
    'Wedding Event (Local Venue)',
    'Northern Areas (Murree/Naran/Hunza)',
    'KPK Highway Route (Peshawar/Abbottabad)',
    'Punjab Route (Lahore/Faisalabad/Multan)'
  ];

  return (
    <div id="booking-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm">
      
      <div id="booking-modal-container" className="relative bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-4xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-neutral-950">
          <div className="text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 font-mono">Secure Car Reservation</span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">Book {car.name}</h2>
          </div>
          <button
            onClick={onClose}
            id="close-booking-modal"
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal body scroll container */}
        <div className="overflow-y-auto flex-grow">
          
          {!successReceipt ? (
            <div className="grid md:grid-cols-12 gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
              
              {/* Left Column: Car Specifications & Price Calculations */}
              <div className="md:col-span-5 p-6 bg-neutral-950/40 text-left flex flex-col justify-between">
                
                <div className="space-y-6">
                  {/* Car Mini Banner */}
                  <div className="rounded-2xl overflow-hidden border border-neutral-800/80 bg-neutral-950 aspect-[16/10]">
                    <img
                      src={car.image}
                      alt={car.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Pricing Summary */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-neutral-500 font-mono font-bold mb-3">Live Valuation Breakdown</h4>
                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between text-neutral-400">
                        <span>Daily Rate:</span>
                        <span className="font-semibold text-white font-sans">{formatPKR(car.pkrRatePerDay)}</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>Rental Duration:</span>
                        <span className="font-semibold text-amber-400 font-sans">{rentalDays} Day{rentalDays !== 1 && 's'}</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>Base Rental:</span>
                        <span className="font-semibold text-white font-sans">{formatPKR(baseRent)}</span>
                      </div>
                      
                      {driverDailyFee > 0 && (
                        <div className="flex justify-between text-neutral-400">
                          <span>Chauffeur Service ({formatPKR(driverDailyFee)}/day):</span>
                          <span className="font-semibold text-white font-sans">{formatPKR(driverTotalFee)}</span>
                        </div>
                      )}

                      <hr className="border-neutral-800/80 my-2" />

                      <div className="flex justify-between text-base font-bold">
                        <span className="text-neutral-200">Grand Total Rent:</span>
                        <span className="text-amber-400 font-sans">{formatPKR(totalAmount)}</span>
                      </div>

                      <div className="flex justify-between text-xs text-neutral-400 bg-neutral-900 border border-neutral-800/80 p-2.5 rounded-xl mt-3">
                        <span className="flex items-center gap-1.5 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                          Refundable Security Deposit:
                        </span>
                        <span className="font-bold text-white font-sans">{formatPKR(securityDeposit)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Local Guarantees */}
                <div className="mt-8 pt-4 border-t border-neutral-800/80 space-y-2.5 text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Open 24 Hours Saddar garage dispatch.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Real vehicles matching actual images.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>No hidden charges, clean contracts.</span>
                  </div>
                </div>

              </div>

              {/* Right Column: Interactive Booking Form */}
              <form onSubmit={handleOfficialSubmit} className="md:col-span-7 p-6 space-y-5 text-left">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 font-mono">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-500">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarmad Ali"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 pl-10 pr-4 py-3 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 font-mono">
                    Mobile / WhatsApp Number
                  </label>
                  <p className="text-[10px] text-neutral-500 mb-2">Used for rapid driver contact and verification.</p>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-500">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0348 5144199"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 pl-10 pr-4 py-3 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Service Type Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 font-mono">
                    Select Service Type
                  </label>
                  <select 
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 px-4 py-3 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-sm font-medium cursor-pointer"
                  >
                    <option value="One Way Drop">One Way Drop</option>
                    <option value="Round Trip">Round Trip / Full Day Rental</option>
                    <option value="Wedding Protocol">Wedding Protocol & Decoration</option>
                    <option value="Northern Tour">Northern Pakistan Tour</option>
                    <option value="VIP Protocol">VIP / Corporate Protocol Convoy</option>
                    <option value="Airport Transfer">24/7 Airport Transfer</option>
                  </select>
                </div>

                {/* Dates Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 font-mono">
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      required
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 px-4 py-3 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-sm font-medium cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 font-mono">
                      Return Date
                    </label>
                    <input
                      type="date"
                      required
                      value={dropoffDate}
                      onChange={(e) => setDropoffDate(e.target.value)}
                      min={pickupDate}
                      className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 px-4 py-3 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-sm font-medium cursor-pointer"
                    />
                  </div>
                </div>

                {/* Pickup Location Preset Selector */}
                <div>
                  <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 font-mono">
                    Pickup Location
                  </label>
                  <div className="relative mb-2">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-500">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 pl-10 pr-4 py-3 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-sm font-medium"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {pickupPresets.map((preset) => (
                      <button
                        type="button"
                        key={preset}
                        onClick={() => setPickupLocation(preset)}
                        className={`text-[10px] px-2.5 py-1 rounded-md border transition-all ${
                          pickupLocation === preset
                            ? 'bg-amber-400/10 border-amber-400/50 text-amber-400 font-semibold'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        {preset.split(' (')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Destination Selector */}
                <div>
                  <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 font-mono">
                    Your Travel Destination
                  </label>
                  <div className="relative mb-2">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-500">
                      <Compass className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 pl-10 pr-4 py-3 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-sm font-medium"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {destinationPresets.map((preset) => (
                      <button
                        type="button"
                        key={preset}
                        onClick={() => setDestination(preset)}
                        className={`text-[10px] px-2.5 py-1 rounded-md border transition-all ${
                          destination === preset
                            ? 'bg-amber-400/10 border-amber-400/50 text-amber-400 font-semibold'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        {preset.split(' (')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Driver Toggle (Only show if vehicle does NOT enforce withDriverOnly) */}
                {!car.specs.withDriverOnly && (
                  <div className="bg-neutral-950 border border-neutral-800 p-4 rounded-2xl flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-xs font-bold text-white uppercase tracking-wider font-mono">Request Chauffeur Driver</p>
                      <p className="text-[10px] text-neutral-400 mt-1">Get an expert Rawalpindi/Mountain route driver (+2,500 PKR/Day)</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={withDriver}
                        onChange={(e) => setWithDriver(e.target.checked)}
                        className="sr-only peer cursor-pointer"
                      />
                      <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-neutral-400 after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:bg-neutral-950 peer-checked:bg-amber-400" />
                    </label>
                  </div>
                )}

                {/* Special Request Notes */}
                <div>
                  <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 font-mono">
                    Special Requests / Wedding Decoration
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Wedding flower decoration requested, Bulletproof armor configuration, security protocol guards..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-neutral-950 text-white rounded-xl border border-neutral-800 p-3.5 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-sm font-medium"
                  />
                </div>

                {/* Double Booking Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {/* WhatsApp instant booking */}
                  <a
                    href={getWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="whatsapp-booking-cta"
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/25 text-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.695-1.047-5.228-2.951-7.136C17.279 1.53 14.76 1.48 12.013 1.48c-5.56 0-10.08 4.524-10.084 10.088-.001 1.884.501 3.73 1.455 5.372l-.988 3.605 3.663-.96zm12.062-7.855c-.328-.164-1.942-.958-2.242-1.069-.301-.11-.52-.164-.738.164-.219.329-.848 1.069-1.039 1.288-.192.219-.383.246-.711.082-.328-.164-1.386-.511-2.64-1.63-1.012-.903-1.694-2.018-1.892-2.347-.197-.329-.021-.507.143-.671.148-.147.328-.383.493-.574.164-.192.219-.329.328-.548.11-.219.055-.411-.027-.575-.082-.164-.738-1.78-1.01-2.438-.266-.643-.535-.556-.738-.556h-.629c-.219 0-.575.082-.876.411-.301.329-1.149 1.123-1.149 2.739 0 1.616 1.177 3.178 1.341 3.397.164.22 2.316 3.537 5.611 4.961.783.339 1.396.541 1.873.693.787.251 1.503.215 2.069.13.63-.095 1.942-.794 2.216-1.56.274-.767.274-1.424.192-1.56-.083-.137-.301-.219-.629-.383z" />
                    </svg>
                    <span>Instant WhatsApp Book</span>
                  </a>

                  {/* Standard Web submit */}
                  <button
                    type="submit"
                    id="submit-web-booking"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-bold py-4 rounded-xl transition-all shadow-md shadow-amber-500/10 hover:shadow-amber-500/25 text-sm uppercase tracking-wide cursor-pointer"
                  >
                    Submit Booking Request
                  </button>
                </div>

              </form>

            </div>
          ) : (
            /* SUCCESS STATE: Luxury Booking Receipt */
            <div className="p-6 max-w-2xl mx-auto text-center space-y-6">
              
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/30 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Booking Pre-Confirmed!</h3>
                <p className="text-sm text-neutral-400">Your reservation code has been generated. Please save this receipt.</p>
              </div>

              {/* Digital Receipt Card */}
              <div id="booking-digital-receipt" className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 text-left relative overflow-hidden shadow-xl">
                {/* Receipt watermark */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.02] text-white select-none pointer-events-none font-serif text-8xl font-bold uppercase rotate-12">
                  H&M Brothers
                </div>

                <div className="flex justify-between items-start pb-4 border-b border-neutral-800/80">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-amber-400">H&M Brothers Rental & Tourism</h4>
                    <span className="text-[10px] text-neutral-400 font-mono">GPO Chowk Saddar, Rawalpindi • Open 24/7</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-neutral-300">Receipt No:</p>
                    <span className="text-xs font-bold font-mono text-white">{successReceipt.receiptNo}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-5 text-xs text-neutral-400 border-b border-neutral-800/80">
                  <div>
                    <span className="block font-medium uppercase text-neutral-500 font-mono">Client Details:</span>
                    <p className="text-sm font-bold text-white mt-1">{successReceipt.fullName}</p>
                    <p className="mt-0.5">{successReceipt.phone}</p>
                  </div>
                  <div>
                    <span className="block font-medium uppercase text-neutral-500 font-mono">Vehicle Rented:</span>
                    <p className="text-sm font-bold text-amber-400 mt-1">{successReceipt.carName}</p>
                    <p className="mt-0.5">Duration: {successReceipt.days} Day{successReceipt.days !== 1 && 's'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-5 text-xs text-neutral-400 border-b border-neutral-800/80">
                  <div>
                    <span className="block font-medium uppercase text-neutral-500 font-mono">Pickup & Logistics:</span>
                    <p className="text-white font-bold mt-1">{successReceipt.pickupLocation}</p>
                    <p className="mt-0.5">Dates: {successReceipt.pickupDate} to {successReceipt.dropoffDate}</p>
                  </div>
                  <div>
                    <span className="block font-medium uppercase text-neutral-500 font-mono">Service Configuration:</span>
                    <p className="text-amber-400 font-bold mt-1">{successReceipt.serviceType}</p>
                    <p className="text-white font-bold mt-0.5">{successReceipt.driverOption}</p>
                    <p className="mt-0.5">Target Destination: {successReceipt.destination}</p>
                  </div>
                </div>

                {/* Final charges summary */}
                <div className="pt-5 space-y-2.5 text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>Base Fleet Rental Charge:</span>
                    <span className="font-bold text-white font-mono">{formatPKR(successReceipt.baseRent)}</span>
                  </div>
                  
                  {successReceipt.driverTotalFee > 0 && (
                    <div className="flex justify-between text-neutral-400">
                      <span>Driver Coordination Surcharge:</span>
                      <span className="font-bold text-white font-mono">{formatPKR(successReceipt.driverTotalFee)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-400">
                    <span>Refundable Security Deposit (Due at pickup):</span>
                    <span className="font-bold text-white font-mono">{formatPKR(successReceipt.securityDeposit)}</span>
                  </div>

                  <hr className="border-neutral-800" />

                  <div className="flex justify-between text-base font-bold text-white">
                    <span>Grand Total Rent Due:</span>
                    <span className="text-amber-400 font-mono">{formatPKR(successReceipt.totalAmount)}</span>
                  </div>
                </div>

                {/* Verification Notice */}
                <div className="mt-5 p-3.5 bg-neutral-900 border border-neutral-800 rounded-xl flex items-start gap-2 text-[11px] text-neutral-400">
                  <CreditCard className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="font-bold text-white uppercase tracking-wider text-[9px] font-mono">Next Steps:</p>
                    <span className="leading-relaxed">An H&M representative is verifying your booking. We will call or WhatsApp you within 15 minutes at <strong className="text-amber-400">{successReceipt.phone}</strong> to confirm scheduling. Please keep your CNIC and License ready!</span>
                  </div>
                </div>

              </div>

              {/* Action buttons after success */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/923485144199?text=Hello%20H%26M%20Brothers%21%20My%20Receipt%20is%20*${successReceipt.receiptNo}*%20for%20the%20*${successReceipt.carName}*.%20Please%20verify%20my%20reservation%21`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-grow flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.511 1.509 5.4 1.51 5.561 0 10.085-4.526 10.088-10.09.002-2.695-1.047-5.228-2.951-7.136C17.279 1.53 14.76 1.48 12.013 1.48c-5.56 0-10.08 4.524-10.084 10.088-.001 1.884.501 3.73 1.455 5.372l-.988 3.605 3.663-.96zm12.062-7.855c-.328-.164-1.942-.958-2.242-1.069-.301-.11-.52-.164-.738.164-.219.329-.848 1.069-1.039 1.288-.192.219-.383.246-.711.082-.328-.164-1.386-.511-2.64-1.63-1.012-.903-1.694-2.018-1.892-2.347-.197-.329-.021-.507.143-.671.148-.147.328-.383.493-.574.164-.192.219-.329.328-.548.11-.219.055-.411-.027-.575-.082-.164-.738-1.78-1.01-2.438-.266-.643-.535-.556-.738-.556h-.629c-.219 0-.575.082-.876.411-.301.329-1.149 1.123-1.149 2.739 0 1.616 1.177 3.178 1.341 3.397.164.22 2.316 3.537 5.611 4.961.783.339 1.396.541 1.873.693.787.251 1.503.215 2.069.13.63-.095 1.942-.794 2.216-1.56.274-.767.274-1.424.192-1.56-.083-.137-.301-.219-.629-.383z" />
                  </svg>
                  <span>Share receipt on WhatsApp</span>
                </a>
                
                <button
                  onClick={onClose}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all border border-neutral-700"
                >
                  Done & Close
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
