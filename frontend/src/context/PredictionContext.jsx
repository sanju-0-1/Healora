import { createContext, useContext, useState } from 'react';
import { MOCK_HISTORY, MOCK_DISEASES } from '../services/mockData';
import { predictDiseaseApi } from '../services/api';

const PredictionContext = createContext();

export const PredictionProvider = ({ children }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState(['Fever', 'Cough']);
  const [currentPrediction, setCurrentPrediction] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [history, setHistory] = useState(MOCK_HISTORY);

  const addSymptom = (symptomName) => {
    if (!selectedSymptoms.includes(symptomName)) {
      setSelectedSymptoms((prev) => [...prev, symptomName]);
    }
  };

  const removeSymptom = (symptomName) => {
    setSelectedSymptoms((prev) => prev.filter((s) => s !== symptomName));
  };

  const clearSymptoms = () => {
    setSelectedSymptoms([]);
  };

  const runPrediction = async () => {
    if (selectedSymptoms.length === 0) return null;
    setIsPredicting(true);
    try {
      const res = await predictDiseaseApi(selectedSymptoms);
      const predictionData = res.data || MOCK_DISEASES[0];

      setCurrentPrediction(predictionData);

      // Save to prediction history
      const newHistoryItem = {
        id: 'pred-' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        symptoms: [...selectedSymptoms],
        disease: predictionData.name,
        confidence: predictionData.confidenceDefault || 92,
        severity: predictionData.severity
      };

      setHistory((prev) => [newHistoryItem, ...prev]);
      setIsPredicting(false);
      return predictionData;
    } catch (err) {
      setIsPredicting(false);
      console.error(err);
      return null;
    }
  };

  const deleteHistoryItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <PredictionContext.Provider value={{
      selectedSymptoms,
      addSymptom,
      removeSymptom,
      clearSymptoms,
      currentPrediction,
      setCurrentPrediction,
      isPredicting,
      runPrediction,
      history,
      deleteHistoryItem
    }}>
      {children}
    </PredictionContext.Provider>
  );
};

export const usePrediction = () => useContext(PredictionContext);
