
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Car, Zap } from 'lucide-react';

const payments = [
    { id: 1, icon: Home, name: 'Mortgage Payment', dueDate: 'Due in 3 days', amount: 1450.00, colorClasses: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' },
    { id: 2, icon: Car, name: 'Car Loan', dueDate: 'Due in 7 days', amount: 385.50, colorClasses: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
    { id: 3, icon: Zap, name: 'Utility Bills', dueDate: 'Due in 12 days', amount: 142.75, colorClasses: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' },
];

const UpcomingPayments: React.FC = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-card-foreground">Upcoming Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 mb-6">
            {payments.map(payment => (
                <li key={payment.id} className="flex items-center justify-between p-3 bg-muted/50 dark:bg-muted/20 rounded-lg"> {/* bg-slate-50 to bg-muted/50 dark:bg-muted/20 */}
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${payment.colorClasses}`}>
                           <payment.icon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-medium text-sm text-card-foreground">{payment.name}</p> {/* text-gray-800 to text-card-foreground */}
                            <p className="text-xs text-muted-foreground">{payment.dueDate}</p> {/* text-gray-500 to text-muted-foreground */}
                        </div>
                    </div>
                    <p className="font-semibold text-sm text-card-foreground">${payment.amount.toFixed(2)}</p> {/* text-gray-800 to text-card-foreground */}
                </li>
            ))}
        </ul>
        <Button variant="default" className="w-full">Schedule All Payments</Button> {/* Changed to variant default */}
      </CardContent>
    </Card>
  );
};

export default UpcomingPayments;
