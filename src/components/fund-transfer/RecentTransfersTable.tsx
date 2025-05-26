
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Added CardContent, CardHeader, CardTitle
import { Repeat } from 'lucide-react';

interface TransferData {
  date: string;
  from: string;
  to: string;
  amount: string;
  status: string;
  action: string; // This can be a string for 'Repeat' or a component for more complex actions
}

interface RecentTransfersTableProps {
  transfers: TransferData[];
}

const RecentTransfersTable: React.FC<RecentTransfersTableProps> = ({ transfers }) => {
  if (!transfers || transfers.length === 0) {
    return (
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Transfers</h2>
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6 text-center text-gray-500">
            No recent transfers to display.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <Card className="overflow-hidden shadow-lg bg-white"> {/* Added shadow and bg */}
        <CardHeader className="px-6 py-4 border-b"> {/* Added padding and border */}
          <CardTitle className="text-xl font-semibold text-gray-800">Recent Transfers</CardTitle>
        </CardHeader>
        <CardContent className="p-0"> {/* Removed padding for table to use full width */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600"> {/* Changed to blue-600, removed hover change */}
                  <TableHead className="px-4 py-3 text-white font-semibold uppercase text-xs tracking-wider">Date</TableHead> {/* Adjusted padding and tracking */}
                  <TableHead className="px-4 py-3 text-white font-semibold uppercase text-xs tracking-wider">From</TableHead>
                  <TableHead className="px-4 py-3 text-white font-semibold uppercase text-xs tracking-wider">To</TableHead>
                  <TableHead className="px-4 py-3 text-white font-semibold uppercase text-xs tracking-wider text-right">Amount</TableHead> {/* text-right */}
                  <TableHead className="px-4 py-3 text-white font-semibold uppercase text-xs tracking-wider text-center">Status</TableHead>
                  <TableHead className="px-4 py-3 text-white font-semibold uppercase text-xs tracking-wider text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.map((transfer, index) => (
                  <TableRow key={index} className="border-b border-gray-200 hover:bg-gray-50/50 transition-colors"> {/* Lighter hover */}
                    <TableCell className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{transfer.date}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{transfer.from}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-700 text-sm whitespace-nowrap">{transfer.to}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-800 font-medium text-sm whitespace-nowrap text-right">{transfer.amount}</TableCell>
                    <TableCell className="px-4 py-3 text-center whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${transfer.status === 'Completed' ? 'bg-green-100 text-green-700' : transfer.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {transfer.status}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-right whitespace-nowrap">
                      <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700 text-sm flex items-center justify-end space-x-1 font-medium">
                        <Repeat className="h-3.5 w-3.5 mr-1" />
                        <span>Repeat</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentTransfersTable;

