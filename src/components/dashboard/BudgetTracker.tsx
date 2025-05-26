
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Target, TrendingUp, PlusCircle } from 'lucide-react';

const budgets = [
  { name: 'Groceries', spent: 250, total: 400, color: 'bg-green-500' }, // Progress component uses primary color by default, specific color per budget might need custom styling or component changes.
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
              <span className="text-sm font-medium text-card-foreground">{budget.name}</span> {/* text-gray-700 to text-card-foreground */}
              <span className="text-sm text-muted-foreground">${budget.spent} / ${budget.total}</span> {/* text-gray-500 to text-muted-foreground */}
            </div>
            <Progress 
              value={(budget.spent / budget.total) * 100} 
              className="h-3" 
              // To apply budget.color to the indicator, we'd need to ensure Progress supports it or use CSS custom properties.
              // For now, it will use the primary theme color. If budget.color should be used, a style attribute with CSS variable could work.
              // style={{ '--progress-indicator-color': `hsl(var(--${budget.color.replace('bg-', '')}))` }} // This is an example if Progress supported it
            />
          </div>
        ))}
        <div className="mt-6 text-center">
            <Button variant="ghost" className="text-primary hover:text-primary/90"> {/* Ensure ghost buttons use themeable colors */}
                <Target className="mr-2 h-4 w-4" /> Set New Goals
            </Button>
            <Button variant="ghost" className="text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 ml-4"> {/* Example for specific color */}
                <TrendingUp className="mr-2 h-4 w-4" /> View Spending Trends
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;
