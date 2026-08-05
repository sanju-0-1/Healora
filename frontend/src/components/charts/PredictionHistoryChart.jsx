import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', predictions: 42 },
  { month: 'Feb', predictions: 68 },
  { month: 'Mar', predictions: 95 },
  { month: 'Apr', predictions: 120 },
  { month: 'May', predictions: 165 },
  { month: 'Jun', predictions: 210 },
  { month: 'Jul', predictions: 280 }
];

const PredictionHistoryChart = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPredictions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
          />
          <Area type="monotone" dataKey="predictions" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorPredictions)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionHistoryChart;
