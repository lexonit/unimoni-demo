
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Banknote, 
  Landmark, 
  Wallet, 
  ChevronDown, 
  User as UserIcon,
  ArrowRight,
  CheckCircle2,
  Search,
  Plus,
  TrendingUp,
  History,
  Zap
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const Dashboard: React.FC<{ user: any }> = ({ user }) => {
  const { t, isRTL } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [activeService, setActiveService] = useState<'cash' | 'bank' | 'wallet'>('bank');
  const [sendAmount, setSendAmount] = useState('100.000');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<any>(null);
  const exchangeRate = 218.10;

  const steps = [
    { name: 'Amount', id: 0 },
    { name: 'Recipient', id: 1 },
    { name: 'Details', id: 2 },
    { name: 'Payment', id: 3 },
    { name: 'Review', id: 4 }
  ];

  const beneficiaries = [
    { id: '1', name: 'DORIS DEVAMALAR THAMBYRAJAH', bank: 'State Bank of India', acc: '8100010093', type: 'Bank' },
    { id: '2', name: 'SOWRIRAJAN K', bank: 'ICICI Bank', acc: '9920102003', type: 'Bank' },
    { id: '3', name: 'PETER PARKER', bank: 'Cash Pickup - Muscat', acc: 'PICKUP-772', type: 'Cash' },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Service Selection - Horizontal on Desktop, Grid on Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
               {[
                 { id: 'cash', label: 'Cash Pickup', icon: Banknote },
                 { id: 'bank', label: 'Bank Transfer', icon: Landmark },
                 { id: 'wallet', label: 'E-Wallet', icon: Wallet }
               ].map(s => (
                 <button 
                   key={s.id} 
                   onClick={() => setActiveService(s.id as any)}
                   className={`p-5 rounded-2xl border-2 transition-all flex items-center sm:flex-col sm:justify-center gap-4 ${activeService === s.id ? 'border-[#0d47a1] bg-white shadow-xl' : 'border-slate-100 bg-slate-50 text-slate-400 hover:bg-white hover:border-slate-200'}`}
                 >
                   <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all ${activeService === s.id ? 'bg-blue-50 text-[#0d47a1]' : 'bg-white shadow-sm'}`}>
                      <s.icon size={24} />
                   </div>
                   <span className="text-[11px] font-black uppercase tracking-widest text-center">{s.label}</span>
                 </button>
               ))}
            </div>

            {/* Input Form Card */}
            <div className="bg-white p-6 sm:p-10 lg:p-12 rounded-[2.5rem] border border-slate-100 shadow-2xl space-y-10">
               <div className="space-y-5">
                  <div className="flex justify-between items-center px-1">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">You Send (Indicative)</span>
                     <TrendingUp size={16} className="text-[#0d47a1]" />
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-2 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-[#0d47a1] focus-within:bg-white transition-all">
                     <div className="flex items-center justify-between gap-4 bg-white px-5 py-3.5 rounded-xl shadow-sm border border-slate-200 min-w-[130px]">
                        <div className="flex items-center gap-2">
                          <img src="https://flagcdn.com/w40/om.png" className="w-6 h-4 rounded shadow-xs" alt="Oman" />
                          <span className="font-black text-sm">OMR</span>
                        </div>
                        <ChevronDown size={14} className="text-slate-300" />
                     </div>
                     <input 
                       type="text" 
                       value={sendAmount}
                       onChange={(e) => setSendAmount(e.target.value)}
                       className="flex-1 bg-transparent text-3xl sm:text-5xl font-black outline-none text-[#0d47a1] text-center sm:text-left px-4 min-w-0"
                     />
                  </div>
               </div>

               <div className="flex justify-center -my-8 relative z-10">
                  <div className="bg-[#0d47a1] p-2.5 rounded-full text-white shadow-2xl border-4 border-white">
                    <Zap size={20} className="fill-current" />
                  </div>
               </div>

               <div className="space-y-5">
                  <div className="flex justify-between items-center px-1">
                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recipient Receives</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                     <div className="flex items-center justify-between gap-4 bg-white px-5 py-3.5 rounded-xl shadow-sm border border-slate-200 min-w-[130px]">
                        <div className="flex items-center gap-2">
                          <img src="https://flagcdn.com/w40/in.png" className="w-6 h-4 rounded shadow-xs" alt="India" />
                          <span className="font-black text-sm">INR</span>
                        </div>
                        <ChevronDown size={14} className="text-slate-300" />
                     </div>
                     <div className="flex-1 text-3xl sm:text-5xl font-black text-slate-800 opacity-80 tabular-nums text-center sm:text-left px-4 truncate min-w-0">
                        {(parseFloat(sendAmount || '0') * exchangeRate).toFixed(2)}
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
              <input 
                type="text" 
                placeholder="Search beneficiary by name or account..." 
                className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-[#0d47a1] transition-all font-bold text-sm shadow-sm"
              />
            </div>
            <div className="grid gap-3 sm:gap-4">
              {beneficiaries.map(b => (
                <button 
                  key={b.id}
                  onClick={() => setSelectedBeneficiary(b)}
                  className={`w-full p-5 sm:p-6 rounded-2xl border-2 transition-all flex items-center gap-4 sm:gap-6 ${selectedBeneficiary?.id === b.id ? 'border-[#0d47a1] bg-white shadow-xl' : 'border-slate-50 bg-white hover:border-slate-200'}`}
                >
                  <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-slate-50 flex items-center justify-center text-[#0d47a1] shrink-0 border border-slate-100">
                     <UserIcon size={24} />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                     <h4 className="text-sm sm:text-lg font-black text-slate-800 leading-tight truncate">{b.name}</h4>
                     <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 mt-1 truncate">{b.bank} • {b.acc}</p>
                  </div>
                  {selectedBeneficiary?.id === b.id && (
                    <div className="bg-[#0d47a1] p-1.5 rounded-full text-white">
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <button className="w-full p-6 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-3 text-slate-400 font-black uppercase tracking-widest hover:border-[#0d47a1] hover:text-[#0d47a1] hover:bg-blue-50/30 transition-all text-xs">
              <Plus size={18} /> Add New Beneficiary
            </button>
          </motion.div>
        );

      default:
        return <div className="text-center py-24 text-slate-300 font-black uppercase tracking-[0.2em]">Module Under Development</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header with Responsive Stepper */}
      <header className="bg-white px-4 sm:px-8 lg:px-12 py-8 lg:py-12 border-b border-slate-100 sticky top-16 z-40 shadow-sm">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="text-center lg:text-left">
               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 tracking-tighter mb-1">
                 {currentStep === 0 ? "HOW MUCH?" : 
                  currentStep === 1 ? "SENDING TO?" : "TRANSFER DETAILS"}
               </h1>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Secure Remittance Step {currentStep + 1} of {steps.length}</p>
            </div>
            
            <div className="flex justify-center gap-1.5 sm:gap-3">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className={`h-1.5 w-6 sm:w-16 lg:w-24 rounded-full transition-all duration-700 ${currentStep >= idx ? 'bg-[#0d47a1] shadow-[0_0_10px_rgba(13,71,161,0.3)]' : 'bg-slate-100'}`} />
                  <span className={`hidden sm:block text-[9px] font-black uppercase tracking-widest ${currentStep === idx ? 'text-[#0d47a1]' : 'text-slate-300'}`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
         </div>
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        
        {/* Main Process Area */}
        <div className="lg:col-span-8 space-y-10 order-1">
          <AnimatePresence mode="wait">
            <div key={currentStep}>
              {renderStepContent()}
            </div>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
             <button 
               onClick={prevStep}
               disabled={currentStep === 0}
               className={`w-full sm:w-auto px-10 py-4 sm:py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${currentStep === 0 ? 'invisible opacity-0' : 'bg-white border-2 border-slate-100 text-slate-400 hover:border-slate-200 shadow-sm'}`}
             >
               Go Back
             </button>
             <button 
               onClick={nextStep}
               className="flex-1 w-full bg-[#0d47a1] text-white py-4 sm:py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-[0.98]"
             >
               {currentStep === steps.length - 1 ? 'Execute Transaction' : 'Proceed to Next Step'} <ArrowRight size={18} />
             </button>
          </div>
        </div>

        {/* Sidebar Analytics/Summary Area */}
        <div className="lg:col-span-4 space-y-6 sm:space-y-8 order-2">
           {/* Real-time Summary Card */}
           <div className="bg-[#0d47a1] rounded-[2.5rem] p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-20%] w-[80%] aspect-square bg-white opacity-5 rounded-full group-hover:scale-110 transition-transform duration-1000"></div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-8">Current Calculation</h3>
              
              <div className="flex items-center justify-between mb-10">
                 <div className="flex flex-col items-center gap-2">
                    <img src="https://flagcdn.com/w80/om.png" className="w-10 h-6 rounded shadow-xl" alt="From" />
                    <span className="font-black text-xs">OMR</span>
                 </div>
                 <div className="flex-1 flex flex-col items-center px-4 opacity-30">
                    <div className="h-px w-full bg-white border-b border-dashed"></div>
                    <Zap size={14} className="mt-[-8px] bg-[#0d47a1] px-2" />
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <img src="https://flagcdn.com/w80/in.png" className="w-10 h-6 rounded shadow-xl" alt="To" />
                    <span className="font-black text-xs">INR</span>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-40">
                   <span>Exchange Rate</span>
                   <span className="opacity-100 text-white font-black">{exchangeRate}</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-40">
                   <span>Service Type</span>
                   <span className="opacity-100 text-white font-black uppercase">{activeService}</span>
                 </div>
                 <div className="h-px bg-white/10 my-4" />
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">Total Receivable</span>
                    <span className="font-black text-3xl sm:text-4xl text-[#00AEEF] tracking-tighter">
                      {(parseFloat(sendAmount || '0') * exchangeRate).toLocaleString()} <span className="text-sm font-bold opacity-60 ml-1">INR</span>
                    </span>
                 </div>
              </div>
           </div>

           {/* Quick History Card */}
           <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-xl">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2"><History size={14} /> Quick Resend</h3>
              <div className="space-y-6">
                 {beneficiaries.slice(0, 2).map(b => (
                   <div key={b.id} className="flex items-center gap-4 group cursor-pointer hover:translate-x-1 transition-transform">
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-slate-50 flex items-center justify-center text-[#0d47a1] group-hover:bg-[#0d47a1] group-hover:text-white transition-all border border-slate-100">
                         <UserIcon size={18} />
                      </div>
                      <div className="min-w-0">
                         <p className="text-[11px] sm:text-xs font-black text-slate-800 truncate uppercase tracking-tighter">{b.name}</p>
                         <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Last: 22/10/24</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-10 py-4 text-[10px] font-black uppercase tracking-widest text-[#0d47a1] bg-slate-50 rounded-xl hover:bg-[#0d47a1] hover:text-white transition-all">Full Activity Logs</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
