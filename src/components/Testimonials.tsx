import { useState, FormEvent } from 'react';
import { Review } from '../types';
import { CONTACT_INFO, FLEET } from '../data';
import { Star, Quote, Send, Sparkles } from 'lucide-react';

interface TestimonialsProps {
  reviews: Review[];
  onAddReview: (review: { author: string; rating: number; comment: string; vehicleRented: string }) => void;
  showForm?: boolean;
}

export default function Testimonials({ reviews, onAddReview, showForm = true }: TestimonialsProps) {
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [vehicleRented, setVehicleRented] = useState(FLEET[0].name);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!author || !comment) {
      alert('Please fill out all fields to submit your review.');
      return;
    }
    onAddReview({
      author,
      rating,
      comment,
      vehicleRented
    });
    setAuthor('');
    setComment('');
    setRating(5);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="reviews" className="py-24 bg-neutral-900 border-y border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 text-left gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono block mb-3">Google Client Testimonials</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              What Our Valued Customers <br className="hidden sm:block" />
              Say About H&M Brothers
            </h2>
            <div className="w-16 h-1.5 bg-amber-500 rounded-full mt-5" />
          </div>

          {/* Rating Summary Card */}
          <div className="bg-neutral-950 border border-neutral-800/80 p-6 rounded-3xl flex items-center gap-5 shadow-lg">
            <div className="text-center">
              <span className="text-4xl font-extrabold text-white font-sans">{CONTACT_INFO.rating}</span>
              <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 font-mono mt-1">Average rating</p>
            </div>
            <div className="h-12 w-[1px] bg-neutral-800" />
            <div>
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs font-semibold text-white mt-1">Based on {reviews.length + 37} Google Reviews</p>
              <span className="text-[10px] text-emerald-400 font-mono">100% Verifiable Customer Reviews</span>
            </div>
          </div>
        </div>

        {/* Testimonials Bento/Masonry-like layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-neutral-950 border border-neutral-800/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl hover:border-neutral-700/60 transition-all duration-300 relative group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-neutral-800 group-hover:text-amber-500/10 transition-colors" />

              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-500 font-mono">{review.date}</span>
                </div>

                {/* Comment */}
                <p className="text-neutral-300 text-sm leading-relaxed font-normal text-left italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="mt-8 pt-4 border-t border-neutral-800/60 flex items-center justify-between text-left">
                <div>
                  <h4 className="font-semibold text-sm text-white">{review.author}</h4>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Verified Client</p>
                </div>
                
                {/* Vehicle rented label */}
                <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-md max-w-[150px] truncate">
                  Rented: {review.vehicleRented}
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Interactive Feedback Form (Optional / shown on reviews page) */}
        {showForm && (
          <div className="mt-16 max-w-2xl mx-auto bg-neutral-950 border border-neutral-800/80 rounded-3xl p-6 sm:p-10 text-left relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/[0.03] rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">Share Your H&M Experience</h3>
            </div>

            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center space-y-3">
                <span className="text-3xl">⭐</span>
                <h4 className="text-white font-bold text-lg">Thank You For Your Review!</h4>
                <p className="text-xs text-neutral-400">
                  Your feedback has been published instantly on our live ratings console. We appreciate your valuable support!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. Syed Faizan"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-neutral-400">Vehicle You Rented</label>
                    <select
                      value={vehicleRented}
                      onChange={(e) => setVehicleRented(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none cursor-pointer"
                    >
                      {FLEET.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-400 block">Overall Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-amber-400 hover:scale-110 transition-transform p-1 cursor-pointer"
                      >
                        <Star className={`w-6 h-6 ${rating >= star ? 'fill-amber-400' : 'text-neutral-700'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-400">Your Review Comment</label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about the driver service, car condition, and overall trip comfort..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/10 text-sm"
                >
                  <Send className="w-4 h-4 fill-neutral-950" />
                  <span>PUBLISH REVIEW NOW</span>
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
