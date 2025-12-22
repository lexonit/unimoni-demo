
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, User as UserIcon, HelpCircle, ChevronDown, Menu, X, LogOut, Settings, Languages } from 'lucide-react';
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
  const { lang, setLang, t, isRTL } = useTranslation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  if (!isAuthenticated) return null;

  return (
    <nav className={`bg-[#0d47a1] text-white h-16 sticky top-0 z-50 flex items-center shadow-lg px-4 lg:px-6 transition-all duration-300 ${isAuthenticated ? (isRTL ? 'lg:pr-28' : 'lg:pl-28') : ''}`}>
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center space-x-4 lg:space-x-12 rtl:space-x-reverse">
          {/* Mobile Menu Button */}
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Unimoni Logo" className="h-8 lg:h-10" />
          </Link>
          
          <div className="hidden xl:flex items-center space-x-8 rtl:space-x-reverse text-[11px] font-medium opacity-80 border-l rtl:border-l-0 rtl:border-r border-white/20 pl-8 rtl:pl-0 rtl:pr-8 h-8">
            <div>
              <p>{t('nav.customerCare')} : <span className={`font-bold text-white ${isRTL ? 'inline-block dir-ltr' : ''}`}>+968-24782242</span></p>
              <p>Email : <span className="font-bold text-white">customercare.oman@unimoni.om</span></p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 lg:space-x-8 rtl:space-x-reverse">
           {/* Language Switcher */}
           <button 
             onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
             className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all text-xs font-bold border border-white/10"
           >
             <Languages size={14} />
             <span>{lang === 'en' ? 'العربية' : 'English'}</span>
           </button>

           <div className="hidden sm:flex items-center space-x-4 rtl:space-x-reverse opacity-70">
              <Link to="/maintenance">
                <HelpCircle className="h-5 w-5 cursor-pointer hover:opacity-100 transition-opacity" />
              </Link>
              <div className="relative">
                <Link to="/maintenance">
                  <Bell className="h-5 w-5 cursor-pointer hover:opacity-100 transition-opacity" />
                  <span className={`absolute -top-1 bg-amber-500 w-2 h-2 rounded-full border border-[#0d47a1] ${isRTL ? '-left-1' : '-right-1'}`}></span>
                </Link>
              </div>
           </div>
           
           <div className="relative">
             <div 
               className="flex items-center space-x-3 rtl:space-x-reverse border-l rtl:border-l-0 rtl:border-r border-white/20 pl-4 rtl:pl-0 rtl:pr-4 lg:pl-6 rtl:lg:pr-6 h-8 cursor-pointer group"
               onClick={() => setShowProfileMenu(!showProfileMenu)}
             >
                <div className="hidden md:block text-right rtl:text-left">
                   <p className="text-[11px] font-bold uppercase tracking-wider text-white group-hover:text-amber-400 transition-colors">
                     {user?.name?.split(' ')[0] || 'Shaikh'}
                   </p>
                </div>
                <div className="h-8 w-8 bg-amber-400 rounded-full flex items-center justify-center text-blue-900 border border-white/40 shadow-sm group-hover:scale-105 transition-transform">
                   <UserIcon className="h-4 w-4" />
                </div>
                <ChevronDown className={`h-3 w-3 opacity-60 transition-transform duration-300 ${showProfileMenu ? 'rotate-180' : ''}`} />
             </div>

             <AnimatePresence>
               {showProfileMenu && (
                 <>
                   <div 
                     className="fixed inset-0 z-10" 
                     onClick={() => setShowProfileMenu(false)}
                   />
                   <motion.div
                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: 10, scale: 0.95 }}
                     className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-4 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 z-20 py-2 text-slate-700 overflow-hidden`}
                   >
                     <div className="px-4 py-3 border-b border-slate-50">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('nav.settings')}</p>
                        <p className="text-sm font-bold text-slate-800 truncate">{user?.email}</p>
                     </div>
                     <button 
                        onClick={() => { navigate('/profile'); setShowProfileMenu(false); }}
                        className="w-full flex items-center px-4 py-3 text-sm hover:bg-slate-50 transition-colors rtl:flex-row-reverse rtl:justify-end"
                     >
                       <UserIcon className={`h-4 w-4 ${isRTL ? 'ml-3' : 'mr-3'} text-blue-600`} /> {t('nav.profile')}
                     </button>
                     <button 
                        onClick={() => { navigate('/maintenance'); setShowProfileMenu(false); }}
                        className="w-full flex items-center px-4 py-3 text-sm hover:bg-slate-50 transition-colors rtl:flex-row-reverse rtl:justify-end"
                     >
                       <Settings className={`h-4 w-4 ${isRTL ? 'ml-3' : 'mr-3'} text-blue-600`} /> {t('nav.settings')}
                     </button>
                     <div className="h-px bg-slate-50 my-1"></div>
                     <button 
                       onClick={() => { onLogout(); setShowProfileMenu(false); }}
                       className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors rtl:flex-row-reverse rtl:justify-end"
                     >
                       <LogOut className={`h-4 w-4 ${isRTL ? 'ml-3' : 'mr-3'}`} /> {t('nav.logout')}
                     </button>
                   </motion.div>
                 </>
               )}
             </AnimatePresence>
           </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
