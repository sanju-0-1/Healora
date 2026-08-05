import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { Sun, Moon, Stethoscope, Menu, X, User, LogOut } from 'lucide-react';
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
    { name: 'Predict Disease', path: '/predict' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'History', path: '/history' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const activeClass = (path) =>
    location.pathname === path
      ? 'text-blue-600 dark:text-blue-400 font-semibold'
      : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition';

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-2 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
            <Stethoscope className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Heal<span className="text-blue-600 dark:text-blue-400">ora</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={activeClass(link.path)}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-blue-500" />
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{user.name.split(' ')[0]}</span>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => { logout(); navigate('/login'); }}>
                <LogOut className="w-4 h-4 text-slate-500" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm">Log In</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggleDarkMode} className="p-2 rounded-xl text-slate-600 dark:text-slate-300">
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-xl text-slate-700 dark:text-slate-200">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 space-y-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-xl text-base font-medium ${activeClass(link.path)}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
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
                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" fullWidth>Get Started</Button>
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
