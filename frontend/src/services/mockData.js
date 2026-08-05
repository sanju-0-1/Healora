export const MOCK_SYMPTOMS = [
  { id: 'sym-1', name: 'Fever', category: 'General' },
  { id: 'sym-2', name: 'Cough', category: 'Respiratory' },
  { id: 'sym-3', name: 'Fatigue', category: 'General' },
  { id: 'sym-4', name: 'Headache', category: 'Neurological' },
  { id: 'sym-5', name: 'Shortness of breath', category: 'Respiratory' },
  { id: 'sym-6', name: 'Sore throat', category: 'Respiratory' },
  { id: 'sym-7', name: 'Chest pain', category: 'Cardiovascular' },
  { id: 'sym-8', name: 'Nausea', category: 'Gastrointestinal' },
  { id: 'sym-9', name: 'Loss of taste/smell', category: 'General' },
  { id: 'sym-10', name: 'Joint pain', category: 'Musculoskeletal' },
  { id: 'sym-11', name: 'Muscle aches', category: 'Musculoskeletal' },
  { id: 'sym-12', name: 'Chills & Sweats', category: 'General' },
  { id: 'sym-13', name: 'Runny nose', category: 'Respiratory' },
  { id: 'sym-14', name: 'Diarrhea', category: 'Gastrointestinal' },
  { id: 'sym-15', name: 'Dizziness', category: 'Neurological' },
  { id: 'sym-16', name: 'Abdominal pain', category: 'Gastrointestinal' },
  { id: 'sym-17', name: 'Skin rash', category: 'Dermatological' },
  { id: 'sym-18', name: 'Loss of appetite', category: 'General' },
  { id: 'sym-19', name: 'High blood pressure', category: 'Cardiovascular' },
  { id: 'sym-20', name: 'Frequent urination', category: 'Urological' },
  { id: 'sym-21', name: 'Weight loss', category: 'Endocrine' },
  { id: 'sym-22', name: 'Weight gain', category: 'Endocrine' },
  { id: 'sym-23', name: 'Blurred vision', category: 'Ophthalmology' },
  { id: 'sym-24', name: 'Increased thirst', category: 'Endocrine' },
  { id: 'sym-25', name: 'Stiff neck', category: 'Neurological' },
  { id: 'sym-26', name: 'Chest tightness', category: 'Respiratory' },
  { id: 'sym-27', name: 'Swollen joints', category: 'Musculoskeletal' },
  { id: 'sym-28', name: 'Yellowish skin', category: 'Dermatological' },
  { id: 'sym-29', name: 'Dark urine', category: 'Urological' },
  { id: 'sym-30', name: 'Burning urination', category: 'Urological' },
  { id: 'sym-31', name: 'Acidity', category: 'Gastrointestinal' },
  { id: 'sym-32', name: 'Indigestion', category: 'Gastrointestinal' },
  { id: 'sym-33', name: 'Itching', category: 'Dermatological' },
  { id: 'sym-34', name: 'Back pain', category: 'Musculoskeletal' },
  { id: 'sym-35', name: 'Muscle cramps', category: 'Musculoskeletal' }
];

export const MOCK_DISEASES = [
  {
    id: 'dis-covid19',
    name: 'COVID-19 Respiratory Infection',
    icon: '🦠',
    category: 'Viral Infection',
    severity: 'Moderate',
    confidenceDefault: 94,
    overview: 'COVID-19 is a contagious viral illness caused by the SARS-CoV-2 virus affecting primarily the respiratory tract.',
    causes: [
      'Transmission through airborne respiratory droplets from infected individuals',
      'Direct physical contact with contaminated surfaces followed by touching face'
    ],
    symptoms: ['Fever', 'Cough', 'Fatigue', 'Loss of taste/smell', 'Shortness of breath', 'Muscle aches'],
    precautions: [
      'Isolate in a well-ventilated room to prevent household transmission',
      'Wear an N95 or surgical mask around others',
      'Monitor blood oxygen levels (SpO2) regularly with a pulse oximeter'
    ],
    treatments: [
      'Symptomatic care with antipyretics for fever control',
      'Antiviral medications under direct physician prescription'
    ],
    prevention: ['Keep up-to-date with booster vaccinations', 'Wash hands thoroughly with soap'],
    recoveryTips: 'Rest adequately, avoid strenuous exercise for 2 weeks, and perform gentle breathing exercises.',
    recommendedDoctor: 'Pulmonologist / Infectious Disease Specialist',
    homeRemedies: ['Warm saltwater gargles 3x daily', 'Steam inhalation with eucalyptus drops'],
    medicines: [
      { name: 'Paracetamol (500mg)', usage: '1 tablet every 6 hours for fever relief' },
      { name: 'Vitamin C & Zinc Supplements', usage: 'Daily immune system support' }
    ],
    emergencyWarning: 'Seek immediate emergency medical attention if SpO2 drops below 92%, or if you experience persistent chest tightness.',
    relatedDiseases: ['Influenza Type A', 'Bronchitis', 'Viral Pneumonia']
  },
  {
    id: 'dis-diabetes',
    name: 'Type 2 Diabetes Mellitus',
    icon: '🩸',
    category: 'Endocrine & Metabolic',
    severity: 'Moderate',
    confidenceDefault: 92,
    overview: 'A chronic metabolic disorder characterized by elevated blood glucose levels due to insulin resistance.',
    causes: ['Insulin resistance combined with deficient insulin secretion', 'Genetic predisposition and physical inactivity'],
    symptoms: ['Frequent urination', 'Increased thirst', 'Weight loss', 'Fatigue', 'Blurred vision'],
    precautions: ['Monitor blood glucose levels regularly', 'Maintain a low-glycemic balanced diet', 'Engage in daily aerobic exercise'],
    treatments: ['Oral hypoglycemic agents (Metformin)', 'Insulin therapy if prescribed'],
    prevention: ['Maintain healthy body weight', 'Avoid sugary beverages and refined carbohydrates'],
    recoveryTips: 'Follow a structured diabetes management plan and perform routine foot examinations.',
    recommendedDoctor: 'Endocrinologist',
    homeRemedies: ['Cinnamon tea', 'Fenugreek water intake in morning'],
    medicines: [{ name: 'Metformin (500mg)', usage: '1 tablet twice daily with meals' }],
    emergencyWarning: 'Seek emergency care if experiencing confusion, extreme thirst, or deep rapid breathing (Ketoacidosis).',
    relatedDiseases: ['Hypertension', 'Metabolic Syndrome', 'Hyperthyroidism']
  },
  {
    id: 'dis-hypertension',
    name: 'Essential Hypertension',
    icon: '🫀',
    category: 'Cardiovascular',
    severity: 'Moderate',
    confidenceDefault: 90,
    overview: 'A long-term medical condition in which blood pressure in the arteries is persistently elevated.',
    causes: ['High dietary sodium intake', 'Chronic psychological stress', 'Lack of exercise and obesity'],
    symptoms: ['High blood pressure', 'Headache', 'Dizziness', 'Chest pain'],
    precautions: ['Restrict dietary sodium to under 2g daily', 'Avoid tobacco and excessive alcohol'],
    treatments: ['Antihypertensive therapy (ACE inhibitors, Beta Blockers)'],
    prevention: ['DASH diet (Dietary Approaches to Stop Hypertension)', 'Regular cardiovascular exercise'],
    recoveryTips: 'Keep a daily blood pressure log and practice relaxation breathing.',
    recommendedDoctor: 'Cardiologist',
    homeRemedies: ['Hibiscus tea', 'Garlic extract supplementation'],
    medicines: [{ name: 'Amlodipine (5mg)', usage: '1 tablet once daily in the morning' }],
    emergencyWarning: 'Go to emergency department immediately if BP exceeds 180/120 mmHg with chest tightness or numbness.',
    relatedDiseases: ['Coronary Artery Disease', 'Stroke', 'Kidney Disease']
  },
  {
    id: 'dis-asthma',
    name: 'Bronchial Asthma',
    icon: '🫁',
    category: 'Respiratory',
    severity: 'Moderate',
    confidenceDefault: 89,
    overview: 'A chronic respiratory condition in which airways narrow, swell, and produce extra mucus causing breathing difficulty.',
    causes: ['Airborne allergic triggers (pollen, dust mites)', 'Cold air exposure or strenuous physical exercise'],
    symptoms: ['Shortness of breath', 'Cough', 'Chest tightness', 'Fatigue'],
    precautions: ['Carry rescue bronchodilator inhaler at all times', 'Avoid known cold or smoke triggers'],
    treatments: ['Inhaled corticosteroids for control', 'Short-acting beta agonists (Albuterol) for acute attacks'],
    prevention: ['Identify environmental triggers', 'Keep indoor spaces free of dust and pet dander'],
    recoveryTips: 'Use peak flow meter daily to track airway obstruction status.',
    recommendedDoctor: 'Pulmonologist / Allergist',
    homeRemedies: ['Warm ginger tea', 'Steam inhalation'],
    medicines: [{ name: 'Salbutamol / Albuterol Inhaler', usage: '2 puffs as needed during acute wheezing' }],
    emergencyWarning: 'Seek emergency care immediately if unable to speak in full sentences due to breathlessness.',
    relatedDiseases: ['COPD', 'Allergic Rhinitis', 'Bronchitis']
  },
  {
    id: 'dis-jaundice',
    name: 'Jaundice / Acute Hepatitis',
    icon: '🟡',
    category: 'Hepatic & Liver',
    severity: 'High',
    confidenceDefault: 93,
    overview: 'A condition causing yellowing of skin and eyes due to high bilirubin levels from underlying liver dysfunction.',
    causes: ['Viral hepatitis (A, B, or C) infection', 'Biliary tract obstruction or alcohol toxicity'],
    symptoms: ['Yellowish skin', 'Dark urine', 'Fatigue', 'Nausea', 'Loss of appetite', 'Abdominal pain'],
    precautions: ['Avoid alcohol and hepatotoxic medications completely', 'Maintain strict boiled water hygiene'],
    treatments: ['Antiviral therapy for specific viral strains', 'Supportive liver care and hydration'],
    prevention: ['Hepatitis B vaccination', 'Avoid unsterile needles and contaminated water'],
    recoveryTips: 'Consume light, low-fat bland meals and rest completely until liver enzymes normalize.',
    recommendedDoctor: 'Hepatologist / Gastroenterologist',
    homeRemedies: ['Fresh sugarcane juice', 'Papaya leaf extract tea'],
    medicines: [{ name: 'Silymarin / Liver Tonic', usage: '1 capsule daily as prescribed' }],
    emergencyWarning: 'Seek immediate emergency admission if experiencing yellowing of eyes with confusion or severe abdominal distension.',
    relatedDiseases: ['Cirrhosis', 'Gallstones', 'Pancreatitis']
  },
  {
    id: 'dis-malaria',
    name: 'Malaria Parasitic Infection',
    icon: '🦟',
    category: 'Vector-Borne Infection',
    severity: 'High',
    confidenceDefault: 95,
    overview: 'A mosquito-borne infectious disease caused by Plasmodium parasites transmitted through Anopheles mosquito bites.',
    causes: ['Bite of an infected female Anopheles mosquito'],
    symptoms: ['Fever', 'Chills & Sweats', 'Headache', 'Nausea', 'Muscle aches', 'Joint pain'],
    precautions: ['Sleep under insecticide-treated bed nets', 'Apply insect repellent containing DEET'],
    treatments: ['Artemisinin-based combination therapy (ACT)', 'Chloroquine under medical guidance'],
    prevention: ['Eliminate stagnant water around residential areas', 'Chemoprophylaxis when traveling'],
    recoveryTips: 'Complete full antiparasitic drug course even after fever drops.',
    recommendedDoctor: 'Infectious Disease Specialist',
    homeRemedies: ['Cinnamon water', 'Ginger and honey infusion'],
    medicines: [{ name: 'Artemether + Lumefantrine', usage: 'Prescription course as directed by doctor' }],
    emergencyWarning: 'Seek urgent hospital care if high fever cycles are accompanied by severe dark urine or confusion.',
    relatedDiseases: ['Dengue Fever', 'Typhoid', 'Chikungunya']
  },
  {
    id: 'dis-dengue',
    name: 'Dengue Hemorrhagic Fever',
    icon: '🩸',
    category: 'Vector-Borne Infection',
    severity: 'High',
    confidenceDefault: 94,
    overview: 'A viral mosquito-borne infection causing severe flu-like illness and sudden drop in blood platelet counts.',
    causes: ['Bite of Aedes aegypti mosquitoes carrying Dengue virus'],
    symptoms: ['Fever', 'Skin rash', 'Joint pain', 'Headache', 'Muscle aches', 'Nausea'],
    precautions: ['Maintain continuous high fluid intake', 'Monitor blood platelet count daily'],
    treatments: ['Supportive fluid replacement therapy', 'Platelet transfusion in severe drops'],
    prevention: ['Prevent mosquito breeding in standing water', 'Wear full-sleeved protective clothing'],
    recoveryTips: 'Rest strictly and avoid taking NSAIDs like aspirin or ibuprofen which increase bleeding risks.',
    recommendedDoctor: 'Hematologist / General Physician',
    homeRemedies: ['Fresh papaya leaf juice', 'Coconut water for electrolytes'],
    medicines: [{ name: 'Paracetamol (500mg)', usage: '1 tablet for fever control (Avoid Aspirin)' }],
    emergencyWarning: 'Emergency room admission required if severe abdominal pain, persistent vomiting, or nose bleeding occurs.',
    relatedDiseases: ['Malaria', 'Zika Virus', 'Chikungunya']
  },
  {
    id: 'dis-uti',
    name: 'Urinary Tract Infection (UTI)',
    icon: '🚽',
    category: 'Urological',
    severity: 'Low',
    confidenceDefault: 88,
    overview: 'An infection in any part of the urinary system, commonly affecting the bladder or kidneys.',
    causes: ['Bacterial proliferation (Escherichia coli) entering the urethra'],
    symptoms: ['Burning urination', 'Frequent urination', 'Abdominal pain', 'Fever', 'Dark urine'],
    precautions: ['Drink at least 3 liters of water daily', 'Do not delay urinating when feeling the urge'],
    treatments: ['Prescription oral antibiotic course (Nitrofurantoin / Ciprofloxacin)'],
    prevention: ['Wipe front to back after voiding', 'Urinate immediately following sexual activity'],
    recoveryTips: 'Drink unsweetened cranberry juice and complete all prescribed antibiotic doses.',
    recommendedDoctor: 'Urologist',
    homeRemedies: ['Unsweetened cranberry juice', 'Baking soda water rinse'],
    medicines: [{ name: 'Nitrofurantoin (100mg)', usage: '1 capsule twice daily for 5 days as prescribed' }],
    emergencyWarning: 'Consult urgent care if burning urination is accompanied by high fever and severe back/flank pain.',
    relatedDiseases: ['Pyelonephritis', 'Kidney Stones', 'Cystitis']
  },
  {
    id: 'dis-pneumonia',
    name: 'Bacterial Pneumonia',
    icon: '🫁',
    category: 'Respiratory Infection',
    severity: 'High',
    confidenceDefault: 93,
    overview: 'An infection that inflames air sacs in one or both lungs, filling them with fluid or pus.',
    causes: ['Streptococcus pneumoniae infection or viral complications'],
    symptoms: ['Fever', 'Cough', 'Shortness of breath', 'Chest pain', 'Chills & Sweats', 'Fatigue'],
    precautions: ['Use prescribed antibiotic regimen completely', 'Utilize steam inhalation or chest physiotherapy'],
    treatments: ['Targeted antibiotic therapy', 'Oxygen support in severe hypoxemia'],
    prevention: ['Pneumococcal conjugate vaccination', 'Annual flu vaccination'],
    recoveryTips: 'Avoid smoking and perform deep breathing exercises twice daily.',
    recommendedDoctor: 'Pulmonologist',
    homeRemedies: ['Warm honey tea', 'Eucalyptus steam inhalation'],
    medicines: [{ name: 'Amoxicillin + Clavulanate (625mg)', usage: '1 tablet twice daily as prescribed' }],
    emergencyWarning: 'Go to emergency care immediately if blue lips/nails develop or SpO2 drops below 92%.',
    relatedDiseases: ['Bronchitis', 'COVID-19', 'Tuberculosis']
  },
  {
    id: 'dis-flu',
    name: 'Seasonal Influenza (Flu)',
    icon: '🌡️',
    category: 'Respiratory Infection',
    severity: 'Low',
    confidenceDefault: 88,
    overview: 'An acute viral infection of the upper respiratory tract caused by influenza viruses.',
    causes: ['Inhalation of flu virus droplets airborne from coughs and sneezes'],
    symptoms: ['Fever', 'Cough', 'Fatigue', 'Headache', 'Muscle aches', 'Chills & Sweats', 'Runny nose'],
    precautions: ['Rest in bed during initial 48 hours', 'Avoid contact with vulnerable individuals'],
    treatments: ['Prescription antiviral agents (Oseltamivir)', 'Over-the-counter pain relievers'],
    prevention: ['Annual seasonal influenza vaccination', 'Routine hand hygiene'],
    recoveryTips: 'Gradually resume daily activities after 24 hours of being fever-free.',
    recommendedDoctor: 'General Physician',
    homeRemedies: ['Chicken noodle soup or herbal broths', 'Warm bath to relieve muscle soreness'],
    medicines: [
      { name: 'Ibuprofen (400mg)', usage: 'Take with food for body aches' },
      { name: 'Cough Suppressant Syrup', usage: '10ml before bedtime' }
    ],
    emergencyWarning: 'Consult a doctor if high fever persists above 103°F (39.4°C) for over 3 days.',
    relatedDiseases: ['Common Cold', 'Acute Sinusitis', 'COVID-19']
  },
  {
    id: 'dis-migraine',
    name: 'Chronic Migraine Disorder',
    icon: '🧠',
    category: 'Neurological',
    severity: 'Moderate',
    confidenceDefault: 85,
    overview: 'A neurological condition causing intense throbbing headaches, often accompanied by sensitivity to light and sound.',
    causes: ['Hereditary neurological sensitivity', 'Stress, dehydration, lack of sleep'],
    symptoms: ['Headache', 'Nausea', 'Dizziness', 'Stiff neck'],
    precautions: ['Rest in a dark, silent room during acute attacks', 'Maintain regular sleep routines'],
    treatments: ['Acute abortive therapy (Triptans)', 'Preventative daily neurological medications'],
    prevention: ['Regular stress management', 'Consistent hydration (2.5L water daily)'],
    recoveryTips: 'Apply cold compresses to forehead and temples during early aura phases.',
    recommendedDoctor: 'Neurologist',
    homeRemedies: ['Peppermint oil application on temples', 'Magnesium-rich foods and hydration'],
    medicines: [{ name: 'Sumatriptan (50mg)', usage: 'Single tablet at onset of headache' }],
    emergencyWarning: 'Go to emergency care if accompanied by sudden slurred speech or one-sided body weakness.',
    relatedDiseases: ['Tension Headache', 'Cluster Headache', 'Sinusitis']
  },
  {
    id: 'dis-typhoid',
    name: 'Typhoid Fever',
    icon: '🧫',
    category: 'Bacterial Infection',
    severity: 'High',
    confidenceDefault: 91,
    overview: 'A bacterial infection caused by Salmonella typhi, transmitted through contaminated food or water.',
    causes: ['Ingestion of water or food contaminated with Salmonella typhi bacteria'],
    symptoms: ['Fever', 'Abdominal pain', 'Headache', 'Diarrhea', 'Fatigue', 'Loss of appetite'],
    precautions: ['Drink only boiled or filtered water', 'Maintain strict hand hygiene'],
    treatments: ['Prescription antibiotic therapy (Azithromycin/Ceftriaxone)'],
    prevention: ['Typhoid vaccination prior to travel', 'Avoiding raw or unpasteurized food'],
    recoveryTips: 'Eat soft, easily digestible foods and stay hydrated with oral rehydration salts.',
    recommendedDoctor: 'Gastroenterologist / Infectious Disease',
    homeRemedies: ['Oral rehydration solution (ORS)', 'Barley water and fresh fruit juices'],
    medicines: [{ name: 'Azithromycin (500mg)', usage: '1 tablet daily for 7 days as prescribed' }],
    emergencyWarning: 'Seek urgent hospital admission if high continuous fever is accompanied by severe abdominal tenderness.',
    relatedDiseases: ['Gastroenteritis', 'Cholera', 'Hepatitis A']
  },
  {
    id: 'dis-allergy',
    name: 'Allergic Rhinitis',
    icon: '🌾',
    category: 'Immunological',
    severity: 'Low',
    confidenceDefault: 86,
    overview: 'An allergic reaction occurring when the immune system overreacts to airborne environmental allergens.',
    causes: ['Airborne pollen, dust mites, pet dander, or mold spores'],
    symptoms: ['Runny nose', 'Sore throat', 'Headache', 'Chills & Sweats', 'Skin rash', 'Itching'],
    precautions: ['Keep indoor humidity low', 'Avoid outdoor activities during high pollen counts'],
    treatments: ['Antihistamines', 'Nasal corticosteroid sprays'],
    prevention: ['HEPA air filtration', 'Frequent washing of bed linens in hot water'],
    recoveryTips: 'Rinse nasal passages with warm saline solution daily.',
    recommendedDoctor: 'Allergist / Immunologist',
    homeRemedies: ['Saline nasal rinses', 'Steam inhalation with chamomile'],
    medicines: [{ name: 'Cetirizine (10mg)', usage: '1 tablet daily at bedtime' }],
    emergencyWarning: 'Seek emergency medical help if swelling of lips, tongue, or breathing difficulty occurs (Anaphylaxis).',
    relatedDiseases: ['Asthma', 'Sinusitis', 'Eczema']
  },
  {
    id: 'dis-gastro',
    name: 'Acute Gastroenteritis',
    icon: '🤢',
    category: 'Gastrointestinal',
    severity: 'Moderate',
    confidenceDefault: 89,
    overview: 'An inflammation of the stomach and intestines typically resulting from a viral or bacterial infection.',
    causes: ['Norovirus, Rotavirus, or bacterial contamination in food'],
    symptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Abdominal pain', 'Fever', 'Dizziness', 'Indigestion'],
    precautions: ['Avoid dairy, caffeine, and greasy foods', 'Sip fluids frequently in small amounts'],
    treatments: ['Oral rehydration therapy', 'Antiemetic medications for vomiting'],
    prevention: ['Proper food handling and hand washing'],
    recoveryTips: 'Follow the BRAT diet (Bananas, Rice, Applesauce, Toast) during recovery.',
    recommendedDoctor: 'Gastroenterologist',
    homeRemedies: ['Electrolyte fluids', 'Ginger or peppermint tea'],
    medicines: [{ name: 'Ondansetron (4mg)', usage: '1 tablet as needed for severe nausea' }],
    emergencyWarning: 'Consult emergency medical care if unable to keep fluids down for 24 hours or if signs of severe dehydration appear.',
    relatedDiseases: ['Food Poisoning', 'IBS', 'Typhoid']
  },
  {
    id: 'dis-gerd',
    name: 'GERD (Acid Reflux)',
    icon: '🔥',
    category: 'Gastrointestinal',
    severity: 'Low',
    confidenceDefault: 87,
    overview: 'A digestive disease in which stomach acid or bile irritates the food pipe lining.',
    causes: ['Lower esophageal sphincter dysfunction', 'Obesity, spicy foods, or eating late at night'],
    symptoms: ['Acidity', 'Indigestion', 'Chest pain', 'Nausea', 'Sore throat'],
    precautions: ['Avoid lying down for 3 hours after eating', 'Elevate head during sleep'],
    treatments: ['Proton pump inhibitors (Omeprazole)', 'Antacids for immediate relief'],
    prevention: ['Eat smaller, more frequent meals', 'Avoid chocolate, caffeine, and acidic items'],
    recoveryTips: 'Chew food thoroughly and maintain an upright posture after dining.',
    recommendedDoctor: 'Gastroenterologist',
    homeRemedies: ['Cold milk sipping', 'Aloe vera juice'],
    medicines: [{ name: 'Omeprazole (20mg)', usage: '1 capsule 30 mins before breakfast' }],
    emergencyWarning: 'Seek immediate care if chest pain radiates to arm/jaw or causes difficulty swallowing.',
    relatedDiseases: ['Peptic Ulcer', 'Hiatal Hernia', 'Esophagitis']
  }
];

export const MOCK_HISTORY = [
  {
    id: 'pred-101',
    date: '2026-07-28',
    symptoms: ['Fever', 'Cough', 'Fatigue', 'Loss of taste/smell'],
    disease: 'COVID-19 Respiratory Infection',
    confidence: 94,
    severity: 'Moderate'
  },
  {
    id: 'pred-102',
    date: '2026-07-15',
    symptoms: ['Headache', 'Nausea', 'Dizziness'],
    disease: 'Chronic Migraine Disorder',
    confidence: 85,
    severity: 'Moderate'
  },
  {
    id: 'pred-103',
    date: '2026-06-30',
    symptoms: ['Fever', 'Cough', 'Chills & Sweats'],
    disease: 'Seasonal Influenza (Flu)',
    confidence: 89,
    severity: 'Low'
  }
];

export const MOCK_HEALTH_TIPS = [
  {
    id: 'tip-1',
    title: 'Hydration Strategy for Immunity',
    category: 'Daily Wellness',
    content: 'Drinking at least 8 to 10 glasses of water daily helps maintain respiratory mucosal barriers that block viral invaders.',
    readTime: '2 min read',
    icon: '💧'
  },
  {
    id: 'tip-2',
    title: 'Importance of 7+ Hours of Sleep',
    category: 'Recovery',
    content: 'Deep sleep increases T-cell activity, enabling your immune system to target and eliminate pathogens more efficiently.',
    readTime: '3 min read',
    icon: '🌙'
  },
  {
    id: 'tip-3',
    title: 'Recognizing Early Warning Signals',
    category: 'Prevention',
    content: 'Monitoring sudden subtle shifts in heart rate variability and SpO2 can provide up to 24-hour notice before severe symptoms manifest.',
    readTime: '4 min read',
    icon: '🩺'
  }
];

export const MOCK_STATS = [
  { label: 'Predictions Completed', value: '150,000+', change: '+14%', icon: 'Activity' },
  { label: 'Model Accuracy', value: '96.8%', change: '+0.5%', icon: 'CheckCircle' },
  { label: 'Active Users', value: '45,000+', change: '+22%', icon: 'Users' },
  { label: 'Partner Doctors', value: '1,200+', change: '+8%', icon: 'UserCheck' }
];

export const MOCK_TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Dr. Sarah Jenkins',
    role: 'Chief of Pulmonology, St. Jude Hospital',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    quote: 'Healora provides remarkably structured initial symptom evaluations that empower patients to seek timely, appropriate medical care.'
  },
  {
    id: 't-2',
    name: 'Marcus Vance',
    role: 'Verified Patient',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    quote: 'The prediction gave me clear steps and precautions before my doctor appointment. It was calm, precise, and extremely helpful.'
  }
];

export const MOCK_FAQS = [
  {
    question: 'How accurate is the AI disease prediction algorithm?',
    answer: 'Our machine learning models demonstrate a 96.8% precision rate on standard validated clinical diagnostic benchmarks. However, it is designed to assist and inform, not replace professional medical diagnosis.'
  },
  {
    question: 'Is my health data kept private and confidential?',
    answer: 'Yes. All symptom inquiries and prediction history logs are encrypted using end-to-end HIPAA-compliant standards and are never sold to third parties.'
  },
  {
    question: 'What should I do if my symptoms trigger a Critical alert?',
    answer: 'If your prediction result flags a Critical severity level, contact emergency health services immediately or visit the nearest urgent care center.'
  }
];
