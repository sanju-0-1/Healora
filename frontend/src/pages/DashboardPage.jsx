import { Link } from 'react-router-dom';
import { Stethoscope, ArrowRight, Activity, Calendar, History, TrendingUp } from 'lucide-react';
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
    <div className="space-y-8 text-left">
      {/* Welcome Card */}
      <div className="relative overflow-hidden p-8 bg-gradient-to-r from-blue-600 to-teal-500 rounded-3xl text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 z-10">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold tracking-wide uppercase">
            Personal Health Portal
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Patient'} 👋
          </h1>
          <p className="text-blue-50 text-sm max-w-xl">
            Your personal AI health assistant is ready. Analyze symptoms or review past predictions below.
          </p>
        </div>

        <div className="z-10 flex-shrink-0">
          <Link to="/predict">
            <Button variant="secondary" size="lg" icon={Stethoscope} className="bg-white text-blue-700 hover:bg-slate-100 border-none font-bold">
              Run Quick Prediction
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
        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Prediction Volume Growth</h3>
            </div>
            <span className="text-xs text-slate-500">2026 Analytics</span>
          </div>
          <PredictionHistoryChart />
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Category Breakdown</h3>
          </div>
          <DiseaseDistributionChart />
        </div>
      </div>

      {/* Monthly Bar Chart & Recent Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Weekly Activity Log</h3>
          <MonthlyPredictionsChart />
        </div>

        <div className="lg:col-span-2 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Recent Disease Predictions</h3>
            </div>
            <Link to="/history" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {history.slice(0, 3).map((item) => (
              <div key={item.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.disease}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.symptoms.length} Symptoms</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{item.confidence}% Match</span>
                  <Badge variant={item.severity === 'Low' ? 'success' : 'warning'}>{item.severity}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Health Tips Section */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-xl">Daily Wellness & Preventive Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_HEALTH_TIPS.map((tip) => (
            <HealthTipCard key={tip.id} tip={tip} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
