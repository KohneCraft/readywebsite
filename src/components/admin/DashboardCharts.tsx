'use client';

// ============================================
// Page Builder - Admin Dashboard Charts
// Visual statistics with Recharts
// ============================================

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

// Monthly page data
const monthlyData = [
  { month: 'Oca', pages: 2, views: 450 },
  { month: 'Şub', pages: 3, views: 680 },
  { month: 'Mar', pages: 1, views: 320 },
  { month: 'Nis', pages: 4, views: 890 },
  { month: 'May', pages: 2, views: 520 },
  { month: 'Haz', pages: 5, views: 1200 },
  { month: 'Tem', pages: 3, views: 780 },
  { month: 'Ağu', pages: 4, views: 950 },
  { month: 'Eyl', pages: 6, views: 1450 },
  { month: 'Eki', pages: 4, views: 1100 },
  { month: 'Kas', pages: 5, views: 1280 },
  { month: 'Ara', pages: 7, views: 1650 },
];

// Page status distribution
const pageStatusData = [
  { name: 'Yayında', value: 45, color: '#10B981' },
  { name: 'Taslak', value: 12, color: '#F59E0B' },
];


interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}

// Views Area Chart
export function ViewsChart() {
  return (
    <ChartCard title="Aylık Görüntülenme">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={{ stroke: '#374151', opacity: 0.2 }}
            />
            <YAxis 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={{ stroke: '#374151', opacity: 0.2 }}
              tickFormatter={(value) => `${value}K`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: number | string | undefined) => [`${value ?? 0}K`, 'Görüntülenme']}
            />
            <Area 
              type="monotone" 
              dataKey="views" 
              stroke="#3B82F6" 
              fillOpacity={1} 
              fill="url(#colorViews)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

// Pages Bar Chart
export function PagesChart() {
  return (
    <ChartCard title="Aylık Sayfa Oluşturma">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={{ stroke: '#374151', opacity: 0.2 }}
            />
            <YAxis 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={{ stroke: '#374151', opacity: 0.2 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: number | string | undefined) => [value ?? 0, 'Sayfa']}
            />
            <Bar 
              dataKey="pages" 
              fill="#10B981" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

// Page Status Pie Chart
export function PageStatusChart() {
  return (
    <ChartCard title="Sayfa Durumu">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
          <PieChart>
            <Pie
              data={pageStatusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {pageStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: number | string | undefined, name: string | undefined) => [value ?? 0, name ?? '']}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value: string) => <span style={{ color: '#9CA3AF' }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}


// Dashboard Charts Grid
export function DashboardCharts() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ViewsChart />
        <PagesChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <PageStatusChart />
      </div>
    </div>
  );
}
