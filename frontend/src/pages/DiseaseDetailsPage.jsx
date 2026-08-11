import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Activity, AlertCircle, HeartPulse, Stethoscope, Sparkles } from 'lucide-react';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { MOCK_DISEASES } from '../services/mockData';

const DiseaseDetailsPage = () => {
  const { id } = useParams();
  const disease = MOCK_DISEASES.find((d) => d.id === id) || MOCK_DISEASES[0];

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto pb-16">
      <Link to="/predict">
        <Button variant="ghost" size="sm" icon={ArrowLeft} className="font-bold">
          Back to Symptom Checker
        </Button>
      </Link>

      <div className="p-8 bg-white dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60 rounded-3xl shadow-xl space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-emerald-100 dark:border-emerald-900/60 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-100 dark:bg-emerald-900/70 text-emerald-700 dark:text-emerald-300 rounded-2xl">
              <Activity className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                {disease.category}
              </span>
              <h1 className="text-3xl font-black text-emerald-950 dark:text-white">{disease.name}</h1>
            </div>
          </div>
          <Badge variant={disease.severity === 'Low' ? 'success' : 'warning'} size="md">
            Triage Severity: {disease.severity}
          </Badge>
        </div>

        {/* Overview */}
        <div className="space-y-3">
          <h3 className="font-black text-emerald-950 dark:text-white text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" /> Clinical Condition Overview
          </h3>
          <p className="text-sm text-slate-700 dark:text-emerald-100/90 leading-relaxed font-medium bg-emerald-50/40 dark:bg-emerald-900/30 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
            {disease.overview}
          </p>
        </div>

        {/* Causes & Symptoms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-emerald-50/50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl space-y-3">
            <h4 className="font-black text-emerald-950 dark:text-white text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-emerald-600" /> Primary Clinical Causes
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-emerald-900 dark:text-emerald-200">
              {disease.causes?.map((cause, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-emerald-50/50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl space-y-3">
            <h4 className="font-black text-emerald-950 dark:text-white text-sm flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-emerald-600" /> Correlated Symptoms
            </h4>
            <div className="flex flex-wrap gap-2">
              {disease.symptoms?.map((sym, i) => (
                <span key={i} className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-100 text-xs font-bold rounded-xl border border-emerald-200 dark:border-emerald-800">
                  {sym}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Treatments & Prevention */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl space-y-3">
            <h4 className="font-black text-emerald-950 dark:text-emerald-200 text-sm flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-emerald-600" /> Clinical Management Options
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-emerald-900 dark:text-emerald-200">
              {disease.treatments?.map((tr, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{tr}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-emerald-900/40 rounded-2xl space-y-3">
            <h4 className="font-black text-emerald-950 dark:text-emerald-200 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" /> Prevention & Care Guidelines
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-emerald-900 dark:text-emerald-200">
              {disease.prevention?.map((prev, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>{prev}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Care Specialist */}
        <div className="p-6 bg-emerald-100/60 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-300 tracking-wider">Clinical Care Specialty</span>
            <h4 className="text-lg font-black text-emerald-950 dark:text-white">{disease.recommendedDoctor || disease.doctor || 'General Physician'}</h4>
          </div>
          <Link to="/predict">
            <Button variant="primary" size="md" className="font-bold">
              Run Symptom Diagnostic
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetailsPage;

