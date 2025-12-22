
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Banknote, 
  Landmark, 
  Wallet, 
  ChevronDown, 
  User as UserIcon,
  Send,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Building2,
  FileText,
  Search,
  Plus
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const Dashboard: React.FC<{ user: any }> = ({ user }) => {
  const { t, isRTL } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [activeService, setActiveService] = useState<'cash' | 'bank' | 'wallet'>('cash');
  const [sendAmount, setSendAmount] = useState('1.000');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<any>(null);
  const [paymentMode, setPaymentMode] = useState('Debit Card');
  const exchangeRate = 218.10;

  const steps = [
    { name: 'Amount', id: 0 },
    { name: 'Recipient', id: 1 },
    { name: 'Select details', id: 2 },
    { name: 'Select payment mode', id: 3 },
    { name: 'Review', id: 4 }
  ];

  const beneficiaries = [
    { id: '1', name: 'DORIS DEVAMALAR THAMBYRAJAH', bank: 'State Bank of India', acc: '8100010093', type: 'Bank' },
    { id: '2', name: 'Shaikh Sandhani', bank: 'ICICI Bank', acc: '9920102003', type: 'Bank' },
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
      case 0: // Amount
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-8 lg:space-y-12"
          >
            <div>
              <p className="text-sm font-bold text-slate-600 mb-6 border-b border-slate-100 pb-2">{t('dash.chooseService')}</p>
              <div className="grid grid-cols-3 gap-3 lg:gap-6">
                {[
                  { id: 'cash', name: t('dash.service.cash'), icon: Banknote },
                  { id: 'bank', name: t('dash.service.bank'), icon: Landmark },
                  { id: 'wallet', name: t('dash.service.wallet'), icon: Wallet }
                ].map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id as any)}
                    className={`relative py-6 px-2 lg:py-8 lg:px-4 rounded-2xl border-2 flex flex-col items-center transition-all min-h-[140px] lg:min-h-0 ${activeService === service.id ? 'border-[#0d47a1] bg-white shadow-xl shadow-blue-100/50' : 'border-slate-50 bg-white hover:border-slate-100'}`}
                  >
                    <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center mb-4 transition-colors ${activeService === service.id ? 'bg-blue-50 text-[#0d47a1]' : 'bg-slate-50 text-slate-300'}`}>
                      <service.icon className="h-6 w-6 lg:h-8 lg:w-8" />
                    </div>
                    <span className={`text-[10px] lg:text-xs font-bold tracking-tight text-center uppercase leading-tight max-w-[60px] lg:max-w-none ${activeService === service.id ? 'text-[#0d47a1]' : 'text-slate-400'}`}>{service.name}</span>
                    {activeService === service.id && <div className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#0d47a1] rounded-full" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <p className="text-sm font-bold text-slate-600 border-b border-slate-100 pb-2">{t('dash.amountLabel')}</p>
              <div className="space-y-4">
                <div className="bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row overflow-hidden group focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                  <div className="flex-1 p-4">
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest block mb-1">↗ {t('dash.youSend')}</span>
                    <input type="text" value={sendAmount} onChange={(e) => setSendAmount(e.target.value)} className="text-xl font-bold text-[#0d47a1] bg-transparent outline-none w-full" />
                  </div>
                  <div className="bg-[#0d47a1] text-white px-6 py-4 flex items-center space-x-3 cursor-pointer sm:min-w-[150px] justify-between hover:bg-blue-800 transition-colors rtl:flex-row-reverse">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse"><img src="https://flagcdn.com/w40/om.png" className="w-8 h-5 rounded-sm shadow-sm" alt="OMR" /><span className="font-bold">OMR</span></div>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row overflow-hidden group">
                  <div className="flex-1 p-4">
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest block mb-1">↙ {t('dash.recipientGets')}</span>
                    <p className="text-xl font-bold text-[#0d47a1]">{(parseFloat(sendAmount || '0') * exchangeRate).toFixed(2)}</p>
                  </div>
                  <div className="bg-[#0d47a1] text-white px-6 py-4 flex items-center space-x-3 cursor-pointer sm:min-w-[150px] justify-between hover:bg-blue-800 transition-colors rtl:flex-row-reverse">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse"><img src="https://flagcdn.com/w40/in.png" className="w-8 h-5 rounded-sm shadow-sm" alt="INR" /><span className="font-bold">INR</span></div>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 1: // Recipient
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <p className="text-sm font-bold text-slate-600">Choose Beneficiary</p>
              <button className="text-[11px] font-bold text-[#0d47a1] flex items-center uppercase tracking-wider hover:underline"><Plus className={`h-3 w-3 ${isRTL ? 'ml-1' : 'mr-1'}`} /> Add New</button>
            </div>
            
            <div className="relative mb-4">
              <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400`} />
              <input type="text" placeholder="Search by name or account number..." className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm`} />
            </div>

            <div className="grid gap-4">
              {beneficiaries.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBeneficiary(b)}
                  className={`flex items-center p-4 rounded-2xl border-2 transition-all text-left rtl:text-right ${selectedBeneficiary?.id === b.id ? 'border-[#0d47a1] bg-blue-50/30 shadow-md' : 'border-slate-50 bg-white hover:border-slate-100'}`}
                >
                  <div className={`h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-blue-900 border border-white shadow-sm flex-shrink-0`}>
                    <UserIcon className="h-6 w-6" />
                  </div>
                  <div className={`${isRTL ? 'mr-4' : 'ml-4'} flex-1`}>
                    <h4 className="text-sm font-bold text-slate-800 leading-tight">{b.name}</h4>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">{b.bank} • {b.acc}</p>
                  </div>
                  {selectedBeneficiary?.id === b.id && <CheckCircle2 className="h-5 w-5 text-[#0d47a1]" />}
                </button>
              ))}
            </div>
          </motion.div>
        );

      default:
        return (
          <div className="text-center py-20 opacity-50">
             Step content localization pending for detailed steps...
          </div>
        );
    }
  };

  return (
    <div className="bg-white min-h-full pb-20">
      {/* Top Progress Stepper */}
      <div className="w-full border-b border-slate-100 py-4 lg:py-6 bg-white overflow-x-hidden sticky top-0 z-30">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="relative flex justify-between items-start">
            <div className="absolute top-[8px] left-0 right-0 h-[2px] bg-slate-200 -z-0 mx-6 lg:mx-10"></div>
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center relative z-10 flex-1 group">
                <div className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${currentStep >= step.id ? 'bg-[#0d47a1] border-[#0d47a1]' : 'bg-white border-slate-300'}`}></div>
                <span className={`text-[9px] lg:text-[11px] font-bold mt-2 uppercase tracking-tight text-center px-1 max-w-[80px] lg:max-w-none transition-colors ${currentStep === step.id ? 'text-[#0d47a1] border-b-2 border-[#0d47a1]' : currentStep > step.id ? 'text-blue-800/60' : 'text-slate-400'} leading-tight`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 bg-white min-h-[500px] flex flex-col">
          <div className="max-w-[700px] mx-auto w-full flex-1">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 text-center mb-8 lg:mb-10">
              {currentStep === 0 ? t('dash.title.amount') : 
               currentStep === 1 ? t('dash.title.recipient') :
               currentStep === 2 ? "Just a few more details..." :
               currentStep === 3 ? "Select how you'll pay" : "Review your transfer"}
            </h2>

            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="max-w-[700px] mx-auto w-full mt-12 flex items-center justify-between gap-4">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <ArrowLeft className={`h-4 w-4 ${isRTL ? 'ml-2 rotate-180' : 'mr-2'}`} /> {t('dash.back')}
            </button>
            <button
              onClick={nextStep}
              className="flex-1 max-w-[300px] flex items-center justify-center bg-[#0d47a1] text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-blue-800 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
            >
              {currentStep === steps.length - 1 ? t('dash.confirm') : t('dash.next')} <ArrowRight className={`h-4 w-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </button>
          </div>
        </div>

        {/* Sidebar Summary Area */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-white">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{t('dash.summary')}</h3>
            </div>
            <div className="p-6">
               <div className="flex items-center justify-between mb-8 px-4 rtl:flex-row-reverse">
                  <div className="flex flex-col items-center">
                     <img src="https://flagcdn.com/w40/om.png" className="w-10 h-6 rounded-sm shadow-sm" alt="OMR" />
                     <span className="font-bold text-slate-800 mt-1">OMR</span>
                  </div>
                  <div className="flex-1 flex justify-center items-center px-4">
                    <div className="h-[2px] w-full bg-[#0d47a1]/20 relative">
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                          <Send className={`h-5 w-5 text-[#0d47a1] ${isRTL ? 'rotate-180' : ''}`} />
                       </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                     <img src="https://flagcdn.com/w40/in.png" className="w-10 h-6 rounded-sm shadow-sm" alt="INR" />
                     <span className="font-bold text-slate-800 mt-1">INR</span>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center"><span className="text-slate-500 text-sm">Service Type</span><span className="text-red-400 text-sm font-bold capitalize">{activeService} Pick up</span></div>
                  <div className="h-px bg-slate-100 border-b border-dashed"></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500 text-sm text-left rtl:text-right">Exchange Rate</span><span className={`text-slate-800 text-sm font-bold text-right rtl:text-left ${isRTL ? 'dir-ltr' : ''}`}>1 INR = 0.00458505 OMR</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500 text-sm">Receive Amount</span><span className="text-slate-800 text-sm font-bold">{(parseFloat(sendAmount || '0') * exchangeRate).toFixed(2)} INR</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500 text-sm">Send Amount</span><span className="text-red-400 text-sm font-bold">{sendAmount} OMR</span></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
