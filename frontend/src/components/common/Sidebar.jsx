import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Activity, Stethoscope, History, User, Info, PhoneCall, LogOut, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Symptom Checker', path: '/predict', icon: Activity },
    { name: 'Dr. Healora (AI)', path: '/ai-doctor', icon: Stethoscope },
    ...(user?.role === 'admin' ? [{ name: 'Admin Suite', path: '/admin', icon: ShieldCheck }] : []),
    { name: 'Scan History', path: '/history', icon: History },
    { name: 'Patient Profile', path: '/profile', icon: User },
    { name: 'AI Architecture', path: '/about', icon: Info },
    { name: 'Clinical Support', path: '/contact', icon: PhoneCall },
  ];




  return (
    <aside className={`sticky top-20 h-[calc(100vh-5rem)] bg-white/95 dark:bg-emerald-950/95 border-r border-emerald-100 dark:border-emerald-900/40 transition-all duration-300 flex flex-col justify-between ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800/80 dark:text-emerald-300">
                Healora Workspace
              </span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-xl hover:bg-emerald-100/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 transition border border-emerald-100 dark:border-emerald-800"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                  active
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 border border-emerald-500/20'
                    : 'text-emerald-950/80 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/40 hover:text-emerald-950 dark:hover:text-white'
                }`}
                title={isCollapsed ? item.name : ''}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-emerald-100 dark:border-emerald-900/60">
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer`}
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

