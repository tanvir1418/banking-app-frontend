
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, CreditCard, Activity, TrendingUp, Search, MoreHorizontal } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '24,521',
      change: '+2.5%',
      changeText: 'Compared to last month',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Active Accounts', 
      value: '18,472',
      change: '+8.2%',
      changeText: 'Compared to last month',
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Daily Transactions',
      value: '3,842',
      change: '+3.1%',
      changeText: 'Compared to yesterday',
      icon: CreditCard,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'System Status',
      value: 'All Systems Operational',
      change: 'Last updated: 10:45 AM',
      changeText: '',
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
  ];

  const chartData = [
    { month: 'Jan', income: 3000, expenses: 2400 },
    { month: 'Feb', income: 3500, expenses: 2600 },
    { month: 'Mar', income: 4200, expenses: 2800 },
    { month: 'Apr', income: 3800, expenses: 3200 },
    { month: 'May', income: 4500, expenses: 3000 },
    { month: 'Jun', income: 5200, expenses: 3400 },
    { month: 'Jul', income: 6100, expenses: 4200 },
    { month: 'Aug', income: 6200, expenses: 4100 },
    { month: 'Sep', income: 6000, expenses: 3900 },
    { month: 'Oct', income: 6800, expenses: 4300 },
    { month: 'Nov', income: 7200, expenses: 4500 },
    { month: 'Dec', income: 7500, expenses: 4800 },
  ];

  const chartConfig = {
    income: {
      label: "Income",
      color: "#3b82f6",
    },
    expenses: {
      label: "Expenses", 
      color: "#22c55e",
    },
  };

  const recentUsers = [
    {
      id: '#36201',
      name: 'Emily Johnson',
      email: 'emily.johnson@example.com',
      role: 'Customer',
      status: 'Active',
      joinedDate: 'May 10, 2025',
      avatar: 'EJ'
    },
    {
      id: '#36200',
      name: 'Robert Wilson',
      email: 'robert.wilson@example.com',
      role: 'Business',
      status: 'Active',
      joinedDate: 'May 9, 2025',
      avatar: 'RW'
    },
    {
      id: '#36199',
      name: 'Sophia Martinez',
      email: 'sophia.martinez@example.com',
      role: 'Customer',
      status: 'Pending',
      joinedDate: 'May 8, 2025',
      avatar: 'SM'
    },
    {
      id: '#36198',
      name: 'David Thompson',
      email: 'david.thompson@example.com',
      role: 'Customer',
      status: 'Locked',
      joinedDate: 'May 7, 2025',
      avatar: 'DT'
    },
  ];

  const recentActivity = [
    {
      title: 'New user registered',
      description: 'Emily Johnson created an account',
      time: '2 min ago',
      color: 'bg-blue-500'
    },
    {
      title: 'Account activated',
      description: "Robert Wilson's account was approved",
      time: '1 hour ago',
      color: 'bg-green-500'
    },
    {
      title: 'Security alert',
      description: 'Unusual login attempt detected',
      time: '2 hours ago',
      color: 'bg-yellow-500'
    },
    {
      title: 'Large transaction',
      description: '$25,000 transfer from Account #4562',
      time: '3 hours ago',
      color: 'bg-purple-500'
    },
    {
      title: 'Account locked',
      description: "David Thompson's account was locked",
      time: '4 hours ago',
      color: 'bg-red-500'
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400">● Active</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400">● Pending</Badge>;
      case 'Locked':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400">● Locked</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Business':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400">{role}</Badge>;
      case 'Customer':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400">{role}</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        
        <main className="flex-1 p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Dashboard Overview</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">May 11, 2025 | Sunday</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700">
                  Export Report
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  New Action
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-green-600 dark:text-green-400">{stat.change}</span>
                      {stat.changeText && <span className="text-sm text-gray-500 dark:text-gray-400">{stat.changeText}</span>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Transaction Trends Chart */}
            <Card className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Transaction Trends</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400">Weekly</Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Monthly</Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400">Yearly</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-64">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                    <XAxis 
                      dataKey="month" 
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <YAxis className="text-gray-600 dark:text-gray-400" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="income" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#3b82f6' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                      dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#22c55e' }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.color}`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Users Table */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">Recent Users</CardTitle>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <Input
                      placeholder="Search users..."
                      className="pl-10 w-64 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  <Button variant="outline" className="text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700">
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-medium text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">USER</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">EMAIL</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">ROLE</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">STATUS</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">JOINED DATE</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{user.avatar}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{user.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{user.email}</td>
                        <td className="py-4 px-4">{getRoleBadge(user.role)}</td>
                        <td className="py-4 px-4">{getStatusBadge(user.status)}</td>
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400">{user.joinedDate}</td>
                        <td className="py-4 px-4">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
