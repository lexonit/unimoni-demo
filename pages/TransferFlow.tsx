
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Banknote, 
  Landmark, 
  Wallet, 
  RefreshCw, 
  ChevronDown, 
  Clock,
  User as UserIcon,
  // Fix: Added missing Send icon import from lucide-react
  Send
} from 'lucide-react';

const TransferFlow: React.FC = () => {
  const [activeService, setActiveService] = useState<'cash' | 'bank' | 'wallet'>('cash');
  const [sendAmount, setSendAmount] = useState('1.000');
  const exchangeRate = 218.10;

  const steps = [
    { name: 'Amount', active: true },
    { name: 'Recipient', active: false },
    { name: 'Select details', active: false },
    { name: 'Select payment mode', active: false },
    { name: 'Review', active: false }
  ];

  return (
    <div className="bg-slate-50 min-h-full p-4 lg:p-8">
      {/* Progress Stepper */}
      <div className="max-w-[1400px] mx-auto mb-10">
        <div className="relative flex justify-between items-center px-12">
          <div className="absolute top-1/2 left-12 right-12 h-[2px] bg-slate-200 -translate-y-1/2 -z-10"></div>
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center relative bg-slate-50 px-2">
              <div className={`h-4 w-4 rounded-full border-2 ${step.active ? 'bg-[#0d47a1] border-[#0d47a1]' : 'bg-white border-slate-300'}`}></div>
              <span className={`text-[11px] font-bold mt-2 uppercase tracking-tight ${step.active ? 'text-[#0d47a1]' : 'text-slate-400'}`}>
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-slate-800 text-center mb-10"
          >
            How would you like to send?
          </motion.h2>

          <div className="space-y-12">
            {/* Service Selection */}
            <div>
              <p className="text-sm font-bold text-slate-600 mb-6 border-b pb-2 border-slate-100">Choose service</p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { id: 'cash', name: 'Cash Pick up', icon: Banknote },
                  { id: 'bank', name: 'Bank Transfer', icon: Landmark },
                  { id: 'wallet', name: 'Wallet Transfer', icon: Wallet }
                ].map((service) => (
                  <motion.button
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveService(service.id as any)}
                    className={`relative p-8 rounded-xl border-2 flex flex-col items-center transition-all ${activeService === service.id ? 'border-[#0d47a1] bg-white ring-1 ring-[#0d47a1]/20' : 'border-slate-100 bg-slate-50 opacity-60'}`}
                  >
                    <div className={`p-4 rounded-xl mb-3 ${activeService === service.id ? 'bg-blue-50 text-[#0d47a1]' : 'bg-white text-slate-400'}`}>
                       <service.icon className="h-8 w-8" />
                    </div>
                    <span className={`text-sm font-bold uppercase tracking-tight ${activeService === service.id ? 'text-[#0d47a1]' : 'text-slate-500'}`}>{service.name}</span>
                    {activeService === service.id && (
                       <motion.div layoutId="serviceIndicator" className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-12 h-[2px] bg-[#0d47a1]" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Amount Section */}
            <div className="space-y-8">
              <p className="text-sm font-bold text-slate-600 border-b pb-2 border-slate-100">How much amount would you transfer?</p>
              
              <div className="space-y-4">
                {/* You Sent */}
                <motion.div 
                  whileFocus={{ scale: 1.01 }}
                  className="bg-white border border-slate-200 rounded-lg flex overflow-hidden shadow-sm"
                >
                  <div className="flex-1 p-4 relative">
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-1">↗ You sent</span>
                    <input 
                      type="text" 
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                      className="text-2xl font-bold text-[#0d47a1] bg-transparent outline-none w-full"
                    />
                  </div>
                  <div className="bg-[#0d47a1] text-white px-6 flex items-center space-x-3 cursor-pointer min-w-[140px]">
                    <img src="https://flagcdn.com/w40/om.png" className="w-8 h-5 rounded-sm" alt="OMR" />
                    <span className="font-bold">OMR</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </motion.div>

                {/* Recipient Gets */}
                <motion.div className="bg-slate-50 border border-slate-200 rounded-lg flex overflow-hidden">
                  <div className="flex-1 p-4 relative">
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest block mb-1">↙ Recipient gets</span>
                    <p className="text-2xl font-bold text-slate-800">
                      {(parseFloat(sendAmount || '0') * exchangeRate).toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-slate-200 text-slate-700 px-6 flex items-center space-x-3 cursor-pointer min-w-[140px]">
                    <img src="https://flagcdn.com/w40/in.png" className="w-8 h-5 rounded-sm" alt="INR" />
                    <span className="font-bold">INR</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Summary Area */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Recent Transaction Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Recent transaction</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-12 w-12 bg-amber-400 rounded-full flex items-center justify-center text-blue-900 border-2 border-slate-50">
                  <UserIcon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-[#0d47a1] leading-tight">DORIS DEVAMALAR THAMBYRAJAH</h4>
                  <p className="text-[10px] text-slate-400 font-bold">8100010093</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-slate-400 font-bold">Date & Time</p>
                  <p className="text-[9px] text-slate-700 font-bold leading-none">07/Oct/2024</p>
                  <p className="text-[9px] text-slate-700 font-bold">14:18:16</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between border-b border-slate-50 pb-2">
                   <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Transaction No</p>
                      <p className="text-xs font-bold text-slate-700">15907102400618</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Delivered By</p>
                   </div>
                </div>

                <div className="flex justify-between items-end">
                   <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Sent amount</p>
                      <p className="text-lg font-bold text-slate-800">26.500 OMR</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Receive amount</p>
                      <p className="text-lg font-bold text-[#0d47a1]">20113.39 LKR</p>
                   </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ backgroundColor: '#0b3d8a' }}
                className="w-full mt-6 bg-[#0d47a1] text-white py-3 rounded-lg text-sm font-bold uppercase tracking-wider shadow-md"
              >
                Repeat Transaction
              </motion.button>
            </div>
          </motion.div>

          {/* Transfer Summary Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Transfer Summary</h3>
            </div>
            <div className="p-6">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                     <img src="https://flagcdn.com/w40/om.png" className="w-8 h-5 rounded-sm" alt="OMR" />
                     <span className="font-bold text-slate-800">OMR</span>
                  </div>
                  <div className="flex-1 flex justify-center opacity-30">
                     <div className="flex space-x-1">
                        {[1,2,3].map(i => <div key={i} className="h-1 w-4 bg-[#0d47a1] rounded-full"></div>)}
                        <Send className="h-4 w-4 text-[#0d47a1] mx-2" />
                        {[1,2,3].map(i => <div key={i} className="h-1 w-4 bg-amber-400 rounded-full"></div>)}
                     </div>
                  </div>
                  <div className="flex items-center space-x-2">
                     <span className="font-bold text-slate-800">INR</span>
                     <img src="https://flagcdn.com/w40/in.png" className="w-8 h-5 rounded-sm" alt="INR" />
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-400 font-medium">Service Type</span>
                     <span className="text-amber-600 font-bold">Cash Pick up</span>
                  </div>
                  <div className="h-px bg-slate-50 border-b border-dashed border-slate-200"></div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-400 font-medium">Exchange Rate</span>
                     <span className="text-slate-800 font-bold">1 INR = 0.00458505 OMR</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-400 font-medium">Receive Amount</span>
                     <span className="text-slate-800 font-bold">218.10 INR</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-400 font-medium">Send Amount</span>
                     <span className="text-red-500 font-bold">1.000 OMR</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-400 font-medium">Transfer Fees</span>
                     <span className="text-slate-800 font-bold">0 OMR</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-400 font-medium">Vat @5%</span>
                     <span className="text-slate-800 font-bold">0.000 OMR</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TransferFlow;
