
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, ShoppingBag, Film, TrendingUp, Utensils, Fuel } from 'lucide-react';

const transactionsData = [
  { id: 1, icon: ShoppingBag, name: 'Whole Foods Market', date: 'May 06, 2025 • Groceries', amount: -84.32, type: 'expense' as 'expense' | 'income', categoryColor: 'blue' },
  { id: 2, icon: Film, name: 'Netflix Subscription', date: 'May 05, 2025 • Entertainment', amount: -15.99, type: 'expense' as 'expense' | 'income', categoryColor: 'purple' },
  { id: 3, icon: TrendingUp, name: 'Salary Deposit', date: 'May 03, 2025 • Income', amount: 3450.00, type: 'income' as 'expense' | 'income', categoryColor: 'green' },
  { id: 4, icon: Utensils, name: 'Olive Garden', date: 'May 02, 2025 • Dining', amount: -68.25, type: 'expense' as 'expense' | 'income', categoryColor: 'yellow' },
  { id: 5, icon: Fuel, name: 'Shell Gas Station', date: 'May 01, 2025 • Transportation', amount: -45.78, type: 'expense' as 'expense' | 'income', categoryColor: 'red' },
];

const getCategoryClasses = (color: string, type: 'expense' | 'income') => {
  if (type === 'income') {
    return 'bg-green-100 dark:bg-green-700/30 text-green-600 dark:text-green-400';
  }
  switch (color) {
    case 'blue': return 'bg-blue-100 dark:bg-blue-700/30 text-blue-600 dark:text-blue-400';
    case 'purple': return 'bg-purple-100 dark:bg-purple-700/30 text-purple-600 dark:text-purple-400';
    case 'yellow': return 'bg-yellow-100 dark:bg-yellow-700/30 text-yellow-600 dark:text-yellow-400';
    case 'red': return 'bg-red-100 dark:bg-red-700/30 text-red-600 dark:text-red-400';
    default: return 'bg-slate-100 dark:bg-slate-700/30 text-slate-600 dark:text-slate-400';
  }
}

const RecentTransactions: React.FC = () => {
  return (
    <Card className="shadow-lg col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <CardTitle className="text-xl font-semibold text-card-foreground">Recent Transactions</CardTitle>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Input placeholder="Search transactions" className="max-w-xs bg-input text-foreground placeholder:text-muted-foreground" />
                <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {transactionsData.map(transaction => (
            <li key={transaction.id} className="flex items-center justify-between p-3 hover:bg-accent rounded-md">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${getCategoryClasses(transaction.categoryColor, transaction.type)}`}>
                  <transaction.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm text-card-foreground">{transaction.name}</p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
              <p className={`font-semibold text-sm ${transaction.type === 'income' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center">
          <Button variant="link" className="text-primary">View All Transactions</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
