
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Eye, EyeOff, Building2, User, ArrowLeft, ShieldCheck, CheckCircle2, Zap, Globe, Shield, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SignInProps {
  onLogin: (user: any) => void;
}

const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  
  const userType = (type === 'business' ? 'business' : 'individual') as 'individual' | 'business';
  const isBusiness = userType === 'business';

  const [showPassword, setShowPassword] = useState(false);
  const [idValue, setIdValue] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const businessSlides = [
    {
      title: "EMPOWER BUSINESS",
      description: "Institutional-grade treasury and settlement solutions for modern enterprises.",
      icon: <Building2 className="h-12 w-12" />,
      features: ["Multi-Currency Settlements", "Institutional-Grade Security", "Bulk Payment APIs"]
    },
    {
      title: "GLOBAL TRADING",
      description: "Connect your business to 150+ global markets with real-time liquidity.",
      icon: <Globe className="h-12 w-12" />,
      features: ["Instant FX Conversion", "Trade Finance Support", "Dedicated RM Support"]
    },
    {
      title: "CORPORATE SECURITY",
      description: "Advanced multi-factor authentication and fraud prevention for large-scale operations.",
      icon: <Shield className="h-12 w-12" />,
      features: ["Role-based Access", "Audit Logs", "Encryption Standards"]
    }
  ];

  const individualSlides = [
    {
      title: "PERSONAL FREEDOM",
      description: "Secure, lightning-fast remittances to your loved ones anywhere in the world.",
      icon: <User className="h-12 w-12" />,
      features: ["Worldwide Remittances", "24/7 Mobile Access", "Real-Market Rates"]
    },
    {
      title: "TRAVEL READY",
      description: "The smartest way to carry and exchange foreign currency for your next trip.",
      icon: <CreditCard className="h-12 w-12" />,
      features: ["Prepaid Travel Cards", "Online Forex Booking", "Best Exchange Rates"]
    }
  ];

  const activeSlides = isBusiness ? businessSlides : individualSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % activeSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin({
        id: Math.random().toString(36).substr(2, 9),
        name: isBusiness ? 'Acme Corp' : 'Premium Member',
        email: isBusiness ? 'business@unimoni.global' : 'member@unimoni.global',
        type: userType,
        avatar: ''
      });
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#003366] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[#00AEEF] blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-[#00AEEF] blur-[150px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-7xl w-full bg-white rounded-3xl sm:rounded-[4rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden relative z-10 min-h-[700px] lg:min-h-[850px]"
      >
        {/* Left Branding Panel with Carousel */}
        <div className={`hidden lg:flex lg:w-[45%] ${isBusiness ? 'bg-[#0d47a1]' : 'bg-[#003366]'} p-12 lg:p-20 flex-col text-white transition-colors duration-500 relative overflow-hidden`}>
          <div className="mb-16 relative z-10">
             <Link to="/" className="flex items-center gap-1 text-4xl font-black italic tracking-tighter">
                <img src="/logo.svg" alt="Unimoni Logo" className="h-10 w-auto" />
             </Link>
          </div>
          
          <div className="flex-1 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="space-y-12"
              >
                <div className="space-y-6">
                  <div className="h-20 w-20 rounded-3xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10 shadow-xl">
                    {activeSlides[activeSlide].icon}
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tighter uppercase max-w-sm">
                      {activeSlides[activeSlide].title}
                    </h2>
                    <p className="text-blue-100/60 font-medium text-lg max-w-xs leading-relaxed">
                      {activeSlides[activeSlide].description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {activeSlides[activeSlide].features.map((feature, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-4 text-sm font-bold text-blue-100/90"
                    >
                       <div className="p-1 rounded-full bg-[#00AEEF]/20">
                         <CheckCircle2 size={18} className="text-[#00AEEF]" />
                       </div>
                       {feature}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-between relative z-10">
             <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/30">Protocol</span>
                <span className="text-xs font-black">ISO 27001 • 256-BIT SECURED</span>
             </div>
             <div className="flex gap-2">
               {activeSlides.map((_, i) => (
                 <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${activeSlide === i ? 'w-8 bg-[#00AEEF]' : 'w-2 bg-white/20'}`} />
               ))}
             </div>
          </div>

          {/* Abstract Circle Decor */}
          <div className="absolute top-[-20%] left-[-20%] w-[80%] aspect-square bg-white/5 rounded-full pointer-events-none" />
        </div>

        {/* Right Auth Panel */}
        <div className="flex-1 p-8 sm:p-12 lg:p-24 flex flex-col bg-slate-50/50">
          <div className="mb-10 sm:mb-16 flex justify-between items-start">
            <div className="space-y-1">
              <div className="lg:hidden flex items-center gap-1 text-xl font-black italic tracking-tighter mb-4">
                <img src="/logo.svg" alt="Unimoni Logo" className="h-10 w-auto" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tighter uppercase">Sign In</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] sm:text-[10px]">Verification required</p>
            </div>
            <Link to="/select-type" className="p-2 sm:p-3 bg-white rounded-xl sm:rounded-2xl shadow-sm text-slate-400 hover:text-[#003366] transition-all border border-slate-100 group">
               <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-10">
            <div className="space-y-3 sm:space-y-4">
               <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">National ID</label>
               <div className="relative group">
                  <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#0d47a1] transition-colors">
                     {isBusiness ? <Building2 size={20} /> : <User size={20} />}
                  </div>
                  <input 
                    type="text" 
                    required 
                    value={idValue}
                    onChange={(e) => setIdValue(e.target.value)}
                    placeholder={isBusiness ? "Enter CR Number" : "Enter National ID"}
                    className="w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-4 sm:py-6 bg-white border-2 border-slate-100 rounded-2xl sm:rounded-[2rem] outline-none focus:border-[#0d47a1] transition-all font-bold text-slate-800 text-sm sm:text-base shadow-sm focus:shadow-md"
                  />
               </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
               <div className="flex justify-between items-center ml-1">
                  <label className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                  <Link to="/forgot-password" size={10} className="text-[9px] sm:text-[10px] font-black text-[#0d47a1] hover:underline uppercase tracking-widest">Forgot?</Link>
               </div>
               <div className="relative group">
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full px-4 sm:px-6 py-4 sm:py-6 bg-white border-2 border-slate-100 rounded-2xl sm:rounded-[2rem] outline-none focus:border-[#0d47a1] transition-all font-bold text-slate-800 text-sm sm:text-base shadow-sm focus:shadow-md"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#0d47a1] transition-colors">
                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
               </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-4 sm:py-6 rounded-2xl sm:rounded-[2rem] font-black text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-white transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.15)] active:scale-95 ${isBusiness ? 'bg-[#0d47a1]' : 'bg-[#003366]'}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                     <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                     Authenticating...
                  </div>
                ) : `Sign In as ${isBusiness ? 'Business' : 'Individual'}`}
              </button>
            </div>
          </form>

          <div className="mt-auto pt-12 sm:pt-20 text-center space-y-4 sm:space-y-6">
             <div className="flex items-center justify-center gap-4">
                <div className="h-px w-8 bg-slate-100" />
                <p className="text-slate-400 font-bold text-[9px] sm:text-[10px] uppercase tracking-widest">Global Account Service</p>
                <div className="h-px w-8 bg-slate-100" />
             </div>
             <Link to="/signup" className="inline-block px-10 sm:px-14 py-4 sm:py-5 bg-white border-2 border-slate-100 rounded-2xl sm:rounded-[1.5rem] text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#0d47a1] hover:bg-[#0d47a1] hover:text-white transition-all shadow-sm hover:shadow-xl">Open New Account</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
