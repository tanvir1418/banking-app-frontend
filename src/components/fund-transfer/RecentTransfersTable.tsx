
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface TransferData {
  date: string;
  from: string;
  to: string;
  amount: string;
  status: string;
  action: string;
}

interface RecentTransfersTableProps {
  transfers: TransferData[];
}

const RecentTransfersTable: React.FC<RecentTransfersTableProps> = ({ transfers }) => {
  return (
    <Card className="shadow-lg bg-white mt-8">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">Recent Transfers</CardTitle> {/* Adjusted text size */}
        <CardDescription className="text-sm text-gray-500">Overview of your recent internal fund movements.</CardDescription> {/* Adjusted text size */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-600">Date</TableHead>
              <TableHead className="text-gray-600">From</TableHead>
              <TableHead className="text-gray-600">To</TableHead>
              <TableHead className="text-gray-600">Amount</TableHead>
              <TableHead className="text-gray-600 text-center">Status</TableHead> {/* Centered status */}
              <TableHead className="text-gray-600 text-right">Action</TableHead> {/* Right-aligned action */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {transfers.map((transfer, index) => (
              <TableRow key={index}>
                <TableCell className="text-gray-700 text-sm">{transfer.date}</TableCell> {/* Adjusted text size */}
                <TableCell className="text-gray-700 text-sm">{transfer.from}</TableCell>
                <TableCell className="text-gray-700 text-sm">{transfer.to}</TableCell>
                <TableCell className="text-gray-700 font-medium text-sm">{transfer.amount}</TableCell>
                <TableCell className="text-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${transfer.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {transfer.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700 text-xs">{transfer.action}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentTransfersTable;
