
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Target, TrendingUp, PlusCircle } from 'lucide-react'; // Example icons

const budgets = [
  { name: 'Groceries', spent: 250, total: 400, color: 'bg-green-500' },
  { name: 'Dining Out', spent: 150, total: 200, color: 'bg-blue-500' },
  { name: 'Shopping', spent: 300, total: 300, color: 'bg-purple-500' },
  { name: 'Travel', spent: 50, total: 500, color: 'bg-orange-500' },
];

const BudgetTracker: React.FC = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold">Budget Tracker</CardTitle>
            <CardDescription>Monitor your spending against your budgets.</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" /> New Budget
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {budgets.map(budget => (
          <div key={budget.name}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">{budget.name}</span>
              <span className="text-sm text-gray-500">${budget.spent} / ${budget.total}</span>
            </div>
            <Progress 
              value={(budget.spent / budget.total) * 100} 
              className="h-3" // Removed indicatorClassName, can style indicator via primary color or specific CSS if needed
            />
             {/* If specific indicator styling per budget is needed, this would require a more complex Progress component or more specific Tailwind config.
                 For now, the default primary color will be used for the indicator.
                 If budget.color was meant for the progress bar itself, we would need to pass it to the 'className' of Progress and ensure 'bg-primary' is overridden.
                 Example: className={`h-3 ${budget.color.replace('bg-', 'progress-')}`} and define 'progress-green-500' etc. in CSS or tailwind.config.ts
              */}
          </div>
        ))}
        <div className="mt-6 text-center">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                <Target className="mr-2 h-4 w-4" /> Set New Goals
            </Button>
            <Button variant="ghost" className="text-green-600 hover:text-green-700 ml-4">
                <TrendingUp className="mr-2 h-4 w-4" /> View Spending Trends
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;
