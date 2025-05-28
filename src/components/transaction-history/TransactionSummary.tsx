
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  amount: string;
  percentageChange: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconTextColor: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, percentageChange, icon: Icon, iconBgColor, iconTextColor }) => (
  <Card className="shadow-md bg-card">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className={`p-2 rounded-md ${iconBgColor}`}>
        <Icon className={`h-5 w-5 ${iconTextColor}`} />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-card-foreground">{amount}</div>
      <p className="text-xs text-muted-foreground">{percentageChange}</p>
    </CardContent>
  </Card>
);

const TransactionSummary: React.FC = () => {
  const summaryData = {
    totalBalance: { title: "Total Balance", amount: "$24,562.00", percentageChange: "+2.5% from last month", icon: Wallet, bgColor: "bg-blue-100 dark:bg-blue-900/30", textColor: "text-blue-600 dark:text-blue-400" },
    income: { title: "Income", amount: "$8,350.00", percentageChange: "+4.2% from last month", icon: TrendingUp, bgColor: "bg-green-100 dark:bg-green-900/30", textColor: "text-green-600 dark:text-green-400" },
    expenses: { title: "Expenses", amount: "$5,240.00", percentageChange: "+1.8% from last month", icon: TrendingDown, bgColor: "bg-red-100 dark:bg-red-900/30", textColor: "text-red-600 dark:text-red-400" },
  };

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <SummaryCard
        title={summaryData.totalBalance.title}
        amount={summaryData.totalBalance.amount}
        percentageChange={summaryData.totalBalance.percentageChange}
        icon={summaryData.totalBalance.icon}
        iconBgColor={summaryData.totalBalance.bgColor}
        iconTextColor={summaryData.totalBalance.textColor}
      />
      <SummaryCard
        title={summaryData.income.title}
        amount={summaryData.income.amount}
        percentageChange={summaryData.income.percentageChange}
        icon={summaryData.income.icon}
        iconBgColor={summaryData.income.bgColor}
        iconTextColor={summaryData.income.textColor}
      />
      <SummaryCard
        title={summaryData.expenses.title}
        amount={summaryData.expenses.amount}
        percentageChange={summaryData.expenses.percentageChange}
        icon={summaryData.expenses.icon}
        iconBgColor={summaryData.expenses.bgColor}
        iconTextColor={summaryData.expenses.textColor}
      />
    </section>
  );
};

export default TransactionSummary;
