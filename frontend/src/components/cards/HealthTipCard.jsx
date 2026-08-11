import { Clock, ArrowRight, Sparkles } from 'lucide-react';

const HealthTipCard = ({ tip, title, category, content, readTime, icon }) => {
  // Support both passing `tip={tipObject}` or `{...tipObject}`
  const data = tip || { title, category, content, readTime, icon };
  const tipIcon = data.icon || '💡';
  const tipCategory = data.category || 'Wellness';
  const tipTitle = data.title || 'Health Tip';
  const tipContent = data.content || '';
  const tipReadTime = data.readTime || '3 min read';

  return (
    <div className="p-6 bg-white dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl shadow-sm hover:border-emerald-300 dark:hover:border-emerald-700 transition duration-200 space-y-3.5 text-left flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-3xl p-2 bg-emerald-50 dark:bg-emerald-900/60 rounded-2xl border border-emerald-100 dark:border-emerald-800">
            {tipIcon}
          </span>
          <span className="text-xs font-black text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-900/80 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-700">
            {tipCategory}
          </span>
        </div>

        <h4 className="font-black text-emerald-950 dark:text-white text-base leading-snug">
          {tipTitle}
        </h4>

        <p className="text-xs font-medium text-slate-700 dark:text-emerald-100/80 line-clamp-3 leading-relaxed">
          {tipContent}
        </p>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-emerald-100 dark:border-emerald-900/60 text-xs font-semibold text-emerald-800/80 dark:text-emerald-300">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-emerald-600" />
          {tipReadTime}
        </span>
        <span className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 cursor-pointer hover:underline">
          Read Guide <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};

export default HealthTipCard;

