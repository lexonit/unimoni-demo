
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, ShieldCheck, Zap, ArrowLeft, ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';

const SelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { lang, setLang } = useTranslation();

  const handleSelect = (type: 'individual' | 'business') => {
    navigate(`/signin/${type}`);
  };

  return (
    <div className="min-h-screen bg-[#003366] flex flex-col font-sans overflow-x-hidden relative">
      {/* Immersive Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-gradient-to-br from-[#00AEEF] to-transparent blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] aspect-square rounded-full bg-gradient-to-tr from-[#00AEEF] to-transparent blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <header className="relative z-50 px-6 lg:px-20 py-6 lg:py-10 flex justify-between items-center">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/60 font-black text-xs uppercase tracking-widest hover:text-white transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> <span className="hidden sm:inline">Back</span>
        </button>

        {/* <div className="flex items-center gap-1">
           <img src="/logo.svg" alt="Unimoni Logo" className="h-10 w-auto" />
        </div> */}

        <div className="flex items-center space-x-3 sm:space-x-6 text-[10px] sm:text-[11px] font-black text-white/50 tracking-widest">
          <button onClick={() => setLang('en')} className={`${lang === 'en' ? 'text-[#00AEEF]' : 'hover:text-white'}`}>EN</button>
          <span>|</span>
          <button onClick={() => setLang('ar')} className={`${lang === 'ar' ? 'text-[#00AEEF]' : 'hover:text-white'}`}>AR</button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 pb-12 sm:pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="text-center mb-10 lg:mb-24"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 sm:px-6 py-2 rounded-full mb-6 sm:mb-8 text-[#00AEEF] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em]">
            <Zap size={14} className="fill-current" /> High-Fidelity Transfers
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-4 sm:mb-6">
            ELEVATE YOUR <br />
            <span className="text-[#00AEEF]">FINANCIAL WORLD</span>
          </h1>
          <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-sm">Select account category</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-16 max-w-7xl w-full mx-auto">
          {/* Individual Card */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group cursor-pointer h-[400px] sm:h-[500px] lg:h-[650px] rounded-[2rem] sm:rounded-[4rem] bg-white overflow-hidden shadow-2xl flex flex-col p-8 sm:p-12 transition-all duration-500"
            onClick={() => handleSelect('individual')}
          >
            <div className="absolute top-8 left-8 sm:top-12 sm:left-12 z-20">
               <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-[#003366] flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform">
                  <Globe size={24} />
               </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
               <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-[100%] h-full opacity-100 mix-blend-multiply group-hover:scale-110 transition-transform duration-1000"
               >
                  <img 
                    src="https://img.freepik.com/free-vector/digital-wallet-concept-illustration_114360-7561.jpg?w=800" 
                    className="w-full h-full object-contain"
                    alt="Individual"
                  />
               </motion.div>
            </div>

            <div className="relative z-10 space-y-2 sm:space-y-4">
              <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black text-[#003366] tracking-tighter">Individual</h3>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] sm:text-xs">Personal remittances & payments</p>
              <div className="flex items-center gap-2 sm:gap-4 text-[#00AEEF] font-black text-xs sm:text-sm uppercase tracking-widest pt-2 sm:pt-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                Continue <ArrowRight size={16} />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80 pointer-events-none" />
          </motion.div>

          {/* Business Card */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -5 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group cursor-pointer h-[400px] sm:h-[500px] lg:h-[650px] rounded-[2rem] sm:rounded-[4rem] bg-[#00AEEF] overflow-hidden shadow-2xl flex flex-col p-8 sm:p-12 transition-all duration-500"
            onClick={() => handleSelect('business')}
          >
             <div className="absolute top-8 right-8 sm:top-12 sm:right-12 z-20">
               <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-white flex items-center justify-center text-[#003366] shadow-xl group-hover:-rotate-12 transition-transform">
                  <ShieldCheck size={24} />
               </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center relative">
               <motion.div 
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full group-hover:scale-110 transition-transform duration-1000"
               >
                  <img 
                    src="https://img.freepik.com/free-vector/business-transaction-concept-illustration_114360-4015.jpg?w=800" 
                    className="w-full h-full object-contain brightness-110"
                    alt="Business"
                  />
               </motion.div>
            </div>

            <div className="relative z-10 space-y-2 sm:space-y-4 text-white">
              <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tighter">Business</h3>
              <p className="text-white/60 font-bold uppercase tracking-widest text-[9px] sm:text-xs">Corporate & bulk payments</p>
              <div className="flex items-center gap-2 sm:gap-4 text-white font-black text-xs sm:text-sm uppercase tracking-widest pt-2 sm:pt-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                Continue <ArrowRight size={16} />
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="relative z-10 py-8 sm:py-16 px-6 bg-white flex flex-col items-center">
         <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 opacity-40">
            <div className="flex items-center gap-3 sm:gap-4">
              <ShieldCheck className="text-[#003366]" size={20} />
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-[#003366]">Fully Regulated</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <TrendingUp className="text-[#003366]" size={20} />
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-[#003366]">Market Analytics</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Globe className="text-[#003366]" size={20} />
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-[#003366]">150+ Markets</span>
            </div>
         </div>
         <p className="mt-8 sm:mt-12 text-slate-300 font-bold text-[8px] sm:text-[9px] uppercase tracking-widest">© 2024 Unimoni Global.</p>
      </footer>
    </div>
  );
};

export default SelectionPage;
