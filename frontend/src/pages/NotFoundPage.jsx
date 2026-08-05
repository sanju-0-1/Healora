import { Link } from 'react-router-dom';
import { Stethoscope, Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="relative">
        <div className="w-32 h-32 bg-blue-100 dark:bg-blue-950/60 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 shadow-xl">
          <Stethoscope className="w-16 h-16 animate-bounce" />
        </div>
        <span className="absolute -bottom-2 right-0 px-3 py-1 bg-rose-600 text-white font-extrabold text-xs rounded-full">
          404 Error
        </span>
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Oops! Page Not Found</h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          The health page or diagnostic record you are searching for does not exist or has been relocated.
        </p>
      </div>

      <div className="flex gap-4">
        <Link to="/">
          <Button variant="primary" icon={Home}>
            Return to Home
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="outline" icon={ArrowLeft}>
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
