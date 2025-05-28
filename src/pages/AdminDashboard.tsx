
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, CreditCard, Activity, TrendingUp, Search, User, MoreHorizontal } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '24,521',
      change: '+2.5%',
      changeText: 'Compared to last month',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Active Accounts', 
      value: '18,472',
      change: '+8.2%',
      changeText: 'Compared to last month',
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Daily Transactions',
      value: '3,842',
      change: '+3.1%',
      changeText: 'Compared to yesterday',
      icon: CreditCard,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'System Status',
      value: 'All Systems Operational',
      change: 'Last updated: 10:45 AM',
      changeText: '',
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
  ];

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
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">● Active</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">● Pending</Badge>;
      case 'Locked':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">● Locked</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Business':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{role}</Badge>;
      case 'Customer':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{role}</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        
        <main className="flex-1 p-6">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">Dashboard Overview</h1>
                <p className="text-sm text-gray-500">May 11, 2025 | Sunday</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="text-gray-600">
                  Export Report
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  New Action
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-green-600">{stat.change}</span>
                      {stat.changeText && <span className="text-sm text-gray-500">{stat.changeText}</span>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Transaction Trends Chart Placeholder */}
            <Card className="lg:col-span-2 bg-white border border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">Transaction Trends</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-500">Weekly</Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Monthly</Button>
                    <Button variant="ghost" size="sm" className="text-gray-500">Yearly</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Chart visualization would go here</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white border border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.color}`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-500">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Users Table */}
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">Recent Users</CardTitle>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      className="pl-10 w-64 bg-white border-gray-200"
                    />
                  </div>
                  <Button variant="outline" className="text-gray-600">
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-sm text-gray-600 bg-gray-50">USER</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-gray-600 bg-gray-50">EMAIL</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-gray-600 bg-gray-50">ROLE</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-gray-600 bg-gray-50">STATUS</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-gray-600 bg-gray-50">JOINED DATE</th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-gray-600 bg-gray-50">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-xs font-medium text-blue-600">{user.avatar}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{user.email}</td>
                        <td className="py-4 px-4">{getRoleBadge(user.role)}</td>
                        <td className="py-4 px-4">{getStatusBadge(user.status)}</td>
                        <td className="py-4 px-4 text-gray-600">{user.joinedDate}</td>
                        <td className="py-4 px-4">
                          <Button variant="ghost" size="sm">
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
