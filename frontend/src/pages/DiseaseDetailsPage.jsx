import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Activity, AlertCircle, HeartPulse, Stethoscope } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { MOCK_DISEASES } from '../services/mockData';

const DiseaseDetailsPage = () => {
  const { id } = useParams();
  const disease = MOCK_DISEASES.find((d) => d.id === id) || MOCK_DISEASES[0];

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto pb-12">
      <Link to="/predict">
        <Button variant="ghost" size="sm" icon={ArrowLeft}>
          Back to Prediction Tool
        </Button>
      </Link>

      <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <span className="text-5xl p-3.5 bg-blue-50 dark:bg-blue-950/60 rounded-2xl border border-blue-200 dark:border-blue-800">
              {disease.icon || '🩺'}
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {disease.category}
              </span>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white">{disease.name}</h1>
            </div>
          </div>
          <Badge variant={disease.severity === 'Low' ? 'success' : 'warning'} size="md">
            Severity: {disease.severity}
          </Badge>
        </div>

        {/* Overview */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" /> Clinical Overview
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{disease.overview}</p>
        </div>

        {/* Causes & Symptoms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500" /> Primary Causes
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {disease.causes?.map((cause, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-blue-500" /> Common Symptoms
            </h4>
            <div className="flex flex-wrap gap-2">
              {disease.symptoms?.map((sym, i) => (
                <span key={i} className="px-2.5 py-1 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-lg">
                  {sym}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Treatments & Prevention */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl space-y-3">
            <h4 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-emerald-600" /> Clinical Treatments
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {disease.treatments?.map((tr, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{tr}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 rounded-2xl space-y-3">
            <h4 className="font-bold text-teal-800 dark:text-teal-300 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" /> Prevention Measures
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {disease.prevention?.map((prev, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-teal-500 font-bold">•</span>
                  <span>{prev}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recovery Tips & Related Diseases */}
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Recovery Timeline & Protocol</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">{disease.recoveryTips}</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider text-slate-400">Related Conditions</h4>
            <div className="flex gap-2">
              {disease.relatedDiseases?.map((rel, idx) => (
                <span key={idx} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-xl">
                  {rel}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetailsPage;
