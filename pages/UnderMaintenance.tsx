
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Settings, Tool, Hammer, Construction, ArrowLeft, Home, HelpCircle } from 'lucide-react';

const UnderMaintenance: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 text-center bg-white overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-50"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <div className="relative mb-12 flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-4 text-blue-100"
          >
            <Settings size={120} />
          </motion.div>
          
          <div className="bg-[#0d47a1] h-32 w-32 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-blue-200 relative z-20 overflow-hidden">
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Construction size={56} />
            </motion.div>
            <div className="absolute bottom-0 w-full h-1.5 bg-amber-400"></div>
          </div>
        </div>

        <h1 className="text-4xl lg:text-5xl font-black text-slate-800 mb-4 tracking-tight">
          Pardon our <span className="text-[#0d47a1]">Dust!</span>
        </h1>
        
        <div className="max-w-md mx-auto space-y-6">
          <p className="text-slate-500 font-medium text-lg leading-relaxed">
            We're currently polishing this feature to provide you with a world-class experience. It'll be back online shortly.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-slate-100 rounded-2xl font-bold text-slate-700 hover:border-blue-100 hover:bg-blue-50/30 transition-all group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#0d47a1] text-white rounded-2xl font-bold hover:bg-blue-800 transition-all shadow-xl shadow-blue-100"
            >
              <Home size={18} />
              Return Home
            </Link>
          </div>

          <div className="pt-8 flex items-center justify-center gap-6 opacity-40">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
               <HelpCircle size={14} />
               Need Help?
            </div>
            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
               Unimoni Support
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UnderMaintenance;
