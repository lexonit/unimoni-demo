
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Plus, 
  ChevronDown, 
  FileText, 
  X, 
  CheckCircle2, 
  Info,
  ShieldCheck,
  FileIcon,
  Download
} from 'lucide-react';

const UploadDocuments: React.FC = () => {
  const [docType, setDocType] = useState('IDVIDEO');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setSelectedFiles([]);
      alert('Documents uploaded successfully for verification.');
    }, 2000);
  };

  const uploadedDocs = [
    { id: '1', type: 'National ID', name: 'id_front.jpg', status: 'Verified', date: '12 Oct 2023' },
    { id: '2', type: 'Passport', name: 'passport_scan.pdf', status: 'Pending', date: '24 Oct 2023' },
  ];

  return (
    <div className="p-4 lg:p-10 max-w-[1400px] mx-auto min-h-screen">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Left Section: Document List */}
        <div className="space-y-6">
          <div className="pb-4 border-b border-slate-200">
            <h1 className="text-lg font-bold text-slate-700">Upload documents</h1>
          </div>
          
          <div className="space-y-4">
            {uploadedDocs.length > 0 ? (
              uploadedDocs.map((doc) => (
                <div key={doc.id} className="flex items-center p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mr-4">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">{doc.type}</p>
                    <p className="text-xs text-slate-400 font-medium truncate max-w-[200px]">{doc.name}</p>
                  </div>
                  <div className="text-right mr-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${doc.status === 'Verified' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                      {doc.status}
                    </span>
                    <p className="text-[10px] text-slate-300 font-bold mt-1">{doc.date}</p>
                  </div>
                  <button className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-center opacity-40">
                <FileIcon className="h-16 w-16 mb-4" />
                <p className="font-bold text-slate-400">No documents uploaded yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Upload Form */}
        <div className="space-y-8">
          <div className="pb-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-700">Upload here</h2>
          </div>

          <div className="space-y-6">
            {/* Document Type Dropdown */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-red-400 uppercase tracking-widest pl-1">Document Type</label>
              <div className="relative">
                <select 
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full px-5 py-3.5 bg-white border-2 border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 outline-none appearance-none font-bold text-slate-600 transition-all cursor-pointer"
                >
                  <option value="IDVIDEO">IDVIDEO</option>
                  <option value="National ID">National ID</option>
                  <option value="Passport">Passport</option>
                  <option value="Driving License">Driving License</option>
                  <option value="Business CR">Business CR</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Upload Zone */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative group cursor-pointer"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                multiple 
                accept=".jpg,.jpeg,.png,.pdf"
              />
              <div className="w-full h-56 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 flex flex-col items-center justify-center text-center p-8 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all">
                <div className="w-16 h-16 bg-[#0d47a1] rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform mb-6">
                  <Plus className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-bold text-slate-700">Upload document</h3>
                <p className="text-[11px] font-medium text-slate-400 mt-2 max-w-[220px] leading-relaxed">
                  Upload multiple documents in jpeg, png or pdf format
                </p>
              </div>
            </div>

            {/* Selected Files List */}
            <AnimatePresence>
              {selectedFiles.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-3"
                >
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Files to upload</p>
                  {selectedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center bg-white border border-slate-200 p-3 rounded-xl">
                      <FileIcon className="h-5 w-5 text-blue-500 mr-3" />
                      <span className="text-sm font-medium text-slate-700 flex-1 truncate">{file.name}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                        className="p-1 hover:bg-slate-100 rounded-full text-slate-400"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={handleUpload}
                    disabled={uploading}
                    className="w-full py-4 bg-[#0d47a1] text-white rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg shadow-blue-100 hover:bg-blue-800 transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {uploading ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Complete Upload
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* App Stores & Security */}
            <div className="pt-10 space-y-8">
              <div className="flex flex-wrap gap-4">
                <a href="#" className="transform hover:scale-105 transition-transform">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12" />
                </a>
                <a href="#" className="transform hover:scale-105 transition-transform">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" className="h-12" />
                </a>
              </div>
              
              <div className="flex items-center">
                 <div className="flex items-center px-4 py-2 border border-slate-200 rounded-lg text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                   <div className="h-6 w-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center mr-2">
                     <CheckCircle2 className="h-4 w-4" />
                   </div>
                   VeriSign <span className="text-slate-800 ml-1">Secured</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
