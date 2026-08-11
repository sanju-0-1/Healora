import { Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const SymptomCard = ({ name, category, selected = false, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, translateY: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
        selected
          ? 'bg-emerald-100/90 dark:bg-emerald-900/60 border-emerald-500 shadow-md shadow-emerald-500/10 font-bold'
          : 'bg-white dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/50 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-xs'
      }`}
    >
      <div className="flex items-center gap-3">
        {selected && <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />}
        <div>
          <h4 className={`text-sm font-bold ${selected ? 'text-emerald-950 dark:text-emerald-100' : 'text-emerald-950 dark:text-white'}`}>
            {name}
          </h4>
          {category && <p className="text-xs font-semibold text-emerald-800/80 dark:text-emerald-300 mt-0.5">{category}</p>}
        </div>
      </div>

      <div className={`w-6 h-6 rounded-xl flex items-center justify-center border transition-all ${
        selected
          ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
          : 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 text-transparent'
      }`}>
        <Check className="w-4 h-4 stroke-[3]" />
      </div>
    </motion.button>
  );
};

export default SymptomCard;

