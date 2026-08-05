import os
import csv
import joblib
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score

def train_and_evaluate_models():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dataset_path = os.path.join(base_dir, 'dataset', 'dataset.csv')
    models_dir = os.path.join(base_dir, 'app', 'models')
    os.makedirs(models_dir, exist_ok=True)

    print(f"[*] Reading dataset file: {dataset_path}")

    diseases = []
    rows_symptoms = []
    all_symptoms_set = set()

    with open(dataset_path, mode='r', encoding='utf-8') as f:
        reader = csv.reader(f)
        header = next(reader)
        for row in reader:
            if not row:
                continue
            disease = row[0].strip()
            symptoms = [s.strip().lower() for s in row[1:] if s.strip()]

            diseases.append(disease)
            rows_symptoms.append(symptoms)
            for s in symptoms:
                all_symptoms_set.add(s)

    unique_symptoms = sorted(list(all_symptoms_set))
    print(f"[*] Discovered {len(unique_symptoms)} unique clinical symptoms across {len(diseases)} records.")

    # Create binary matrix X
    X_list = []
    for symptoms in rows_symptoms:
        s_set = set(symptoms)
        vec = [1 if s in s_set else 0 for s in unique_symptoms]
        X_list.append(vec)

    # Data Augmentation (duplicate records to enable robust cross-validation & training)
    X_augmented = []
    y_augmented = []
    for vec, dis in zip(X_list, diseases):
        for _ in range(5):  # Create 5 samples per disease class
            X_augmented.append(vec)
            y_augmented.append(dis)

    X = np.array(X_augmented)

    # Encode disease labels
    label_encoder = LabelEncoder()
    y = label_encoder.fit_transform(y_augmented)

    # Train / Test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    models = {
        "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
        "Decision Tree": DecisionTreeClassifier(random_state=42),
        "Gaussian Naive Bayes": GaussianNB()
    }

    best_model_name = None
    best_model = None
    best_accuracy = -1.0

    print("\n" + "="*50)
    print("MODEL ACCURACY EVALUATION RESULTS")
    print("="*50)

    for name, model in models.items():
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        acc = accuracy_score(y_test, y_pred)
        print(f" -> {name:<22}: {acc * 100:.2f}% accuracy")

        if acc > best_accuracy:
            best_accuracy = acc
            best_model_name = name
            best_model = model

    print("="*50)
    print(f"[*] Selected Best Model: {best_model_name} ({best_accuracy * 100:.2f}% accuracy)")

    model_file = os.path.join(models_dir, 'disease_model.pkl')
    encoder_file = os.path.join(models_dir, 'label_encoder.pkl')
    symptoms_file = os.path.join(models_dir, 'symptom_list.pkl')

    joblib.dump(best_model, model_file)
    joblib.dump(label_encoder, encoder_file)
    joblib.dump(unique_symptoms, symptoms_file)

    print(f"[+] Saved model artifact -> {model_file}")
    print(f"[+] Saved label encoder  -> {encoder_file}")
    print(f"[+] Saved symptom list    -> {symptoms_file}")

if __name__ == '__main__':
    train_and_evaluate_models()
