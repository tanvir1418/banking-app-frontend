
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Transaction {
  id: string;
  description: string;
  date: string;
  category: string;
  amount: number;
  status: string;
  logo: string;
}

interface RecentTransactionsTableProps {
  transactions: Transaction[];
}

const RecentTransactionsTable: React.FC<RecentTransactionsTableProps> = ({ transactions }) => {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-4"> {/* Adjusted padding */}
        <CardTitle className="text-xl text-gray-800">Recent Transactions</CardTitle>
        <Button variant="link" className="text-sm text-blue-600 p-0 h-auto">View All</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-600 font-medium">TRANSACTION</TableHead> {/* Added font-medium */}
              <TableHead className="text-gray-600 font-medium">DATE</TableHead>
              <TableHead className="text-gray-600 font-medium">CATEGORY</TableHead>
              <TableHead className="text-gray-600 font-medium text-right">AMOUNT</TableHead>
              <TableHead className="text-gray-600 font-medium text-center">STATUS</TableHead>
              <TableHead className="text-gray-600 font-medium text-right">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-gray-50 transition-colors duration-150"> {/* Added hover effect */}
                <TableCell className="font-medium text-gray-800">
                  <div className="flex items-center">
                    <img src={tx.logo} alt={`${tx.description} logo`} className="h-8 w-8 mr-3 rounded-full object-cover bg-gray-200 border border-gray-300" /> {/* Increased size, added border */}
                    {tx.description}
                  </div>
                </TableCell>
                <TableCell className="text-gray-600 text-sm">{tx.date}</TableCell> {/* Adjusted text size */}
                <TableCell>
                  <span className={`px-2.5 py-1 text-xs rounded-full font-semibold
                    ${tx.category === 'Utility' ? 'bg-yellow-100 text-yellow-800' :
                      tx.category === 'Internet' ? 'bg-purple-100 text-purple-800' :
                      tx.category === 'Insurance' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-700'}`}>
                    {tx.category}
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium text-gray-800">${Math.abs(tx.amount).toFixed(2)}</TableCell>
                <TableCell className="text-center">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${tx.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {tx.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700 text-xs hover:underline">Receipt</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentTransactionsTable;
