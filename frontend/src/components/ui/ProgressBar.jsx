import { motion } from 'framer-motion';

const ProgressBar = ({ value = 0, max = 100, label, color = 'bg-emerald-600', showPercentage = true }) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className="w-full space-y-2">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-bold text-emerald-950 dark:text-emerald-200">
          <span>{label}</span>
          {showPercentage && <span className="font-extrabold">{percentage}%</span>}
        </div>
      )}
      <div className="w-full h-3 bg-emerald-100 dark:bg-emerald-900/60 rounded-full overflow-hidden p-0.5 border border-emerald-200/50 dark:border-emerald-800/50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${color} shadow-xs`}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

