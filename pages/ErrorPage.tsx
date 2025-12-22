
import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCcw, HelpCircle, AlertCircle } from 'lucide-react';

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4 text-center">
      <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-8 animate-pulse">
        <AlertCircle className="h-12 w-12" />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 mb-4">Oops! Something went wrong</h2>
      <p className="text-slate-500 max-w-md mx-auto mb-10">
        We encountered an unexpected error while processing your request. Our technical team has been notified.
      </p>
      <div className="space-y-4">
        <button 
          onClick={() => window.location.reload()}
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <RefreshCcw className="h-5 w-5" /> Try Again
        </button>
        <Link 
          to="/help" 
          className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all"
        >
          <HelpCircle className="h-5 w-5" /> Contact Support
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
