import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Calendar, History, TrendingUp, Sparkles } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import usePrediction from '../hooks/usePrediction';
import Button from '../components/ui/Button';
import StatisticsCard from '../components/cards/StatisticsCard';
import HealthTipCard from '../components/cards/HealthTipCard';
import Badge from '../components/ui/Badge';
import PredictionHistoryChart from '../components/charts/PredictionHistoryChart';
import DiseaseDistributionChart from '../components/charts/DiseaseDistributionChart';
import MonthlyPredictionsChart from '../components/charts/MonthlyPredictionsChart';
import { MOCK_HEALTH_TIPS, MOCK_STATS } from '../services/mockData';

const DashboardPage = () => {
  const { user } = useAuth();
  const { history } = usePrediction();

  return (
    <div className="space-y-8 text-left pb-16">
      {/* Welcome Card */}
      <div className="relative overflow-hidden p-8 sm:p-10 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 rounded-3xl text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 healora-glow">
        <div className="space-y-2.5 z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Healora Personal Health Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Welcome back, {user?.name || 'Patient'} 👋
          </h1>
          <p className="text-emerald-100 text-sm max-w-xl font-medium">
            Your clinical AI health assistant is ready. Evaluate current symptoms or review past neural diagnostic history below.
          </p>
        </div>

        <div className="z-10 flex-shrink-0">
          <Link to="/predict">
            <Button variant="secondary" size="lg" icon={Activity} className="bg-white text-emerald-950 hover:bg-emerald-100 border-none font-extrabold shadow-md">
              Run Symptom Scan
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_STATS.map((stat, idx) => (
          <StatisticsCard key={idx} {...stat} />
        ))}
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-white dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h3 className="font-black text-emerald-950 dark:text-white text-base">Prediction Volume & Neural Performance</h3>
            </div>
            <span className="text-xs font-bold text-emerald-800/80 dark:text-emerald-300">2026 Analytics</span>
          </div>
          <PredictionHistoryChart />
        </div>

        <div className="p-6 bg-white dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-emerald-600" />
            <h3 className="font-black text-emerald-950 dark:text-white text-base">Category Breakdown</h3>
          </div>
          <DiseaseDistributionChart />
        </div>
      </div>

      {/* Monthly Bar Chart & Recent Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl shadow-sm space-y-4">
          <h3 className="font-black text-emerald-950 dark:text-white text-base">Weekly Evaluation Activity</h3>
          <MonthlyPredictionsChart />
        </div>

        <div className="lg:col-span-2 p-6 bg-white dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <History className="w-5 h-5 text-emerald-600" />
              <h3 className="font-black text-emerald-950 dark:text-white text-base">Recent AI Diagnostics</h3>
            </div>
            <Link to="/history" className="text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-1">
              View All History <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {history.slice(0, 3).map((item) => (
              <div key={item.id} className="p-4.5 bg-emerald-50/50 dark:bg-emerald-900/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 flex justify-between items-center">
                <div className="space-y-1">
                  <h4 className="font-black text-emerald-950 dark:text-white text-sm">{item.disease}</h4>
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800/80 dark:text-emerald-300">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.symptoms.length} Symptoms Evaluated</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-3 py-1 rounded-full">
                    {item.confidence}% Match
                  </span>
                  <Badge variant={item.severity === 'Low' ? 'success' : 'warning'}>
                    {item.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Health Tips Section */}
      <div className="space-y-4">
        <h3 className="font-black text-emerald-950 dark:text-white text-lg">Personalized Preventative Health Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_HEALTH_TIPS.map((tip) => (
            <HealthTipCard key={tip.id} {...tip} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
