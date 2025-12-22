
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4 text-center">
      <div className="relative mb-8">
        <h1 className="text-[180px] font-black text-slate-100 leading-none select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-blue-600 h-24 w-24 rounded-3xl rotate-12 flex items-center justify-center text-white shadow-2xl">
            <span className="text-5xl font-bold">?</span>
          </div>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-slate-900 mb-4">Lost in Transit</h2>
      <p className="text-slate-500 max-w-md mx-auto mb-10 text-lg">
        The page you're looking for doesn't exist or has been moved to a different currency.
      </p>
      <div className="flex gap-4">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-8 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
        >
          <ArrowLeft className="h-5 w-5" /> Go Back
        </button>
        <Link 
          to="/" 
          className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Home className="h-5 w-5" /> Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
