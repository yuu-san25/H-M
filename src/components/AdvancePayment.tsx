import { useState } from 'react';
import { Landmark, Check, ShieldCheck, Clock, Award, Phone } from 'lucide-react';

export default function AdvancePayment() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  const paymentMethods = [
    {
      id: 'jazzcash',
      name: 'Jazz Cash',
      color: 'from-orange-600/20 to-neutral-900',
      borderColor: 'border-orange-500/30',
      iconColor: 'text-orange-500',
      accountTitle: 'H&M Brothers Rental',
      accountNumber: '0348-5144199',
      badge: 'Immediate Confirmation'
    },
    {
      id: 'easypaisa',
      name: 'easypaisa',
      color: 'from-emerald-600/20 to-neutral-900',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
      accountTitle: 'H&M Brothers Rental',
      accountNumber: '0336-0400024',
      badge: 'Zero Transfer Fees'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      color: 'from-blue-600/20 to-neutral-900',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
      accountTitle: 'H&M Brothers Rental',
      accountNumber: '1234567890123',
      bankName: 'Meezan Bank Ltd',
      badge: 'Instant IMPS/IBFT'
    }
  ];

  const valueProps = [
    {
      icon: <Clock className="w-5 h-5 text-amber-500" />,
      title: 'Easy Booking',
      desc: 'Book your ride in few clicks'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'Safe & Secure',
      desc: 'Your journey is our responsibility'
    },
    {
      icon: <Award className="w-5 h-5 text-amber-500" />,
      title: 'Best Price',
      desc: 'Get the best rates guaranteed'
    },
    {
      icon: <Phone className="w-5 h-5 text-amber-500" />,
      title: '24/7 Support',
      desc: 'We are always here to help'
    }
  ];

  return (
    <section id="advance-payment" className="py-20 bg-neutral-950 border-t border-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.01),transparent_60%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono block">ADVANCE PAYMENT</span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight uppercase">
            Make Advance Payment To Confirm Your Booking
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full mt-4" />
          <p className="text-neutral-400 text-xs sm:text-sm pt-2">
            H&M Brothers secures your priority protocol convoy or luxury vehicle immediately upon receipt of advance booking slip. Copy credentials below to complete transactions seamlessly.
          </p>
        </div>

        {/* Payment Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {paymentMethods.map((pm) => (
            <div 
              key={pm.id}
              className={`bg-gradient-to-br ${pm.color} border ${pm.borderColor} rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between text-left h-64`}
            >
              {/* Badge */}
              <span className="absolute top-4 right-4 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-[9px] font-extrabold text-neutral-400 px-2.5 py-1 rounded-full uppercase font-mono">
                {pm.badge}
              </span>

              {/* Icon & Name */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-neutral-950/80 flex items-center justify-center border border-neutral-800 font-serif text-lg font-black ${pm.iconColor}`}>
                    {pm.id === 'bank' ? <Landmark className="w-5 h-5" /> : '💰'}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white font-sans">{pm.name}</h3>
                    {pm.bankName && <span className="text-[10px] text-blue-400 font-bold block">{pm.bankName}</span>}
                  </div>
                </div>
              </div>

              {/* Acc Details */}
              <div className="space-y-2 border-t border-neutral-900/60 pt-4">
                <div>
                  <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest block font-mono">Account Title</span>
                  <p className="text-sm font-bold text-neutral-200">{pm.accountTitle}</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest block font-mono">Number / Account No</span>
                  <p className="text-lg font-mono font-extrabold text-amber-400 tracking-wide">{pm.accountNumber}</p>
                </div>
              </div>

              {/* Copy CTA */}
              <button
                onClick={() => handleCopy(pm.accountNumber, pm.name)}
                className="w-full bg-neutral-950 hover:bg-neutral-900 text-white border border-neutral-800 rounded-xl py-2 text-xs font-bold transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                {copiedText === pm.name ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <span>Copy Credentials</span>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Corporate Value Props Strip */}
        <div className="border-t border-neutral-900 pt-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((vp) => (
              <div key={vp.title} className="flex flex-col items-center text-center space-y-2.5">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800/80 flex items-center justify-center shadow-lg">
                  {vp.icon}
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-sans text-sm font-black text-white">{vp.title}</h4>
                  <p className="text-[11px] text-neutral-500 font-medium font-sans leading-relaxed">{vp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
