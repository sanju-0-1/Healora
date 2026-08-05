import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Respiratory', value: 45, color: '#2563eb' },
  { name: 'Viral & Flu', value: 25, color: '#14b8a6' },
  { name: 'Neurological', value: 15, color: '#f59e0b' },
  { name: 'Cardiovascular', value: 10, color: '#ef4444' },
  { name: 'Gastrointestinal', value: 5, color: '#8b5cf6' }
];

const DiseaseDistributionChart = () => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', border: 'none' }} />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiseaseDistributionChart;
