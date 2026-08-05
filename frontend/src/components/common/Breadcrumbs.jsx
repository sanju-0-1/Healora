import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
      <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

        return (
          <div key={routeTo} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            {isLast ? (
              <span className="font-semibold text-slate-900 dark:text-white">{formattedName}</span>
            ) : (
              <Link to={routeTo} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                {formattedName}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
