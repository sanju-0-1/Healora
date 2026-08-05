import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Download, RefreshCw, Sparkles, Home, Pill, Shield, UserCheck, ChevronDown, ChevronUp, Layers, Activity, Stethoscope, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import AlertBox from '../components/ui/AlertBox';
import usePrediction from '../hooks/usePrediction';
import { exportPredictionPDF } from '../services/pdfExporter';
import { MOCK_DISEASES } from '../services/mockData';

const PredictionResultPage = () => {
  const navigate = useNavigate();
  const { currentPrediction, selectedSymptoms } = usePrediction();
  const [expandedDiseaseId, setExpandedDiseaseId] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');

  const data = currentPrediction || MOCK_DISEASES[0];

  // Derive possibleDiseases array (if not populated, build dynamically from MOCK_DISEASES)
  const activeSymptoms = data.symptoms || data.matchedSymptoms || selectedSymptoms || [];

  const possibleDiseases = data.possibleDiseases && data.possibleDiseases.length > 0
    ? data.possibleDiseases
    : MOCK_DISEASES.map((dis) => {
        const disSyms = dis.symptoms.map((s) => s.toLowerCase());
        const matched = activeSymptoms.filter((s) =>
          disSyms.some((ds) => ds.includes(s.toLowerCase()) || s.toLowerCase().includes(ds))
        );
        const matchRatio = activeSymptoms.length > 0 ? matched.length / activeSymptoms.length : 0;
        const confidence = matched.length > 0
          ? Math.min(98, Math.max(35, Math.round(matchRatio * 92)))
          : 15;
        return {
          ...dis,
          matchedSymptoms: matched.length > 0 ? matched : [dis.symptoms[0]],
          confidence: dis.confidenceDefault || confidence,
        };
      }).sort((a, b) => b.confidence - a.confidence);

  const filteredDiseases = possibleDiseases.filter((dis) =>
    dis.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    dis.category?.toLowerCase().includes(filterQuery.toLowerCase()) ||
    (dis.matchedSymptoms && dis.matchedSymptoms.some((s) => s.toLowerCase().includes(filterQuery.toLowerCase())))
  );

  const toggleExpand = (id) => {
    setExpandedDiseaseId(expandedDiseaseId === id ? null : id);
  };

  const handleDownloadPDF = () => {
    exportPredictionPDF('report-container', `Healora_Report_${data.name.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto pb-12">
      {/* Top Header & Actions */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-blue-600" />
            AI Diagnostic Report
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Evaluating symptoms: <span className="font-semibold text-slate-700 dark:text-slate-300">{activeSymptoms.join(', ') || 'General Symptoms'}</span>
          </p>
        </div>

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
      <div id="report-container" className="p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl space-y-8">

        {/* Primary Match Banner Header */}
        <div className="p-6 bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-slate-50 dark:from-blue-950/40 dark:via-indigo-950/20 dark:to-slate-900 border border-blue-100 dark:border-blue-900/50 rounded-2xl space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl p-3 bg-white dark:bg-slate-800 rounded-2xl border border-blue-200 dark:border-blue-800 shadow-xs">
                {data.icon || '🩺'}
              </span>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-blue-600 text-white rounded-full">
                    #1 Primary Match
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{data.category}</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">{data.name}</h2>
              </div>
            </div>

            <div className="flex flex-col md:items-end space-y-2">
              <Badge variant={data.severity === 'Low' ? 'success' : 'warning'} size="md">
                Severity Level: {data.severity}
              </Badge>
              <span className="text-xs text-slate-400">Evaluated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <ProgressBar
            label="Primary Match AI Confidence"
            value={data.confidenceDefault || data.confidence || 92}
            color={(data.confidenceDefault || data.confidence) > 85 ? 'bg-blue-600' : 'bg-teal-500'}
          />
        </div>

        {/* Condition Overview */}
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            Primary Condition Overview
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{data.overview}</p>
        </div>

        {/* Grid: Precautions & Specialist */}
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
            <p className="text-xs font-bold text-slate-900 dark:text-white">{data.recommendedDoctor || data.doctor}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Consult a medical professional specializing in {data.recommendedDoctor || data.doctor || 'General Medicine'} for clinical evaluation.
            </p>
          </div>
        </div>

        {/* Remedies & Medicines */}
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

        {/* ALL POSSIBLE DIFFERENTIAL DIAGNOSES SECTION */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  All Possible Conditions ({possibleDiseases.length})
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Every disease correlated with your selected symptoms, ranked by clinical match probability.
              </p>
            </div>

            {/* Quick Filter Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search possible diseases..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Disease Cards List */}
          <div className="space-y-4">
            {filteredDiseases.map((disease, idx) => {
              const isExpanded = expandedDiseaseId === (disease.id || idx);
              const conf = disease.confidence || disease.confidenceDefault || 50;

              return (
                <div
                  key={disease.id || idx}
                  className={`border rounded-2xl transition-all overflow-hidden ${
                    idx === 0
                      ? 'border-blue-300 dark:border-blue-800 bg-blue-50/20 dark:bg-blue-950/10'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60'
                  }`}
                >
                  <div className="p-4 md:p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

                    {/* Disease Info */}
                    <div className="flex items-start md:items-center gap-3.5 flex-1">
                      <span className="text-2xl p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
                        {disease.icon || '🩺'}
                      </span>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            idx === 0
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}>
                            #{idx + 1} {idx === 0 ? 'Primary Match' : 'Possible Match'}
                          </span>
                          <Badge variant={disease.severity === 'Low' ? 'success' : disease.severity === 'High' ? 'danger' : 'warning'}>
                            {disease.severity || 'Moderate'}
                          </Badge>
                          <span className="text-xs text-slate-400">{disease.category}</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">
                          {disease.name}
                        </h4>

                        {/* Matched symptoms tags */}
                        {disease.matchedSymptoms && disease.matchedSymptoms.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[11px] font-semibold text-slate-500">Matching Symptoms:</span>
                            {disease.matchedSymptoms.map((sym, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded-md text-[10px] font-medium border border-blue-200/50 dark:border-blue-900/50"
                              >
                                ✓ {sym}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Confidence Score & Actions */}
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-100 dark:border-slate-800 pt-3 md:pt-0">
                      <div className="text-right space-y-1 min-w-[100px]">
                        <span className="text-xs text-slate-400 font-semibold block">Match Score</span>
                        <div className="flex items-center justify-end gap-1.5">
                          <div className="w-16 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${conf > 80 ? 'bg-blue-600' : conf > 50 ? 'bg-teal-500' : 'bg-amber-500'}`}
                              style={{ width: `${conf}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-black text-slate-900 dark:text-white">{conf}%</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleExpand(disease.id || idx)}
                          className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition"
                        >
                          {isExpanded ? 'Hide Info' : 'Quick View'}
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        {disease.id && (
                          <Link to={`/disease/${disease.id}`}>
                            <button className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl transition" title="View Encyclopedia Entry">
                              <Stethoscope className="w-4 h-4" />
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Disease Detail Drawer */}
                  {isExpanded && (
                    <div className="p-5 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-200/80 dark:border-slate-800 text-xs space-y-4">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{disease.overview}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1.5">
                          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <Shield className="w-3.5 h-3.5 text-blue-500" /> Key Precautions:
                          </span>
                          <ul className="space-y-1 text-slate-600 dark:text-slate-400 pl-4 list-disc">
                            {disease.precautions?.slice(0, 3).map((p, pIdx) => (
                              <li key={pIdx}>{p}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-1.5">
                          <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <UserCheck className="w-3.5 h-3.5 text-teal-500" /> Specialist:
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 font-semibold">{disease.recommendedDoctor || disease.doctor || 'General Practitioner'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Emergency Warning Disclaimer */}
        <AlertBox
          type="danger"
          title="Emergency Warning & Disclaimer"
          message={data.emergencyWarning || 'Seek immediate medical care if severe shortness of breath, chest tightness, or persistent high fever occurs.'}
        />
      </div>

      <div className="flex justify-center pt-2">
        <Link to={`/disease/${data.id}`}>
          <Button variant="outline" size="md">
            View Primary Disease Encyclopedia Entry
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PredictionResultPage;
