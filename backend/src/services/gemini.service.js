import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `You are Dr. Healora, a distinguished Chief AI Medical Specialist and virtual physician at Healora Healthcare. 
Your goal is to converse, reason, and consult EXACTLY like a senior, compassionate, highly professional doctor.

Key Guidelines for your Doctor Persona:
1. TONE & MANNERISMS:
   - Speak with empathy, clarity, authority, and warmth.
   - Address the patient respectfully (e.g., "Hello, I'm Dr. Healora. I'm here to review your medical query.").
   - Reassure anxious patients while maintaining clinical accuracy.

2. STRUCTURED CLINICAL RESPONSE:
   Organize your response using clear markdown headings and bullet points:
   - 🩺 **Clinical Overview**: Explain the condition, etiology, or symptoms clearly in understandable language.
   - 💡 **Medical Recommendations & Self-Care**: Practical steps (hydration, diet, OTC care, rest, habits).
   - 👨‍⚕️ **Recommended Specialist**: Which doctor specialty (e.g., Dermatologist, Cardiologist, Neurologist, General Practitioner) they should see if symptoms persist.
   - 🚨 **Red Flag Symptoms**: Clear signs when they must seek immediate emergency medical care.

3. MEDICAL SAFETY & SCOPE:
   - Provide accurate, evidence-based medical knowledge.
   - Do not diagnose with 100% absolute certainty without physical examination.
   - Do not write formal drug prescriptions, but you can mention general OTC relief options (e.g., Paracetamol for fever, oral rehydration for dehydration) with advice to verify with a pharmacist/physician.

4. CONTEXT INTEGRATION:
   - If the patient shares recent Healora disease prediction results or symptom logs, reference those specific details in your clinical assessment.

5. MEDICAL DISCLAIMER:
   - Always conclude with a brief, professional medical note:
     *_Disclaimer: I am Dr. Healora, an AI medical consultant. My advice is for informational and educational purposes and does not replace a physical examination by a licensed physician._*
`;

/**
 * Generate a response from Dr. Healora using Gemini API
 * @param {Array} history - Array of previous messages [{ role: 'user'|'model', text: string }]
 * @param {string} userPrompt - Current user message
 * @param {Object} medicalContext - Optional disease context { diseaseName, symptoms, confidence }
 * @param {string} customApiKey - Optional custom API key passed from header
 */
export const getDoctorResponse = async ({
  history = [],
  userPrompt,
  medicalContext = null,
  customApiKey = null
}) => {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    return {
      success: false,
      response: `Hello, I am Dr. Healora. To enable my AI clinical consultation system, please configure your Gemini API key in the backend environment file (\`GEMINI_API_KEY\` in \`backend/.env\`) or provide it in the consultation settings.`,
      needsApiKey: true
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Format chat history into Gemini contents format
    const contents = [];

    // Inject active medical context if available
    let contextPrompt = '';
    if (medicalContext && medicalContext.diseaseName) {
      contextPrompt = `[PATIENT MEDICAL FILE CONTEXT: Patient recently ran a symptom scan. Predicted Condition: "${medicalContext.diseaseName}", Symptoms reported: "${(medicalContext.symptoms || []).join(', ')}", Confidence: ${medicalContext.confidence || 'N/A'}%].\n\n`;
    }

    // Convert past history to Gemini contents structure
    for (const msg of history) {
      const role = msg.sender === 'doctor' || msg.role === 'model' ? 'model' : 'user';
      contents.push({
        role,
        parts: [{ text: msg.text || msg.content || '' }]
      });
    }

    // Add current user prompt with context if present
    contents.push({
      role: 'user',
      parts: [{ text: `${contextPrompt}${userPrompt}` }]
    });

    // We try gemini-2.5-flash first, with fallback to gemini-2.0-flash or gemini-1.5-flash
    let modelName = 'gemini-2.5-flash';
    let result;

    try {
      result = await ai.models.generateContent({
        model: modelName,
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.5,
          topP: 0.95
        }
      });
    } catch (firstModelError) {
      console.warn(`[Dr. Healora AI] ${modelName} failed, falling back to gemini-1.5-flash...`, firstModelError.message);
      modelName = 'gemini-1.5-flash';
      result = await ai.models.generateContent({
        model: modelName,
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.5,
          topP: 0.95
        }
      });
    }

    const doctorReply = result.text || result.response?.text?.() || "I apologize, I was unable to process your request at this moment. Please try asking again.";

    return {
      success: true,
      response: doctorReply,
      modelUsed: modelName
    };
  } catch (error) {
    console.error('[Dr. Healora AI Service Error]:', error);
    return {
      success: false,
      error: error.message || 'An error occurred while connecting to Dr. Healora AI service.',
      response: `Dr. Healora is currently unable to connect to the medical AI model. Error detail: ${error.message}`
    };
  }
};
