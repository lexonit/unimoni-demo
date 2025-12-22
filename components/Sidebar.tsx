
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Users, 
  FileText, 
  Upload, 
  MapPin, 
  Grid,
  User,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  LayoutDashboard,
  ShieldCheck,
  CreditCard,
  Building,
  HelpCircle,
  X,
  Plus,
  ArrowRight
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { t, isRTL } = useTranslation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  const menuItems = [
    { name: t('nav.home'), icon: LayoutDashboard, path: '/dashboard' },
    { name: t('nav.beneficiary'), icon: Users, path: '/beneficiaries' },
    { name: t('nav.transactions'), icon: FileText, path: '/history' },
    { name: t('nav.uploadDocs'), icon: Upload, path: '/upload-docs' },
    { name: t('nav.locate'), icon: MapPin, path: '/locate' },
    { 
      name: t('nav.moreServices'), 
      icon: Grid, 
      path: '#',
      subItems: [
        { name: 'Foreign Exchange', icon: Building, path: '/forex' },
        { name: 'Bill Payments', icon: CreditCard, path: '/bills' },
        { name: 'KYC Verification', icon: ShieldCheck, path: '/kyc' },
        { name: t('side.helpCenter'), icon: HelpCircle, path: '/help' },
      ]
    },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside 
        className={`
          fixed inset-y-0 ${isRTL ? 'right-0 border-l' : 'left-0 border-r'} z-[70] bg-white border-slate-100 flex flex-col
          transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0 w-[280px]' : (isRTL ? 'translate-x-full lg:translate-x-0 lg:w-28 lg:hover:w-[280px]' : '-translate-x-full lg:translate-x-0 lg:w-28 lg:hover:w-[280px]')}
          group/sidebar
        `}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Only Header */}
          <div className="p-6 flex items-center justify-between lg:hidden border-b border-slate-50">
            <img src="/logo.svg" alt="Unimoni Logo" className="h-8" />
            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
              <X className="h-6 w-6 text-slate-400" />
            </button>
          </div>

          {/* User Profile Summary */}
          <div className="px-6 py-6 flex flex-col items-center justify-center transition-all">
            <div className="relative mb-2">
              <div className="h-14 w-14 lg:h-16 lg:w-16 bg-[#ffca28] rounded-2xl flex items-center justify-center text-blue-900 shadow-md border-2 border-white group-hover/sidebar:scale-105 transition-transform">
                 <User className="h-7 w-7 lg:h-8 lg:w-8" />
              </div>
              <div className={`absolute bottom-0 h-4 w-4 bg-green-500 border-2 border-white rounded-full shadow-sm z-10 translate-y-1/4 ${isRTL ? 'left-0 -translate-x-1/4' : 'right-0 translate-x-1/4'}`}></div>
            </div>
            
            <div className={`text-center transition-all duration-300 mt-2 ${isOpen ? 'opacity-100' : 'opacity-100'}`}>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{t('nav.hi')},</p>
              <p className="text-[12px] font-black text-slate-800 uppercase tracking-tighter">Shaikh</p>
            </div>
          </div>

          <div className="h-px bg-slate-50 mx-4 mb-4"></div>

          {/* Main Navigation */}
          <nav className="flex-1 px-3 space-y-2 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.subItems ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleExpand(item.name)}
                      className={`
                        w-full flex flex-col lg:flex-row items-center py-3 px-3 rounded-xl transition-all relative
                        text-slate-500 hover:bg-slate-50 group/item
                      `}
                    >
                      <item.icon className={`h-6 w-6 shrink-0 transition-all ${expandedItems.includes(item.name) ? 'text-[#0d47a1]' : 'group-hover/item:text-[#0d47a1]'}`} />
                      <span className={`lg:mx-4 text-[11px] lg:text-[13px] font-bold uppercase tracking-tight whitespace-nowrap transition-all duration-300 mt-1 lg:mt-0 ${isOpen ? 'opacity-100' : 'opacity-100 lg:opacity-0 lg:group-hover/sidebar:opacity-100'}`}>
                        {item.name}
                      </span>
                      <div className={`ml-auto hidden lg:block transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 lg:group-hover/sidebar:opacity-100'}`}>
                        {expandedItems.includes(item.name) ? <ChevronDown className="h-4 w-4" /> : (isRTL ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
                      </div>
                    </button>

                    <AnimatePresence>
                      {expandedItems.includes(item.name) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className={`overflow-hidden bg-slate-50/50 rounded-xl mt-1 mb-2 ${isOpen ? 'block' : 'hidden lg:group-hover/sidebar:block'}`}
                        >
                          {item.subItems.map((sub) => (
                            <NavLink
                              key={sub.name}
                              to={sub.path}
                              onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                              className={({ isActive }) => `
                                flex items-center py-3 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-[11px] font-bold uppercase tracking-wider
                                transition-colors relative
                                ${isActive ? 'text-[#0d47a1] bg-blue-50/50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}
                              `}
                            >
                              <sub.icon className={`h-4 w-4 ${isRTL ? 'ml-3' : 'mr-3'} shrink-0`} />
                              {sub.name}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={() => { if (window.innerWidth < 1024) onClose(); }}
                    className={({ isActive }) => `
                      flex flex-col lg:flex-row items-center py-3.5 px-3 rounded-xl transition-all relative group/item overflow-hidden
                      ${isActive ? 'bg-[#0d47a1] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}
                    `}
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon className={`h-6 w-6 shrink-0 transition-all ${isActive ? 'text-white' : 'group-hover/item:text-[#0d47a1]'}`} />
                        <span className={`lg:mx-4 text-[11px] lg:text-[13px] font-bold uppercase tracking-tight whitespace-nowrap transition-all duration-300 mt-1 lg:mt-0 ${isOpen ? 'opacity-100' : 'opacity-100 lg:opacity-0 lg:group-hover/sidebar:opacity-100'}`}>
                          {item.name}
                        </span>
                        
                        {isActive && (
                          <motion.div 
                            layoutId="sidebarActiveBar"
                            className={`absolute top-1/2 -translate-y-1/2 w-1 h-6 bg-amber-400 rounded-full hidden lg:block ${isRTL ? 'left-0 rounded-r-full' : 'right-0 rounded-l-full'}`}
                          />
                        )}
                        
                        {!isOpen && (
                          <div className={`absolute ${isRTL ? 'right-full mr-4' : 'left-full ml-4'} px-3 py-2 bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 pointer-events-none group-hover/item:lg:opacity-100 transition-opacity lg:group-hover/sidebar:hidden whitespace-nowrap z-[100] shadow-xl`}>
                            {item.name}
                          </div>
                        )}
                      </>
                    )}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 mt-auto">
             <div className={`bg-slate-50 rounded-2xl p-4 flex flex-col items-center transition-all duration-300 ${isOpen ? 'block' : 'hidden lg:group-hover/sidebar:block'}`}>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">{t('side.support')}</p>
                <div className="mt-2 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 cursor-pointer hover:bg-blue-200 transition-colors">
                  <HelpCircle className="h-5 w-5" />
                </div>
             </div>
             
             <div className={`flex justify-center py-4 transition-all duration-300 ${isOpen ? 'hidden' : 'lg:block lg:group-hover/sidebar:hidden'}`}>
              <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 border border-slate-100 hover:text-blue-600 hover:border-blue-100 transition-all cursor-pointer">
                <Plus className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </aside>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
        
        @media (min-width: 1024px) {
          .main-content-shift {
            margin-${isRTL ? 'right' : 'left'}: 7rem;
            transition: margin 0.3s ease-in-out;
          }
        }
        
        .font-arabic {
          font-family: 'Inter', sans-serif; /* You might want to add an Arabic font here */
        }
        
        .dir-ltr { direction: ltr; }
      `}</style>
    </>
  );
};

export default Sidebar;
