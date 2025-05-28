
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
    <Card className="bg-card shadow-lg border border-border">
      <div className="p-6 pb-4">
        <h2 className="text-lg font-semibold text-card-foreground">Upcoming Bills</h2>
      </div>
      <CardContent className="space-y-3 pt-0">
        {bills.map(bill => {
          const IconComponent = bill.icon || getBillIcon(bill.category);
          return (
            <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors duration-150 shadow-sm border-border">
              <div className="flex items-center">
                <div className={`h-10 w-10 mr-4 rounded-full flex items-center justify-center 
                  ${bill.category === 'Utility' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' : 
                  bill.category === 'Internet' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 
                  bill.category === 'Insurance' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">{bill.name}</p>
                  <p className="text-xs text-muted-foreground">Due {bill.due}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg text-card-foreground">${bill.amount.toFixed(2)}</p>
                <Button variant="link" size="sm" className="text-primary p-0 h-auto text-xs hover:text-primary/80 hover:underline">Pay Now</Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default UpcomingBillsList;
