import { Clock, ArrowRight } from 'lucide-react';

const HealthTipCard = ({ tip }) => {
  return (
    <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs hover:border-teal-300 dark:hover:border-teal-800 transition duration-200 space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-2xl">{tip.icon || '💡'}</span>
        <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-2.5 py-1 rounded-full">
          {tip.category}
        </span>
      </div>

      <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
        {tip.title}
      </h4>

      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
        {tip.content}
      </p>

      <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {tip.readTime}
        </span>
        <span className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 cursor-pointer hover:underline">
          Read Guide <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};

export default HealthTipCard;
