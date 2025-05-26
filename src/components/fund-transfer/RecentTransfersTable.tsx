
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'; // Removed CardHeader, CardTitle, CardDescription

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
      <div className="p-6 pb-4"> {/* Title container */}
        <h2 className="text-xl font-semibold text-gray-800">Recent Transfers</h2>
        {/* Removed CardDescription */}
      </div>
      <CardContent className="pt-0"> {/* Removed padding top from card content as it's handled by title container */}
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-600 hover:bg-blue-700"> {/* Blue background for header row */}
              <TableHead className="text-white font-semibold">Date</TableHead> {/* White text */}
              <TableHead className="text-white font-semibold">From</TableHead>
              <TableHead className="text-white font-semibold">To</TableHead>
              <TableHead className="text-white font-semibold">Amount</TableHead>
              <TableHead className="text-white font-semibold text-center">Status</TableHead>
              <TableHead className="text-white font-semibold text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transfers.map((transfer, index) => (
              <TableRow key={index} className="border-b hover:bg-gray-50"> {/* Added border-b */}
                <TableCell className="text-gray-700 text-sm">{transfer.date}</TableCell>
                <TableCell className="text-gray-700 text-sm">{transfer.from}</TableCell>
                <TableCell className="text-gray-700 text-sm">{transfer.to}</TableCell>
                <TableCell className="text-gray-700 font-medium text-sm">{transfer.amount}</TableCell>
                <TableCell className="text-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${transfer.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {transfer.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700 text-xs hover:underline">{transfer.action}</Button>
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
