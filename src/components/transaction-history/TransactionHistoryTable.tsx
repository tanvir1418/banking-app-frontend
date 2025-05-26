
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { LucideIcon, MoreHorizontal, ShoppingCart, Briefcase, Building, Utensils, Film, Fuel, Landmark } from 'lucide-react';

interface Transaction {
  id: string;
  selected?: boolean;
  icon: LucideIcon;
  description: string;
  details: string;
  date: string;
  time: string;
  category: string;
  categoryColor: string; // e.g. bg-purple-100 text-purple-600
  amount: number;
  status: "Completed" | "Pending" | "Failed";
}

const mockTransactions: Transaction[] = [
  { id: '1', icon: ShoppingCart, description: "Amazon.com", details: "Online Shopping", date: "May 6, 2025", time: "10:23 AM", category: "Shopping", categoryColor: "bg-blue-100 text-blue-700", amount: -128.50, status: "Completed" },
  { id: '2', icon: Briefcase, description: "Acme Corp", details: "Salary Deposit", date: "May 5, 2025", time: "09:00 AM", category: "Income", categoryColor: "bg-green-100 text-green-700", amount: 3450.00, status: "Completed" },
  { id: '3', icon: Building, description: "Sunset Apartments", details: "Rent Payment", date: "May 3, 2025", time: "02:15 PM", category: "Housing", categoryColor: "bg-yellow-100 text-yellow-700", amount: -1850.00, status: "Completed" },
  { id: '4', icon: Utensils, description: "Bistro Cafe", details: "Dinner", date: "May 2, 2025", time: "07:45 PM", category: "Food", categoryColor: "bg-orange-100 text-orange-700", amount: -78.35, status: "Completed" },
  { id: '5', icon: Film, description: "Netflix", details: "Subscription", date: "May 1, 2025", time: "12:00 AM", category: "Entertainment", categoryColor: "bg-pink-100 text-pink-700", amount: -14.99, status: "Completed" },
  { id: '6', icon: Fuel, description: "Shell Gas Station", details: "Fuel", date: "April 30, 2025", time: "03:45 PM", category: "Transportation", categoryColor: "bg-purple-100 text-purple-700", amount: -65.20, status: "Completed" },
  { id: '7', icon: Landmark, description: "Savings Account", details: "Transfer", date: "April 28, 2025", time: "10:30 AM", category: "Transfer", categoryColor: "bg-indigo-100 text-indigo-700", amount: -500.00, status: "Completed" },
];

const ITEMS_PER_PAGE = 7;

const TransactionHistoryTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions.slice(0, ITEMS_PER_PAGE).map(t => ({ ...t, selected: false })));
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockTransactions.length / ITEMS_PER_PAGE);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setTransactions(prev => prev.map(t => ({ ...t, selected: checked })));
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, selected: checked } : t));
    if (!checked) setSelectAll(false);
  };
  
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setTransactions(mockTransactions.slice(startIndex, endIndex).map(t => ({ ...t, selected: selectAll })));
  };

  const displayedTransactions = transactions; // Already paginated in state

  return (
    <Card className="shadow-md">
      <CardHeader className="border-b pb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
          <p className="text-sm text-gray-500">Showing {transactions.length} of {mockTransactions.length} transactions</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-blue-600">
            <TableRow className="hover:bg-blue-600">
              <TableHead className="w-[50px] text-white">
                <Checkbox 
                  id="selectAll" 
                  checked={selectAll} 
                  onCheckedChange={handleSelectAll} 
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-blue-600"
                />
              </TableHead>
              <TableHead className="text-white">Transaction</TableHead>
              <TableHead className="text-white">Date</TableHead>
              <TableHead className="text-white">Category</TableHead>
              <TableHead className="text-right text-white">Amount</TableHead>
              <TableHead className="text-center text-white">Status</TableHead>
              <TableHead className="text-center text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedTransactions.map((transaction) => {
              const IconComponent = transaction.icon;
              return (
                <TableRow key={transaction.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox 
                      checked={transaction.selected} 
                      onCheckedChange={(checked) => handleSelectRow(transaction.id, Boolean(checked))}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{transaction.description}</div>
                        <div className="text-xs text-gray-500">{transaction.details}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-800">{transaction.date}</div>
                    <div className="text-xs text-gray-500">{transaction.time}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs ${transaction.categoryColor} border-current`}>{transaction.category}</Badge>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`${transaction.status === 'Completed' ? 'bg-green-100 text-green-700' : transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="py-4 border-t">
        <div className="flex items-center justify-between w-full">
            <p className="text-sm text-gray-500">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, mockTransactions.length)} of {mockTransactions.length} results
            </p>
            <Pagination>
                <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => {e.preventDefault(); handlePageChange(currentPage - 1)}} className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}/>
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    if (totalPages <= 5 || pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage -1 && pageNum <= currentPage + 1)) {
                        return (
                            <PaginationItem key={pageNum}>
                                <PaginationLink href="#" onClick={(e) => {e.preventDefault(); handlePageChange(pageNum)}} isActive={currentPage === pageNum}>
                                {pageNum}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                        return <PaginationEllipsis key={`ellipsis-${pageNum}`} />;
                    }
                    return null;
                })}
                <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => {e.preventDefault(); handlePageChange(currentPage + 1)}} className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}/>
                </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
      </CardFooter>
    </Card>
  );
};

// Need to import Card, CardContent, CardHeader, CardFooter if not globally available
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
export default TransactionHistoryTable;
