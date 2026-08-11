import { useState } from 'react';
import { History, Trash2, Eye, Calendar, Sparkles, Activity } from 'lucide-react';
import SearchBox from '../components/ui/SearchBox';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import usePrediction from '../hooks/usePrediction';

const PredictionHistoryPage = () => {
  const { history, deleteHistoryItem, setCurrentPrediction } = usePrediction();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.symptoms.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSeverity = severityFilter === 'All' || item.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-6 text-left pb-16">
      <div className="space-y-1">
        <h1 className="text-3xl font-black text-emerald-950 dark:text-white flex items-center gap-3">
          <History className="w-8 h-8 text-emerald-600" />
          Healora AI Scan Log & History
        </h1>
        <p className="text-sm font-medium text-emerald-800/80 dark:text-emerald-300">
          Review, search, and export your previous neural disease evaluations.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-emerald-950/40 p-5 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl shadow-sm">
        <div className="w-full sm:w-80">
          <SearchBox
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm('')}
            placeholder="Search by condition or symptom..."
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-extrabold text-emerald-800/80 dark:text-emerald-300 whitespace-nowrap">Severity Filter:</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-emerald-50 dark:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-white text-xs font-bold rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="All">All Severities</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium text-slate-700 dark:text-emerald-200">
            <thead className="bg-emerald-50/70 dark:bg-emerald-900/60 uppercase font-black text-emerald-950 dark:text-white border-b border-emerald-100 dark:border-emerald-900">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Diagnostic Match</th>
                <th className="px-6 py-4">Symptom Cluster</th>
                <th className="px-6 py-4">Confidence Score</th>
                <th className="px-6 py-4">Severity</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100 dark:divide-emerald-900/50">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-emerald-800/60 dark:text-emerald-400 font-semibold">
                    No prediction logs match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-emerald-50/40 dark:hover:bg-emerald-900/30 transition">
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-emerald-950 dark:text-white flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      {item.date}
                    </td>
                    <td className="px-6 py-4 font-black text-emerald-950 dark:text-white">
                      {item.disease}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {item.symptoms.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-emerald-100/80 dark:bg-emerald-900/80 text-emerald-950 dark:text-emerald-100 rounded-md text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-extrabold text-emerald-700 dark:text-emerald-300">
                        {item.confidence}% Confidence
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={item.severity === 'Low' ? 'success' : 'warning'}>
                        {item.severity}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="p-2 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 rounded-xl transition cursor-pointer"
                        title="View Log Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteHistoryItem(item.id)}
                        className="p-2 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 rounded-xl transition cursor-pointer"
                        title="Delete Log"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Item Details Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={`Diagnostic Details: ${selectedItem.disease}`}
        >
          <div className="space-y-4 text-xs text-left font-medium text-slate-700 dark:text-emerald-200">
            <div className="flex justify-between items-center border-b border-emerald-100 dark:border-emerald-900 pb-3">
              <span className="font-bold">Evaluation Date: {selectedItem.date}</span>
              <Badge variant={selectedItem.severity === 'Low' ? 'success' : 'warning'}>
                {selectedItem.severity} Severity
              </Badge>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-black text-emerald-950 dark:text-white uppercase tracking-wider text-[11px]">Symptoms Evaluated</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedItem.symptoms.map((sym, i) => (
                  <span key={i} className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-100 text-xs font-bold rounded-lg border border-emerald-200 dark:border-emerald-800">
                    {sym}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/40 rounded-2xl border border-emerald-100 dark:border-emerald-800 space-y-1">
              <span className="font-extrabold text-emerald-950 dark:text-white block">Neural Diagnostic Confidence</span>
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{selectedItem.confidence}% Probability Match</span>
            </div>

            <div className="pt-4 border-t border-emerald-100 dark:border-emerald-900 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setSelectedItem(null)} className="font-bold">
                Close Log
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};


export default PredictionHistoryPage;
