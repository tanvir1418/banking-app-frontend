
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, Car, Zap } from 'lucide-react'; // Example icons

const payments = [
    { id: 1, icon: Home, name: 'Mortgage Payment', dueDate: 'Due in 3 days', amount: 1450.00, bgColor: 'bg-blue-100 text-blue-600' },
    { id: 2, icon: Car, name: 'Car Loan', dueDate: 'Due in 7 days', amount: 385.50, bgColor: 'bg-green-100 text-green-600' },
    { id: 3, icon: Zap, name: 'Utility Bills', dueDate: 'Due in 12 days', amount: 142.75, bgColor: 'bg-yellow-100 text-yellow-600' },
];

const UpcomingPayments: React.FC = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Upcoming Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3 mb-6">
            {payments.map(payment => (
                <li key={payment.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${payment.bgColor}`}>
                           <payment.icon className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="font-medium text-sm text-gray-800">{payment.name}</p>
                            <p className="text-xs text-gray-500">{payment.dueDate}</p>
                        </div>
                    </div>
                    <p className="font-semibold text-sm text-gray-800">${payment.amount.toFixed(2)}</p>
                </li>
            ))}
        </ul>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Schedule All Payments</Button>
      </CardContent>
    </Card>
  );
};

export default UpcomingPayments;
