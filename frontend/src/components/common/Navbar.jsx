import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Activity, Menu, X, User, LogOut, Sparkles } from 'lucide-react';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';
import Button from '../ui/Button';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Symptom Checker', path: '/predict' },
    { name: 'Health Dashboard', path: '/dashboard' },
    { name: 'History Log', path: '/history' },
    { name: 'AI Engine', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const activeClass = (path) =>
    location.pathname === path
      ? 'bg-emerald-100/90 dark:bg-emerald-900/60 text-emerald-950 dark:text-emerald-200 font-bold px-3.5 py-1.5 rounded-xl border border-emerald-200/80 dark:border-emerald-700/50'
      : 'text-emerald-900/80 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-emerald-100 hover:bg-emerald-50/80 dark:hover:bg-emerald-900/40 px-3.5 py-1.5 rounded-xl transition';

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/90 dark:bg-emerald-950/90 backdrop-blur-md border-b border-emerald-100 dark:border-emerald-900/40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative group-hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-[#4ECCA3]/80 shadow-md shadow-[#4ECCA3]/30 bg-white flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Healora Emblem" 
                className="w-[145%] h-[145%] max-w-none object-cover object-top -mt-2" 
              />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#4ECCA3] rounded-full border-2 border-white dark:border-[#042E24] animate-ping" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-2xl font-black tracking-tight text-[#1A6B4F] dark:text-[#FFFFFF] flex items-center gap-1 font-heading">
              Heal<span className="text-[#4ECCA3]">ora</span>
            </span>
            <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#1A6B4F]/80 dark:text-[#4ECCA3]">
              Smarter Health. Better Decisions.
            </span>
          </div>
        </Link>



        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-2 text-sm font-semibold">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={activeClass(link.path)}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-2xl text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition border border-emerald-200/50 dark:border-emerald-800/50"
            title="Toggle Serene Dark Mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-emerald-700" />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-emerald-50 dark:bg-emerald-900/50 border border-emerald-200/60 dark:border-emerald-800/60 hover:bg-emerald-100 transition">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border-2 border-emerald-600" />
                <span className="text-sm font-bold text-emerald-950 dark:text-emerald-100">{user.name.split(' ')[0]}</span>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => { logout(); navigate('/login'); }}>
                <LogOut className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm">Log In</Button>
              </Link>
              <Link to="/predict">
                <Button variant="primary" size="sm" icon={Sparkles}>Scan Symptoms</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button onClick={toggleDarkMode} className="p-2.5 rounded-2xl text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/60">
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2.5 rounded-2xl text-emerald-900 dark:text-emerald-100 bg-emerald-100/60 dark:bg-emerald-900/80">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 space-y-3 bg-white dark:bg-emerald-950 border-b border-emerald-100 dark:border-emerald-900/60 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-2xl text-base font-semibold ${activeClass(link.path)}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-emerald-100 dark:border-emerald-900/60 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/profile" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" fullWidth icon={User}>My Profile</Button>
                </Link>
                <Button variant="danger" fullWidth icon={LogOut} onClick={() => { logout(); setMobileOpen(false); navigate('/login'); }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" fullWidth>Log In</Button>
                </Link>
                <Link to="/predict" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" fullWidth icon={Sparkles}>Scan Symptoms</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

