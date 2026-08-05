import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const SymptomCard = ({ name, category, selected = false, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
        selected
          ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-500 shadow-xs'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      }`}
    >
      <div>
        <h4 className={`text-sm font-semibold ${selected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
          {name}
        </h4>
        {category && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{category}</p>}
      </div>

      <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
        selected
          ? 'bg-blue-600 border-blue-600 text-white'
          : 'border-slate-300 dark:border-slate-700 text-transparent'
      }`}>
        <Check className="w-3.5 h-3.5" />
      </div>
    </motion.button>
  );
};

export default SymptomCard;
