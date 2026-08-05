import * as Icons from 'lucide-react';

const StatisticsCard = ({ label, value, change, icon: iconName = 'Activity' }) => {
  const IconComponent = Icons[iconName] || Icons.Activity;

  return (
    <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        <div className="p-2.5 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline justify-between pt-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h2>
        {change && (
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
            {change}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatisticsCard;
