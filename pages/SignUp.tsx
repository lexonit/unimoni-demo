
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building2, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

interface SignUpProps {
  onLogin: (user: any) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onLogin }) => {
  const [type, setType] = useState<'individual' | 'business'>('individual');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agree: false
  });
  const navigate = useNavigate();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else {
      onLogin({
        id: '1',
        name: formData.name,
        email: formData.email,
        type,
        avatar: ''
      });
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-white">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Create Account</h2>
            <p className="text-slate-500">Join the millions sending money with Unimoni</p>
          </div>

          {/* Stepper */}
          <div className="flex justify-center mb-8 gap-2">
            <div className={`h-1 w-12 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
            <div className={`h-1 w-12 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
          </div>

          <form onSubmit={handleNext} className="space-y-6">
            {step === 1 ? (
              <>
                <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
                  <button 
                    type="button"
                    onClick={() => setType('individual')}
                    className={`flex-1 flex items-center justify-center py-2 text-sm font-semibold rounded-lg transition-all ${type === 'individual' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Individual
                  </button>
                  <button 
                    type="button"
                    onClick={() => setType('business')}
                    className={`flex-1 flex items-center justify-center py-2 text-sm font-semibold rounded-lg transition-all ${type === 'business' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
                  >
                    <Building2 className="h-4 w-4 mr-2" />
                    Business
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    {type === 'individual' ? 'Full Name' : 'Company Name'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder={type === 'individual' ? 'Sandhani Shaikh' : 'Acme Remittance Corp'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                  <ul className="mt-3 space-y-1">
                    <li className="flex items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> At least 8 characters
                    </li>
                    <li className="flex items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                      <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> One special character
                    </li>
                  </ul>
                </div>

                <div className="flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    checked={formData.agree}
                    onChange={(e) => setFormData({...formData, agree: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded mt-1"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-slate-600 leading-tight">
                    I agree to the <Link to="/terms" className="text-blue-600 font-bold hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-blue-600 font-bold hover:underline">Privacy Policy</Link>.
                  </label>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-blue-100 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            >
              {step === 1 ? 'Continue' : 'Create Account'} <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/signin" className="font-bold text-blue-600 hover:text-blue-700">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative w-0 flex-1 bg-blue-900">
        <div className="absolute inset-0 h-full w-full object-cover bg-gradient-to-br from-blue-700 to-indigo-900 flex flex-col items-center justify-center p-20 text-white text-center">
           <div className="max-w-md">
            <div className="mb-10 inline-block p-6 bg-white/10 rounded-[40px] backdrop-blur-md">
               <ShieldCheck className="h-20 w-20 text-white" />
            </div>
            <h3 className="text-4xl font-bold mb-6">Safe, Secure & Fast</h3>
            <div className="space-y-6 text-left">
              {[
                "Regulated by major central banks worldwide",
                "Advanced 256-bit SSL encryption",
                "24/7 fraud monitoring and prevention",
                "Real-time SMS and email notifications"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="bg-blue-500/20 p-1 rounded-full">
                    <CheckCircle className="h-5 w-5 text-blue-300" />
                  </div>
                  <p className="text-blue-100 font-medium">{text}</p>
                </div>
              ))}
            </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
