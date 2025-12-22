
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, User, Building2 } from 'lucide-react';

interface SignInProps {
  onLogin: (user: any) => void;
}

const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
  const [type, setType] = useState<'individual' | 'business'>('individual');
  const [showPassword, setShowPassword] = useState(false);
  const [idValue, setIdValue] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin({
        id: '1',
        name: type === 'individual' ? 'Shaikh Sandhani' : 'Acme Corp',
        email: 'user@unimoni.com',
        type,
        avatar: ''
      });
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center p-4 lg:p-8" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url("https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="max-w-6xl w-full bg-white rounded-[2rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-white/50">
        
        {/* Left Section - Blue Info */}
        <div className="lg:w-[45%] bg-[#0d47a1] p-10 lg:p-16 flex flex-col items-center text-center text-white relative">
          <div className="mb-8">
             <img src="/logo.svg" alt="Unimoni Logo" className="h-12 mx-auto mb-1" />
          </div>
          
          <div className="space-y-6 max-w-sm">
            <h2 className="text-xl font-bold tracking-wide">IT'S REALLY SIMPLE</h2>
            <p className="text-blue-100/80 text-sm">Login and choose the service</p>
            
            <div className="space-y-4 text-sm font-medium">
              <div className="flex items-center justify-center">
                <span className="mr-2">→</span> Choose or add your recipient
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2">→</span> Enter the amount
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2">→</span> Select the payment option
              </div>
            </div>

            <p className="text-xs leading-relaxed opacity-90 mt-10">
              Click! Voila, your money is on its way to your recipient. Yes, it's that simple!
            </p>
          </div>

          <div className="mt-auto w-full max-w-xs pt-10">
            <div className="relative">
              <img 
                src="/login.jpg" 
                alt="Illustration" 
                className="w-full h-auto rounded-3xl mix-blend-lighten opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="flex-1 p-10 lg:p-20 flex flex-col">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome to Unimoni!</h2>
            <p className="text-slate-500 text-sm">Your login information is safe with us.</p>
          </div>

          {/* Type Toggle Tabs */}
          <div className="flex mb-8 border-b border-slate-100">
            <button 
              onClick={() => setType('individual')}
              className={`flex-1 py-3 text-sm font-bold border-b-2 transition-all ${type === 'individual' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              Individual
            </button>
            <button 
              onClick={() => setType('business')}
              className={`flex-1 py-3 text-sm font-bold border-b-2 transition-all ${type === 'business' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              Business
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                {type === 'individual' ? 'Enter National ID' : 'Enter Business ID'}
              </label>
              <div className="relative group">
                <input
                  type="text"
                  required
                  value={idValue}
                  onChange={(e) => setIdValue(e.target.value)}
                  placeholder={type === 'individual' ? '109094143' : 'B-1234567'}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none font-medium text-slate-700 placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center pl-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Enter password
                </label>
              </div>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none font-medium text-slate-700 placeholder:text-slate-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="text-right mt-2">
                <Link to="/forgot-password" title="Forgot Password" className="text-xs font-bold text-blue-800 hover:underline">
                  Forgot <span className="text-amber-600">password?</span>
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#0d47a1] text-white rounded-xl font-bold text-lg hover:bg-blue-800 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 mt-4"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-white mr-3" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm font-bold text-[#0d47a1]">
              New here? <Link to="/signup" className="text-blue-800 underline hover:text-blue-900 ml-1">Let's get started</Link>
            </p>
          </div>

          <div className="mt-auto pt-10 text-center italic text-slate-500 text-xs px-6">
            "I can't tell you what a big difference Unimoni has made to our lives because it has streamlined the process so much. The interface is very easy for even those who are not very comfortable on the internet."
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col items-center gap-2">
            <Link to="/contact" className="text-xs font-bold text-blue-800 hover:underline">Contact us</Link>
            <p className="text-[10px] text-slate-400 font-bold tracking-wider">Customer Care: +968 24782242</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
