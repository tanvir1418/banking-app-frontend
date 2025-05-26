
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'; // Removed CardHeader, CardTitle
import { LucideIcon } from 'lucide-react';

interface Transaction {
  id: string;
  description: string;
  date: string;
  category: string;
  amount: number;
  status: string;
  icon: LucideIcon; // Changed from logo to icon
  logo: string; // Keep for now or remove
}

interface RecentTransactionsTableProps {
  transactions: Transaction[];
}

const RecentTransactionsTable: React.FC<RecentTransactionsTableProps> = ({ transactions }) => {
  return (
    <Card className="bg-white shadow-lg">
      <div className="flex flex-row items-center justify-between p-6 pb-4"> {/* Adjusted padding */}
        <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
        <Button variant="link" className="text-sm text-blue-600 p-0 h-auto hover:underline">View All</Button>
      </div>
      <CardContent className="pt-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-600 hover:bg-blue-700">
              <TableHead className="text-white font-semibold">TRANSACTION</TableHead>
              <TableHead className="text-white font-semibold">DATE</TableHead>
              <TableHead className="text-white font-semibold">CATEGORY</TableHead>
              <TableHead className="text-white font-semibold text-right">AMOUNT</TableHead>
              <TableHead className="text-white font-semibold text-center">STATUS</TableHead>
              <TableHead className="text-white font-semibold text-right">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-gray-50 transition-colors duration-150 border-b"> {/* Added border-b */}
                <TableCell className="font-medium text-gray-800">
                  <div className="flex items-center">
                    <div className={`h-8 w-8 mr-3 rounded-full flex items-center justify-center
                      ${tx.category === 'Utility' ? 'bg-yellow-100 text-yellow-600' :
                        tx.category === 'Internet' ? 'bg-purple-100 text-purple-600' :
                        tx.category === 'Insurance' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'}`}>
                      <tx.icon className="h-4 w-4" />
                    </div>
                    <div> {/* Added a div to wrap text for better alignment if description is long */}
                      {tx.description}
                      {tx.category === 'Utility' && <p className="text-xs text-gray-500">Electricity Bill</p>}
                      {tx.category === 'Internet' && <p className="text-xs text-gray-500">Internet Service</p>}
                       {tx.category === 'Insurance' && <p className="text-xs text-gray-500">Auto Insurance</p>}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600 text-sm">{tx.date}</TableCell>
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
