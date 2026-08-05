import os
import joblib
import numpy as np
from typing import List, Dict, Any
from app.services.preprocess import create_feature_vector
from app.utils.logger import logger

# Extended Medical Metadata Mapping for Predictions
MEDICAL_METADATA = {
    "Fungal infection": {
        "doctor": "Dermatologist",
        "severity": "Low",
        "precautions": ["Keep infected area clean and dry", "Use prescribed topical antifungal creams", "Avoid sharing towels or clothing"]
    },
    "Allergy": {
        "doctor": "Allergist / Immunologist",
        "severity": "Low",
        "precautions": ["Avoid known environmental triggers", "Use antihistamines as directed", "Keep windows closed during high pollen counts"]
    },
    "GERD": {
        "doctor": "Gastroenterologist",
        "severity": "Medium",
        "precautions": ["Avoid spicy, acidic, and fatty foods", "Do not lie down immediately after meals", "Elevate head of bed while sleeping"]
    },
    "COVID-19 Respiratory Infection": {
        "doctor": "Pulmonologist / Infectious Disease",
        "severity": "High",
        "precautions": ["Isolate in a well-ventilated room", "Monitor oxygen saturation with pulse oximeter", "Stay well hydrated"]
    },
    "Typhoid": {
        "doctor": "General Physician / Infectious Disease",
        "severity": "High",
        "precautions": ["Drink boiled or purified water", "Eat thoroughly cooked fresh hot food", "Maintain strict hand hygiene"]
    },
    "Malaria": {
        "doctor": "Infectious Disease Specialist",
        "severity": "High",
        "precautions": ["Use mosquito bed nets and repellents", "Take prescribed antimalarial course", "Keep surroundings free of stagnant water"]
    },
    "Dengue": {
        "doctor": "General Physician / Hematologist",
        "severity": "High",
        "precautions": ["Ensure continuous fluid replacement", "Monitor blood platelet counts", "Avoid NSAIDs like aspirin/ibuprofen"]
    },
    "Migraine": {
        "doctor": "Neurologist",
        "severity": "Medium",
        "precautions": ["Rest in a dark, quiet room", "Apply cold compresses to temples", "Avoid skipping meals and stay hydrated"]
    },
    "Common Cold": {
        "doctor": "General Physician",
        "severity": "Low",
        "precautions": ["Get adequate bed rest", "Drink warm broths and lemon water", "Gargle with warm salt water"]
    },
    "Pneumonia": {
        "doctor": "Pulmonologist",
        "severity": "High",
        "precautions": ["Complete full prescribed course of antibiotics", "Use humidifier or steam inhalation", "Seek immediate care if breathing deteriorates"]
    },
    "Diabetes": {
        "doctor": "Endocrinologist",
        "severity": "Medium",
        "precautions": ["Monitor blood glucose levels regularly", "Maintain a low-glycemic balanced diet", "Engage in daily aerobic exercise"]
    },
    "Hypertension": {
        "doctor": "Cardiologist",
        "severity": "Medium",
        "precautions": ["Restrict dietary sodium to under 2g daily", "Avoid tobacco and excessive alcohol", "Keep a daily blood pressure log"]
    },
    "Jaundice": {
        "doctor": "Hepatologist / Gastroenterologist",
        "severity": "High",
        "precautions": ["Avoid alcohol and hepatotoxic medications completely", "Maintain strict boiled water hygiene", "Rest until liver enzymes normalize"]
    },
    "Bronchial Asthma": {
        "doctor": "Pulmonologist / Allergist",
        "severity": "Medium",
        "precautions": ["Carry rescue bronchodilator inhaler at all times", "Avoid cold air and smoke triggers", "Use peak flow meter daily"]
    },
    "Urinary tract infection": {
        "doctor": "Urologist",
        "severity": "Low",
        "precautions": ["Drink at least 3 liters of water daily", "Do not delay urinating", "Complete all prescribed antibiotic doses"]
    }
}

DEFAULT_METADATA = {
    "doctor": "General Physician",
    "severity": "Medium",
    "precautions": [
        "Consult a certified physician for formal diagnostic confirmation",
        "Monitor symptom progression closely",
        "Seek emergency medical evaluation if high fever or breathing distress occurs"
    ]
}

class DiseasePredictor:
    def __init__(self):
        self.model = None
        self.label_encoder = None
        self.symptom_list = None
        self.is_loaded = False

    def load_artifacts(self, base_path: str = None):
        if self.is_loaded:
            return

        if base_path is None:
            base_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

        models_dir = os.path.join(base_path, 'models')
        model_path = os.path.join(models_dir, 'disease_model.pkl')
        encoder_path = os.path.join(models_dir, 'label_encoder.pkl')
        symptoms_path = os.path.join(models_dir, 'symptom_list.pkl')

        try:
            if not os.path.exists(model_path):
                raise FileNotFoundError(f"Model file not found at: {model_path}")

            self.model = joblib.load(model_path)
            self.label_encoder = joblib.load(encoder_path)
            self.symptom_list = joblib.load(symptoms_path)
            self.is_loaded = True
            logger.info("[Predictor]: ML Model artifacts successfully loaded into memory!")
        except Exception as e:
            logger.error(f"[Predictor Error]: Failed to load ML model artifacts: {str(e)}")
            raise e

    def predict(self, user_symptoms: List[str]) -> Dict[str, Any]:
        if not self.is_loaded:
            raise RuntimeError("Model is not loaded. Call load_artifacts() first.")

        # Create binary vector
        vector, matched_symptoms, invalid_symptoms = create_feature_vector(user_symptoms, self.symptom_list)

        # Calculate prediction probabilities
        probabilities = self.model.predict_proba(vector)[0]
        top_indices = np.argsort(probabilities)[::-1]

        top_predictions = []
        for idx in top_indices:
            disease_name = str(self.label_encoder.inverse_transform([idx])[0])
            prob_percent = float(round(probabilities[idx] * 100, 1))
            meta = MEDICAL_METADATA.get(disease_name, DEFAULT_METADATA)
            top_predictions.append({
                "disease": disease_name,
                "confidence": prob_percent,
                "doctor": meta["doctor"],
                "severity": meta["severity"],
                "precautions": meta["precautions"]
            })

        primary = top_predictions[0]
        disease_name = primary["disease"]
        confidence = primary["confidence"]

        meta = MEDICAL_METADATA.get(disease_name, DEFAULT_METADATA)

        missing_symptoms = ["loss_of_appetite", "fatigue"]

        return {
            "primaryDisease": disease_name,
            "confidence": confidence,
            "topPredictions": top_predictions,
            "matchedSymptoms": matched_symptoms,
            "missingSymptoms": missing_symptoms,
            "doctor": meta["doctor"],
            "severity": meta["severity"],
            "precautions": meta["precautions"]
        }

predictor = DiseasePredictor()
