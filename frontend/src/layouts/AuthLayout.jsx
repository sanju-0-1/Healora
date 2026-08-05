import { Outlet, Link } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import useTheme from '../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

const AuthLayout = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-slate-50 dark:bg-slate-950 transition-colors relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-6 right-6">
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 shadow-xs"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div className="w-full max-w-md space-y-6 z-10">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="p-2.5 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30">
              <Stethoscope className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black text-slate-900 dark:text-white">Healora</span>
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
