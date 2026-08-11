import { Outlet, Link } from 'react-router-dom';
import { Activity, Sun, Moon } from 'lucide-react';
import useTheme from '../hooks/useTheme';

const AuthLayout = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-b from-white via-[#F0FDF4] to-[#E6F4EA] dark:from-[#022c22] dark:via-[#064e3b] dark:to-[#042f2e] transition-colors relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute top-6 right-6">
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-2xl bg-white dark:bg-emerald-950 border border-emerald-100 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 shadow-sm cursor-pointer"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div className="w-full max-w-md space-y-6 z-10">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-[#4ECCA3]/80 shadow-md shadow-[#4ECCA3]/30 bg-white flex items-center justify-center group-hover:scale-105 transition duration-300">
              <img 
                src="/logo.png" 
                alt="Healora Emblem" 
                className="w-[145%] h-[145%] max-w-none object-cover object-top -mt-2" 
              />
            </div>
            <span className="text-3xl font-black text-[#1A6B4F] dark:text-[#FFFFFF] tracking-tight font-heading">Healora</span>
          </Link>


        </div>

        <div className="bg-white dark:bg-emerald-950/80 border border-emerald-100 dark:border-emerald-900/60 rounded-3xl p-8 shadow-xl healora-glow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

