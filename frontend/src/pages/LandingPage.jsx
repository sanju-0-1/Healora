import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, ArrowRight, ShieldCheck, Cpu, Zap, ChevronDown, CheckCircle2, Star, 
  Sparkles, Stethoscope, HeartPulse, Brain, LineChart, FileText, ArrowUpRight, Check
} from 'lucide-react';
import Button from '../components/ui/Button';
import StatisticsCard from '../components/cards/StatisticsCard';
import { MOCK_STATS, MOCK_TESTIMONIALS, MOCK_FAQS } from '../services/mockData';

const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [demoPreset, setDemoPreset] = useState('respiratory');

  const demoScans = {
    respiratory: {
      title: 'Viral Respiratory Infection',
      confidence: 94.8,
      symptoms: ['Fever', 'Dry Cough', 'Fatigue', 'Shortness of Breath'],
      risk: 'Moderate Risk',
      action: 'Hydrate, monitor SpO2, and rest. Consult doctor if fever exceeds 102°F.'
    },
    neurological: {
      title: 'Migraine / Tension Cluster',
      confidence: 96.2,
      symptoms: ['Severe Head Pain', 'Light Sensitivity', 'Nausea'],
      risk: 'Low Risk',
      action: 'Rest in a dim room, stay hydrated, avoid bright screens.'
    },
    cardio: {
      title: 'Hypertension & Elevated Stress Vitals',
      confidence: 91.5,
      symptoms: ['Chest Tightness', 'Palpitations', 'Dizziness'],
      risk: 'Requires Attention',
      action: 'Seek immediate clinical assessment for blood pressure monitoring.'
    }
  };

  const currentDemo = demoScans[demoPreset];

  return (
    <div className="space-y-24 pb-24 overflow-hidden text-left bg-transparent">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F5FBF7] to-[#E8F5E9] dark:from-[#022019] dark:via-[#063D30] dark:to-[#042E24] rounded-b-[40px]">
        {/* Soft Glowing Mystic Auras */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#A8E6CF]/25 dark:bg-[#4ECCA3]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#4ECCA3]/20 dark:bg-[#4ECCA3]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-7"
          >
            {/* Sacred Shrine Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#FFFFFF]/90 dark:bg-[#063D30]/90 border border-[#D4E8DD] dark:border-[#13523D] text-[#1A6B4F] dark:text-[#4ECCA3] text-xs font-black tracking-wide shadow-sm backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#4ECCA3] animate-spin" />
              <span>Next-Gen Medical AI System</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#4ECCA3] animate-ping" />
            </div>


            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A6B4F] dark:text-[#FFFFFF] leading-[1.15] tracking-tight font-heading">
                Predict Diseases Early with <span className="bg-gradient-to-r from-[#1A6B4F] via-[#4ECCA3] to-[#2E9C77] bg-clip-text text-transparent">Clinical AI Precision</span>
              </h1>
              <p className="text-lg sm:text-xl font-extrabold text-[#1A6B4F] dark:text-[#4ECCA3] tracking-wide">
                Healora — "Smarter Health. Better Decisions."
              </p>
            </div>

            <p className="text-base sm:text-lg text-[#1A2E2A] dark:text-[#F5FBF7]/90 leading-relaxed max-w-xl font-medium">
              Analyze symptoms instantly with deep learning algorithms trained on thousands of validated clinical cases. Receive real-time disease probabilities, triage recommendations, and actionable care pathways.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/predict">
                <Button variant="primary" size="lg" icon={ArrowRight} className="healer-gold-btn">
                  Scan Symptoms Now
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="emerald" size="lg" className="font-extrabold">
                  Explore Neural AI Model
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 text-xs font-bold text-[#1A6B4F] dark:text-[#F5FBF7]">
              <span className="flex items-center gap-2 bg-[#FFFFFF]/90 dark:bg-[#063D30]/60 px-4 py-2 rounded-full border border-[#D4E8DD] dark:border-[#13523D] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#4ECCA3]" /> 100% HIPAA Private
              </span>
              <span className="flex items-center gap-2 bg-[#FFFFFF]/90 dark:bg-[#063D30]/60 px-4 py-2 rounded-full border border-[#D4E8DD] dark:border-[#13523D] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#4ECCA3]" /> Instant Neural Evaluation
              </span>
              <span className="flex items-center gap-2 bg-[#FFFFFF]/90 dark:bg-[#063D30]/60 px-4 py-2 rounded-full border border-[#D4E8DD] dark:border-[#13523D] shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#4ECCA3]" /> 96.8% Precision Score
              </span>
            </div>
          </motion.div>

          {/* Hero Sci-Fi Shrine Scanner Preview Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-lg glass-shrine-card p-8 healer-aura-glow space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#D4E8DD] dark:border-[#13523D] pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-gradient-to-br from-[#1A6B4F] to-[#4ECCA3] text-white rounded-2xl shadow-md shadow-[#1A6B4F]/20">
                    <Activity className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-black text-[#1A6B4F] dark:text-[#FFFFFF] text-base">Healora AI Diagnostic Scanner</h4>
                    <p className="text-xs font-semibold text-[#1A6B4F]/80 dark:text-[#4ECCA3]">Live Biometric Diagnostics</p>
                  </div>
                </div>
                <span className="px-3.5 py-1.5 bg-[#F5FBF7] dark:bg-[#042E24] text-[#1A6B4F] dark:text-[#4ECCA3] text-xs font-black rounded-full border border-[#D4E8DD] dark:border-[#13523D] flex items-center gap-2 score-pulse">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4ECCA3] animate-ping" />
                  96.8% Match
                </span>
              </div>

              {/* Glowing Pulse Meter */}
              <div className="p-5 bg-[#F5FBF7]/90 dark:bg-[#042E24]/60 rounded-2xl border border-[#D4E8DD] dark:border-[#13523D] space-y-3.5">
                <div className="flex justify-between items-center text-xs font-bold text-[#1A2E2A] dark:text-[#F5FBF7]">
                  <span className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-[#1A6B4F] dark:text-[#4ECCA3]" /> Selected Symptoms (4)
                  </span>
                  <span className="text-[#1A6B4F] dark:text-[#4ECCA3]">Fever, Cough, Fatigue, Dyspnea</span>
                </div>

                <div className="p-4 bg-[#FFFFFF] dark:bg-[#063D30] border border-[#D4E8DD] dark:border-[#13523D] rounded-2xl space-y-3 shadow-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-black text-[#1A6B4F] dark:text-[#4ECCA3] uppercase tracking-wider">
                      Primary AI Diagnostic Result
                    </span>
                    <span className="text-xs font-black text-[#1A6B4F] dark:text-[#4ECCA3] score-pulse px-2 py-0.5 rounded-full bg-[#F5FBF7] dark:bg-[#042E24]">
                      94.8% Confidence
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-[#1A6B4F] dark:text-[#FFFFFF]">Acute Respiratory Pathogen Scan</h3>

                  <div className="w-full bg-[#E8F5E9] dark:bg-[#042E24] h-3 rounded-full overflow-hidden p-0.5 border border-[#D4E8DD]">
                    <div className="bg-gradient-to-r from-[#1A6B4F] via-[#4ECCA3] to-[#A8E6CF] h-full rounded-full w-[94.8%] shadow-xs" />
                  </div>
                </div>
              </div>

              {/* Quick AI Diagnostics Details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-[#F5FBF7] dark:bg-[#042E24]/60 rounded-2xl border border-[#D4E8DD] dark:border-[#13523D] space-y-1">
                  <span className="text-[#1A6B4F]/80 dark:text-[#4ECCA3] font-bold block">Triage Classification</span>
                  <span className="font-black text-[#1A2E2A] dark:text-[#F5FBF7]">Moderate / Outpatient</span>
                </div>
                <div className="p-3.5 bg-[#F5FBF7] dark:bg-[#042E24]/60 rounded-2xl border border-[#D4E8DD] dark:border-[#13523D] space-y-1">
                  <span className="text-[#1A6B4F]/80 dark:text-[#4ECCA3] font-bold block">Action Pathway</span>
                  <span className="font-black text-[#1A2E2A] dark:text-[#F5FBF7]">Hydration & Rest</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Live AI Diagnostic Simulator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-white/90 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60 rounded-3xl space-y-8 shadow-sm backdrop-blur-md">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-100 text-xs font-black uppercase tracking-wider">
              Interactive AI Simulator
            </span>
            <h2 className="text-3xl font-black text-emerald-950 dark:text-white">
              Try the Healora Diagnostic Engine
            </h2>
            <p className="text-sm font-medium text-slate-700 dark:text-emerald-200/80">
              Select a clinical symptom cluster below to simulate live neural prediction results in real-time.
            </p>
          </div>

          {/* Preset Selectors */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setDemoPreset('respiratory')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                demoPreset === 'respiratory'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 border border-emerald-500 font-extrabold'
                  : 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-950 dark:text-emerald-200 hover:bg-emerald-100 border border-emerald-100'
              }`}
            >
              🫁 Respiratory & Viral Scan
            </button>
            <button
              onClick={() => setDemoPreset('neurological')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                demoPreset === 'neurological'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 border border-emerald-500 font-extrabold'
                  : 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-950 dark:text-emerald-200 hover:bg-emerald-100 border border-emerald-100'
              }`}
            >
              🧠 Neurological & Headache Scan
            </button>
            <button
              onClick={() => setDemoPreset('cardio')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                demoPreset === 'cardio'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 border border-emerald-500 font-extrabold'
                  : 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-950 dark:text-emerald-200 hover:bg-emerald-100 border border-emerald-100'
              }`}
            >
              🫀 Cardiovascular Vitals Assessment
            </button>
          </div>

          {/* Simulated Display Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={demoPreset}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-emerald-50/60 dark:bg-emerald-900/50 border border-emerald-100 dark:border-emerald-800 rounded-3xl shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
            >
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">Input Symptoms</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentDemo.symptoms.map((s) => (
                    <span key={s} className="px-3 py-1 bg-white dark:bg-emerald-950 text-emerald-950 dark:text-emerald-200 text-xs font-bold rounded-xl border border-emerald-200 dark:border-emerald-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-center md:border-x border-emerald-200/80 dark:border-emerald-800/80 md:px-6">
                <span className="text-[11px] font-extrabold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">Model Prediction Result</span>
                <h4 className="text-lg font-black text-emerald-950 dark:text-white">{currentDemo.title}</h4>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 text-xs font-black">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> {currentDemo.confidence}% Confidence Match
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-extrabold uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">Triage & Care Advice</span>
                <p className="text-xs font-semibold text-slate-700 dark:text-emerald-100 leading-relaxed">
                  {currentDemo.action}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Core Clinical Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
            Clinical AI Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 dark:text-white">
            Designed for Proactive Personal Health
          </h2>
          <p className="text-base text-slate-700 dark:text-emerald-200/80 font-medium">
            Healora fuses advanced machine learning algorithms with validated clinical diagnostic logic.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 bg-white dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl shadow-sm space-y-4 hover:shadow-md hover:border-emerald-300 transition duration-300">
            <div className="p-3.5 bg-emerald-100 dark:bg-emerald-900/70 text-emerald-700 dark:text-emerald-300 rounded-2xl w-fit">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-emerald-950 dark:text-white">Symptom Scanning</h3>
            <p className="text-xs text-slate-700 dark:text-emerald-200/80 leading-relaxed font-medium">
              Multi-parameter symptom analysis matching against comprehensive medical diagnostic databases.
            </p>
          </div>

          <div className="p-7 bg-white dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl shadow-sm space-y-4 hover:shadow-md hover:border-emerald-300 transition duration-300">
            <div className="p-3.5 bg-emerald-100 dark:bg-emerald-900/70 text-emerald-700 dark:text-emerald-300 rounded-2xl w-fit">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-emerald-950 dark:text-white">Neural Probability</h3>
            <p className="text-xs text-slate-700 dark:text-emerald-200/80 leading-relaxed font-medium">
              Probabilistic ranking showing primary and differential condition probabilities with confidence metrics.
            </p>
          </div>

          <div className="p-7 bg-white dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl shadow-sm space-y-4 hover:shadow-md hover:border-emerald-300 transition duration-300">
            <div className="p-3.5 bg-emerald-100 dark:bg-emerald-900/70 text-emerald-700 dark:text-emerald-300 rounded-2xl w-fit">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-emerald-950 dark:text-white">Triage Severity</h3>
            <p className="text-xs text-slate-700 dark:text-emerald-200/80 leading-relaxed font-medium">
              Clear risk indicators (Low, Moderate, Urgent) to guide home remedies or emergency clinical care.
            </p>
          </div>

          <div className="p-7 bg-white dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl shadow-sm space-y-4 hover:shadow-md hover:border-emerald-300 transition duration-300">
            <div className="p-3.5 bg-emerald-100 dark:bg-emerald-900/70 text-emerald-700 dark:text-emerald-300 rounded-2xl w-fit">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-emerald-950 dark:text-white">Downloadable PDF</h3>
            <p className="text-xs text-slate-700 dark:text-emerald-200/80 leading-relaxed font-medium">
              Generate instant clean medical summary reports ready to present to your healthcare provider.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Diagnostic Process Pipeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="p-10 bg-white/90 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/60 rounded-3xl space-y-10 shadow-sm backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="text-center max-w-xl mx-auto space-y-2 relative z-10">
            <span className="px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-100 text-xs font-black uppercase tracking-wider">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl font-black text-emerald-950 dark:text-white">How Healora Evaluates Health</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            <div className="p-6 bg-emerald-50/70 dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/60 rounded-2xl space-y-3 text-left shadow-xs">
              <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-emerald-600/20">1</span>
              <h4 className="font-black text-base text-emerald-950 dark:text-white">Select Symptoms</h4>
              <p className="text-xs text-slate-700 dark:text-emerald-200/80 leading-relaxed font-medium">Pick from categorized physical, neurological, or general symptoms.</p>
            </div>

            <div className="p-6 bg-emerald-50/70 dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/60 rounded-2xl space-y-3 text-left shadow-xs">
              <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-emerald-600/20">2</span>
              <h4 className="font-black text-base text-emerald-950 dark:text-white">Neural Matrix Scan</h4>
              <p className="text-xs text-slate-700 dark:text-emerald-200/80 leading-relaxed font-medium">Our AI cross-matches symptoms against clinical ML training data.</p>
            </div>

            <div className="p-6 bg-emerald-50/70 dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/60 rounded-2xl space-y-3 text-left shadow-xs">
              <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-emerald-600/20">3</span>
              <h4 className="font-black text-base text-emerald-950 dark:text-white">Probability Breakdown</h4>
              <p className="text-xs text-slate-700 dark:text-emerald-200/80 leading-relaxed font-medium">Review potential condition matches and confidence meters.</p>
            </div>

            <div className="p-6 bg-emerald-50/70 dark:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-800/60 rounded-2xl space-y-3 text-left shadow-xs">
              <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-emerald-600/20">4</span>
              <h4 className="font-black text-base text-emerald-950 dark:text-white">Action Plan</h4>
              <p className="text-xs text-slate-700 dark:text-emerald-200/80 leading-relaxed font-medium">Get triage guidance, precautions, and specialist advice.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Key Metrics / Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_STATS.map((stat, idx) => (
            <StatisticsCard key={idx} {...stat} />
          ))}
        </div>
      </section>

      {/* Patient Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Patient Trust</span>
          <h2 className="text-3xl font-black text-emerald-950 dark:text-white">Trusted by Health-Conscious Individuals</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="p-7 bg-white dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-emerald-600">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-emerald-200/90 leading-relaxed font-medium italic">"{t.content || t.quote}"</p>
              <div className="pt-2 flex items-center justify-between border-t border-emerald-100 dark:border-emerald-900/50">
                <div>
                  <h4 className="text-sm font-extrabold text-emerald-950 dark:text-white">{t.name}</h4>
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">{t.role}</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 dark:bg-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-700">
                  Verified Patient
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Clear Answers</span>
          <h2 className="text-3xl font-black text-emerald-950 dark:text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {MOCK_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-extrabold text-emerald-950 dark:text-white text-sm flex justify-between items-center gap-4 hover:bg-emerald-50/50 transition cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-emerald-600 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-700 dark:text-emerald-200/80 leading-relaxed font-medium border-t border-emerald-100/60 dark:border-emerald-900/40 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-12 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden healora-glow">
          <div className="space-y-3 text-center md:text-left relative z-10">
            <h2 className="text-3xl font-black">Take Control of Your Health Today</h2>
            <p className="text-sm font-medium text-emerald-100 max-w-xl">
              Get an instant AI symptom evaluation in less than 60 seconds with complete privacy.
            </p>
          </div>
          <Link to="/predict" className="relative z-10">
            <Button variant="secondary" size="lg" icon={ArrowRight} className="bg-white text-emerald-950 hover:bg-emerald-100 font-extrabold shadow-lg">
              Start Free Symptom Check
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;


