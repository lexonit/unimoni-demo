
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  MapPin, 
  Handshake, 
  Briefcase,
  Smile,
  ArrowRight,
  Globe,
  QrCode,
  Zap
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [sendAmount, setSendAmount] = useState('100');
  const [currentSlide, setCurrentSlide] = useState(0);
  const exchangeRate = 9.5238; 

  const slides = [
    {
      id: 1,
      heading: "Travel Smart, Exchange Smarter",
      subheading: "Seamless money transfer • Easy exchange",
      image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=2070&auto=format&fit=crop",
      cta: "Experience Freedom"
    },
    {
      id: 2,
      heading: "Global Banking at Your Fingertips",
      subheading: "Secure transfers to 150+ countries",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
      cta: "Start Transfer"
    }
  ];

  const todayRates = [
    { country: 'UAE', code: 'AED', rate: '9.52', flag: 'https://flagcdn.com/w80/ae.png' },
    { country: 'Australia', code: 'AUD', rate: '3.88', flag: 'https://flagcdn.com/w80/au.png' },
    { country: 'Bangladesh', code: 'BDT', rate: '317.25', flag: 'https://flagcdn.com/w80/bd.png' },
    { country: 'Canada', code: 'CAD', rate: '3.53', flag: 'https://flagcdn.com/w80/ca.png' },
    { country: 'Egypt', code: 'EGP', rate: '122.80', flag: 'https://flagcdn.com/w80/eg.png' },
    { country: 'UK', code: 'GBP', rate: '2.19', flag: 'https://flagcdn.com/w80/gb.png' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <main className="relative">
        
        {/* Hero Section */}
        <div className="relative h-[600px] sm:h-[700px] lg:h-[850px] w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-[#003366]">
                <img 
                  src={slides[currentSlide].image} 
                  className="w-full h-full object-cover opacity-30 lg:opacity-50"
                  alt="Banking Hero"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#003366]/60 via-transparent to-[#003366]" />
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 z-10 pb-48 sm:pb-56 lg:pb-0">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#00AEEF] font-black text-[10px] sm:text-xs lg:text-lg mb-4 tracking-[0.3em] uppercase"
                >
                  {slides[currentSlide].subheading}
                </motion.h3>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-5xl lg:text-8xl font-black text-white leading-tight mb-8 max-w-[90%] sm:max-w-5xl mx-auto tracking-tighter"
                >
                  {slides[currentSlide].heading}
                </motion.h1>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/select-type')}
                  className="bg-white text-[#003366] px-10 sm:px-14 py-4 sm:py-5 rounded-full font-black text-xs sm:text-base uppercase tracking-widest shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                >
                  {slides[currentSlide].cta}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Central Converter - Fully Responsive Positioning */}
          <div className="absolute left-0 right-0 bottom-[-120px] sm:bottom-[-140px] lg:bottom-[-180px] flex justify-center px-4 z-[60]">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-[550px] bg-[#003366] rounded-[2.5rem] sm:rounded-full border-[6px] sm:border-[12px] border-white shadow-2xl p-8 sm:p-14 lg:p-20 text-white flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px]"
            >
              <div className="w-full text-center">
                <div className="w-full flex justify-between items-center mb-8 px-2">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">From</p>
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl border border-white/5">
                      <img src="https://flagcdn.com/w40/om.png" className="h-4 rounded-sm" alt="Oman" />
                      <span className="font-black text-sm sm:text-base">OMR</span>
                    </div>
                  </div>
                  <div className="bg-[#00AEEF] p-2 rounded-full shadow-lg">
                    <Zap size={20} className="text-white fill-current" />
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">To</p>
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl border border-white/5">
                      <span className="font-black text-sm sm:text-base">AED</span>
                      <img src="https://flagcdn.com/w40/ae.png" className="h-4 rounded-sm" alt="UAE" />
                    </div>
                  </div>
                </div>

                <div className="w-full space-y-6 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Enter Amount</label>
                    <input 
                      type="number" 
                      value={sendAmount} 
                      onChange={(e) => setSendAmount(e.target.value)} 
                      className="bg-transparent text-center text-4xl sm:text-5xl font-black outline-none w-full tabular-nums text-white" 
                    />
                    <div className="h-px bg-white/10 my-6" />
                    <div className="text-center">
                      <p className="text-[11px] font-bold text-[#00AEEF] uppercase tracking-[0.3em] mb-2">Indicative Total</p>
                      <p className="text-4xl sm:text-5xl font-black tabular-nums tracking-tight">
                        {(parseFloat(sendAmount || '0') * exchangeRate).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/select-type')}
                  className="bg-[#00AEEF] text-white py-4 sm:py-6 rounded-2xl sm:rounded-full font-black w-full hover:bg-white hover:text-[#003366] transition-all text-xs sm:text-sm uppercase tracking-widest shadow-xl active:scale-95"
                >
                  Send Money Now
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Live Rates - Responsive Grid */}
        <section className="pt-40 sm:pt-48 lg:pt-64 pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-[#003366] mb-4 tracking-tighter">Live Market Rates</h2>
              <div className="w-20 h-1.5 bg-[#00AEEF] mx-auto rounded-full mb-6"></div>
              <p className="text-slate-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.3em]">Institutional-grade pricing updated every 30 seconds</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {todayRates.map((item, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col items-center hover:bg-white hover:shadow-2xl hover:shadow-blue-900/10 transition-all group cursor-default">
                  <div className="w-12 h-8 rounded shadow-sm mb-6 overflow-hidden">
                    <img src={item.flag} className="w-full h-full object-cover" alt={item.country} />
                  </div>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1">1 OMR</p>
                  <p className="text-2xl font-black text-[#003366]">{item.rate}</p>
                  <p className="text-[10px] font-black text-[#00AEEF] uppercase mt-1 tracking-widest">{item.code}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Network Stats */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-20">
              {[
                { label: 'Oman Branches', value: '55+', icon: MapPin },
                { label: 'Market Tenure', value: '28Y', icon: Briefcase },
                { label: 'Global Partners', value: '150+', icon: Handshake },
                { label: 'Active Users', value: '3M+', icon: Smile }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-[#003366]/5 flex items-center justify-center text-[#003366]">
                    <stat.icon size={28} />
                  </div>
                  <h2 className="text-4xl lg:text-6xl font-black text-[#003366] tracking-tighter leading-none">{stat.value}</h2>
                  <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest px-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
