import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, ArrowRight, ShieldCheck, Cpu, Zap, Activity, ChevronDown, CheckCircle2, Star } from 'lucide-react';
import Button from '../components/ui/Button';
import StatisticsCard from '../components/cards/StatisticsCard';
import { MOCK_STATS, MOCK_TESTIMONIALS, MOCK_FAQS } from '../services/mockData';

const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" /> Next-Gen AI Health Diagnostics
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              Predict Diseases Early with <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">AI Precision</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              Evaluate your symptoms in seconds with validated clinical machine learning. Get instant disease probability, home remedies, and emergency guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/predict">
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  Get Started Free
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn How AI Works
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Credit Card Required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% HIPAA Private
              </span>
            </div>
          </motion.div>

          {/* Hero Visual Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-600 text-white rounded-xl">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Clinical Symptom Scan</h4>
                    <p className="text-xs text-slate-500">Live AI Evaluation</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-full">
                  96.8% Match
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs flex justify-between items-center">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Selected Symptoms (4)</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">Fever, Cough, Fatigue</span>
                </div>
                <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl space-y-2 text-left">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Top Prediction Result</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">COVID-19 Respiratory Infection</h3>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-[94%]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_STATS.map((stat, idx) => (
            <StatisticsCard key={idx} {...stat} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Smart Features Designed for Care</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Everything you need to analyze symptoms and make informed healthcare choices.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-3 text-left">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl w-fit">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">AI Neural Prediction</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Cross-references selected symptoms against extensive medical databases for instant diagnostic recommendations.</p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-3 text-left">
            <div className="p-3 bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 rounded-xl w-fit">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Severity Alert Levels</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Categorizes risk levels from Low to Critical, offering immediate warning indicators when urgent care is required.</p>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-3 text-left">
            <div className="p-3 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-xl w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">PDF Clinical Exports</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Download clean PDF reports containing symptom history, precautions, and recommended doctor specialties.</p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-slate-100/70 dark:bg-slate-900/50 py-16 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">How Healora Works</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Three simple steps to evaluate your symptoms safely at home.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="relative p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-4xl font-black text-blue-600/30">01</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Select Symptoms</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Search or pick from popular symptoms like fever, fatigue, cough, or headache.</p>
            </div>

            <div className="relative p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-4xl font-black text-teal-600/30">02</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Run AI Analysis</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Our clinical algorithm computes matching probabilities and risk categories.</p>
            </div>

            <div className="relative p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-4xl font-black text-purple-600/30">03</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Get Actionable Steps</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Review precautions, recommended specialist types, and download a summary report.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Trusted by Doctors & Patients</h2>
          <p className="text-xs text-slate-500">Read how Healora improves personal health readiness.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MOCK_TESTIMONIALS.map((t) => (
            <div key={t.id} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 text-left">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-2">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">{t.name}</h4>
                  <span className="text-[10px] text-slate-500">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500">Find quick answers to common questions about Healora AI.</p>
        </div>

        <div className="space-y-4">
          {MOCK_FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-slate-900 dark:text-white text-sm"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
