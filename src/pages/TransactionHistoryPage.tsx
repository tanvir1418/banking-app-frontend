
import React from 'react';
import SidebarNav from '@/components/dashboard/SidebarNav';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import TransactionSummary from '@/components/transaction-history/TransactionSummary';
import TransactionOverviewChart from '@/components/transaction-history/TransactionOverviewChart';
import TransactionFilters from '@/components/transaction-history/TransactionFilters';
import TransactionHistoryTable from '@/components/transaction-history/TransactionHistoryTable';

const TransactionHistoryPage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background"> {/* Changed bg-slate-100 to bg-background */}
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto space-y-8">
          <section>
            <h1 className="text-3xl font-semibold text-foreground">Transaction History</h1> {/* text-gray-800 to text-foreground */}
            <p className="text-muted-foreground mt-1">View and manage your transaction history</p> {/* text-gray-600 to text-muted-foreground */}
          </section>

          <TransactionSummary />
          
          <TransactionOverviewChart />

          <TransactionFilters />

          <TransactionHistoryTable />
          
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
