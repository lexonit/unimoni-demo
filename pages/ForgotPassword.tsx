
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Key, Mail, CheckCircle2, ShieldCheck, Eye, EyeOff } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1200);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const stepTransition = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="min-h-screen bg-sky-100 flex items-center justify-center p-4 lg:p-8" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url("https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full bg-white rounded-[2rem] shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-white/50"
      >
        {/* Left Section - Branding */}
        <div className="lg:w-[45%] bg-[#0d47a1] p-10 lg:p-16 flex flex-col items-center text-center text-white relative">
          <div className="mb-8">
             <Link to="/">
               <img src="/logo.svg" alt="Unimoni Logo" className="h-12 mx-auto mb-1" />
             </Link>
          </div>
          
          <div className="space-y-6 max-w-sm mt-12">
            <h2 className="text-xl font-bold tracking-wide uppercase">Secure Recovery</h2>
            <p className="text-blue-100/80 text-sm leading-relaxed">
              Locked out of your account? We'll help you verify your identity and get back to your global transfers securely.
            </p>
            <div className="pt-10 flex justify-center">
              <div className="bg-white/10 p-6 rounded-full backdrop-blur-sm">
                <ShieldCheck className="h-20 w-20 text-blue-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Steps */}
        <div className="flex-1 p-10 lg:p-20 flex flex-col">
          <div className="mb-10">
            <Link to="/signin" className="flex items-center text-slate-400 hover:text-blue-600 transition-colors text-xs font-bold uppercase tracking-widest group">
              <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" {...stepTransition} className="space-y-6">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">Forgot Password?</h2>
                  <p className="text-slate-500 text-sm">Enter your registered Email or National ID to receive a recovery code.</p>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">
                      National ID / Email
                    </label>
                    <div className="relative group">
                      <Mail className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="text"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. 109094143 or user@unimoni.com"
                        className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-all outline-none font-medium text-slate-700"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#0d47a1] text-white rounded-xl font-bold text-lg hover:bg-blue-800 transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Verification Code"}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" {...stepTransition} className="space-y-6 text-center lg:text-left">
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">Verify Identity</h2>
                  <p className="text-slate-500 text-sm">We've sent a code to <span className="text-slate-900 font-bold">{email}</span>.</p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-8">
                  <div className="flex justify-between max-w-xs mx-auto lg:mx-0">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        className="w-16 h-16 text-center text-2xl font-bold bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white"
                        value={digit}
                        onChange={(e) => {
                          const newOtp = [...otp];
                          newOtp[idx] = e.target.value;
                          setOtp(newOtp);
                          if (e.target.value && e.target.nextSibling) {
                            (e.target.nextSibling as HTMLInputElement).focus();
                          }
                        }}
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#0d47a1] text-white rounded-xl font-bold text-lg hover:bg-blue-800 transition-all disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify Code"}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" {...stepTransition} className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 mb-2">Reset Password</h2>
                  <p className="text-slate-500 text-sm">Create a strong new password for your account.</p>
                </div>

                <form onSubmit={handleResetPassword} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">New Password</label>
                    <div className="relative group">
                      <Key className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#0d47a1] text-white rounded-xl font-bold text-lg disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                </form>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" {...stepTransition} className="text-center space-y-8 py-10">
                <div className="mx-auto bg-green-50 h-24 w-24 rounded-full flex items-center justify-center text-green-500">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800">All Set!</h2>
                <p className="text-slate-500 text-sm">Your password has been updated. You can now log in securely.</p>
                <button
                  onClick={() => navigate('/signin')}
                  className="w-full py-4 bg-[#0d47a1] text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200"
                >
                  Sign In Now
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
