
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Globe2, Landmark, Wallet, Banknote, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [amount, setAmount] = useState('100');
  const exchangeRate = 15.07999;
  const convertedAmount = (parseFloat(amount || '0') * exchangeRate).toFixed(2);

  const services = [
    {
      title: 'Bank Transfers',
      desc: 'Send money directly to any bank account worldwide with competitive rates.',
      icon: Landmark,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Digital Wallets',
      desc: 'Instant transfers to popular e-wallets including PayPal, GCash, and more.',
      icon: Wallet,
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'Cash Pickup',
      desc: 'Your loved ones can pick up cash from thousands of agent locations globally.',
      icon: Banknote,
      color: 'bg-green-50 text-green-600'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-32">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 -skew-x-12 transform translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6">
                Send money home <span className="text-blue-600">across the globe.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                Experience seamless, secure, and instant international money transfers with Unimoni. Trusted by millions worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-200 text-center">
                  Start Transfer
                </Link>
                <Link to="/signin" className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all text-center">
                  Track Transfer
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2">You Send</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <img src="https://flagcdn.com/w40/om.png" alt="OMR" className="w-6 h-4 rounded-sm" />
                      <span className="ml-2 font-bold text-slate-900">OMR</span>
                    </div>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full pl-24 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-bold text-2xl text-slate-900" 
                    />
                  </div>
                </div>

                <div className="flex justify-center -my-3">
                  <div className="bg-blue-600 p-2 rounded-full text-white shadow-lg z-10">
                    <ArrowRight className="h-5 w-5 transform rotate-90 lg:rotate-0" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-500 mb-2">Recipient Receives</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                      <img src="https://flagcdn.com/w40/ph.png" alt="PHP" className="w-6 h-4 rounded-sm" />
                      <span className="ml-2 font-bold text-slate-900">PHP</span>
                      <ChevronDown className="h-4 w-4 ml-1 text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      readOnly
                      value={convertedAmount}
                      className="block w-full pl-28 pr-4 py-4 bg-slate-50 border-none rounded-2xl font-bold text-2xl text-slate-900" 
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-500 font-medium">
                    Exchange rate: 1 OMR = {exchangeRate} PHP
                  </p>
                </div>

                <Link to="/signup" className="block w-full bg-blue-600 text-white text-center py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-colors">
                  Check Rates & Fees
                </Link>
                <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest">
                  Exchange rates are indicative only and subject to change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our key services</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Choose the method that works best for you and your recipient. We offer multiple ways to move money across borders quickly.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all group">
                <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{service.desc}</p>
                <Link to="/signup" className="text-blue-600 font-bold flex items-center hover:gap-2 transition-all">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-blue-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <Globe2 className="h-[500px] w-[500px] absolute -bottom-40 -left-40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-8 w-8 text-blue-300" />
              </div>
              <h4 className="text-xl font-bold">Secure Transfers</h4>
              <p className="text-blue-100 opacity-80">Bank-level encryption and security protocols for every transaction.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-blue-300" />
              </div>
              <h4 className="text-xl font-bold">Instant Delivery</h4>
              <p className="text-blue-100 opacity-80">Most transfers reach their destination in minutes, 24/7/365.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe2 className="h-8 w-8 text-blue-300" />
              </div>
              <h4 className="text-xl font-bold">200+ Countries</h4>
              <p className="text-blue-100 opacity-80">A global network connecting you to friends and family everywhere.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper
const ChevronDown: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default LandingPage;
