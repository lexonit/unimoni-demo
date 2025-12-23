
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  Landmark,
  Wallet,
  Banknote,
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
  RefreshCw
} from 'lucide-react';

const TransactionHistory: React.FC = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('All');
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Updated dummy data with ISO date strings for easier filtering
  const transactions = [
    { id: 'UN88210', name: 'Maria Santos', type: 'Bank Transfer', amount: 'PHP 15,200.00', status: 'Completed', date: '2023-10-24', icon: Landmark, color: 'text-blue-600' },
    { id: 'UN88211', name: 'John Smith', type: 'Cash Pickup', amount: 'USD 500.00', status: 'Pending', date: '2023-10-23', icon: Banknote, color: 'text-green-600' },
    { id: 'UN88212', name: 'PayPal Wallet', type: 'Wallet Transfer', amount: 'AED 2,000.00', status: 'Completed', date: '2023-10-20', icon: Wallet, color: 'text-indigo-600' },
    { id: 'UN88213', name: 'Ahmed Ali', type: 'Bank Transfer', amount: 'EGP 10,000.00', status: 'Failed', date: '2023-10-15', icon: Landmark, color: 'text-red-600' },
    { id: 'UN88214', name: 'Local Groceries', type: 'Wallet Transfer', amount: 'OMR 25.00', status: 'Completed', date: '2023-10-12', icon: Wallet, color: 'text-indigo-600' },
    { id: 'UN88215', name: 'Maria Santos', type: 'Bank Transfer', amount: 'PHP 12,000.00', status: 'Completed', date: '2023-10-10', icon: Landmark, color: 'text-blue-600' },
  ];

  const filteredTransactions = transactions.filter(tx => {
    // Service Type Filter
    if (filterType !== 'All' && tx.type !== filterType) return false;
    
    // Search Filter
    if (search && !tx.name.toLowerCase().includes(search.toLowerCase()) && !tx.id.toLowerCase().includes(search.toLowerCase())) return false;
    
    // Date Range Filter
    const txDate = new Date(tx.date);
    if (startDate && new Date(startDate) > txDate) return false;
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Include the full end day
      if (end < txDate) return false;
    }
    
    return true;
  });

  const resetFilters = () => {
    setFilterType('All');
    setSearch('');
    setStartDate('');
    setEndDate('');
  };

  const handleRepeatTransaction = (tx: any) => {
    // Mocking the repeat functionality by navigating to dashboard
    navigate('/dashboard');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Transaction History</h1>
          <p className="text-slate-500">Track and manage your global remittances.</p>
        </div>
        <div className="flex gap-2">
          {(startDate || endDate || search || filterType !== 'All') && (
            <button 
              onClick={resetFilters}
              className="bg-white text-red-500 border border-red-100 px-4 py-2 rounded-xl text-sm font-bold flex items-center hover:bg-red-50 transition-all"
            >
              <RotateCcw className="h-4 w-4 mr-2" /> Reset Filters
            </button>
          )}
          <button className="bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold flex items-center hover:bg-slate-50 shadow-sm transition-all">
            <Download className="h-4 w-4 mr-2" /> Download Statement
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Filters Section */}
        <div className="p-6 border-b border-slate-100 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Service Type Tabs */}
            <div className="flex gap-2 bg-slate-50 p-1 rounded-2xl">
              {['All', 'Bank Transfer', 'Cash Pickup', 'Wallet Transfer'].map(t => (
                <button 
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${filterType === t ? 'bg-[#0d47a1] text-white shadow-lg shadow-blue-100' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {t === 'All' ? 'All' : t.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Date Range Inputs */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="flex-1 lg:flex-none">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">From</label>
                <div className="relative group">
                  <Calendar className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#0d47a1] transition-colors" />
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full lg:w-40 pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div className="mt-6 text-slate-300 font-bold">—</div>
              <div className="flex-1 lg:flex-none">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">To</label>
                <div className="relative group">
                  <Calendar className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-[#0d47a1] transition-colors" />
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full lg:w-40 pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by recipient, transaction ID or amount..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Transaction Details</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Service Type</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Amount Paid</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Current Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx, i) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${tx.color} shadow-sm border border-slate-100 group-hover:scale-105 transition-transform`}>
                          <tx.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-slate-800 leading-tight mb-1">{tx.name}</p>
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">ID: {tx.id} • {formatDate(tx.date)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="text-[10px] font-black text-slate-600 px-3 py-1.5 bg-slate-100 rounded-lg uppercase tracking-wider">{tx.type}</span>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-[14px] font-bold text-slate-800 mb-0.5">{tx.amount}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Incl. OMR 1.50 fee</p>
                    </td>
                    <td className="px-6 py-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                        tx.status === 'Completed' ? 'bg-green-50 text-green-700' : 
                        tx.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 
                        'bg-red-50 text-red-700'
                      }`}>
                        {tx.status === 'Completed' ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : tx.status === 'Pending' ? (
                          <Clock className="h-3.5 w-3.5" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5" />
                        )}
                        <span className="text-[11px] font-black uppercase tracking-wider">{tx.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleRepeatTransaction(tx)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-[#0d47a1]/5 text-[#0d47a1] rounded-xl text-[11px] font-black uppercase tracking-wider hover:bg-[#0d47a1] hover:text-white transition-all shadow-sm active:scale-95"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                          Repeat
                        </button>
                        <button className="p-2 text-slate-300 hover:text-[#0d47a1] hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                        <Search className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-slate-800 font-bold">No transactions found</p>
                        <p className="text-slate-400 text-sm">Try adjusting your filters or date range.</p>
                      </div>
                      <button 
                        onClick={resetFilters}
                        className="text-[#0d47a1] font-bold text-sm hover:underline"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Showing <span className="text-slate-700">{filteredTransactions.length}</span> of <span className="text-slate-700">{transactions.length}</span> transactions
          </p>
          <div className="flex gap-2">
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm transition-all" disabled>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="w-10 h-10 bg-[#0d47a1] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 transition-all">1</button>
            <button className="w-10 h-10 bg-white border border-slate-100 text-slate-600 hover:bg-slate-50 rounded-xl text-sm font-bold shadow-sm transition-all">2</button>
            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 shadow-sm transition-all">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
