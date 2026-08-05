import { Link } from 'react-router-dom';
import { Stethoscope, Heart, Shield, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-600 text-white rounded-xl">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">Healora</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Empowering proactive personal wellness with AI-driven symptom analysis and clinical predictive insights.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link></li>
              <li><Link to="/predict" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Symptom Checker</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Health Dashboard</Link></li>
              <li><Link to="/history" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Prediction History</Link></li>
            </ul>
          </div>

          {/* Col 3: Medical Info & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Compliance</h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">AI Model Methodology</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Emergency Contacts</Link></li>
              <li className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <Shield className="w-3.5 h-3.5" /> HIPAA Standard Encrypted
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Support</h4>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-500" /> support@healora.ai</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-teal-500" /> +1 (800) 555-HEAL</p>
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-purple-500" /> Medical AI Campus, CA</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Healora Medical AI Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for global healthcare access.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
