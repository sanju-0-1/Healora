import { ChevronRight, Activity } from 'lucide-react';
import Badge from '../ui/Badge';

const DiseaseCard = ({ disease, onClick }) => {
  const severityVariant = {
    Low: 'success',
    Moderate: 'warning',
    High: 'danger',
    Critical: 'danger'
  };

  return (
    <div
      onClick={onClick}
      className="p-6 bg-white dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl shadow-sm hover:shadow-md hover:border-emerald-400 dark:hover:border-emerald-700 transition duration-300 cursor-pointer space-y-4 group"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/60 rounded-2xl text-emerald-700 dark:text-emerald-300">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-emerald-950 dark:text-white text-base group-hover:text-emerald-600 transition">
              {disease.name}
            </h3>
            <span className="text-xs font-semibold text-emerald-800/80 dark:text-emerald-300">{disease.category}</span>
          </div>
        </div>
        <Badge variant={severityVariant[disease.severity] || 'info'}>
          {disease.severity} Severity
        </Badge>
      </div>

      <p className="text-xs text-slate-600 dark:text-emerald-200/80 line-clamp-2 leading-relaxed font-medium">
        {disease.overview}
      </p>

      <div className="flex justify-between items-center pt-3 border-t border-emerald-100 dark:border-emerald-900/50 text-xs font-bold text-emerald-700 dark:text-emerald-300 group-hover:text-emerald-600">
        <span>Clinical Overview & Symptoms</span>
        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
      </div>
    </div>
  );
};

export default DiseaseCard;

