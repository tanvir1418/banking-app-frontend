
import React from 'react';
import SidebarNav from '@/components/dashboard/SidebarNav';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import { Input } from '@/components/ui/input';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Search } from 'lucide-react';
import ProfileSettingsCard from '@/components/settings/ProfileSettingsCard';
import SecuritySettingsCard from '@/components/settings/SecuritySettingsCard';
import NotificationSettingsCard from '@/components/settings/NotificationSettingsCard';
import AppearanceSettingsCard from '@/components/settings/AppearanceSettingsCard';
import PrivacySettingsCard from '@/components/settings/PrivacySettingsCard';
import ConnectedAccountsCard from '@/components/settings/ConnectedAccountsCard';
// import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button } from '@/components/ui'; // For PaymentMethodsCard if uncommented
// import { CreditCard } from 'lucide-react'; // For PaymentMethodsCard if uncommented

const SettingsPage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-foreground">Settings</h1>
            <Breadcrumb className="mt-1 text-sm text-muted-foreground">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard" className="hover:text-primary">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground">Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search settings..." 
              className="pl-10 w-full md:w-1/2 lg:w-1/3 bg-card text-card-foreground border-border h-11 rounded-lg shadow-sm focus-visible:ring-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProfileSettingsCard />
            <SecuritySettingsCard />
            <NotificationSettingsCard />
            <AppearanceSettingsCard />
            <PrivacySettingsCard />
            <ConnectedAccountsCard />
            {/* PaymentMethodsCard placeholder - style if uncommented
            <Card className="bg-card shadow-md rounded-lg">
              <CardHeader className="flex flex-row items-center space-x-3 p-6">
                <CreditCard className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg font-semibold text-card-foreground">Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Manage your saved payment methods.</p>
                <Button variant="outline" className="mt-4 w-full">Manage Payment Methods</Button>
              </CardContent>
            </Card> 
            */}
          </div>
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default SettingsPage;
