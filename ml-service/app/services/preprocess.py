import numpy as np
from typing import List, Tuple

def create_feature_vector(user_symptoms: List[str], symptom_list: List[str]) -> Tuple[np.ndarray, List[str], List[str]]:
    """
    Converts input symptoms list into a 1D numpy binary feature vector.
    Returns: (vector, matched_symptoms, invalid_symptoms)
    """
    normalized_user = [s.strip().lower().replace(" ", "_") for s in user_symptoms]
    symptom_set = set(symptom_list)

    matched = []
    invalid = []

    for sym in normalized_user:
        if sym in symptom_set:
            matched.append(sym)
        else:
            # Also try matching space vs underscore
            alt_sym = sym.replace("_", " ")
            if alt_sym in symptom_set:
                matched.append(alt_sym)
            else:
                invalid.append(sym)

    vector = np.zeros(len(symptom_list), dtype=int)
    for idx, sym in enumerate(symptom_list):
        if sym in matched or sym.replace("_", " ") in matched:
            vector[idx] = 1

    return vector.reshape(1, -1), matched, invalid
