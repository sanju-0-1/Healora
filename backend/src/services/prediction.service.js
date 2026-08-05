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

  const matches = diseases.map((disease) => {
    const diseaseSymptoms = disease.symptoms.map((s) => s.toLowerCase().trim());
    let matchCount = 0;
    const matchedSymptomsList = [];

    for (const symptom of normalizedUserSymptoms) {
      if (diseaseSymptoms.includes(symptom)) {
        matchCount++;
        matchedSymptomsList.push(symptom);
      }
    }

    const matchRatio = normalizedUserSymptoms.length > 0 ? matchCount / normalizedUserSymptoms.length : 0;
    const calculatedConfidence = matchCount > 0
      ? Math.min(98, Math.max(45, Math.round(matchRatio * 95)))
      : 20;

    return {
      disease: disease.name,
      confidence: calculatedConfidence,
      severity: disease.severity,
      doctorType: disease.doctorType,
      matchCount,
      symptoms: disease.symptoms,
      matchedSymptoms: matchedSymptomsList
    };
  }).sort((a, b) => b.confidence - a.confidence);

  const primaryMatch = matches[0] || {
    disease: 'General Viral Infection',
    confidence: 70,
    severity: 'Low',
    doctorType: 'General Physician',
    matchedSymptoms: normalizedUserSymptoms
  };

  return {
    predictedDisease: primaryMatch.disease,
    confidence: primaryMatch.confidence,
    severity: primaryMatch.severity,
    doctorType: primaryMatch.doctorType,
    possibleDiseases: matches
  };
};

export default { analyzeSymptomsService };
