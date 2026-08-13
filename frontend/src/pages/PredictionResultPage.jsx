import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Download, RefreshCw, Sparkles, Home, Pill, Shield, UserCheck, ChevronDown, ChevronUp, Layers, Activity, Stethoscope, Search, CheckCircle2, AlertTriangle } from 'lucide-react';
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
    <div className="space-y-8 text-left max-w-4xl mx-auto pb-16">
      {/* Top Header & Actions */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-emerald-950 dark:text-white flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-emerald-600" />
            Healora AI Clinical Report
          </h1>
          <p className="text-xs font-semibold text-emerald-800/80 dark:text-emerald-300 mt-1">
            Evaluated Symptom Cluster: <span className="font-extrabold text-emerald-950 dark:text-white">{activeSymptoms.join(', ') || 'General Symptoms'}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            size="md"
            icon={Stethoscope}
            onClick={() =>
              navigate('/ai-doctor', {
                state: {
                  diseaseContext: {
                    diseaseName: data.name,
                    symptoms: activeSymptoms,
                    confidence: data.confidence || data.confidenceDefault
                  }
                }
              })
            }
            className="bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-700/20"
          >
            Consult Dr. Healora AI
          </Button>
          <Button variant="outline" size="md" icon={RefreshCw} onClick={() => navigate('/predict')}>
            New Scan
          </Button>
          <Button variant="primary" size="md" icon={Download} onClick={handleDownloadPDF} className="healora-glow">
            Download PDF Report
          </Button>
        </div>

      </div>

      {/* Printable Report Container */}
      <div id="report-container" className="p-6 md:p-8 bg-white dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60 rounded-3xl shadow-xl space-y-8">

        {/* Primary Match Banner Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-50 via-emerald-100/50 to-teal-50 dark:from-emerald-900/60 dark:via-emerald-900/40 dark:to-emerald-950 border border-emerald-200/80 dark:border-emerald-800 rounded-2xl space-y-5">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-emerald-600 text-white rounded-2xl shadow-md shadow-emerald-600/30">
                <Activity className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 bg-emerald-600 text-white rounded-full shadow-xs">
                    #1 Primary Diagnostic Match
                  </span>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">{data.category}</span>
                </div>
                <h2 className="text-2xl font-black text-emerald-950 dark:text-white">{data.name}</h2>
              </div>
            </div>

            <div className="flex flex-col md:items-end space-y-2">
              <Badge variant={data.severity === 'Low' ? 'success' : 'warning'} size="md">
                Triage Severity: {data.severity}
              </Badge>
              <span className="text-xs font-semibold text-emerald-800/70 dark:text-emerald-300">Generated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <ProgressBar
            label="Neural Model Diagnostic Match Confidence"
            value={data.confidenceDefault || data.confidence || 92}
            color="bg-emerald-600"
          />
        </div>

        {/* Condition Overview */}
        <div className="space-y-2.5">
          <h3 className="font-black text-emerald-950 dark:text-white text-base flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-600" />
            Clinical Condition Summary
          </h3>
          <p className="text-xs font-medium text-slate-700 dark:text-emerald-100/90 leading-relaxed bg-emerald-50/40 dark:bg-emerald-900/30 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/40">
            {data.overview}
          </p>
        </div>

        {/* Grid: Precautions & Specialist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-emerald-50/60 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-950 dark:text-emerald-100 font-extrabold text-sm">
              <Shield className="w-4 h-4 text-emerald-600" /> Recommended Clinical Precautions
            </div>
            <ul className="space-y-2 text-xs font-semibold text-emerald-900 dark:text-emerald-200">
              {data.precautions?.map((prec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{prec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 bg-teal-50/60 dark:bg-emerald-900/30 border border-teal-100 dark:border-emerald-900/50 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-950 dark:text-emerald-100 font-extrabold text-sm">
              <UserCheck className="w-4 h-4 text-teal-600" /> Recommended Medical Specialist
            </div>
            <p className="text-xs font-black text-emerald-950 dark:text-white">{data.recommendedDoctor || data.doctor}</p>
            <p className="text-xs font-medium text-slate-600 dark:text-emerald-200/80 leading-relaxed">
              Consult a licensed clinical professional specializing in {data.recommendedDoctor || data.doctor || 'General Medicine'} for in-person evaluation.
            </p>
          </div>
        </div>

        {/* Remedies & Medicines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-emerald-50/40 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-950 dark:text-white font-extrabold text-sm">
              <Home className="w-4 h-4 text-emerald-600" /> Home Care & Supportive Measures
            </div>
            <ul className="space-y-2 text-xs font-semibold text-emerald-900 dark:text-emerald-200">
              {data.homeRemedies?.map((rem, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>{rem}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 bg-emerald-50/40 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/40 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-950 dark:text-white font-extrabold text-sm">
              <Pill className="w-4 h-4 text-emerald-600" /> Standard OTC Guidelines
            </div>
            <div className="space-y-2 text-xs font-medium text-emerald-900 dark:text-emerald-200">
              {data.medicines?.map((med, i) => (
                <div key={i} className="border-b border-emerald-100 dark:border-emerald-900/50 pb-1.5 last:border-none">
                  <span className="font-black text-emerald-950 dark:text-white block">{med.name}</span>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold">{med.usage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ALL POSSIBLE DIFFERENTIAL DIAGNOSES SECTION */}
        <div className="pt-6 border-t border-emerald-100 dark:border-emerald-900/60 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-emerald-600" />
                <h3 className="text-xl font-black text-emerald-950 dark:text-white">
                  Differential Diagnoses ({possibleDiseases.length})
                </h3>
              </div>
              <p className="text-xs font-semibold text-emerald-800/80 dark:text-emerald-300 mt-1">
                All conditions correlated with your symptom cluster, ranked by neural confidence.
              </p>
            </div>

            {/* Quick Filter Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-emerald-600" />
              <input
                type="text"
                placeholder="Search conditions..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-emerald-50 dark:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-semibold text-emerald-950 dark:text-white placeholder-emerald-800/50 dark:placeholder-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                      ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/40 dark:bg-emerald-900/30'
                      : 'border-emerald-100 dark:border-emerald-900/50 bg-white dark:bg-emerald-950/40'
                  }`}
                >
                  <div className="p-4 md:p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

                    {/* Disease Info */}
                    <div className="flex items-start md:items-center gap-3.5 flex-1">
                      <div className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 rounded-xl">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                            idx === 0
                              ? 'bg-emerald-600 text-white'
                              : 'bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200'
                          }`}>
                            #{idx + 1} {idx === 0 ? 'Primary Match' : 'Possible Differential'}
                          </span>
                          <Badge variant={disease.severity === 'Low' ? 'success' : disease.severity === 'High' ? 'danger' : 'warning'}>
                            {disease.severity || 'Moderate'}
                          </Badge>
                          <span className="text-xs font-semibold text-emerald-800/80 dark:text-emerald-300">{disease.category}</span>
                        </div>
                        <h4 className="text-base font-extrabold text-emerald-950 dark:text-white">
                          {disease.name}
                        </h4>

                        {/* Matched symptoms tags */}
                        {disease.matchedSymptoms && disease.matchedSymptoms.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <span className="text-[11px] font-bold text-emerald-800/80 dark:text-emerald-300">Matching Symptoms:</span>
                            {disease.matchedSymptoms.map((sym, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2 py-0.5 bg-emerald-100/80 dark:bg-emerald-900/80 text-emerald-950 dark:text-emerald-100 rounded-md text-[10px] font-bold border border-emerald-200 dark:border-emerald-800"
                              >
                                ✓ {sym}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Confidence Score & Actions */}
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-emerald-100 dark:border-emerald-900/40 pt-3 md:pt-0">
                      <div className="text-right space-y-1 min-w-[100px]">
                        <span className="text-xs font-bold text-emerald-800/80 dark:text-emerald-300 block">Neural Match</span>
                        <div className="flex items-center justify-end gap-1.5">
                          <div className="w-16 bg-emerald-100 dark:bg-emerald-900 h-2.5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-600"
                              style={{ width: `${conf}%` }}
                            />
                          </div>
                          <span className="text-xs font-black text-emerald-950 dark:text-white">{conf}%</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleExpand(disease.id || idx)}
                          className="px-3.5 py-1.5 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-950 dark:text-emerald-100 hover:bg-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer"
                        >
                          {isExpanded ? 'Hide Info' : 'Quick View'}
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Disease Detail Drawer */}
                  {isExpanded && (
                    <div className="p-5 bg-emerald-50/70 dark:bg-emerald-900/40 border-t border-emerald-100 dark:border-emerald-900/60 text-xs space-y-4">
                      <p className="text-slate-700 dark:text-emerald-100 font-medium leading-relaxed">{disease.overview}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1.5">
                          <span className="font-extrabold text-emerald-950 dark:text-white flex items-center gap-1.5">
                            <Shield className="w-3.5 h-3.5 text-emerald-600" /> Key Precautions:
                          </span>
                          <ul className="space-y-1 text-slate-700 dark:text-emerald-200 pl-4 list-disc font-medium">
                            {disease.precautions?.slice(0, 3).map((p, pIdx) => (
                              <li key={pIdx}>{p}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-1.5">
                          <span className="font-extrabold text-emerald-950 dark:text-white flex items-center gap-1.5">
                            <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> Recommended Specialist:
                          </span>
                          <p className="text-emerald-900 dark:text-emerald-200 font-bold">{disease.recommendedDoctor || disease.doctor || 'General Practitioner'}</p>
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
          title="Emergency Warning & Medical Disclaimer"
          message={data.emergencyWarning || 'Healora AI is a decision support tool and does not replace emergency medical diagnosis. Seek immediate emergency clinical care if severe chest pain, extreme breathlessness, or loss of consciousness occurs.'}
        />
      </div>

      <div className="flex justify-center pt-2">
        <Link to={`/disease/${data.id}`}>
          <Button variant="outline" size="md" className="font-bold">
            View Complete Condition Encyclopedia Entry
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PredictionResultPage;

