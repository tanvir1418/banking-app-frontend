
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Wifi, Shield, CreditCard } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface UpcomingBill {
  id: string;
  name: string;
  due: string;
  amount: number;
  category: string;
  icon?: LucideIcon;
}

interface UpcomingBillsListProps {
  bills: UpcomingBill[];
}

const UpcomingBillsList: React.FC<UpcomingBillsListProps> = ({ bills }) => {
  const getBillIcon = (category: string): LucideIcon => {
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
    <Card className="bg-white shadow-lg">
      <div className="p-6 pb-4">
        <h2 className="text-lg font-semibold text-gray-800">Upcoming Bills</h2>
      </div>
      <CardContent className="space-y-3 pt-0">
        {bills.map(bill => {
          const IconComponent = bill.icon || getBillIcon(bill.category);
          return (
            <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-150 shadow-sm border-gray-200">
              <div className="flex items-center">
                <div className={`h-10 w-10 mr-4 rounded-full flex items-center justify-center 
                  ${bill.category === 'Utility' ? 'bg-yellow-100 text-yellow-600' : 
                  bill.category === 'Internet' ? 'bg-purple-100 text-purple-600' : 
                  bill.category === 'Insurance' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                  <IconComponent className="h-5 w-5" />
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
          );
        })}
      </CardContent>
    </Card>
  );
};

export default UpcomingBillsList;
