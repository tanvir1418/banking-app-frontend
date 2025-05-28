
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Search, Plus, Download, SortAsc, Eye, Edit, MoreHorizontal, User, Clock, CheckCircle } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

interface WorkflowData {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Draft' | 'Inactive';
  pendingApprovals: number;
  lastModified: string;
  assignedApprovers: string[];
}

const workflowData: WorkflowData[] = [
  {
    id: 'WF-2025-0001',
    name: 'Personal Account Approval',
    type: 'Personal Account',
    status: 'Active',
    pendingApprovals: 12,
    lastModified: 'May 8, 2025',
    assignedApprovers: ['EJ', 'RC', 'SW']
  },
  {
    id: 'WF-2025-0002',
    name: 'Business Account Approval',
    type: 'Business Account',
    status: 'Active',
    pendingApprovals: 7,
    lastModified: 'May 6, 2025',
    assignedApprovers: ['MT', 'AL', 'DM', '+2']
  },
  {
    id: 'WF-2025-0003',
    name: 'Loan Application Review',
    type: 'Loan Application',
    status: 'Draft',
    pendingApprovals: 0,
    lastModified: 'May 9, 2025',
    assignedApprovers: ['AG']
  },
  {
    id: 'WF-2025-0004',
    name: 'Credit Card Application',
    type: 'Credit Card',
    status: 'Inactive',
    pendingApprovals: 0,
    lastModified: 'May 1, 2025',
    assignedApprovers: ['TW', 'GP']
  },
  {
    id: 'WF-2025-0005',
    name: 'Premium Client Onboarding',
    type: 'Personal Account',
    status: 'Active',
    pendingApprovals: 5,
    lastModified: 'May 7, 2025',
    assignedApprovers: ['SR', 'DK', 'ET']
  }
];

const AdminAccountManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowData | null>(workflowData[0]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case 'Draft':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Draft</Badge>;
      case 'Inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Personal Account':
        return <Badge variant="outline" className="text-blue-600 border-blue-200">Personal Account</Badge>;
      case 'Business Account':
        return <Badge variant="outline" className="text-purple-600 border-purple-200">Business Account</Badge>;
      case 'Loan Application':
        return <Badge variant="outline" className="text-green-600 border-green-200">Loan Application</Badge>;
      case 'Credit Card':
        return <Badge variant="outline" className="text-red-600 border-red-200">Credit Card</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Approval Workflows</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and monitor account approval processes</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create New Workflow
              </Button>
            </div>

            {/* Filters and Search */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search workflows..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status: All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">Status: All</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Workflow Type: All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">Workflow Type: All</SelectItem>
                      <SelectItem value="Personal Account">Personal Account</SelectItem>
                      <SelectItem value="Business Account">Business Account</SelectItem>
                      <SelectItem value="Loan Application">Loan Application</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <SortAsc className="w-4 h-4 mr-2" />
                    Sort
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Workflow Management Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Workflows Table */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Workflow Management</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-blue-50 dark:bg-blue-900/20">
                        <TableRow>
                          <TableHead className="text-blue-700 dark:text-blue-300 font-semibold">WORKFLOW NAME</TableHead>
                          <TableHead className="text-blue-700 dark:text-blue-300 font-semibold">TYPE</TableHead>
                          <TableHead className="text-blue-700 dark:text-blue-300 font-semibold">STATUS</TableHead>
                          <TableHead className="text-blue-700 dark:text-blue-300 font-semibold">PENDING APPROVALS</TableHead>
                          <TableHead className="text-blue-700 dark:text-blue-300 font-semibold">LAST MODIFIED</TableHead>
                          <TableHead className="text-blue-700 dark:text-blue-300 font-semibold">ASSIGNED APPROVERS</TableHead>
                          <TableHead className="text-blue-700 dark:text-blue-300 font-semibold">ACTIONS</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {workflowData.map((workflow) => (
                          <TableRow 
                            key={workflow.id} 
                            className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                              selectedWorkflow?.id === workflow.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                            }`}
                            onClick={() => setSelectedWorkflow(workflow)}
                          >
                            <TableCell>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">{workflow.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{workflow.id}</div>
                              </div>
                            </TableCell>
                            <TableCell>{getTypeBadge(workflow.type)}</TableCell>
                            <TableCell>{getStatusBadge(workflow.status)}</TableCell>
                            <TableCell>
                              <span className="font-semibold text-gray-900 dark:text-white">{workflow.pendingApprovals}</span>
                            </TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-400">{workflow.lastModified}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                {workflow.assignedApprovers.map((approver, index) => (
                                  <Avatar key={index} className="w-6 h-6">
                                    <AvatarFallback className="text-xs bg-blue-100 text-blue-700">{approver}</AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Showing 1 to 5 of 24 results
                        </span>
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#" isActive>1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <span className="px-2">...</span>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#">5</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationNext href="#" />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Workflow Details Preview */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Workflow Details Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {selectedWorkflow && (
                      <>
                        {/* Workflow Header */}
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{selectedWorkflow.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{selectedWorkflow.id}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                            <div className="w-8 h-4 bg-blue-600 rounded-full relative">
                              <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                            </div>
                          </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Workflow Type</div>
                            <div className="font-semibold text-gray-900 dark:text-white">{selectedWorkflow.type}</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                              <Clock className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Pending Approvals</div>
                            <div className="font-semibold text-gray-900 dark:text-white">{selectedWorkflow.pendingApprovals} applications pending</div>
                          </div>
                          <div className="text-center">
                            <div className="flex items-center justify-center mb-2">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Average Approval Time</div>
                            <div className="font-semibold text-gray-900 dark:text-white">1.5 days</div>
                          </div>
                        </div>

                        {/* Approval Stages */}
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-4">Approval Stages</h4>
                          <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 dark:text-white">Initial Document Verification</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Verification of customer identification documents and initial application form</div>
                                <div className="flex items-center mt-2">
                                  <Avatar className="w-5 h-5 mr-2">
                                    <AvatarFallback className="text-xs bg-blue-100 text-blue-700">EJ</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">Assigned to Emily Johnson</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                <span className="text-sm font-semibold text-blue-600">2</span>
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 dark:text-white">Credit Check & Risk Assessment</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Evaluation of credit history and assessment of financial risk factors</div>
                                <div className="flex items-center mt-2">
                                  <Avatar className="w-5 h-5 mr-2">
                                    <AvatarFallback className="text-xs bg-blue-100 text-blue-700">RC</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">Assigned to Robert Chen</span>
                                </div>
                              </div>
                            </div>

                            {/* Additional status indicators */}
                            <div className="flex items-center justify-center space-x-8 pt-4">
                              <div className="text-center">
                                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-2">
                                  <span className="text-sm font-semibold text-gray-600">SW</span>
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-2">
                                  <CheckCircle className="w-4 h-4 text-blue-600" />
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-2">
                                  <Clock className="w-4 h-4 text-yellow-600" />
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-2">
                                  <span className="text-lg text-red-600">×</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAccountManagement;
