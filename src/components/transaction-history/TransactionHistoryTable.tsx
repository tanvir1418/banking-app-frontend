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
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
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
  categoryColor: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
}

const mockTransactions: Transaction[] = [
  { id: '1', icon: ShoppingCart, description: "Amazon.com", details: "Online Shopping", date: "May 6, 2025", time: "10:23 AM", category: "Shopping", categoryColor: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400", amount: -128.50, status: "Completed" },
  { id: '2', icon: Briefcase, description: "Acme Corp", details: "Salary Deposit", date: "May 5, 2025", time: "09:00 AM", category: "Income", categoryColor: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400", amount: 3450.00, status: "Completed" },
  { id: '3', icon: Building, description: "Sunset Apartments", details: "Rent Payment", date: "May 3, 2025", time: "02:15 PM", category: "Housing", categoryColor: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400", amount: -1850.00, status: "Completed" },
  { id: '4', icon: Utensils, description: "Bistro Cafe", details: "Dinner", date: "May 2, 2025", time: "07:45 PM", category: "Food", categoryColor: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400", amount: -78.35, status: "Completed" },
  { id: '5', icon: Film, description: "Netflix", details: "Subscription", date: "May 1, 2025", time: "12:00 AM", category: "Entertainment", categoryColor: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400", amount: -14.99, status: "Completed" },
  { id: '6', icon: Fuel, description: "Shell Gas Station", details: "Fuel", date: "April 30, 2025", time: "03:45 PM", category: "Transportation", categoryColor: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400", amount: -65.20, status: "Completed" },
  { id: '7', icon: Landmark, description: "Savings Account", details: "Transfer", date: "April 28, 2025", time: "10:30 AM", category: "Transfer", categoryColor: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400", amount: -500.00, status: "Completed" },
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

  const displayedTransactions = transactions;

  return (
    <Card className="shadow-md bg-card">
      <CardHeader className="border-b pb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-card-foreground">Recent Transactions</h2>
          <p className="text-sm text-muted-foreground">Showing {transactions.length} of {mockTransactions.length} transactions</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-primary">
            <TableRow className="hover:bg-primary/90 border-border">
              <TableHead className="w-[50px] text-primary-foreground">
                <Checkbox 
                  id="selectAll" 
                  checked={selectAll} 
                  onCheckedChange={handleSelectAll} 
                  className="border-primary-foreground data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary"
                />
              </TableHead>
              <TableHead className="text-primary-foreground">Transaction</TableHead>
              <TableHead className="text-primary-foreground">Date</TableHead>
              <TableHead className="text-primary-foreground">Category</TableHead>
              <TableHead className="text-right text-primary-foreground">Amount</TableHead>
              <TableHead className="text-center text-primary-foreground">Status</TableHead>
              <TableHead className="text-center text-primary-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedTransactions.map((transaction) => {
              const IconComponent = transaction.icon;
              return (
                <TableRow key={transaction.id} className="hover:bg-accent/50 border-border">
                  <TableCell>
                    <Checkbox 
                      checked={transaction.selected} 
                      onCheckedChange={(checked) => handleSelectRow(transaction.id, Boolean(checked))}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="bg-muted p-2 rounded-full">
                        <IconComponent className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-card-foreground">{transaction.description}</div>
                        <div className="text-xs text-muted-foreground">{transaction.details}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-card-foreground">{transaction.date}</div>
                    <div className="text-xs text-muted-foreground">{transaction.time}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs ${transaction.categoryColor} border-current`}>{transaction.category}</Badge>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${transaction.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                    {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`${transaction.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : transaction.status === 'Pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
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
      <CardFooter className="py-4 border-t border-border">
        <div className="flex items-center justify-between w-full">
            <p className="text-sm text-muted-foreground">
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

export default TransactionHistoryTable;
