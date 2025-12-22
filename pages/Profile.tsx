
import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, User, Building2, Lock, Save, ArrowRight } from 'lucide-react';

interface ProfileProps {
  user: any;
  onUpdate: (user: any) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+968 9123 4567',
    address: 'Mutrah High Street, Muscat, Oman',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleSave = () => {
    onUpdate({ ...user, ...formData });
    setIsEditing(false);
  };

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-slate-500">Manage your profile information and security preferences.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
            <div className="relative inline-block mb-4">
              <div className="h-24 w-24 rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center text-blue-600 text-3xl font-bold overflow-hidden">
                {user?.avatar ? <img src={user.avatar} alt="Profile" /> : user?.name?.[0]}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors border-2 border-white">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{user?.name}</h3>
            <p className="text-slate-500 text-sm mb-6 capitalize">{user?.type} Account</p>
            <div className="flex gap-2">
              <button className="flex-1 py-2 px-4 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100">
                View Public ID
              </button>
            </div>
          </div>

          <nav className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <User className="h-5 w-5 mr-3" /> My Profile
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'security' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Lock className="h-5 w-5 mr-3" /> Password & Security
            </button>
            <button 
              onClick={() => setActiveTab('business')}
              className={`w-full flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'business' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Building2 className="h-5 w-5 mr-3" /> Business Documents
            </button>
          </nav>
        </div>

        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 flex items-center justify-between border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
                {!isEditing ? (
                  <button onClick={() => setIsEditing(true)} className="text-sm font-bold text-blue-600 hover:underline">Edit Profile</button>
                ) : (
                  <button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 shadow-md shadow-blue-100">
                    <Save className="h-4 w-4" /> Save Changes
                  </button>
                )}
              </div>
              <div className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                    <div className="relative">
                      <User className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-300" />
                      <input 
                        type="text" 
                        readOnly={!isEditing}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none ${isEditing ? 'border-blue-200 bg-blue-50/10 focus:ring-2 focus:ring-blue-500' : 'border-slate-100 bg-slate-50 text-slate-500'}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-300" />
                      <input 
                        type="email" 
                        readOnly={!isEditing}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none ${isEditing ? 'border-blue-200 bg-blue-50/10 focus:ring-2 focus:ring-blue-500' : 'border-slate-100 bg-slate-50 text-slate-500'}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
                    <div className="relative">
                      <Phone className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-300" />
                      <input 
                        type="tel" 
                        readOnly={!isEditing}
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none ${isEditing ? 'border-blue-200 bg-blue-50/10 focus:ring-2 focus:ring-blue-500' : 'border-slate-100 bg-slate-50 text-slate-500'}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Account Status</label>
                    <div className="bg-green-50 text-green-700 px-4 py-3 rounded-xl border border-green-100 text-sm font-bold flex items-center">
                      <ShieldCheck className="h-5 w-5 mr-2" /> Verified Profile
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Residential Address</label>
                  <div className="relative">
                    <MapPin className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-300" />
                    <input 
                      type="text" 
                      readOnly={!isEditing}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all outline-none ${isEditing ? 'border-blue-200 bg-blue-50/10 focus:ring-2 focus:ring-blue-500' : 'border-slate-100 bg-slate-50 text-slate-500'}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">Change Password</h2>
                <p className="text-slate-500 text-sm">Update your password to keep your account secure.</p>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center">
                  Update Password <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper Icon
const ShieldCheck: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export default Profile;
