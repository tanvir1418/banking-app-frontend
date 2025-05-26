
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, ShoppingBag, Film, TrendingUp, Utensils, Fuel } from 'lucide-react'; // Example icons

const transactionsData = [
  { id: 1, icon: ShoppingBag, name: 'Whole Foods Market', date: 'May 06, 2025 • Groceries', amount: -84.32, type: 'expense' as 'expense' | 'income' },
  { id: 2, icon: Film, name: 'Netflix Subscription', date: 'May 05, 2025 • Entertainment', amount: -15.99, type: 'expense' as 'expense' | 'income' },
  { id: 3, icon: TrendingUp, name: 'Salary Deposit', date: 'May 03, 2025 • Income', amount: 3450.00, type: 'income' as 'expense' | 'income' },
  { id: 4, icon: Utensils, name: 'Olive Garden', date: 'May 02, 2025 • Dining', amount: -68.25, type: 'expense' as 'expense' | 'income' },
  { id: 5, icon: Fuel, name: 'Shell Gas Station', date: 'May 01, 2025 • Transportation', amount: -45.78, type: 'expense' as 'expense' | 'income' },
];


const RecentTransactions: React.FC = () => {
  return (
    <Card className="shadow-lg col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <CardTitle className="text-xl font-semibold">Recent Transactions</CardTitle>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Input placeholder="Search transactions" className="max-w-xs" />
                <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {transactionsData.map(transaction => (
            <li key={transaction.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-md">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                    transaction.type === 'income' ? 'bg-green-100 text-green-600' : 
                    transaction.name.includes('Groceries') ? 'bg-blue-100 text-blue-600' :
                    transaction.name.includes('Entertainment') ? 'bg-purple-100 text-purple-600' :
                    transaction.name.includes('Dining') ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600' // Default for other expenses
                }`}>
                  <transaction.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-800">{transaction.name}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <p className={`font-semibold text-sm ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center">
          <Button variant="link" className="text-blue-600">View All Transactions</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
