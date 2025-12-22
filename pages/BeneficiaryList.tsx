
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Landmark, 
  Wallet, 
  Banknote, 
  Edit2, 
  Trash2, 
  Send,
  CheckCircle2
} from 'lucide-react';

const BeneficiaryList: React.FC = () => {
  const [beneficiaries, setBeneficiaries] = useState([
    { id: '1', name: 'Maria Santos', type: 'Bank', bank: 'BDO Unibank', acc: '**** 8821', country: 'Philippines', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', name: 'Sandhani Shaikh', type: 'Cash', bank: 'Western Union', acc: 'Pickup Location', country: 'United Kingdom', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', name: 'Fatima Al-Sayed', type: 'Bank', bank: 'Dubai Islamic Bank', acc: '**** 5567', country: 'UAE', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', name: 'Rahul Kumar', type: 'Wallet', bank: 'Paytm Wallet', acc: '+91 98765 43210', country: 'India', avatar: 'https://i.pravatar.cc/150?u=4' },
  ]);

  return (
    <div className="p-4 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Saved Beneficiaries</h1>
          <p className="text-slate-500">Easily send money to your frequent recipients.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
          <Plus className="h-5 w-5 mr-2" /> Add Beneficiary
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 border-dashed flex flex-col items-center justify-center text-center group cursor-pointer hover:border-blue-400 hover:bg-blue-50/20 transition-all min-h-[300px]">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 group-hover:scale-110 transition-all">
            <Plus className="h-8 w-8 text-slate-300 group-hover:text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Add New</h3>
          <p className="text-sm text-slate-400 mt-2">New Bank Account, Wallet or Cash Pickup recipient.</p>
        </div>

        {beneficiaries.map((b) => (
          <div key={b.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden relative group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="relative">
                  <img src={b.avatar} alt={b.name} className="h-16 w-16 rounded-2xl object-cover ring-2 ring-slate-100" />
                  <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-md">
                    {b.type === 'Bank' ? <Landmark className="h-4 w-4 text-blue-600" /> : b.type === 'Cash' ? <Banknote className="h-4 w-4 text-green-600" /> : <Wallet className="h-4 w-4 text-indigo-600" />}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit2 className="h-4 w-4" /></button>
                  <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{b.name}</h3>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1 mb-4">{b.country}</p>
                <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">{b.type} Details</p>
                  <p className="text-sm font-bold text-slate-900">{b.bank}</p>
                  <p className="text-sm text-slate-600">{b.acc}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <button className="w-full py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all group-hover:shadow-lg group-hover:shadow-blue-100">
                <Send className="h-4 w-4 mr-2" /> Send Money Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeneficiaryList;
