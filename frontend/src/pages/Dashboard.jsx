import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { DollarSign, Users, CheckCircle, TrendingUp, ArrowUp, ArrowDown, Activity, CreditCard } from 'lucide-react';
import { useLending } from '../context/LendingContext';

export default function Dashboard() {
  const { applications, fetchApplications } = useLending();
  const [loanData, setLoanData] = useState([]);
  const [stats, setStats] = useState({
    totalLoans: 0,
    approvedLoans: 0,
    averageScore: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    // Process real data from applications
    const approved = applications.filter(a => a.decision === 'Approved').length;
    const totalAmount = applications.reduce((sum, a) => sum + (a.loanAmount || 0), 0);
    const avgScore = applications.length > 0 
      ? Math.round(applications.reduce((sum, a) => sum + (a.creditScore || 0), 0) / applications.length)
      : 0;

    setStats({
      totalLoans: applications.length,
      approvedLoans: approved,
      averageScore: avgScore,
      totalAmount: totalAmount / 10000000, // in Crores
    });

    // Group by month for chart
    const monthlyData = {};
    applications.forEach(app => {
      if (app.createdAt) {
        const month = new Date(app.createdAt).toLocaleString('default', { month: 'short' });
        if (!monthlyData[month]) {
          monthlyData[month] = { applications: 0, approved: 0, amount: 0 };
        }
        monthlyData[month].applications++;
        if (app.decision === 'Approved') monthlyData[month].approved++;
        monthlyData[month].amount += (app.loanAmount || 0) / 10000000;
      }
    });

    const chartData = Object.entries(monthlyData).map(([month, data]) => ({
      month,
      applications: data.applications,
      approved: data.approved,
      amount: data.amount,
    }));

    setLoanData(chartData);
  }, [applications]);

  const kpiCards = [
    { 
      title: 'Total Applications', 
      value: stats.totalLoans, 
      change: '+12%', 
      icon: Users, 
      color: 'bg-blue-500',
      trend: 'up'
    },
    { 
      title: 'Approval Rate', 
      value: stats.totalLoans > 0 ? `${Math.round((stats.approvedLoans / stats.totalLoans) * 100)}%` : '0%', 
      change: '+5%', 
      icon: CheckCircle, 
      color: 'bg-green-500',
      trend: 'up'
    },
    { 
      title: 'Avg Credit Score', 
      value: stats.averageScore, 
      change: '+18', 
      icon: TrendingUp, 
      color: 'bg-purple-500',
      trend: 'up'
    },
    { 
      title: 'Total Disbursed', 
      value: `₹${stats.totalAmount.toFixed(1)}Cr`, 
      change: '+23%', 
      icon: DollarSign, 
      color: 'bg-orange-500',
      trend: 'up'
    },
  ];

  const reasonCodeData = [
    { name: 'High Loan Ratio', value: 35, color: '#ef4444' },
    { name: 'High EMI Ratio', value: 28, color: '#f59e0b' },
    { name: 'Data Inconsistency', value: 22, color: '#8b5cf6' },
    { name: 'Tenure Risk', value: 15, color: '#ec4899' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">Real-time insights of your lending portfolio</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiCards.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">{kpi.title}</p>
                  <p className="text-2xl font-bold mt-2">{kpi.value}</p>
                  <p className={`text-sm mt-2 flex items-center gap-1 ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {kpi.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    {kpi.change} from last month
                  </p>
                </div>
                <div className={`${kpi.color} p-3 rounded-xl`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Loan Application Trends</h2>
            <Activity className="text-gray-400" size={20} />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={loanData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="applications" stroke="#3b82f6" fill="#93c5fd" name="Applications" />
              <Area type="monotone" dataKey="approved" stroke="#22c55e" fill="#86efac" name="Approved" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Top Rejection Reasons</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reasonCodeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label
              >
                {reasonCodeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}