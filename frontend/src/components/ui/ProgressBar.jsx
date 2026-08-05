import { motion } from 'framer-motion';

const ProgressBar = ({ value = 0, max = 100, label, color = 'bg-blue-600', showPercentage = true }) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className="w-full space-y-1.5">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>{label}</span>
          {showPercentage && <span>{percentage}%</span>}
        </div>
      )}
      <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
