
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Repeat } from 'lucide-react';

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
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-4">Recent Transfers</h2>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-500 hover:bg-blue-600">
                <TableHead className="text-white font-medium uppercase text-xs px-4">Date</TableHead>
                <TableHead className="text-white font-medium uppercase text-xs">From</TableHead>
                <TableHead className="text-white font-medium uppercase text-xs">To</TableHead>
                <TableHead className="text-white font-medium uppercase text-xs">Amount</TableHead>
                <TableHead className="text-white font-medium uppercase text-xs text-center">Status</TableHead>
                <TableHead className="text-white font-medium uppercase text-xs text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transfers.map((transfer, index) => (
                <TableRow key={index} className="border-b hover:bg-gray-50">
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
                    <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700 text-xs flex items-center justify-end space-x-1">
                      <Repeat className="h-3 w-3 mr-1" />
                      <span>Repeat</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default RecentTransfersTable;
