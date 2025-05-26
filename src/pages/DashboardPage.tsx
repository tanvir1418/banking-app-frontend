
import React from 'react';
import SidebarNav from '@/components/dashboard/SidebarNav';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import AccountSummary from '@/components/dashboard/AccountSummary';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import QuickActions from '@/components/dashboard/QuickActions';
import SpendingAnalysis from '@/components/dashboard/SpendingAnalysis';
import BudgetTracker from '@/components/dashboard/BudgetTracker';
import UpcomingPayments from '@/components/dashboard/UpcomingPayments';
import { useAuth } from '@/contexts/AuthContext'; // For greeting

const DashboardPage = () => {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'User';

  // Get current time for greeting
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting = "Good morning";
  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else if (currentHour >= 18) {
    greeting = "Good evening";
  }
  
  const lastLoginDate = new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  }).format(currentTime); // Placeholder for actual last login
  const lastLoginTime = new Intl.DateTimeFormat('en-US', { 
    hour: 'numeric', minute: 'numeric', hour12: true 
  }).format(currentTime); // Placeholder


  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8">
          {/* Greeting Section */}
          <section>
            <h1 className="text-3xl font-semibold text-gray-800">{greeting}, {firstName}</h1>
            <p className="text-sm text-gray-500">
              {lastLoginDate} | Last login: Today, {lastLoginTime} {/* Placeholder */}
            </p>
          </section>

          {/* Account Summaries */}
          <AccountSummary />
          
          {/* New Transaction Button */}
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                + New Transaction
            </Button>
          </div>


          {/* Transactions and Quick Actions */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RecentTransactions />
            </div>
            <div>
              <QuickActions />
            </div>
          </section>

          {/* Spending Analysis */}
          <SpendingAnalysis />

          {/* Budget Tracker and Upcoming Payments */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BudgetTracker />
            <UpcomingPayments />
          </section>

        </main>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default DashboardPage;
