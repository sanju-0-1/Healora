import { ChevronRight } from 'lucide-react';
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
      className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800 transition duration-200 cursor-pointer space-y-3"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{disease.icon || '🩺'}</span>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">{disease.name}</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">{disease.category}</span>
          </div>
        </div>
        <Badge variant={severityVariant[disease.severity] || 'info'}>
          {disease.severity}
        </Badge>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
        {disease.overview}
      </p>

      <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs font-semibold text-blue-600 dark:text-blue-400">
        <span>View Complete Disease Details</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
};

export default DiseaseCard;
