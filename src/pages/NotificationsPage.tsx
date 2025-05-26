
import React from 'react';
import SidebarNav from '@/components/dashboard/SidebarNav';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import NotificationFilters from '@/components/notifications/NotificationFilters';
import NotificationList from '@/components/notifications/NotificationList';
import { Input } from '@/components/ui/input';
import { Search, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotificationsPage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-background"> {/* Changed bg-slate-50 to bg-background */}
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto space-y-6">
          <section className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-foreground">Notifications</h1> {/* text-gray-800 to text-foreground */}
            <div className="flex items-center space-x-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /> {/* text-gray-400 to text-muted-foreground */}
                <Input type="search" placeholder="Search notifications..." className="pl-10 text-sm" />
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground"> {/* text-gray-500 hover:text-gray-700 to text-muted-foreground hover:text-foreground */}
                <Info className="h-5 w-5" />
                <span className="sr-only">Notification Info</span>
              </Button>
            </div>
          </section>

          <NotificationFilters />
          
          <NotificationList />
          
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default NotificationsPage;
