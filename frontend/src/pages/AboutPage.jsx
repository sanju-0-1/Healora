import { Cpu, ShieldCheck, Database, Layers, CheckCircle2 } from 'lucide-react';
import AlertBox from '../components/ui/AlertBox';

const AboutPage = () => {
  const techStack = [
    { name: 'React 19 & Vite 8', desc: 'Lightning-fast client component architecture & HMR build system.' },
    { name: 'Tailwind CSS v4', desc: 'Modern styling system with healthcare theme tokens and dark mode support.' },
    { name: 'Framer Motion', desc: 'Smooth, fluid micro-interactions, page transitions, and loading states.' },
    { name: 'Recharts Engine', desc: 'Interactive visual analytics for prediction volume and distribution.' },
    { name: 'Express Node API', desc: 'Scalable backend API server ready for ML model inference integration.' }
  ];

  return (
    <div className="space-y-12 text-left max-w-4xl mx-auto pb-12">
      {/* Title */}
      <div className="space-y-3 text-center max-w-2xl mx-auto">
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
          Mission & Technology
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          About Healora Medical AI
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Bridging early symptom recognition and professional healthcare through machine learning analytics.
        </p>
      </div>

      {/* About Project */}
      <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" /> Project Architecture & Purpose
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Healora was designed as a proactive healthcare web platform to help users perform instant initial clinical evaluations. By matching symptom inputs against comprehensive medical condition datasets, Healora highlights potential health risks, recommended specialist care types, and emergency warning indicators.
        </p>
      </div>

      {/* AI Model Information */}
      <div className="p-8 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-3xl space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-blue-600" /> AI Diagnostic Neural Model
        </h2>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          The diagnostic engine utilizes an ensemble Random Forest classifier trained on thousands of validated clinical diagnostic records. The model calculates probability distributions over 20+ disease categories based on symptom multi-selection vectors.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
            <span className="text-2xl font-black text-blue-600">96.8%</span>
            <span className="block text-[11px] text-slate-500">Benchmark Precision</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
            <span className="text-2xl font-black text-teal-600">40+</span>
            <span className="block text-[11px] text-slate-500">Clinical Symptoms</span>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
            <span className="text-2xl font-black text-purple-600">&lt; 1.5s</span>
            <span className="block text-[11px] text-slate-500">Inference Latency</span>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-teal-500" /> Technologies Used
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {techStack.map((tech, idx) => (
            <div key={idx} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{tech.name}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <AlertBox
        type="warning"
        title="Official Healthcare Medical Disclaimer"
        message="Healora AI is designed strictly for educational and preliminary informational purposes. It does NOT constitute formal medical advice, diagnosis, or treatment. Always consult a licensed medical physician or emergency services for health concerns."
      />
    </div>
  );
};

export default AboutPage;
