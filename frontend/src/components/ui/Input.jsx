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
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label className="block text-xs font-black text-[#1A6B4F] dark:text-[#4ECCA3] tracking-wider uppercase">
          {label}
        </label>
      )}
      <div className="relative rounded-2xl shadow-xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1A6B4F] dark:text-[#4ECCA3]">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 bg-[#FFFFFF] dark:bg-[#063D30] border text-[#1A2E2A] dark:text-[#F5FBF7] placeholder-[#1A6B4F]/40 dark:placeholder-[#4ECCA3]/40 rounded-2xl text-xs font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#4ECCA3] focus:border-transparent ${
            error ? 'border-rose-500 focus:ring-rose-500' : 'border-[#D4E8DD] dark:border-[#13523D]'
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-rose-500 font-bold flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

