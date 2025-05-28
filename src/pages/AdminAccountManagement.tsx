
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
        return (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-700 dark:text-green-400">Active</span>
          </div>
        );
      case 'Draft':
        return (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-yellow-700 dark:text-yellow-400">Draft</span>
          </div>
        );
      case 'Inactive':
        return (
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <span className="text-sm text-gray-700 dark:text-gray-400">Inactive</span>
          </div>
        );
      default:
        return <span className="text-sm">{status}</span>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Personal Account':
        return <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">{type}</Badge>;
      case 'Business Account':
        return <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800">{type}</Badge>;
      case 'Loan Application':
        return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">{type}</Badge>;
      case 'Credit Card':
        return <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">{type}</Badge>;
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
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Account Approval Workflows</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage and monitor account approval processes</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm">
                <Plus className="w-4 h-4 mr-2" />
                Create New Workflow
              </Button>
            </div>

            {/* Workflow Management Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Workflow Management</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage and monitor account approval processes</p>
                
                {/* Filters */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search workflows"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-9 text-sm"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32 h-9 text-sm">
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
                    <SelectTrigger className="w-44 h-9 text-sm">
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
                  <Button variant="outline" size="sm" className="h-9 text-sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 text-sm">
                    <SortAsc className="w-4 h-4 mr-2" />
                    Sort
                  </Button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-blue-600">
                    <TableRow className="border-none hover:bg-blue-600">
                      <TableHead className="text-white font-medium text-xs uppercase tracking-wide py-3 px-4">Workflow Name</TableHead>
                      <TableHead className="text-white font-medium text-xs uppercase tracking-wide py-3 px-4">Type</TableHead>
                      <TableHead className="text-white font-medium text-xs uppercase tracking-wide py-3 px-4">Status</TableHead>
                      <TableHead className="text-white font-medium text-xs uppercase tracking-wide py-3 px-4">Pending Approvals</TableHead>
                      <TableHead className="text-white font-medium text-xs uppercase tracking-wide py-3 px-4">Last Modified</TableHead>
                      <TableHead className="text-white font-medium text-xs uppercase tracking-wide py-3 px-4">Assigned Approvers</TableHead>
                      <TableHead className="text-white font-medium text-xs uppercase tracking-wide py-3 px-4">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workflowData.map((workflow) => (
                      <TableRow 
                        key={workflow.id} 
                        className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 ${
                          selectedWorkflow?.id === workflow.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                        onClick={() => setSelectedWorkflow(workflow)}
                      >
                        <TableCell className="py-3 px-4">
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white text-sm">{workflow.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{workflow.id}</div>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 px-4">{getTypeBadge(workflow.type)}</TableCell>
                        <TableCell className="py-3 px-4">{getStatusBadge(workflow.status)}</TableCell>
                        <TableCell className="py-3 px-4">
                          <span className="font-medium text-gray-900 dark:text-white text-sm">{workflow.pendingApprovals}</span>
                        </TableCell>
                        <TableCell className="py-3 px-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">{workflow.lastModified}</span>
                        </TableCell>
                        <TableCell className="py-3 px-4">
                          <div className="flex items-center space-x-1">
                            {workflow.assignedApprovers.map((approver, index) => (
                              <Avatar key={index} className="w-6 h-6">
                                <AvatarFallback className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">{approver}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="py-3 px-4">
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
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
            </div>

            {/* Workflow Details Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Workflow Details Preview</h3>
                
                {selectedWorkflow && (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{selectedWorkflow.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{selectedWorkflow.id}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                        <div className="relative">
                          <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                            <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Workflow Type</div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{selectedWorkflow.type}</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                            <Clock className="w-4 h-4 text-yellow-600" />
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Pending Approvals</div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{selectedWorkflow.pendingApprovals} applications pending</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Average Approval Time</div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">1.5 days</div>
                      </div>
                    </div>

                    {/* Approval Stages */}
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-4">Approval Stages</h5>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-1">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white text-sm">Initial Document Verification</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Verification of customer identification documents and initial application form</div>
                            <div className="flex items-center mt-2">
                              <Avatar className="w-5 h-5 mr-2">
                                <AvatarFallback className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">EJ</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-600 dark:text-gray-400">Assigned to Emily Johnson</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mt-1">
                            <span className="text-xs font-medium text-blue-600">2</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white text-sm">Credit Check & Risk Assessment</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Evaluation of credit history and assessment of financial risk factors</div>
                            <div className="flex items-center mt-2">
                              <Avatar className="w-5 h-5 mr-2">
                                <AvatarFallback className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">RC</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-600 dark:text-gray-400">Assigned to Robert Chen</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminAccountManagement;
