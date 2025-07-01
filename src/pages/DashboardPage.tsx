import React, { useState, useMemo } from 'react';
import SidebarNav from '@/components/dashboard/SidebarNav';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import AccountSummary from '@/components/dashboard/AccountSummary';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import QuickActions from '@/components/dashboard/QuickActions';
import SpendingAnalysis from '@/components/dashboard/SpendingAnalysis';
import BudgetTracker from '@/components/dashboard/BudgetTracker';
import UpcomingPayments from '@/components/dashboard/UpcomingPayments';
import SearchResults from '@/components/dashboard/SearchResults';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  // const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'User';
  const firstName = user?.email?.split('@')[0] || 'User';

  // Sample data for search functionality
  const searchData = useMemo(
    () => [
      // Transactions
      {
        id: '1',
        type: 'transaction' as const,
        title: 'Netflix Subscription',
        description: 'Monthly subscription payment',
        amount: -15.99,
        date: '2024-01-15',
        status: 'Completed',
      },
      {
        id: '2',
        type: 'transaction' as const,
        title: 'Spotify Premium',
        description: 'Music streaming service',
        amount: -9.99,
        date: '2024-01-14',
        status: 'Completed',
      },
      {
        id: '3',
        type: 'transaction' as const,
        title: 'Grocery Store',
        description: 'Weekly groceries',
        amount: -127.45,
        date: '2024-01-13',
        status: 'Completed',
      },
      // Accounts
      {
        id: '4',
        type: 'account' as const,
        title: 'Checking Account',
        description: 'Primary checking account',
        amount: 2543.67,
        status: 'Active',
      },
      {
        id: '5',
        type: 'account' as const,
        title: 'Savings Account',
        description: 'High-yield savings account',
        amount: 15432.21,
        status: 'Active',
      },
      // Payments
      {
        id: '6',
        type: 'payment' as const,
        title: 'Electric Bill',
        description: 'Monthly electricity payment',
        amount: -89.34,
        date: '2024-01-16',
        status: 'Pending',
      },
      {
        id: '7',
        type: 'payment' as const,
        title: 'Internet Bill',
        description: 'Monthly internet service',
        amount: -65.0,
        date: '2024-01-18',
        status: 'Scheduled',
      },
    ],
    []
  );

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
    );
  }, [searchQuery, searchData]);

  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting = 'Good morning';
  if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good afternoon';
  } else if (currentHour >= 18) {
    greeting = 'Good evening';
  }

  // const lastLoginDateRaw = user?.last_sign_in_at
  //   ? new Date(user.last_sign_in_at)
  //   : currentTime;
  const lastLoginDateRaw = currentTime;
  const lastLoginDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(lastLoginDateRaw);
  const lastLoginTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(lastLoginDateRaw);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className='flex min-h-screen bg-background'>
      <SidebarNav />
      <div className='flex-1 flex flex-col'>
        <DashboardHeader />
        <main className='flex-1 p-6 md:p-8 overflow-y-auto space-y-8'>
          {/* Greeting Section */}
          <section>
            <h1 className='text-3xl font-semibold text-foreground'>
              {greeting}, {firstName}!
            </h1>
            <p className='text-sm text-muted-foreground'>
              {/* {user?.last_sign_in_at
                ? `Last login: ${lastLoginDate} at ${lastLoginTime}`
                : `Welcome! Today is ${lastLoginDate}`} */}
              {user?.email
                ? `Last login: ${lastLoginDate} at ${lastLoginTime}`
                : `Welcome! Today is ${lastLoginDate}`}
            </p>
          </section>

          {/* Search Bar */}
          <section>
            <form onSubmit={handleSearch} className='max-w-md'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  type='text'
                  placeholder='Search transactions, accounts, or payments...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10 pr-4 py-2 w-full bg-card border-border focus:ring-2 focus:ring-primary'
                />
              </div>
            </form>
          </section>

          {/* Search Results */}
          {searchQuery && (
            <SearchResults
              query={searchQuery}
              results={searchResults}
              onClearSearch={handleClearSearch}
            />
          )}

          {/* Only show dashboard content when not searching */}
          {!searchQuery && (
            <>
              {/* Account Summaries */}
              <AccountSummary />

              {/* New Transaction Button */}
              <div className='flex justify-end'>
                <Button variant='default'>
                  <PlusCircle className='mr-2 h-4 w-4' /> New Transaction
                </Button>
              </div>

              {/* Transactions and Quick Actions */}
              <section className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                <div className='lg:col-span-2'>
                  <RecentTransactions />
                </div>
                <div>
                  <QuickActions />
                </div>
              </section>

              {/* Spending Analysis */}
              <SpendingAnalysis />

              {/* Budget Tracker and Upcoming Payments */}
              <section className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <BudgetTracker />
                <UpcomingPayments />
              </section>
            </>
          )}
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default DashboardPage;
