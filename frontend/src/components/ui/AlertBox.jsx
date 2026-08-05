import { AlertTriangle, Info, CheckCircle2, AlertOctagon } from 'lucide-react';

const AlertBox = ({ type = 'warning', title, message, className = '' }) => {
  const styles = {
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900',
      text: 'text-amber-800 dark:text-amber-300',
      icon: AlertTriangle
    },
    danger: {
      bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900',
      text: 'text-rose-800 dark:text-rose-300',
      icon: AlertOctagon
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900',
      text: 'text-blue-800 dark:text-blue-300',
      icon: Info
    },
    success: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900',
      text: 'text-emerald-800 dark:text-emerald-300',
      icon: CheckCircle2
    }
  };

  const current = styles[type];
  const Icon = current.icon;

  return (
    <div className={`flex gap-3.5 p-4 rounded-xl border ${current.bg} ${className}`}>
      <Icon className={`w-5 h-5 flex-shrink-0 ${current.text}`} />
      <div className="space-y-1">
        {title && <h4 className={`text-sm font-semibold ${current.text}`}>{title}</h4>}
        <p className={`text-xs leading-relaxed ${current.text}`}>{message}</p>
      </div>
    </div>
  );
};

export default AlertBox;
