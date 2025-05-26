
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, ArrowLeftRight, CreditCard, History, Bell, Settings, HelpCircle, LogOut } from 'lucide-react'; // Added LogOut
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
  { name: 'Accounts', icon: Home, path: '/dashboard/accounts' }, // Changed icon
  { name: 'Fund Transfers', icon: ArrowLeftRight, path: '/dashboard/transfers' },
  { name: 'Payment Gateway', icon: CreditCard, path: '/dashboard/payments' }, // Changed icon
  { name: 'Transaction History', icon: History, path: '/dashboard/history' },
  { name: 'Notifications', icon: Bell, path: '/dashboard/notifications' },
  { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
  { name: 'Support', icon: HelpCircle, path: '/dashboard/support' },
];

const SidebarNav: React.FC = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  return (
    <div className="w-64 bg-blue-700 text-blue-100 flex flex-col min-h-screen">
      <div className="p-6">
        <Link to="/dashboard" className="text-3xl font-bold text-white">
          banking
        </Link>
      </div>
      <nav className="flex-grow px-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors
              ${location.pathname === item.path ? 'bg-blue-600 text-white' : 'text-blue-100'}`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 mt-auto">
        <Button
          variant="ghost"
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium text-blue-100 hover:bg-blue-600 hover:text-white transition-colors justify-start"
          onClick={signOut}
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
};

export default SidebarNav;
