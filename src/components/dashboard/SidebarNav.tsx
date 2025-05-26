
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, Home, LayoutDashboard, ArrowLeftRight, CreditCard, History, Bell, Settings, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { name: 'Accounts', icon: Home, path: '/dashboard/accounts' },
  { name: 'Fund Transfers', icon: ArrowLeftRight, path: '/dashboard/transfers' },
  { name: 'Payment Gateway', icon: CreditCard, path: '/dashboard/payments' },
  { name: 'Transaction History', icon: History, path: '/dashboard/history' },
  { name: 'Notifications', icon: Bell, path: '/dashboard/notifications' },
  { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
  { name: 'Support', icon: HelpCircle, path: '/dashboard/support' },
];

const SidebarNav: React.FC = () => {
  const location = useLocation();
  const { signOut } = useAuth();

  return (
    <div className="w-64 bg-white text-gray-800 flex flex-col min-h-screen border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <Button variant="ghost" className="text-gray-600 hover:text-blue-600 mb-4 flex items-center text-sm">
          <ChevronLeft className="mr-2 h-4 w-4" /> back
        </Button>
      </div>
      <nav className="flex-grow px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
              ${
                location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/dashboard')
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            <item.icon className={`h-5 w-5 ${location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/dashboard') ? 'text-white' : 'text-gray-500'}`} />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 mt-auto border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-red-600 transition-colors justify-start"
          onClick={signOut}
        >
          <LogOut className="h-5 w-5 text-gray-500 group-hover:text-red-600" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
};

export default SidebarNav;
