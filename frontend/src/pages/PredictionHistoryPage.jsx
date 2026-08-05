import { useState } from 'react';
import { History, Trash2, Eye, Calendar, Sparkles } from 'lucide-react';
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
    <div className="space-y-6 text-left">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <History className="w-8 h-8 text-blue-600" />
          Prediction History
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Review, filter, and export your previous AI symptom evaluations.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
        <div className="w-full sm:w-80">
          <SearchBox
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={() => setSearchTerm('')}
            placeholder="Search by disease or symptom..."
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Severity Filter:</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-500 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Disease Match</th>
                <th className="px-6 py-4">Symptoms Picked</th>
                <th className="px-6 py-4">Confidence</th>
                <th className="px-6 py-4">Severity</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-400">
                    No prediction history matches your query.
                  </td>
                </tr>
              ) : (
                filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      {item.date}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                      {item.disease}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {item.symptoms.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-[10px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">
                      {item.confidence}%
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={item.severity === 'Low' ? 'success' : 'warning'}>
                        {item.severity}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition"
                        title="View Full Report"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteHistoryItem(item.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
                        title="Delete Entry"
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

      {/* Item Detail Modal */}
      {selectedItem && (
        <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title="Historical Prediction Report">
          <div className="space-y-4 text-left">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase">Predicted Condition</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedItem.disease}</h3>
              <p className="text-xs text-slate-500">Date Logged: {selectedItem.date}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Symptoms Evaluated</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedItem.symptoms.map((sym, i) => (
                  <span key={i} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg">
                    {sym}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 text-xs">
              <span>Confidence Score: <strong className="text-blue-600">{selectedItem.confidence}%</strong></span>
              <Badge variant={selectedItem.severity === 'Low' ? 'success' : 'warning'}>{selectedItem.severity}</Badge>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedItem(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PredictionHistoryPage;
