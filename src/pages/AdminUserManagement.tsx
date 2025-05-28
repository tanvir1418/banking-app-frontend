
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, MoreHorizontal, Eye, Edit, Trash2, Filter, X } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
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

interface Permission {
  module: string;
  submodule?: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  approve: boolean;
}

const AdminUserManagement = () => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showRoleDetails, setShowRoleDetails] = useState(false);
  const { toast } = useToast();

  // Mock data for roles
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

  const permissions: Permission[] = [
    { module: 'User Management', view: true, create: true, edit: true, delete: true, approve: true },
    { module: 'User Management', submodule: 'User Accounts', view: true, create: true, edit: true, delete: true, approve: true },
    { module: 'User Management', submodule: 'Roles & Permissions', view: true, create: true, edit: true, delete: true, approve: true },
    { module: 'Customer Management', view: true, create: true, edit: true, delete: true, approve: true },
    { module: 'Customer Management', submodule: 'Customer Profiles', view: true, create: true, edit: true, delete: true, approve: true },
    { module: 'Customer Management', submodule: 'KYC Documents', view: true, create: true, edit: true, delete: true, approve: true },
    { module: 'Account Management', view: true, create: true, edit: true, delete: true, approve: true },
    { module: 'Account Management', submodule: 'Savings Accounts', view: true, create: true, edit: true, delete: true, approve: true },
  ];

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
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
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'Inactive':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Inactive</Badge>;
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

  const handleRoleClick = (role: UserRole) => {
    setSelectedRole(role);
    setShowRoleDetails(true);
  };

  const handleCloseRoleDetails = () => {
    setShowRoleDetails(false);
    setSelectedRole(null);
  };

  if (showRoleDetails && selectedRole) {
    return (
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          
          <main className="flex-1 p-6">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" onClick={handleCloseRoleDetails} className="text-gray-600">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900">Role Details: {selectedRole.role_name}</h1>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Save Changes
                </Button>
              </div>

              {/* Role Details Card */}
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <Tabs defaultValue="basic-information" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-6">
                      <TabsTrigger value="basic-information">Basic Information</TabsTrigger>
                      <TabsTrigger value="permissions">Permissions</TabsTrigger>
                      <TabsTrigger value="users">Users (8)</TabsTrigger>
                      <TabsTrigger value="activity-log">Activity Log</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic-information" className="mt-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
                          <Input value={selectedRole.role_name} className="w-full" />
                        </div>
                        <div className="flex items-center space-x-4">
                          <label className="block text-sm font-medium text-gray-700">Status</label>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Active</span>
                            <Switch checked={true} />
                          </div>
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                          <Input value={selectedRole.description} className="w-full" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                          <Select defaultValue={selectedRole.department}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="IT">IT</SelectItem>
                              <SelectItem value="Operations">Operations</SelectItem>
                              <SelectItem value="Finance">Finance</SelectItem>
                              <SelectItem value="Customer Service">Customer Service</SelectItem>
                              <SelectItem value="Legal">Legal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Role Permissions</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="full-admin" checked />
                            <label htmlFor="full-admin" className="text-sm text-blue-600">Full Administrative Access</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="user-mgmt" checked />
                            <label htmlFor="user-mgmt" className="text-sm text-blue-600">User Management</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="transaction-approval" checked />
                            <label htmlFor="transaction-approval" className="text-sm text-blue-600">Transaction Approval (Any Amount)</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="system-config" checked />
                            <label htmlFor="system-config" className="text-sm text-blue-600">System Configuration</label>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="permissions" className="mt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">Detailed Permission Matrix</h3>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Expand All</Button>
                            <Button variant="outline" size="sm">Collapse All</Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-4">
                          <Checkbox id="select-all" />
                          <label htmlFor="select-all" className="text-sm font-medium text-gray-700">Select All Permissions</label>
                        </div>

                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <Table>
                            <TableHeader className="bg-blue-600">
                              <TableRow className="border-none hover:bg-blue-600">
                                <TableHead className="text-white font-medium text-xs uppercase tracking-wide">MODULE/FEATURE</TableHead>
                                <TableHead className="text-white font-medium text-xs uppercase tracking-wide text-center">VIEW</TableHead>
                                <TableHead className="text-white font-medium text-xs uppercase tracking-wide text-center">CREATE</TableHead>
                                <TableHead className="text-white font-medium text-xs uppercase tracking-wide text-center">EDIT</TableHead>
                                <TableHead className="text-white font-medium text-xs uppercase tracking-wide text-center">DELETE</TableHead>
                                <TableHead className="text-white font-medium text-xs uppercase tracking-wide text-center">APPROVE</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {permissions.map((permission, index) => (
                                <TableRow key={index} className="border-b border-gray-100">
                                  <TableCell className="py-3 px-4">
                                    <div className={`${permission.submodule ? 'ml-6' : ''}`}>
                                      {permission.submodule ? (
                                        <span className="text-sm text-gray-600">{permission.submodule}</span>
                                      ) : (
                                        <span className="font-medium text-gray-900">{permission.module}</span>
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Checkbox checked={permission.view} />
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Checkbox checked={permission.create} />
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Checkbox checked={permission.edit} />
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Checkbox checked={permission.delete} />
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Checkbox checked={permission.approve} />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="users" className="mt-6">
                      <div className="text-center py-8">
                        <p className="text-gray-500">Users assigned to this role will be displayed here.</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="activity-log" className="mt-6">
                      <div className="text-center py-8">
                        <p className="text-gray-500">Activity log for this role will be displayed here.</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        
        <main className="flex-1 p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-1">User Role Management</h1>
                <p className="text-sm text-gray-500">Create and manage user roles and permissions</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add New Role
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between mb-6 space-x-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Status">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Departments">All Departments</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Customer Service">Customer Service</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>

          {/* Roles Table */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-600 hover:bg-blue-600">
                      <TableHead className="text-white font-medium">
                        <Checkbox />
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
                      <TableRow 
                        key={index} 
                        className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleRoleClick(role)}
                      >
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-gray-900">{role.role_name}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-600 text-sm">
                            {role.description.length > 60 ? `${role.description.substring(0, 60)}...` : role.description}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-900">{role.users} users</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-600">{role.department}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-600">{role.created}</span>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(role.status)}
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Role
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
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
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Showing 1 to 5 of 12 results
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled className="text-gray-400">
                    Previous
                  </Button>
                  <Button size="sm" className="bg-blue-600 text-white">1</Button>
                  <Button variant="outline" size="sm" className="text-gray-600">2</Button>
                  <Button variant="outline" size="sm" className="text-gray-600">3</Button>
                  <span className="text-gray-500">...</span>
                  <Button variant="outline" size="sm" className="text-gray-600">8</Button>
                  <Button variant="outline" size="sm" className="text-gray-600">
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
