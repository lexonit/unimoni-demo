
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import TransferFlow from './pages/TransferFlow';
import BeneficiaryList from './pages/BeneficiaryList';
import TransactionHistory from './pages/TransactionHistory';
import Profile from './pages/Profile';
import UploadDocuments from './pages/UploadDocuments';
import UnderMaintenance from './pages/UnderMaintenance';
import NotFound from './pages/NotFound';
import ErrorPage from './pages/ErrorPage';
import { LanguageProvider } from './context/LanguageContext';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="h-full w-full"
  >
    {children}
  </motion.div>
);

const AppRoutes = ({ isAuthenticated, user, handleLogin }: any) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <PageWrapper><SignIn onLogin={handleLogin} /></PageWrapper>} />
        <Route path="/signin" element={isAuthenticated ? <Navigate to="/dashboard" /> : <PageWrapper><SignIn onLogin={handleLogin} /></PageWrapper>} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <PageWrapper><SignUp onLogin={handleLogin} /></PageWrapper>} />
        <Route path="/forgot-password" element={<PageWrapper><ForgotPassword /></PageWrapper>} />
        
        {/* Protected Private Routes */}
        <Route path="/dashboard" element={isAuthenticated ? <PageWrapper><Dashboard user={user} /></PageWrapper> : <Navigate to="/signin" />} />
        <Route path="/transfer" element={isAuthenticated ? <PageWrapper><TransferFlow /></PageWrapper> : <Navigate to="/signin" />} />
        <Route path="/beneficiaries" element={isAuthenticated ? <PageWrapper><BeneficiaryList /></PageWrapper> : <Navigate to="/signin" />} />
        <Route path="/history" element={isAuthenticated ? <PageWrapper><TransactionHistory /></PageWrapper> : <Navigate to="/signin" />} />
        <Route path="/profile" element={isAuthenticated ? <PageWrapper><Profile user={user} onUpdate={() => {}} /></PageWrapper> : <Navigate to="/signin" />} />
        
        {/* Verification and Services */}
        <Route path="/upload-docs" element={isAuthenticated ? <PageWrapper><UploadDocuments /></PageWrapper> : <Navigate to="/signin" />} />
        <Route path="/maintenance" element={<PageWrapper><UnderMaintenance /></PageWrapper>} />
        <Route path="/locate" element={isAuthenticated ? <PageWrapper><div className="p-8 bg-white h-full rounded-3xl m-4 border border-slate-200"><h1 className="text-2xl font-bold">Locate & Find</h1><p className="text-slate-500 mt-2">Find your nearest Unimoni branch or agent location.</p></div></PageWrapper> : <Navigate to="/signin" />} />
        <Route path="/more-services" element={isAuthenticated ? <PageWrapper><div className="p-8 bg-white h-full rounded-3xl m-4 border border-slate-200"><h1 className="text-2xl font-bold">More Services</h1><p className="text-slate-500 mt-2">Explore foreign exchange, bill payments, and more.</p></div></PageWrapper> : <Navigate to="/signin" />} />
        <Route path="/kyc" element={isAuthenticated ? <PageWrapper><div className="p-8 bg-white h-full rounded-3xl m-4 border border-slate-200"><h1 className="text-2xl font-bold">KYC Verification</h1><p className="text-slate-500 mt-2">Securely upload identity documents.</p></div></PageWrapper> : <Navigate to="/signin" />} />
        
        {/* Error Pages */}
        <Route path="/error" element={<PageWrapper><ErrorPage /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('unimoni_user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (e) {
          localStorage.removeItem('unimoni_user');
        }
      }
      setIsAppLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogin = (userData: any) => {
    localStorage.setItem('unimoni_user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('unimoni_user');
    setUser(null);
    setIsAuthenticated(false);
    setIsSidebarOpen(false);
  };

  if (isAppLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 font-sans">
        <div className="bg-[#0d47a1] h-12 w-12 rounded-xl flex items-center justify-center animate-bounce mb-4 shadow-lg shadow-blue-200">
          <span className="text-white font-bold text-2xl">u</span>
        </div>
        <p className="text-[#0d47a1] font-bold tracking-tighter text-xl">unimoni</p>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans bg-slate-50">
          <Navbar 
            isAuthenticated={isAuthenticated} 
            user={user} 
            onLogout={handleLogout} 
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          
          <div className="flex flex-1 overflow-hidden relative">
            {isAuthenticated && (
              <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
              />
            )}
            
            <main className={`flex-1 overflow-y-auto ${!isAuthenticated ? 'w-full' : 'main-content-shift'}`}>
              <AppRoutes 
                isAuthenticated={isAuthenticated} 
                user={user} 
                handleLogin={handleLogin} 
              />
            </main>
          </div>

          {!isAuthenticated && <Footer />}
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default App;
