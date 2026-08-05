import axios from 'axios';
import { MOCK_DISEASES } from './mockData';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictDiseaseApi = async (selectedSymptoms = []) => {
  const normalizedInput = selectedSymptoms.map((s) => s.toLowerCase().trim());

  // Dynamic client-side matching algorithm across all diseases
  const scoredDiseases = MOCK_DISEASES.map((disease) => {
    const diseaseSyms = disease.symptoms.map((s) => s.toLowerCase().trim());
    const matched = [];

    for (const inputSym of normalizedInput) {
      for (const dSym of diseaseSyms) {
        if (dSym.includes(inputSym) || inputSym.includes(dSym)) {
          if (!matched.includes(inputSym)) {
            matched.push(inputSym);
          }
        }
      }
    }

    const matchCount = matched.length;
    const inputRatio = normalizedInput.length > 0 ? matchCount / normalizedInput.length : 0;
    const diseaseRatio = diseaseSyms.length > 0 ? matchCount / diseaseSyms.length : 0;

    let confidence = 0;
    if (matchCount > 0) {
      confidence = Math.min(98, Math.max(35, Math.round((inputRatio * 0.6 + diseaseRatio * 0.4) * 95)));
    } else {
      confidence = 15;
    }

    return {
      ...disease,
      matchedSymptoms: matched.length > 0 ? matched : [disease.symptoms[0]],
      matchCount,
      confidence: confidence,
      confidenceDefault: confidence
    };
  }).sort((a, b) => {
    if (b.matchCount !== a.matchCount) {
      return b.matchCount - a.matchCount;
    }
    return b.confidence - a.confidence;
  });

  const primaryMatch = scoredDiseases[0] || MOCK_DISEASES[0];

  try {
    // 1. Attempt to connect to Python FastAPI ML Microservice
    const mlBaseUrl = import.meta.env.VITE_ML_API_URL || 'http://localhost:8000';
    const aiResponse = await axios.post(`${mlBaseUrl}/predict`, {
      symptoms: selectedSymptoms
    }, { timeout: 5000 });

    if (aiResponse.data && aiResponse.data.success) {
      const pred = aiResponse.data.prediction;

      const mlPossibleDiseases = (pred.topPredictions || []).map((tp) => {
        const localMatch = MOCK_DISEASES.find(
          (d) => d.name.toLowerCase() === tp.disease.toLowerCase()
        );
        return {
          id: 'dis-' + tp.disease.toLowerCase().replace(/[^a-z0-9]/g, ''),
          name: tp.disease,
          icon: localMatch?.icon || '🩺',
          category: localMatch?.category || 'Clinical Diagnosis',
          severity: tp.severity || localMatch?.severity || 'Moderate',
          confidence: Math.round(tp.confidence),
          confidenceDefault: Math.round(tp.confidence),
          overview: localMatch?.overview || `Possible condition match evaluated with ${tp.confidence}% AI confidence.`,
          symptoms: localMatch?.symptoms || pred.matchedSymptoms || selectedSymptoms,
          matchedSymptoms: pred.matchedSymptoms || selectedSymptoms,
          precautions: tp.precautions || localMatch?.precautions || ['Consult a certified physician'],
          recommendedDoctor: tp.doctor || localMatch?.recommendedDoctor || 'General Physician',
          homeRemedies: localMatch?.homeRemedies || ['Stay well hydrated', 'Bed rest'],
          medicines: localMatch?.medicines || [{ name: 'Symptom Relief OTC', usage: 'As prescribed by physician' }],
          emergencyWarning: localMatch?.emergencyWarning || 'Seek immediate medical attention if severe shortness of breath occurs.'
        };
      });

      const localMatch = MOCK_DISEASES.find(
        (d) => d.name.toLowerCase() === pred.primaryDisease.toLowerCase()
      );

      return {
        success: true,
        data: {
          id: 'dis-' + pred.primaryDisease.toLowerCase().replace(/[^a-z0-9]/g, ''),
          name: pred.primaryDisease,
          icon: localMatch?.icon || '🩺',
          category: localMatch?.category || 'AI Clinical Diagnosis',
          severity: pred.severity || localMatch?.severity || 'Moderate',
          confidenceDefault: Math.round(pred.confidence),
          overview: localMatch?.overview || `AI model predicted ${pred.primaryDisease} with ${pred.confidence}% confidence score based on clinical symptom vectors.`,
          causes: localMatch?.causes || ['Infection / Clinical etiology'],
          symptoms: pred.matchedSymptoms || selectedSymptoms,
          matchedSymptoms: pred.matchedSymptoms || selectedSymptoms,
          precautions: pred.precautions && pred.precautions.length > 0 ? pred.precautions : (localMatch?.precautions || ['Consult a certified physician']),
          treatments: localMatch?.treatments || ['Symptomatic treatment under medical guidance'],
          prevention: localMatch?.prevention || ['Maintain personal hygiene'],
          recoveryTips: localMatch?.recoveryTips || 'Rest adequately and monitor symptoms.',
          recommendedDoctor: pred.doctor || localMatch?.recommendedDoctor || 'General Physician',
          homeRemedies: localMatch?.homeRemedies || ['Stay well hydrated', 'Bed rest'],
          medicines: localMatch?.medicines || [{ name: 'Symptom Relief OTC', usage: 'As prescribed by physician' }],
          emergencyWarning: localMatch?.emergencyWarning || 'Seek immediate medical attention if severe chest pain or shortness of breath occurs.',
          relatedDiseases: localMatch?.relatedDiseases || ['General Infection'],
          possibleDiseases: mlPossibleDiseases.length > 0 ? mlPossibleDiseases : scoredDiseases
        }
      };
    }
  } catch (aiError) {
    console.log('[AI Microservice Offline] Falling back to dynamic client-side clinical matching algorithm.');
  }

  // 2. Client-side fallback matching result
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    success: true,
    data: {
      ...primaryMatch,
      confidenceDefault: primaryMatch.confidence,
      predictionDate: new Date().toISOString().split('T')[0],
      possibleDiseases: scoredDiseases
    }
  };
};

export default API;
