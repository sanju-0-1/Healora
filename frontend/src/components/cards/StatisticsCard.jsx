import * as Icons from 'lucide-react';

const StatisticsCard = ({ label, value, change, icon: iconName = 'Activity' }) => {
  const IconComponent = Icons[iconName] || Icons.Activity;

  return (
    <div className="p-6 bg-white dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl shadow-sm hover:shadow-emerald-600/10 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 space-y-3 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl group-hover:bg-emerald-500/10 transition" />
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-emerald-800/80 dark:text-emerald-300 uppercase tracking-wider">
          {label}
        </span>
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/70 text-emerald-700 dark:text-emerald-300 rounded-2xl shadow-xs border border-emerald-200/50 dark:border-emerald-800">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline justify-between pt-1">
        <h2 className="text-3xl font-black text-emerald-950 dark:text-white tracking-tight">{value}</h2>
        {change && (
          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-900/70 px-2.5 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800">
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatisticsCard;

