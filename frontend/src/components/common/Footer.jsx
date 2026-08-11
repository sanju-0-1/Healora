import { Link } from 'react-router-dom';
import { Activity, Heart, Shield, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-emerald-50/70 dark:bg-emerald-950/80 border-t border-emerald-100 dark:border-emerald-900/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-[#4ECCA3]/80 shadow-md shadow-[#4ECCA3]/20 bg-white flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="Healora Emblem" 
                  className="w-[145%] h-[145%] max-w-none object-cover object-top -mt-1.5" 
                />
              </div>
              <div className="text-left">
                <span className="text-2xl font-black text-[#1A6B4F] dark:text-[#FFFFFF] font-heading">Healora</span>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#4ECCA3]">
                  Smarter Health. Better Decisions.
                </p>
              </div>
            </div>


            <p className="text-xs text-emerald-900/80 dark:text-emerald-300 leading-relaxed font-medium">
              Empowering proactive personal wellness with AI-driven symptom analysis and clinical predictive insights inspired by next-generation sci-fi medical intelligence.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-emerald-950 dark:text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs text-emerald-900/80 dark:text-emerald-300 font-medium">
              <li><Link to="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Home Overview</Link></li>
              <li><Link to="/predict" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition flex items-center gap-1"><Sparkles className="w-3 h-3 text-emerald-600" /> Symptom Checker</Link></li>
              <li><Link to="/dashboard" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Health Dashboard</Link></li>
              <li><Link to="/history" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Prediction History</Link></li>
            </ul>
          </div>

          {/* Col 3: Medical Info & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-emerald-950 dark:text-white uppercase tracking-wider">Clinical Standards</h4>
            <ul className="space-y-2.5 text-xs text-emerald-900/80 dark:text-emerald-300 font-medium">
              <li><Link to="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">AI Model & Neural Architecture</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition">Clinical Advisor Network</Link></li>
              <li className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-100/80 dark:bg-emerald-900/60 px-2.5 py-1 rounded-xl w-fit">
                <Shield className="w-3.5 h-3.5 text-emerald-600" /> HIPAA Standard Encrypted
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-emerald-950 dark:text-white uppercase tracking-wider">Direct Support</h4>
            <div className="space-y-2.5 text-xs text-emerald-900/80 dark:text-emerald-300 font-medium">
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-emerald-600" /> care@healora.ai</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-600" /> +1 (800) 432-HEAL</p>
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-600" /> Healora Medical AI Labs, CA</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-emerald-200/60 dark:border-emerald-900/60 flex flex-col sm:flex-row justify-between items-center text-xs text-emerald-800/80 dark:text-emerald-400 gap-4">
          <p>© {new Date().getFullYear()} Healora Medical AI Inc. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-medium">
            Built with <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" /> for next-generation clinical decision support.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

