import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center gap-2 text-xs font-semibold text-emerald-800/80 dark:text-emerald-300 mb-6">
      <Link to="/" className="hover:text-emerald-950 dark:hover:text-white flex items-center gap-1.5 transition">
        <Home className="w-3.5 h-3.5 text-emerald-600" />
        <span>Home</span>
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

        return (
          <div key={routeTo} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
            {isLast ? (
              <span className="font-extrabold text-emerald-950 dark:text-white">{formattedName}</span>
            ) : (
              <Link to={routeTo} className="hover:text-emerald-950 dark:hover:text-white transition">
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

