
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // CardDescription is not used here.
import { Button } from '@/components/ui/button';
import { BarChart3, AlertTriangle } from 'lucide-react';

interface AccountCardProps {
  title: string;
  accountNumberSuffix: string;
  balance: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  creditLimit?: string;
  dueDateInfo?: string;
}

const AccountSummaryCard: React.FC<AccountCardProps> = ({ title, accountNumberSuffix, balance, change, changeType, creditLimit, dueDateInfo }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold text-card-foreground">{title}</CardTitle>
        <BarChart3 className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground mb-1">**** {accountNumberSuffix}</div>
        <div className="text-3xl font-bold text-card-foreground">{balance}</div>
        {change && (
          <p className={`text-xs ${changeType === 'positive' ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'} mt-1`}>
            {changeType === 'positive' ? '+' : ''}{change} this month
          </p>
        )}
        {creditLimit && (
          <p className="text-xs text-muted-foreground mt-1">Credit limit: {creditLimit}</p>
        )}
         {dueDateInfo && (
          <p className="text-xs text-orange-500 dark:text-orange-400 mt-1 flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1" /> {dueDateInfo}
          </p>
        )}
        <div className="mt-4 flex space-x-2">
          <Button variant="outline" size="sm">Transfer</Button>
          {title !== 'Savings Account' && <Button variant="outline" size="sm">{title === 'Credit Card' ? 'Pay Bill' : 'Pay'}</Button>}
          {title === 'Savings Account' && <Button variant="outline" size="sm">Deposit</Button>}
          <Button variant="outline" size="sm">Details</Button>
        </div>
      </CardContent>
    </Card>
  );
}


const AccountSummary: React.FC = () => {
  const accounts = [
    { title: "Checking Account", accountNumberSuffix: "4582", balance: "$12,456.78", change: "$1,240.56", changeType: 'positive' as 'positive' | 'negative' },
    { title: "Savings Account", accountNumberSuffix: "7291", balance: "$45,892.35", change: "$320.15", changeType: 'positive' as 'positive' | 'negative' },
    { title: "Credit Card", accountNumberSuffix: "8765", balance: "$2,345.50", creditLimit: "$10,000", dueDateInfo: "Due in 15 days" },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {accounts.map(account => (
        <AccountSummaryCard key={account.title} {...account} />
      ))}
    </section>
  );
};

export default AccountSummary;
