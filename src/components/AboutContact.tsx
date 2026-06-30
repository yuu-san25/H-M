import { useState, FormEvent } from 'react';
import { Phone, MapPin, Clock, Star, Send, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function AboutContact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'Car Rental Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({ name: '', phone: '', subject: 'Car Rental Inquiry', message: '' });
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 bg-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono block mb-3">Reach Our Agency</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Visit Our Saddar Office or <br className="hidden sm:block" />
            Contact H&M Brothers Today
          </h2>
          <div className="w-16 h-1.5 bg-amber-500 rounded-full mt-5" />
        </div>

        {/* Info & Map grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Contact details & Map (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick stats box */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 grid sm:grid-cols-3 gap-6 text-left shadow-lg">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-amber-400">
                  <MapPin className="w-5 h-5 flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">Location</span>
                </div>
                <p className="text-sm font-semibold text-white leading-snug">
                  GPO Chowk, near Ubl Bank, Saddar, Rawalpindi
                </p>
                <span className="text-xs text-neutral-500 block">46000, Punjab, Pakistan</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-amber-400">
                  <Phone className="w-5 h-5 flex-shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">Call 24/7</span>
                </div>
                <p className="text-sm font-bold text-white font-sans text-amber-400">
                  <a href={`tel:${CONTACT_INFO.phone}`} className="hover:underline">
                    {CONTACT_INFO.phone}
                  </a>
                </p>
                <span className="text-xs text-neutral-500 block">Instant bookings, midnight dispatch</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-amber-400">
                  <Clock className="w-5 h-5 flex-shrink-0 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">Working Hours</span>
                </div>
                <p className="text-sm font-semibold text-white">
                  Open 24 Hours
                </p>
                <span className="text-xs text-neutral-500 block">Open Sundays & public holidays</span>
              </div>

            </div>

            {/* Interactive OpenStreetMap Embed */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-4 shadow-xl text-left overflow-hidden relative">
              <div className="flex justify-between items-center mb-4 px-2">
                <div>
                  <h4 className="text-sm font-bold text-white">Saddar Rawalpindi Garage Map</h4>
                  <p className="text-[11px] text-neutral-500">Located near GPO Chowk & UBL Bank Branch</p>
                </div>
                
                <a
                  href="https://maps.google.com/?q=H%26M%20Brothers%20Rental%20And%20tourism%20Rawalpindi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-amber-400 font-bold hover:text-white transition-colors"
                >
                  <span>Google Maps directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Responsive Iframe container */}
              <div className="w-full aspect-[21/10] rounded-2xl overflow-hidden border border-neutral-800/80 bg-neutral-950">
                <iframe
                  title="OpenStreetMap Rawalpindi Saddar Location"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=73.053155%2C33.593644%2C73.064507%2C33.599968&layer=mapnik&marker=33.596806%2C73.058831"
                  className="grayscale invert opacity-80"
                />
              </div>
            </div>

          </div>

          {/* Column 2: Elegant Contact Inquiry Form (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-left relative overflow-hidden">
              {/* Top border light line */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500 to-orange-500" />

              {!submitted ? (
                <>
                  <div className="mb-6">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Send Direct Message</h3>
                    <p className="text-xs text-neutral-400 mt-1 font-medium">Have custom tourism routes or long-term lease questions?</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1.5 font-mono">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Waqas Malik"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-neutral-900 text-white rounded-xl border border-neutral-800 px-4 py-3 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-xs sm:text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1.5 font-mono">
                        Phone / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +92 348 5144199"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-neutral-900 text-white rounded-xl border border-neutral-800 px-4 py-3 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-xs sm:text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1.5 font-mono">
                        Inquiry Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-neutral-900 text-white rounded-xl border border-neutral-800 px-4 py-3.5 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-xs sm:text-sm font-medium appearance-none cursor-pointer"
                      >
                        <option value="Car Rental Inquiry">Daily/Weekly Car Rental</option>
                        <option value="Wedding Event Protocol">Wedding Event Protocol & Decoration</option>
                        <option value="Northern Pakistan Tourism Tour">Northern Areas Guided Tour</option>
                        <option value="Long Term Corporate Lease">Long Term Lease / Corporate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1.5 font-mono">
                        Inquiry Details
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Detail your requirements here (such as dates, luggage capacity, or specific vehicle requests)..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-neutral-900 text-white rounded-xl border border-neutral-800 p-4 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none text-xs sm:text-sm font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      id="submit-about-contact"
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm uppercase tracking-wider"
                    >
                      <Send className="w-4 h-4 fill-neutral-950" />
                      <span>Send Inquiry Message</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-amber-400/10 rounded-full flex items-center justify-center text-amber-400 border border-amber-400/30 mx-auto">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">Message Dispatched!</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal max-w-sm mx-auto">
                    Thank you <strong className="text-white">{formData.name}</strong>. Your inquiry regarding <strong className="text-amber-400">{formData.subject}</strong> has been logged in Saddar, Rawalpindi. We will get back to you at <span className="text-white">{formData.phone}</span> in a few minutes.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-6 bg-neutral-900 hover:bg-neutral-850 text-white px-5 py-2 text-xs rounded-xl border border-neutral-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
