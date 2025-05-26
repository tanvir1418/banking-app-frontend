
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Zap, Wifi, Shield, CreditCard } from 'lucide-react';

interface Transaction {
  id: string;
  description: string;
  date: string;
  category: string;
  amount: number;
  status: string;
  icon?: React.ElementType;
}

interface RecentTransactionsTableProps {
  transactions: Transaction[];
}

const RecentTransactionsTable: React.FC<RecentTransactionsTableProps> = ({ transactions }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Utility':
        return Zap;
      case 'Internet':
        return Wifi;
      case 'Insurance':
        return Shield;
      default:
        return CreditCard;
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <Button variant="link" className="text-sm text-blue-600 p-0 h-auto hover:underline">View All</Button>
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-500 hover:bg-blue-600">
                <TableHead className="text-white font-medium uppercase text-xs">TRANSACTION</TableHead>
                <TableHead className="text-white font-medium uppercase text-xs">DATE</TableHead>
                <TableHead className="text-white font-medium uppercase text-xs">CATEGORY</TableHead>
                <TableHead className="text-white font-medium uppercase text-xs text-right">AMOUNT</TableHead>
                <TableHead className="text-white font-medium uppercase text-xs text-center">STATUS</TableHead>
                <TableHead className="text-white font-medium uppercase text-xs text-right">ACTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => {
                const IconComponent = getCategoryIcon(tx.category);
                return (
                  <TableRow key={tx.id} className="hover:bg-gray-50 transition-colors duration-150 border-b">
                    <TableCell className="font-medium text-gray-800">
                      <div className="flex items-center">
                        <div className={`h-8 w-8 mr-3 rounded-full flex items-center justify-center
                          ${tx.category === 'Utility' ? 'bg-yellow-100 text-yellow-600' :
                          tx.category === 'Internet' ? 'bg-purple-100 text-purple-600' :
                          tx.category === 'Insurance' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
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
                      <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700 text-xs hover:underline">
                        <FileText className="h-3 w-3 mr-1" />
                        Receipt
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default RecentTransactionsTable;
