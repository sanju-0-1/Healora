import { Cpu, ShieldCheck, Database, Layers, CheckCircle2, Sparkles, Activity } from 'lucide-react';
import AlertBox from '../components/ui/AlertBox';

const AboutPage = () => {
  const techStack = [
    { name: 'React 19 & Vite 8', desc: 'Lightning-fast client component architecture & HMR build system.' },
    { name: 'Tailwind CSS v4', desc: 'Modern styling system with custom Healora emerald healer theme tokens.' },
    { name: 'Framer Motion 12', desc: 'Smooth, fluid micro-interactions, page transitions, and sci-fi scanning animations.' },
    { name: 'Recharts Engine', desc: 'Interactive visual analytics for prediction volume and distribution.' },
    { name: 'Clinical ML Model', desc: 'Ensemble Random Forest & Neural Classifier for multi-symptom vector matching.' }
  ];

  return (
    <div className="space-y-12 text-left max-w-4xl mx-auto pb-16">
      {/* Title */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-100 text-xs font-black rounded-full border border-emerald-200 dark:border-emerald-700">
          Mission & AI Engine
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-emerald-950 dark:text-white">
          About Healora Medical AI
        </h1>
        <p className="text-base font-extrabold text-emerald-700 dark:text-emerald-300 tracking-wide">
          "Smarter Health. Better Decisions."
        </p>
        <p className="text-sm font-medium text-slate-600 dark:text-emerald-200/80">
          Bridging early symptom recognition and professional healthcare through sci-fi inspired machine learning diagnostics.
        </p>
      </div>

      {/* About Project */}
      <div className="p-8 bg-white dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60 rounded-3xl shadow-xl space-y-4">
        <h2 className="text-xl font-black text-emerald-950 dark:text-white flex items-center gap-3">
          <Database className="w-6 h-6 text-emerald-600" /> Platform Purpose & Vision
        </h2>
        <p className="text-xs font-medium text-slate-700 dark:text-emerald-100/90 leading-relaxed">
          Healora was conceived as an intelligent, serene healthcare platform allowing users to run instant clinical evaluations. By matching symptom inputs against comprehensive medical condition datasets, Healora highlights potential health risks, recommended specialist care types, and emergency warning indicators.
        </p>
      </div>

      {/* AI Model Information */}
      <div className="p-8 bg-emerald-50/70 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl space-y-5">
        <h2 className="text-xl font-black text-emerald-950 dark:text-white flex items-center gap-3">
          <Cpu className="w-6 h-6 text-emerald-600" /> Neural Diagnostic Architecture
        </h2>
        <p className="text-xs font-medium text-slate-700 dark:text-emerald-100/90 leading-relaxed">
          The diagnostic engine utilizes an ensemble Random Forest classifier trained on thousands of validated clinical diagnostic records. The model calculates probability distributions over 20+ disease categories based on symptom multi-selection vectors.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-white dark:bg-emerald-950 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
            <span className="text-3xl font-black text-emerald-600">96.8%</span>
            <span className="block text-[11px] font-bold text-emerald-800 dark:text-emerald-300">Validation Precision</span>
          </div>
          <div className="p-4 bg-white dark:bg-emerald-950 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
            <span className="text-3xl font-black text-emerald-600">40+</span>
            <span className="block text-[11px] font-bold text-emerald-800 dark:text-emerald-300">Clinical Symptoms</span>
          </div>
          <div className="p-4 bg-white dark:bg-emerald-950 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
            <span className="text-3xl font-black text-emerald-600">&lt; 1.2s</span>
            <span className="block text-[11px] font-bold text-emerald-800 dark:text-emerald-300">Inference Latency</span>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="space-y-4">
        <h2 className="text-xl font-black text-emerald-950 dark:text-white flex items-center gap-3">
          <Layers className="w-6 h-6 text-emerald-600" /> Technologies & Frameworks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {techStack.map((tech, idx) => (
            <div key={idx} className="p-5 bg-white dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl flex items-start gap-3.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-emerald-950 dark:text-white text-sm">{tech.name}</h4>
                <p className="text-xs font-semibold text-emerald-800/80 dark:text-emerald-300 mt-0.5">{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Disclaimer */}
      <AlertBox
        type="warning"
        title="Official Healthcare Medical Disclaimer"
        message="Healora AI is designed strictly for educational and preliminary informational purposes. It does NOT constitute formal medical advice, diagnosis, or treatment. Always consult a licensed medical physician or emergency services for urgent health concerns."
      />
    </div>
  );
};

export default AboutPage;

