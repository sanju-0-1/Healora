import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, X, Sparkles, Filter, CheckCircle2, ShieldCheck, History, UserCheck, FileText, Lock, LogIn, UserPlus } from 'lucide-react';
import SearchBox from '../components/ui/SearchBox';
import SymptomCard from '../components/cards/SymptomCard';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import usePrediction from '../hooks/usePrediction';
import useAuth from '../hooks/useAuth';
import { MOCK_SYMPTOMS } from '../services/mockData';
import { POPULAR_SYMPTOMS } from '../utils/constants';

const DiseasePredictionPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { selectedSymptoms, addSymptom, removeSymptom, clearSymptoms, runPrediction, isPredicting } = usePrediction();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const categories = ['All', 'General', 'Respiratory', 'Neurological', 'Cardiovascular', 'Gastrointestinal', 'Musculoskeletal'];

  const filteredSymptoms = MOCK_SYMPTOMS.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const executeScan = async () => {
    const result = await runPrediction();
    if (result) {
      navigate('/result');
    }
  };

  const handlePredictClick = () => {
    if (selectedSymptoms.length === 0) return;
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      executeScan();
    }
  };

  return (
    <div className="space-y-8 text-left relative pb-12">
      {/* Sci-Fi Loading Overlay Modal */}
      <AnimatePresence>
        {isPredicting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/80 backdrop-blur-md"
          >
            <div className="bg-white dark:bg-emerald-950 border-2 border-emerald-500/40 rounded-3xl p-8 shadow-2xl text-center max-w-md space-y-6 healora-glow">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
                <div className="absolute inset-2 rounded-full border-2 border-teal-400/30 border-b-teal-400 animate-spin" style={{ animationDirection: 'reverse' }} />
                <Activity className="w-10 h-10 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-emerald-950 dark:text-white">Healora AI Neural Scanning</h3>
                <p className="text-xs font-semibold text-emerald-800/80 dark:text-emerald-300">
                  Cross-matching symptom vectors against clinical ML diagnostic models...
                </p>
              </div>
              <div className="w-full bg-emerald-100 dark:bg-emerald-900/60 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 text-xs font-black">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> HIPAA Compliant AI Evaluator
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-emerald-950 dark:text-white flex items-center gap-3">
          <Activity className="w-9 h-9 text-emerald-600" />
          Symptom Checker & Disease Predictor
        </h1>
        <p className="text-sm font-medium text-slate-600 dark:text-emerald-200/80">
          Select all symptoms you are currently experiencing to run a probabilistic neural health analysis.
        </p>
      </div>

      {/* Selected Symptoms Tray */}
      <div className="p-6 bg-emerald-50/70 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-emerald-950 dark:text-white text-base">
              Selected Symptom Cluster ({selectedSymptoms.length})
            </h3>
          </div>
          {selectedSymptoms.length > 0 && (
            <button
              onClick={clearSymptoms}
              className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
            >
              Clear All Symptoms
            </button>
          )}
        </div>

        {selectedSymptoms.length === 0 ? (
          <p className="text-xs text-emerald-800/60 dark:text-emerald-300/60 italic py-2 font-medium">
            No symptoms selected yet. Pick symptoms from the category list below to activate AI prediction.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {selectedSymptoms.map((sym) => (
              <span
                key={sym}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-100 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-100 text-xs font-bold border border-emerald-200 dark:border-emerald-700 shadow-xs"
              >
                {sym}
                <button onClick={() => removeSymptom(sym)} className="hover:text-rose-500 transition cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="pt-3 flex justify-end">
          <Button
            variant="primary"
            size="lg"
            disabled={selectedSymptoms.length === 0}
            onClick={handlePredictClick}
            icon={Sparkles}
            className="healora-glow font-extrabold"
          >
            Run Healora AI Scan
          </Button>
        </div>
      </div>

      {/* Popular Symptoms Chips */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold text-emerald-800/80 dark:text-emerald-300 uppercase tracking-wider">
          Quick-Add Frequent Symptoms
        </span>
        <div className="flex flex-wrap gap-2">
          {POPULAR_SYMPTOMS.map((name) => {
            const isSelected = selectedSymptoms.includes(name);
            return (
              <button
                key={name}
                onClick={() => isSelected ? removeSymptom(name) : addSymptom(name)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold border transition duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-white dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/50 text-emerald-950 dark:text-emerald-200 hover:border-emerald-400'
                }`}
              >
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 inline mr-1.5" />}
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center pt-2">
        <div className="w-full md:w-96">
          <SearchBox
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm('')}
            placeholder="Search symptoms or condition vectors..."
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
          <Filter className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-white dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/50'
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

      {/* Auth Benefit Modal for Unauthenticated Users */}
      <Modal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        title="Enhance Your AI Diagnostic Scan"
      >
        <div className="space-y-5 text-left">
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/40 rounded-2xl border border-emerald-100 dark:border-emerald-800 flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-emerald-950 dark:text-white text-sm">
                Unlock Full Clinical Health Features
              </h4>
              <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium mt-0.5">
                Sign in to enjoy personalized AI diagnostic tracking, or continue directly as a guest.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <h5 className="text-xs font-black uppercase tracking-wider text-emerald-950 dark:text-emerald-200">
              Why Sign In Before Scanning?
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white dark:bg-emerald-950/80 rounded-xl border border-emerald-100 dark:border-emerald-900 flex items-start gap-2.5">
                <History className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-emerald-950 dark:text-white font-bold">Save History Logs</strong>
                  <span className="text-emerald-800/80 dark:text-emerald-300">Keep record of all past evaluations.</span>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-emerald-950/80 rounded-xl border border-emerald-100 dark:border-emerald-900 flex items-start gap-2.5">
                <UserCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-emerald-950 dark:text-white font-bold">Personalized Results</strong>
                  <span className="text-emerald-800/80 dark:text-emerald-300">Tailored to age, gender & profile.</span>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-emerald-950/80 rounded-xl border border-emerald-100 dark:border-emerald-900 flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-emerald-950 dark:text-white font-bold">Clinical PDF Reports</strong>
                  <span className="text-emerald-800/80 dark:text-emerald-300">Download & share with physicians.</span>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-emerald-950/80 rounded-xl border border-emerald-100 dark:border-emerald-900 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-emerald-950 dark:text-white font-bold">Secure Dashboard</strong>
                  <span className="text-emerald-800/80 dark:text-emerald-300">100% confidential health workspace.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-emerald-100 dark:border-emerald-900 flex flex-col sm:flex-row gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              icon={LogIn}
              onClick={() => navigate('/login')}
              className="font-bold"
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={UserPlus}
              onClick={() => navigate('/register')}
              className="font-bold healora-glow"
            >
              Sign Up
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowAuthModal(false);
                executeScan();
              }}
              className="font-extrabold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100/60"
            >
              Continue Without Sign In →
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DiseasePredictionPage;

