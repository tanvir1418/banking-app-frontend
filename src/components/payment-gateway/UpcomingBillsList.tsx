
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'; // Removed CardHeader, CardTitle as per design
import { LucideIcon } from 'lucide-react';

interface UpcomingBill {
  id: string;
  name: string;
  due: string;
  amount: number;
  icon: LucideIcon; // Changed from providerLogo to icon
  providerLogo: string; // Keep for now if used elsewhere, or remove if not
}

interface UpcomingBillsListProps {
  bills: UpcomingBill[];
}

const UpcomingBillsList: React.FC<UpcomingBillsListProps> = ({ bills }) => {
  return (
    <Card className="bg-white shadow-lg">
      {/* Removed CardHeader as per design, title is now plain text */}
      <div className="p-6 pb-4">
        <h2 className="text-xl font-semibold text-gray-800">Upcoming Bills</h2>
      </div>
      <CardContent className="space-y-3 pt-0"> {/* Adjusted space-y and pt-0 */}
        {bills.map(bill => (
          <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-150 shadow-sm border-gray-200"> {/* Adjusted padding */}
            <div className="flex items-center">
              <div className="h-10 w-10 mr-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <bill.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-gray-800">{bill.name}</p>
                <p className="text-xs text-gray-500">Due {bill.due}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg text-gray-800">${bill.amount.toFixed(2)}</p>
              <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto text-xs hover:underline">Pay Now</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingBillsList;
