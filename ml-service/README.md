# MediSense Disease Prediction AI Microservice

Production-ready, async Python FastAPI microservice for **MediSense / Healora** providing scikit-learn machine learning inference for disease prediction from clinical symptom vectors.

---

## ⚡ Features

- **FastAPI Async Engine**: High-performance REST API with automatic OpenAPI (Swagger UI) documentation.
- **Ensemble Model Training**: `train_model.py` compares Random Forest, Decision Tree, and Naive Bayes models and automatically selects the highest-accuracy classifier.
- **In-Memory Lifespan Loading**: Model pickles (`.pkl`) are loaded once during server startup for ultra-fast `< 5ms` inference latency.
- **Enriched Medical Metadata**: Returns top-3 probability predictions, matched/missing symptoms, specialist doctor recommendation, severity level, and precautions.
- **Pydantic Validation**: Strict schema validation enforcing 1-17 unique symptoms per patient.
- **Docker & Cloud Ready**: Fully containerized and deployable to Docker, Render, or Railway.

---

## 🛠️ Tech Stack

- **Python**: 3.12+
- **Framework**: FastAPI + Uvicorn
- **Machine Learning**: scikit-learn, Pandas, NumPy, Joblib
- **Validation & Settings**: Pydantic v2, pydantic-settings

---

## ⚙️ Environment Variables

Create `.env` inside `ml-service/`:

```env
PORT=8000
HOST=0.0.0.0
ENVIRONMENT=development
LOG_LEVEL=INFO
CORS_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost:5000
```

---

## 🚀 Setup & Model Training

```bash
# Navigate to ml-service directory
cd ml-service

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Train ML Models & Export Artifacts
python training/train_model.py

# Start FastAPI Microservice
uvicorn app.main:app --reload --port 8000
```

Interactive Swagger UI documentation is available at: `http://localhost:8000/docs`

---

## 📡 API Endpoints & Curl Examples

### 1. Health Check
```bash
curl -X GET http://localhost:8000/health
```

**Response:**
```json
{
  "status": "healthy",
  "service": "MediSense Disease Prediction AI Microservice",
  "version": "1.0.0"
}
```

---

### 2. Get Available Symptoms List
```bash
curl -X GET http://localhost:8000/symptoms
```

---

### 3. Predict Single Patient Disease
```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms": ["fever", "vomiting", "headache"]
  }'
```

**Sample Response:**
```json
{
  "success": true,
  "prediction": {
    "primaryDisease": "Typhoid",
    "confidence": 94.7,
    "topPredictions": [
      { "disease": "Typhoid", "confidence": 94.7 },
      { "disease": "Malaria", "confidence": 3.8 },
      { "disease": "Dengue", "confidence": 1.5 }
    ],
    "matchedSymptoms": ["fever", "vomiting", "headache"],
    "missingSymptoms": ["loss_of_appetite", "fatigue"],
    "doctor": "General Physician / Infectious Disease",
    "severity": "High",
    "precautions": [
      "Drink boiled or purified water",
      "Eat thoroughly cooked fresh hot food",
      "Maintain strict hand hygiene"
    ]
  }
}
```

---

### 4. Predict Batch Patients
```bash
curl -X POST http://localhost:8000/predict/batch \
  -H "Content-Type: application/json" \
  -d '{
    "patients": [
      { "symptoms": ["itching", "skin_rash"] },
      { "symptoms": ["cough", "chest_pain", "breathlessness"] }
    ]
  }'
```

---

## 🐳 Docker & Cloud Deployment

### Run with Docker
```bash
docker build -t medisense-ai-service .
docker run -p 8000:8000 medisense-ai-service
```

### Deploy to Render / Railway
1. Connect your repository to Render/Railway.
2. Set Environment variables (`PORT=8000`).
3. Set Build command: `pip install -r requirements.txt && python training/train_model.py`
4. Set Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
