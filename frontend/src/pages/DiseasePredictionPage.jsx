import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Stethoscope, X, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import SearchBox from '../components/ui/SearchBox';
import SymptomCard from '../components/cards/SymptomCard';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import usePrediction from '../hooks/usePrediction';
import { MOCK_SYMPTOMS } from '../services/mockData';
import { POPULAR_SYMPTOMS } from '../utils/constants';

const DiseasePredictionPage = () => {
  const navigate = useNavigate();
  const { selectedSymptoms, addSymptom, removeSymptom, clearSymptoms, runPrediction, isPredicting } = usePrediction();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'General', 'Respiratory', 'Neurological', 'Cardiovascular', 'Gastrointestinal', 'Musculoskeletal'];

  const filteredSymptoms = MOCK_SYMPTOMS.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePredict = async () => {
    if (selectedSymptoms.length === 0) return;
    const result = await runPrediction();
    if (result) {
      navigate('/result');
    }
  };

  return (
    <div className="space-y-8 text-left relative">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isPredicting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 backdrop-blur-md"
          >
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl text-center max-w-sm space-y-4">
              <LoadingSpinner size="lg" label="Processing symptoms with clinical AI..." />
              <p className="text-xs text-slate-500">Cross-referencing global diagnostic databases...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Stethoscope className="w-8 h-8 text-blue-600" />
          Symptom Checker & Disease Predictor
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Select all symptoms you are currently experiencing to evaluate potential medical conditions.
        </p>
      </div>

      {/* Selected Symptoms Tray */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Selected Symptoms ({selectedSymptoms.length})
            </h3>
          </div>
          {selectedSymptoms.length > 0 && (
            <button
              onClick={clearSymptoms}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        {selectedSymptoms.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-2">No symptoms selected yet. Pick symptoms from below.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedSymptoms.map((sym) => (
              <span
                key={sym}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-blue-800"
              >
                {sym}
                <button onClick={() => removeSymptom(sym)} className="hover:text-rose-500">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="pt-2 flex justify-end">
          <Button
            variant="primary"
            size="lg"
            disabled={selectedSymptoms.length === 0}
            onClick={handlePredict}
            icon={Sparkles}
          >
            Predict Diseases Now
          </Button>
        </div>
      </div>

      {/* Popular Symptoms Chips */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Popular Symptoms</span>
        <div className="flex flex-wrap gap-2">
          {POPULAR_SYMPTOMS.map((name) => {
            const isSelected = selectedSymptoms.includes(name);
            return (
              <button
                key={name}
                onClick={() => isSelected ? removeSymptom(name) : addSymptom(name)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                  isSelected
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                }`}
              >
                {isSelected && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="w-full md:w-96">
          <SearchBox
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm('')}
            placeholder="Search 20+ clinical symptoms..."
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Symptom Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSymptoms.map((symptom) => {
          const isSelected = selectedSymptoms.includes(symptom.name);
          return (
            <SymptomCard
              key={symptom.id}
              name={symptom.name}
              category={symptom.category}
              selected={isSelected}
              onClick={() => isSelected ? removeSymptom(symptom.name) : addSymptom(symptom.name)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DiseasePredictionPage;
