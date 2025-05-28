
import React from 'react';
import SidebarNav from '@/components/dashboard/SidebarNav';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DashboardAccountsPage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8">
          <section>
            <h1 className="text-3xl font-semibold text-foreground">Accounts</h1>
            <p className="text-muted-foreground">Manage your bank accounts and view account details</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Checking Account</CardTitle>
                <CardDescription>Primary checking account</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">$5,432.10</p>
                <p className="text-sm text-muted-foreground">Available Balance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Savings Account</CardTitle>
                <CardDescription>High-yield savings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">$12,750.50</p>
                <p className="text-sm text-muted-foreground">Available Balance</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Credit Card</CardTitle>
                <CardDescription>Rewards credit card</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">$1,234.56</p>
                <p className="text-sm text-muted-foreground">Current Balance</p>
              </CardContent>
            </Card>
          </div>
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default DashboardAccountsPage;
