
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
import { Label } from "@/components/ui/label";
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
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">Active</Badge>;
      case 'Inactive':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100">Inactive</Badge>;
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
      <div className="min-h-screen bg-background flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          
          <main className="flex-1 p-6 bg-muted/20">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" onClick={handleCloseRoleDetails} className="text-muted-foreground hover:text-foreground border border-border">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <div>
                    <h1 className="text-xl font-semibold text-foreground">Role Details: {selectedRole.role_name}</h1>
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Save Changes
                </Button>
              </div>

              {/* Role Details Card */}
              <Card className="bg-card border-border shadow-lg">
                <CardContent className="p-6">
                  <Tabs defaultValue="basic-information" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-6 bg-muted border border-border">
                      <TabsTrigger value="basic-information" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Basic Information</TabsTrigger>
                      <TabsTrigger value="permissions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Permissions</TabsTrigger>
                      <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Users (8)</TabsTrigger>
                      <TabsTrigger value="activity-log" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Activity Log</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic-information" className="mt-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <Label className="block text-sm font-medium text-foreground mb-2">Role Name</Label>
                          <Input value={selectedRole.role_name} className="w-full bg-background border-border focus:border-primary" />
                        </div>
                        <div className="flex items-center space-x-4">
                          <Label className="block text-sm font-medium text-foreground">Status</Label>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">Active</span>
                            <Switch checked={true} />
                          </div>
                        </div>
                        <div className="col-span-2">
                          <Label className="block text-sm font-medium text-foreground mb-2">Description</Label>
                          <Input value={selectedRole.description} className="w-full bg-background border-border focus:border-primary" />
                        </div>
                        <div>
                          <Label className="block text-sm font-medium text-foreground mb-2">Department</Label>
                          <Select defaultValue={selectedRole.department}>
                            <SelectTrigger className="bg-background border-border focus:border-primary">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-popover border-border">
                              <SelectItem value="IT">IT</SelectItem>
                              <SelectItem value="Operations">Operations</SelectItem>
                              <SelectItem value="Finance">Finance</SelectItem>
                              <SelectItem value="Customer Service">Customer Service</SelectItem>
                              <SelectItem value="Legal">Legal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
                        <h3 className="text-lg font-medium text-foreground mb-4">Role Permissions</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="full-admin" checked />
                            <Label htmlFor="full-admin" className="text-sm text-primary">Full Administrative Access</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="user-mgmt" checked />
                            <Label htmlFor="user-mgmt" className="text-sm text-primary">User Management</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="transaction-approval" checked />
                            <Label htmlFor="transaction-approval" className="text-sm text-primary">Transaction Approval (Any Amount)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="system-config" checked />
                            <Label htmlFor="system-config" className="text-sm text-primary">System Configuration</Label>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="permissions" className="mt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-foreground">Detailed Permission Matrix</h3>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="border-border">Expand All</Button>
                            <Button variant="outline" size="sm" className="border-border">Collapse All</Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-4 p-3 bg-muted/50 rounded-lg border border-border">
                          <Checkbox id="select-all" />
                          <Label htmlFor="select-all" className="text-sm font-medium text-foreground">Select All Permissions</Label>
                        </div>

                        <div className="border border-border rounded-lg overflow-hidden bg-card">
                          <Table>
                            <TableHeader className="bg-primary">
                              <TableRow className="border-none hover:bg-primary">
                                <TableHead className="text-primary-foreground font-medium text-xs uppercase tracking-wide">MODULE/FEATURE</TableHead>
                                <TableHead className="text-primary-foreground font-medium text-xs uppercase tracking-wide text-center">VIEW</TableHead>
                                <TableHead className="text-primary-foreground font-medium text-xs uppercase tracking-wide text-center">CREATE</TableHead>
                                <TableHead className="text-primary-foreground font-medium text-xs uppercase tracking-wide text-center">EDIT</TableHead>
                                <TableHead className="text-primary-foreground font-medium text-xs uppercase tracking-wide text-center">DELETE</TableHead>
                                <TableHead className="text-primary-foreground font-medium text-xs uppercase tracking-wide text-center">APPROVE</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {permissions.map((permission, index) => (
                                <TableRow key={index} className="border-b border-border hover:bg-muted/50">
                                  <TableCell className="py-3 px-4 bg-muted/20">
                                    <div className={`${permission.submodule ? 'ml-6' : ''}`}>
                                      {permission.submodule ? (
                                        <span className="text-sm text-muted-foreground">{permission.submodule}</span>
                                      ) : (
                                        <span className="font-medium text-foreground">{permission.module}</span>
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-center bg-card">
                                    <Checkbox checked={permission.view} />
                                  </TableCell>
                                  <TableCell className="text-center bg-card">
                                    <Checkbox checked={permission.create} />
                                  </TableCell>
                                  <TableCell className="text-center bg-card">
                                    <Checkbox checked={permission.edit} />
                                  </TableCell>
                                  <TableCell className="text-center bg-card">
                                    <Checkbox checked={permission.delete} />
                                  </TableCell>
                                  <TableCell className="text-center bg-card">
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
                      <div className="text-center py-8 bg-muted/20 rounded-lg border border-border">
                        <p className="text-muted-foreground">Users assigned to this role will be displayed here.</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="activity-log" className="mt-6">
                      <div className="text-center py-8 bg-muted/20 rounded-lg border border-border">
                        <p className="text-muted-foreground">Activity log for this role will be displayed here.</p>
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
    <div className="min-h-screen bg-background flex w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        
        <main className="flex-1 p-6 bg-muted/20">
          {/* Breadcrumb */}
          <div className="mb-4">
            <nav className="text-sm text-muted-foreground">
              Dashboard &gt; User Management &gt; Roles
            </nav>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-foreground mb-1">User Role Management</h1>
                <p className="text-sm text-muted-foreground">Create and manage user roles and permissions</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="mr-2 h-4 w-4" />
                Add New Role
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center justify-between mb-6 space-x-4 p-4 bg-card rounded-lg border border-border shadow-sm">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-border focus:border-primary"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 bg-background border-border focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="All Status">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-48 bg-background border-border focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="All Departments">All Departments</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Customer Service">Customer Service</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" className="border-border">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>

          {/* Roles Table */}
          <Card className="bg-card border-border shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-primary hover:bg-primary border-none">
                      <TableHead className="text-primary-foreground font-medium">
                        <Checkbox />
                      </TableHead>
                      <TableHead className="text-primary-foreground font-medium">ROLE NAME</TableHead>
                      <TableHead className="text-primary-foreground font-medium">DESCRIPTION</TableHead>
                      <TableHead className="text-primary-foreground font-medium">USERS</TableHead>
                      <TableHead className="text-primary-foreground font-medium">DEPARTMENT</TableHead>
                      <TableHead className="text-primary-foreground font-medium">CREATED</TableHead>
                      <TableHead className="text-primary-foreground font-medium">STATUS</TableHead>
                      <TableHead className="text-primary-foreground font-medium">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRoles.map((role, index) => (
                      <TableRow 
                        key={index} 
                        className="border-b border-border hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleRoleClick(role)}
                      >
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-foreground">{role.role_name}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground text-sm">
                            {role.description.length > 60 ? `${role.description.substring(0, 60)}...` : role.description}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-foreground">{role.users} users</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground">{role.department}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-muted-foreground">{role.created}</span>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(role.status)}
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-popover border-border">
                              <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-popover-foreground hover:bg-accent hover:text-accent-foreground">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Role
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950">
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
              <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/20">
                <div className="text-sm text-muted-foreground">
                  Showing 1 to 5 of 12 results
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled className="text-muted-foreground border-border">
                    Previous
                  </Button>
                  <Button size="sm" className="bg-primary text-primary-foreground">1</Button>
                  <Button variant="outline" size="sm" className="text-muted-foreground border-border">2</Button>
                  <Button variant="outline" size="sm" className="text-muted-foreground border-border">3</Button>
                  <span className="text-muted-foreground">...</span>
                  <Button variant="outline" size="sm" className="text-muted-foreground border-border">8</Button>
                  <Button variant="outline" size="sm" className="text-muted-foreground border-border">
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
