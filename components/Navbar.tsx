
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Bell, 
  User as UserIcon, 
  HelpCircle, 
  ChevronDown, 
  Menu, 
  X, 
  LogOut, 
  Settings, 
  Languages, 
  TrendingUp 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';

interface NavbarProps {
  isAuthenticated: boolean;
  user: any;
  onLogout: () => void;
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, user, onLogout, onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, setLang, t, isRTL } = useTranslation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLandingPage = location.pathname === '/';
  const showPublicNav = isLandingPage && !isAuthenticated;

  const rates = [
    { pair: "OMR/INR", value: "218.10", trend: "up" },
    { pair: "OMR/PHP", value: "148.45", trend: "down" },
    { pair: "OMR/AED", value: "9.52", trend: "up" },
    { pair: "OMR/EGP", value: "122.80", trend: "up" },
    { pair: "OMR/BDT", value: "317.25", trend: "down" },
    { pair: "OMR/PKR", value: "721.40", trend: "up" },
  ];

  const publicNavLinks = [
    { name: 'Home', path: '/', active: true },
    { name: 'About Us', path: '/maintenance', dropdown: true },
    { name: 'Services', path: '/maintenance', dropdown: true },
    { name: 'Branches', path: '/maintenance' },
    { name: 'Careers', path: '/maintenance' },
    { name: 'News', path: '/maintenance' },
    { name: 'Blog', path: '/maintenance' },
  ];

  if (showPublicNav) {
    return (
      <nav className="w-full bg-white border-b border-slate-100 h-20 flex items-center sticky top-0 z-[100] px-4 lg:px-12">
        <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1">
            <img src="/logo.svg" alt="Unimoni Logo" className="h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {publicNavLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link 
                  to={link.path}
                  className={`flex items-center gap-1.5 text-sm font-bold tracking-tight transition-colors ${link.active ? 'text-[#00AEEF]' : 'text-slate-800 hover:text-[#00AEEF]'}`}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} className="mt-0.5" />}
                </Link>
                {link.dropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-2xl rounded-xl border border-slate-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2">
                    <Link to="/maintenance" className="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg">Our Story</Link>
                    <Link to="/maintenance" className="block px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg">Team</Link>
                  </div>
                )}
              </div>
            ))}
            
            {/* Language Switch */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="text-sm font-bold text-slate-800 hover:text-[#00AEEF] transition-colors"
            >
              {lang === 'en' ? 'عربي' : 'English'}
            </button>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-4">
            <Link 
              to="/select-type"
              className="hidden sm:block bg-[#1a365d] text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-[#0d47a1] transition-all shadow-lg shadow-blue-900/10"
            >
              Send Money Online
            </Link>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col space-y-4 lg:hidden shadow-xl"
            >
              {publicNavLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold text-slate-800"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/select-type"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#1a365d] text-white py-4 rounded-xl font-bold text-center"
              >
                Send Money Online
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    );
  }

  // Default Authenticated/Internal Navbar
  return (
    <div className="flex flex-col sticky top-0 z-[100]">
      {/* Live Ticker */}
      <div className="bg-[#001f3f] text-white py-1 overflow-hidden h-8 flex items-center border-b border-white/5">
        <div className="flex whitespace-nowrap animate-ticker items-center">
          {[...rates, ...rates, ...rates].map((rate, i) => (
            <div key={i} className="flex items-center mx-6 gap-2">
              <span className="text-[10px] font-black text-[#00AEEF] tracking-tighter">{rate.pair}</span>
              <span className="text-[10px] font-bold text-white/80">{rate.value}</span>
              <TrendingUp size={10} className={rate.trend === 'up' ? 'text-green-400' : 'text-red-400'} />
            </div>
          ))}
        </div>
      </div>

      <nav className={`bg-[#003366] text-white h-16 flex items-center shadow-2xl px-4 lg:px-10 backdrop-blur-md bg-opacity-95 transition-all duration-300 ${isAuthenticated ? (isRTL ? 'lg:pr-32' : 'lg:pl-32') : ''}`}>
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center space-x-6 lg:space-x-12 rtl:space-x-reverse">
            {isAuthenticated && (
              <button 
                onClick={onMenuClick}
                className="lg:hidden p-2 hover:bg-white/10 rounded-xl transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}

            <Link to="/" className="flex items-center gap-1 group">
                <img src="/logo.svg" alt="Unimoni Logo" className="h-10 w-auto" />
            </Link>
          </div>

          <div className="flex items-center space-x-3 lg:space-x-8 rtl:space-x-reverse">
             {/* Language Switcher */}
             <button 
               onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
               className="hidden sm:flex items-center space-x-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all text-[11px] font-black tracking-widest border border-white/10"
             >
               <Languages size={14} />
               <span>{lang === 'en' ? 'العربية' : 'English'}</span>
             </button>

             {isAuthenticated && (
               <div className="relative">
                 <div 
                   className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer group px-3 py-1.5 rounded-2xl hover:bg-white/5 transition-all"
                   onClick={() => setShowProfileMenu(!showProfileMenu)}
                 >
                    <div className="hidden md:block text-right rtl:text-left">
                       <p className="text-[10px] font-black uppercase tracking-widest text-white/60">
                         Welcome,
                       </p>
                       <p className="text-[12px] font-black uppercase tracking-tight text-white group-hover:text-[#00AEEF] transition-colors leading-none">
                         {user?.name?.split(' ')[0] || 'Member'}
                       </p>
                    </div>
                    <div className="h-10 w-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center text-blue-900 border-2 border-white/20 shadow-lg group-hover:rotate-6 transition-all">
                       <UserIcon className="h-5 w-5" />
                    </div>
                 </div>

                 <AnimatePresence>
                   {showProfileMenu && (
                     <>
                       <div className="fixed inset-0 z-10" onClick={() => setShowProfileMenu(false)} />
                       <motion.div
                         initial={{ opacity: 0, y: 10, scale: 0.95 }}
                         animate={{ opacity: 1, y: 0, scale: 1 }}
                         exit={{ opacity: 0, y: 10, scale: 0.95 }}
                         className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-4 w-64 bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 z-20 py-3 text-slate-700 overflow-hidden`}
                       >
                         <div className="px-6 py-4 border-b border-slate-50">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">User Settings</p>
                            <p className="text-sm font-bold text-slate-800 truncate">{user?.email}</p>
                         </div>
                         <div className="py-2">
                           <button onClick={() => { navigate('/profile'); setShowProfileMenu(false); }} className="w-full flex items-center px-6 py-3.5 text-sm font-bold hover:bg-slate-50 transition-colors gap-4">
                             <UserIcon className="h-5 w-5 text-blue-600" /> My Profile
                           </button>
                           <button onClick={() => { navigate('/maintenance'); setShowProfileMenu(false); }} className="w-full flex items-center px-6 py-3.5 text-sm font-bold hover:bg-slate-50 transition-colors gap-4">
                             <Settings className="h-5 w-5 text-blue-600" /> Settings
                           </button>
                           <div className="h-px bg-slate-100 mx-6 my-2"></div>
                           <button onClick={() => { onLogout(); setShowProfileMenu(false); }} className="w-full flex items-center px-6 py-3.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors gap-4">
                             <LogOut className="h-5 w-5" /> Logout Session
                           </button>
                         </div>
                       </motion.div>
                     </>
                   )}
                 </AnimatePresence>
               </div>
             )}
          </div>
        </div>
      </nav>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-ticker {
          display: flex;
          width: fit-content;
          animation: ticker 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Navbar;
