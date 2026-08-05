import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  error,
  icon: Icon,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wide uppercase">
          {label}
        </label>
      )}
      <div className="relative rounded-xl shadow-xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-2.5 bg-white dark:bg-slate-900 border text-slate-900 dark:text-white placeholder-slate-400 rounded-xl text-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-800'
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-rose-500 font-medium flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
