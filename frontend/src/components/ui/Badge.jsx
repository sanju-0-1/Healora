const Badge = ({ children, variant = 'info', size = 'sm', className = '' }) => {
  const variants = {
    info: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800',
    success: 'bg-emerald-100 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-100 border-emerald-300 dark:border-emerald-700 font-bold',
    warning: 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-amber-200 dark:border-amber-800',
    danger: 'bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-200 border-rose-200 dark:border-rose-800',
    neutral: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-100 dark:border-emerald-900/60'
  };

  const sizes = {
    sm: 'px-3 py-1 text-xs font-bold',
    md: 'px-3.5 py-1.5 text-sm font-bold'
  };

  return (
    <span className={`inline-flex items-center rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;

