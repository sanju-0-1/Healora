import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ label = 'Analyzing clinical symptoms...', size = 'md' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className={`${sizes[size]} border-4 border-blue-200 dark:border-blue-950 border-t-blue-600 rounded-full`}
        />
        <Activity className="absolute w-5 h-5 text-blue-600 animate-pulse" />
      </div>
      {label && (
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
