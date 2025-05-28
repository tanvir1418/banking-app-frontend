
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, RefreshCw, Download, Settings } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

interface SystemLog {
  id: string;
  timestamp: string;
  user: {
    name: string;
    role: string;
    avatar?: string;
  };
  eventType: string;
  description: string;
  ipAddress: string;
  status: 'Critical' | 'Warning' | 'Info' | 'Success';
}

const mockLogs: SystemLog[] = [
  {
    id: '1',
    timestamp: '2025-05-11 09:42:18',
    user: { name: 'Sarah Johnson', role: 'Financial Analyst' },
    eventType: 'Failed Login',
    description: 'Multiple failed login attempts detected. Account temporari...',
    ipAddress: '192.168.1.45',
    status: 'Critical'
  },
  {
    id: '2',
    timestamp: '2025-05-11 09:15:32',
    user: { name: 'David Thompson', role: 'IT Administrator' },
    eventType: 'Settings Change',
    description: 'Modified system security settings: Password policy updat...',
    ipAddress: '192.168.1.12',
    status: 'Warning'
  },
  {
    id: '3',
    timestamp: '2025-05-11 08:52:07',
    user: { name: 'Emily Wilson', role: 'HR Manager' },
    eventType: 'Data Access',
    description: 'Accessed employee database. Viewed records for depart...',
    ipAddress: '192.168.1.78',
    status: 'Info'
  },
  {
    id: '4',
    timestamp: '2025-05-11 08:30:15',
    user: { name: 'Michael Anderson', role: 'System Administrator' },
    eventType: 'Login',
    description: 'Successful login to admin dashboard. Two-factor authenti...',
    ipAddress: '192.168.1.10',
    status: 'Success'
  },
  {
    id: '5',
    timestamp: '2025-05-11 08:15:42',
    user: { name: 'David Thompson', role: 'IT Administrator' },
    eventType: 'System Update',
    description: 'Scheduled system maintenance completed. Updated secu...',
    ipAddress: '192.168.1.12',
    status: 'Info'
  },
  {
    id: '6',
    timestamp: '2025-05-11 07:58:23',
    user: { name: 'Sarah Johnson', role: 'Financial Analyst' },
    eventType: 'Data Modification',
    description: 'Modified financial records for Q2 2025. Transaction ID: FI...',
    ipAddress: '192.168.1.45',
    status: 'Warning'
  },
  {
    id: '7',
    timestamp: '2025-05-11 07:45:10',
    user: { name: 'Emily Wilson', role: 'HR Manager' },
    eventType: 'Login',
    description: 'Successful login to HR portal. Standard authentication veri...',
    ipAddress: '192.168.1.78',
    status: 'Success'
  },
  {
    id: '8',
    timestamp: '2025-05-11 07:30:55',
    user: { name: 'David Thompson', role: 'IT Administrator' },
    eventType: 'Data Access',
    description: 'Accessed system configuration files. Read-only access to ...',
    ipAddress: '192.168.1.12',
    status: 'Info'
  },
  {
    id: '9',
    timestamp: '2025-05-11 07:15:32',
    user: { name: 'Michael Anderson', role: 'System Administrator' },
    eventType: 'Logout',
    description: 'User logged out successfully. Session terminated normally.',
    ipAddress: '192.168.1.10',
    status: 'Success'
  },
  {
    id: '10',
    timestamp: '2025-05-11 07:02:18',
    user: { name: 'Unknown User', role: 'IP: 203.45.78.92' },
    eventType: 'Security Alert',
    description: 'Unauthorized access attempt detected. Possible brute for...',
    ipAddress: '203.45.78.92',
    status: 'Critical'
  }
];

const AdminSystemMonitoring = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userFilter, setUserFilter] = useState('All Users');
  const [eventTypeFilter, setEventTypeFilter] = useState('All Events');
  const [severityFilter, setSeverityFilter] = useState('All Severities');
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [showFailedOnly, setShowFailedOnly] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Critical':
        return (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm text-red-700 dark:text-red-400">Critical</span>
          </div>
        );
      case 'Warning':
        return (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm text-yellow-700 dark:text-yellow-400">Warning</span>
          </div>
        );
      case 'Info':
        return (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm text-blue-700 dark:text-blue-400">Info</span>
          </div>
        );
      case 'Success':
        return (
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-green-700 dark:text-green-400">Success</span>
          </div>
        );
      default:
        return <span className="text-sm">{status}</span>;
    }
  };

  const getEventTypeBadge = (eventType: string) => {
    switch (eventType) {
      case 'Failed Login':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400">{eventType}</Badge>;
      case 'Settings Change':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400">{eventType}</Badge>;
      case 'Data Access':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400">{eventType}</Badge>;
      case 'Login':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400">{eventType}</Badge>;
      case 'System Update':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400">{eventType}</Badge>;
      case 'Data Modification':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400">{eventType}</Badge>;
      case 'Logout':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400">{eventType}</Badge>;
      case 'Security Alert':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400">{eventType}</Badge>;
      default:
        return <Badge variant="outline">{eventType}</Badge>;
    }
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">System Logs & Audit Trails</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Monitor and analyze system activities and user actions</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="text-gray-600 dark:text-gray-400">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" className="text-gray-600 dark:text-gray-400">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6">
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Events Today</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">1,284</p>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">▲ 12% from yesterday</p>
                    </div>
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Critical Events</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">23</p>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">▲ 8% from yesterday</p>
                    </div>
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-red-600 rounded-sm"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Failed Logins</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">42</p>
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">▲ 15% from yesterday</p>
                    </div>
                    <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-yellow-600 rounded-sm"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Security Alerts</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">7</p>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">▲ 3% from yesterday</p>
                    </div>
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-green-600 rounded-sm"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-700 text-sm">
                      Clear All Filters
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Date Range</label>
                      <div className="flex space-x-2">
                        <Input 
                          type="date" 
                          defaultValue="2025-05-04"
                          className="flex-1" 
                        />
                        <Input 
                          type="date" 
                          defaultValue="2025-05-11"
                          className="flex-1" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">User</label>
                      <Select value={userFilter} onValueChange={setUserFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Users">All Users</SelectItem>
                          <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                          <SelectItem value="David Thompson">David Thompson</SelectItem>
                          <SelectItem value="Emily Wilson">Emily Wilson</SelectItem>
                          <SelectItem value="Michael Anderson">Michael Anderson</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Event Type</label>
                      <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Events">All Events</SelectItem>
                          <SelectItem value="Login">Login</SelectItem>
                          <SelectItem value="Failed Login">Failed Login</SelectItem>
                          <SelectItem value="Data Access">Data Access</SelectItem>
                          <SelectItem value="Settings Change">Settings Change</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Severity</label>
                      <Select value={severityFilter} onValueChange={setSeverityFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All Severities">All Severities</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                          <SelectItem value="Warning">Warning</SelectItem>
                          <SelectItem value="Info">Info</SelectItem>
                          <SelectItem value="Success">Success</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="real-time"
                        checked={realTimeUpdates}
                        onCheckedChange={setRealTimeUpdates}
                      />
                      <label htmlFor="real-time" className="text-sm text-gray-700 dark:text-gray-300">Real-time updates</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="failed-only"
                        checked={showFailedOnly}
                        onCheckedChange={setShowFailedOnly}
                      />
                      <label htmlFor="failed-only" className="text-sm text-gray-700 dark:text-gray-300">Show failed events only</label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="auto-refresh"
                        checked={autoRefresh}
                        onCheckedChange={setAutoRefresh}
                      />
                      <label htmlFor="auto-refresh" className="text-sm text-gray-700 dark:text-gray-300">Auto-refresh</label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Logs Table */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardContent className="p-0">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">System Logs</h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Showing 1-10 of 1,284 logs • 10 per page</span>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-blue-600">
                      <TableRow className="border-none hover:bg-blue-600">
                        <TableHead className="text-white font-medium text-xs uppercase tracking-wide py-3 px-4">
                          <input type="checkbox" className="rounded border-blue-400" />
                        </TableHead>
                        <TableHead className="text-white font-medium text-xs uppercase tracking-wide py-3 px-4">TIMESTAMP</TableHead>
                        <TableHead className="text-white font-medium text-xs uppercase tracking-wide py-3 px-4">USER</TableHead>
                        <TableHead className="text-white font-medium text-xs uppercase tracking-wide py-3 px-4">EVENT TYPE</TableHead>
                        <TableHead className="text-white font-medium text-xs uppercase tracking-wide py-3 px-4">DESCRIPTION</TableHead>
                        <TableHead className="text-white font-medium text-xs uppercase tracking-wide py-3 px-4">IP ADDRESS</TableHead>
                        <TableHead className="text-white font-medium text-xs uppercase tracking-wide py-3 px-4">STATUS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockLogs.map((log) => (
                        <TableRow key={log.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <TableCell className="py-3 px-4">
                            <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                          </TableCell>
                          <TableCell className="py-3 px-4">
                            <span className="text-sm text-gray-900 dark:text-white font-mono">{log.timestamp}</span>
                          </TableCell>
                          <TableCell className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                  {getUserInitials(log.user.name)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white text-sm">{log.user.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{log.user.role}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-3 px-4">
                            {getEventTypeBadge(log.eventType)}
                          </TableCell>
                          <TableCell className="py-3 px-4">
                            <span className="text-sm text-gray-600 dark:text-gray-400">{log.description}</span>
                          </TableCell>
                          <TableCell className="py-3 px-4">
                            <span className="text-sm text-gray-900 dark:text-white font-mono">{log.ipAddress}</span>
                          </TableCell>
                          <TableCell className="py-3 px-4">
                            {getStatusBadge(log.status)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Showing page 1 of 129
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button size="sm" className="bg-blue-600 text-white">1</Button>
                      <Button variant="outline" size="sm">2</Button>
                      <Button variant="outline" size="sm">3</Button>
                      <span className="text-gray-500">...</span>
                      <Button variant="outline" size="sm">5</Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSystemMonitoring;
