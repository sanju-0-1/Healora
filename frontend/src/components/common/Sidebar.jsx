import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Stethoscope, History, User, Info, PhoneCall, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Predict Disease', path: '/predict', icon: Stethoscope },
    { name: 'Prediction History', path: '/history', icon: History },
    { name: 'User Profile', path: '/profile', icon: User },
    { name: 'About AI Model', path: '/about', icon: Info },
    { name: 'Support / Contact', path: '/contact', icon: PhoneCall },
  ];

  return (
    <aside className={`sticky top-16 h-[calc(100vh-4rem)] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col justify-between ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Menu
            </span>
          )}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition ${
                  active
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={isCollapsed ? item.name : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={logout}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition`}
          title={isCollapsed ? 'Logout' : ''}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
