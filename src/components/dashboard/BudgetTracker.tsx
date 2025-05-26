
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Target, TrendingUp, PlusCircle } from 'lucide-react';

// Removed color from budgets data, Progress component will use primary theme color.
const budgets = [
  { name: 'Groceries', spent: 250, total: 400 },
  { name: 'Dining Out', spent: 150, total: 200 },
  { name: 'Shopping', spent: 300, total: 300 },
  { name: 'Travel', spent: 50, total: 500 },
];

const BudgetTracker: React.FC = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold text-card-foreground">Budget Tracker</CardTitle>
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
              <span className="text-sm font-medium text-card-foreground">{budget.name}</span>
              <span className="text-sm text-muted-foreground">${budget.spent} / ${budget.total}</span>
            </div>
            <Progress 
              value={(budget.spent / budget.total) * 100} 
              className="h-3"
              // The Progress component from shadcn/ui should use the primary color from the theme.
            />
          </div>
        ))}
        <div className="mt-6 text-center">
            <Button variant="ghost" className="text-primary hover:text-primary/90">
                <Target className="mr-2 h-4 w-4" /> Set New Goals
            </Button>
            <Button variant="ghost" className="text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 ml-4">
                <TrendingUp className="mr-2 h-4 w-4" /> View Spending Trends
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;
