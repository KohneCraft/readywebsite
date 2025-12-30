'use client';

// ============================================
// Vav Yapı - Admin Dashboard Charts
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
  LineChart,
  Line
} from 'recharts';
import { useTranslations } from 'next-intl';

// Monthly project data
const monthlyData = [
  { month: 'Oca', projects: 2, revenue: 450 },
  { month: 'Şub', projects: 3, revenue: 680 },
  { month: 'Mar', projects: 1, revenue: 320 },
  { month: 'Nis', projects: 4, revenue: 890 },
  { month: 'May', projects: 2, revenue: 520 },
  { month: 'Haz', projects: 5, revenue: 1200 },
  { month: 'Tem', projects: 3, revenue: 780 },
  { month: 'Ağu', projects: 4, revenue: 950 },
  { month: 'Eyl', projects: 6, revenue: 1450 },
  { month: 'Eki', projects: 4, revenue: 1100 },
  { month: 'Kas', projects: 5, revenue: 1280 },
  { month: 'Ara', projects: 7, revenue: 1650 },
];

// Project status distribution
const projectStatusData = [
  { name: 'Tamamlanan', value: 45, color: '#10B981' },
  { name: 'Devam Eden', value: 12, color: '#3B82F6' },
  { name: 'Planlanan', value: 8, color: '#F59E0B' },
];

// Contact sources
const contactSourceData = [
  { source: 'Website', count: 45 },
  { source: 'Telefon', count: 32 },
  { source: 'E-posta', count: 28 },
  { source: 'Sosyal Medya', count: 18 },
  { source: 'Referans', count: 22 },
];

// Weekly visitors
const weeklyVisitorsData = [
  { day: 'Pzt', visitors: 120 },
  { day: 'Sal', visitors: 150 },
  { day: 'Çar', visitors: 180 },
  { day: 'Per', visitors: 140 },
  { day: 'Cum', visitors: 200 },
  { day: 'Cmt', visitors: 90 },
  { day: 'Paz', visitors: 60 },
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

// Revenue Area Chart
export function RevenueChart() {
  const t = useTranslations('admin');
  
  return (
    <ChartCard title={t('charts.monthlyRevenue')}>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
              formatter={(value: number | string | undefined) => [`${value ?? 0}K ₺`, 'Gelir']}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3B82F6" 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

// Projects Bar Chart
export function ProjectsChart() {
  const t = useTranslations('admin');
  
  return (
    <ChartCard title={t('charts.monthlyProjects')}>
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
              formatter={(value: number | string | undefined) => [value ?? 0, 'Proje']}
            />
            <Bar 
              dataKey="projects" 
              fill="#10B981" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

// Project Status Pie Chart
export function ProjectStatusChart() {
  const t = useTranslations('admin');
  
  return (
    <ChartCard title={t('charts.projectStatus')}>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
          <PieChart>
            <Pie
              data={projectStatusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {projectStatusData.map((entry, index) => (
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

// Contact Sources Bar Chart
export function ContactSourcesChart() {
  const t = useTranslations('admin');
  
  return (
    <ChartCard title={t('charts.contactSources')}>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
          <BarChart data={contactSourceData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis 
              type="number"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={{ stroke: '#374151', opacity: 0.2 }}
            />
            <YAxis 
              type="category"
              dataKey="source" 
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              axisLine={{ stroke: '#374151', opacity: 0.2 }}
              width={100}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: 'none', 
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: number | string | undefined) => [value ?? 0, 'İletişim']}
            />
            <Bar 
              dataKey="count" 
              fill="#8B5CF6" 
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

// Visitors Line Chart
export function VisitorsChart() {
  const t = useTranslations('admin');
  
  return (
    <ChartCard title={t('charts.weeklyVisitors')}>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%" minHeight={300}>
          <LineChart data={weeklyVisitorsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey="day" 
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
              formatter={(value: number | string | undefined) => [value ?? 0, 'Ziyaretçi']}
            />
            <Line 
              type="monotone" 
              dataKey="visitors" 
              stroke="#F59E0B" 
              strokeWidth={3}
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
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
        <RevenueChart />
        <ProjectsChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProjectStatusChart />
        <ContactSourcesChart />
        <VisitorsChart />
      </div>
    </div>
  );
}
