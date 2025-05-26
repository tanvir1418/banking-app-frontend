
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const budgetItems = [
    { category: 'Groceries', current: 320, total: 400, color: 'bg-green-500' },
    { category: 'Dining', current: 275, total: 250, color: 'bg-red-500' }, // Over budget
    { category: 'Transportation', current: 120, total: 200, color: 'bg-green-500' },
    { category: 'Entertainment', current: 95, total: 150, color: 'bg-green-500' },
];

const BudgetTracker: React.FC = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl font-semibold">Budget Tracker</CardTitle>
        <Button variant="link" className="text-blue-600 p-0 h-auto">Edit Budgets</Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
            {budgetItems.map(item => (
                <li key={item.category}>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{item.category}</span>
                        <span className={`text-sm font-medium ${item.current > item.total ? 'text-red-500' : 'text-gray-600'}`}>
                            ${item.current} / ${item.total}
                        </span>
                    </div>
                    <Progress value={(item.current / item.total) * 100} className="h-2" indicatorClassName={item.current > item.total ? 'bg-red-500' : item.color} />
                </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;
