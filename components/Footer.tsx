
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 h-8 w-8 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">u</span>
              </div>
              <img src="/logo.svg" alt="Unimoni Logo" className="h-8" />
            </div>
            <p className="text-sm leading-relaxed">
              Leading global provider of money transfer, foreign exchange and payment solutions. Committed to trust and efficiency.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Bank Transfer</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cash Pickup</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Digital Wallet</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Foreign Exchange</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0" />
              <p>Mutrah High Street, Muscat, Sultanate of Oman</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-5 w-5 text-blue-500 flex-shrink-0" />
              <p>+968 2456 1234</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
              <p>support@unimoni.com</p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium">
          <p>© 2025 SMI. All rights reserved.</p>
          <div className="flex gap-6">
            <img src="https://flagcdn.com/w20/om.png" alt="Oman" className="h-4 w-6 rounded-sm" />
            <span>Regulated by Central Bank of Oman</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
