
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UpcomingBill {
  id: string;
  name: string;
  due: string;
  amount: number;
  providerLogo: string;
}

interface UpcomingBillsListProps {
  bills: UpcomingBill[];
}

const UpcomingBillsList: React.FC<UpcomingBillsListProps> = ({ bills }) => {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="pb-4"> {/* Adjusted padding */}
        <CardTitle className="text-xl text-gray-800">Upcoming Bills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {bills.map(bill => (
          <div key={bill.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors duration-150 shadow-sm border-gray-200"> {/* Added rounded-lg, shadow, border */}
            <div className="flex items-center">
              <img src={bill.providerLogo} alt={`${bill.name} logo`} className="h-10 w-10 mr-4 rounded-full object-cover bg-gray-200 border border-gray-300" /> {/* Increased size, added border */}
              <div>
                <p className="font-medium text-gray-800">{bill.name}</p>
                <p className="text-xs text-gray-500">Due {bill.due}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg text-gray-800">${bill.amount.toFixed(2)}</p> {/* Increased size */}
              <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto text-xs hover:underline">Pay Now</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingBillsList;
