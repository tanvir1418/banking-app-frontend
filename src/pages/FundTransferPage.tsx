
import React from 'react';
import SidebarNav from '@/components/dashboard/SidebarNav';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import TransferContainer from '@/components/fund-transfer/TransferContainer';
import RecentTransfersTable from '@/components/fund-transfer/RecentTransfersTable';
import { recentTransfersData } from '@/data/accountsData';

const FundTransferPage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8">
          <section>
            <h1 className="text-3xl font-semibold text-gray-800">Fund Transfer</h1>
            <p className="text-gray-600">Send money to your accounts or other recipients</p>
          </section>

          <TransferContainer />
          
          <RecentTransfersTable transfers={recentTransfersData} />
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default FundTransferPage;
