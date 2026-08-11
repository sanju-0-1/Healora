import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon = null,
  fullWidth = false
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary: 'bg-[#F2C94C] hover:bg-[#e5b938] text-[#1A2E2A] focus:ring-[#F2C94C] shadow-lg shadow-[#F2C94C]/30 border border-[#f5d778] font-extrabold hover:shadow-[#F2C94C]/40',
    emerald: 'bg-[#1A6B4F] hover:bg-[#13523D] text-white focus:ring-[#1A6B4F] shadow-lg shadow-[#1A6B4F]/25 border border-[#4ECCA3]/20 hover:shadow-[#1A6B4F]/35',
    secondary: 'bg-[#F5FBF7] hover:bg-[#E8F5E9] text-[#1A6B4F] dark:bg-[#063D30] dark:hover:bg-[#042E24] dark:text-[#4ECCA3] focus:ring-[#4ECCA3] border border-[#D4E8DD] dark:border-[#13523D]',
    outline: 'border-2 border-[#1A6B4F] text-[#1A6B4F] dark:border-[#4ECCA3] dark:text-[#4ECCA3] hover:bg-[#F5FBF7] dark:hover:bg-[#063D30] focus:ring-[#1A6B4F]',
    ghost: 'hover:bg-[#F5FBF7] dark:hover:bg-[#063D30] text-[#1A6B4F] dark:text-[#4ECCA3] focus:ring-[#4ECCA3]',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 shadow-md shadow-rose-500/20'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-2.5 text-sm gap-2',
    lg: 'px-8 py-3.5 text-base gap-2.5 font-black'
  };

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </motion.button>
  );
};

export default Button;


