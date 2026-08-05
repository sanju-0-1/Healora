import { Link, useNavigate } from 'react-router-dom';
import { Download, RefreshCw, AlertOctagon, UserCheck, Shield, Pill, Sparkles, Home } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import AlertBox from '../components/ui/AlertBox';
import usePrediction from '../hooks/usePrediction';
import { exportPredictionPDF } from '../services/pdfExporter';
import { MOCK_DISEASES } from '../services/mockData';

const PredictionResultPage = () => {
  const navigate = useNavigate();
  const { currentPrediction } = usePrediction();

  const data = currentPrediction || MOCK_DISEASES[0];

  const handleDownloadPDF = () => {
    exportPredictionPDF('report-container', `Healora_Report_${data.name.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto">
      {/* Top Action Buttons */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-blue-600" />
          AI Diagnostic Report
        </h1>

        <div className="flex gap-3">
          <Button variant="outline" size="md" icon={RefreshCw} onClick={() => navigate('/predict')}>
            Predict Again
          </Button>
          <Button variant="primary" size="md" icon={Download} onClick={handleDownloadPDF}>
            Download PDF Report
          </Button>
        </div>
      </div>

      {/* Printable Report Container */}
      <div id="report-container" className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl space-y-8">
        {/* Report Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 dark:border-slate-800 pb-6 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl p-3 bg-blue-50 dark:bg-blue-950/50 rounded-2xl border border-blue-200 dark:border-blue-800">
              {data.icon || '🩺'}
            </span>
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Primary Diagnosis Match
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">{data.name}</h2>
              <span className="text-xs text-slate-500">{data.category}</span>
            </div>
          </div>

          <div className="flex flex-col md:items-end space-y-2">
            <Badge variant={data.severity === 'Low' ? 'success' : 'warning'} size="md">
              Severity Level: {data.severity}
            </Badge>
            <span className="text-xs text-slate-400">Date: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Confidence Progress Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-2">
          <ProgressBar
            label="AI Confidence Score"
            value={data.confidenceDefault || 92}
            color={data.confidenceDefault > 90 ? 'bg-blue-600' : 'bg-teal-500'}
          />
        </div>

        {/* Overview */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Condition Overview</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{data.overview}</p>
        </div>

        {/* Grid: Precautions & Recommended Doctor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-sm">
              <Shield className="w-4 h-4" /> Immediate Precautions
            </div>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {data.precautions?.map((prec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{prec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-teal-700 dark:text-teal-300 font-bold text-sm">
              <UserCheck className="w-4 h-4" /> Recommended Specialist
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">{data.recommendedDoctor}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Schedule a consultation with a certified doctor in this field for formal clinical confirmation.
            </p>
          </div>
        </div>

        {/* Home Remedies & Medicines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <Home className="w-4 h-4 text-amber-500" /> Home Care & Remedies
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {data.homeRemedies?.map((rem, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>{rem}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <Pill className="w-4 h-4 text-purple-500" /> Standard OTC Medicines
            </div>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {data.medicines?.map((med, i) => (
                <div key={i} className="border-b border-slate-200 dark:border-slate-700/60 pb-1.5 last:border-none">
                  <span className="font-bold text-slate-900 dark:text-white block">{med.name}</span>
                  <span className="text-[11px] text-slate-500">{med.usage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Warning Banner */}
        <AlertBox
          type="danger"
          title="Emergency Warning & Disclaimer"
          message={data.emergencyWarning || 'Seek immediate medical care if severe shortness of breath or persistent chest pain develops.'}
        />
      </div>

      <div className="flex justify-center pt-2">
        <Link to={`/disease/${data.id}`}>
          <Button variant="outline" size="md">
            View Complete Disease Encyclopedia Entry
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PredictionResultPage;
