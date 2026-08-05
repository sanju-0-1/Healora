import Disease from '../models/Disease.js';

export const analyzeSymptomsService = async (userSymptoms = []) => {
  if (!userSymptoms || userSymptoms.length === 0) {
    throw new Error('Symptoms array cannot be empty');
  }

  const normalizedUserSymptoms = userSymptoms.map((s) => s.toLowerCase().trim());
  const diseases = await Disease.find();

  if (!diseases || diseases.length === 0) {
    // Return structured default if database contains no disease records yet
    return {
      predictedDisease: 'General Viral Infection',
      confidence: 85,
      severity: 'Low',
      doctorType: 'General Physician'
    };
  }

  let bestMatch = null;
  let highestMatchScore = -1;

  for (const disease of diseases) {
    const diseaseSymptoms = disease.symptoms.map((s) => s.toLowerCase().trim());
    let matchCount = 0;

    for (const symptom of normalizedUserSymptoms) {
      if (diseaseSymptoms.includes(symptom)) {
        matchCount++;
      }
    }

    if (matchCount > highestMatchScore) {
      highestMatchScore = matchCount;
      bestMatch = {
        disease,
        matchCount,
        totalDiseaseSymptoms: diseaseSymptoms.length
      };
    }
  }

  if (!bestMatch || bestMatch.matchCount === 0) {
    const fallback = diseases[0];
    return {
      predictedDisease: fallback.name,
      confidence: 70,
      severity: fallback.severity,
      doctorType: fallback.doctorType
    };
  }

  const matchRatio = bestMatch.matchCount / normalizedUserSymptoms.length;
  const calculatedConfidence = Math.min(98, Math.max(65, Math.round(matchRatio * 100)));

  return {
    predictedDisease: bestMatch.disease.name,
    confidence: calculatedConfidence,
    severity: bestMatch.disease.severity,
    doctorType: bestMatch.disease.doctorType
  };
};

export default { analyzeSymptomsService };
