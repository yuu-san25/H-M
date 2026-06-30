import { useState } from 'react';
import { FAQS } from '../data';
import { ChevronDown, ChevronUp, MessageCircleQuestion } from 'lucide-react';

export default function FAQs() {
  const [openId, setOpenId] = useState<string | null>('faq-3'); // open the 3rd one by default (chauffeur info)

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="py-24 bg-neutral-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full mb-3">
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            <span>Booking Answers</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-400 text-sm mt-3 font-normal max-w-lg mx-auto">
            Everything you need to know about renting high-end vehicles in Saddar, Rawalpindi with H&M Brothers.
          </p>
          <div className="w-12 h-1 bg-amber-500 rounded-full mx-auto mt-5" />
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-neutral-850 transition-colors gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-white pr-2">
                    {faq.question}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-neutral-950 border border-neutral-850 flex items-center justify-center text-amber-400 flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                
                {/* Expandable Panel */}
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-60 border-t border-neutral-850' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 bg-neutral-950/40 text-left text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
