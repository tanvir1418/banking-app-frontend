
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserRole {
  role_name: string;
  description: string;
  users: number;
  department: string;
  created: string;
  status: 'Active' | 'Inactive';
}

const AdminUserManagement = () => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const { toast } = useToast();

  // Mock data for roles - replace with real Supabase data
  const mockRoles: UserRole[] = [
    {
      role_name: 'Administrator',
      description: 'Full system access with ability to manage all aspects of the banking platform',
      users: 8,
      department: 'IT',
      created: 'May 2, 2025',
      status: 'Active'
    },
    {
      role_name: 'Branch Manager',
      description: 'Manages branch operations, approves transactions and oversees daily activities',
      users: 12,
      department: 'Operations',
      created: 'Apr 15, 2025',
      status: 'Active'
    },
    {
      role_name: 'Loan Officer',
      description: 'Processes loan applications, evaluates credit reports and manages lending activities',
      users: 24,
      department: 'Finance',
      created: 'Mar 28, 2025',
      status: 'Active'
    },
    {
      role_name: 'Customer Service Rep',
      description: 'Handles customer inquiries, processes basic transactions and provides support',
      users: 36,
      department: 'Customer Service',
      created: 'Mar 10, 2025',
      status: 'Active'
    },
    {
      role_name: 'Compliance Officer',
      description: 'Ensures regulatory compliance, monitors suspicious activities and manages risk',
      users: 6,
      department: 'Legal',
      created: 'Feb 22, 2025',
      status: 'Inactive'
    }
  ];

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      // For now, using mock data. Replace with actual Supabase query
      // const { data, error } = await supabase.from('user_roles').select('*');
      // if (error) throw error;
      setRoles(mockRoles);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast({
        title: "Error",
        description: "Failed to fetch user roles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400">Active</Badge>;
      case 'Inactive':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.role_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || role.status === statusFilter;
    const matchesDepartment = departmentFilter === 'All Departments' || role.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <span>Dashboard</span>
            <span>{'>'}</span>
            <span>User Management</span>
            <span>{'>'}</span>
            <span className="text-gray-900 dark:text-white">Roles</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">User Role Management</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Create and manage user roles and permissions</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add New Role
              </Button>
            </div>
          </div>

          {/* Filters Card */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <Input
                      placeholder="Search roles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <SelectItem value="All Status">All Status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-48 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <SelectItem value="All Departments">All Departments</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Customer Service">Customer Service</SelectItem>
                      <SelectItem value="Legal">Legal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Roles Table */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-600 hover:bg-blue-600">
                      <TableHead className="text-white font-medium">
                        <input type="checkbox" className="rounded border-blue-400" />
                      </TableHead>
                      <TableHead className="text-white font-medium">ROLE NAME</TableHead>
                      <TableHead className="text-white font-medium">DESCRIPTION</TableHead>
                      <TableHead className="text-white font-medium">USERS</TableHead>
                      <TableHead className="text-white font-medium">DEPARTMENT</TableHead>
                      <TableHead className="text-white font-medium">CREATED</TableHead>
                      <TableHead className="text-white font-medium">STATUS</TableHead>
                      <TableHead className="text-white font-medium">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRoles.map((role, index) => (
                      <TableRow key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <TableCell>
                          <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600" />
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-gray-900 dark:text-white">{role.role_name}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-600 dark:text-gray-400 text-sm">
                            {role.description.length > 60 ? `${role.description.substring(0, 60)}...` : role.description}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-900 dark:text-white">{role.users} users</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-600 dark:text-gray-400">{role.department}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-600 dark:text-gray-400">{role.created}</span>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(role.status)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Role
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Role
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Showing 1 to 5 of 12 results
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled className="text-gray-400">
                    Previous
                  </Button>
                  <Button size="sm" className="bg-blue-600 text-white">1</Button>
                  <Button variant="outline" size="sm" className="text-gray-600 dark:text-gray-400">2</Button>
                  <Button variant="outline" size="sm" className="text-gray-600 dark:text-gray-400">3</Button>
                  <span className="text-gray-500">...</span>
                  <Button variant="outline" size="sm" className="text-gray-600 dark:text-gray-400">8</Button>
                  <Button variant="outline" size="sm" className="text-gray-600 dark:text-gray-400">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminUserManagement;
