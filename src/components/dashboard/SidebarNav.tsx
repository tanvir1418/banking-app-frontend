import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Added useNavigate
import {
  ChevronLeft,
  Home,
  LayoutDashboard,
  ArrowLeftRight,
  CreditCard,
  History,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast'; // Added useToast

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Accounts', icon: Home, path: '/dashboard/accounts' },
  {
    name: 'Fund Transfers',
    icon: ArrowLeftRight,
    path: '/dashboard/transfers',
  },
  { name: 'Payment Gateway', icon: CreditCard, path: '/dashboard/payments' },
  { name: 'Transaction History', icon: History, path: '/dashboard/history' },
  { name: 'Notifications', icon: Bell, path: '/dashboard/notifications' },
  { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
  { name: 'Support', icon: HelpCircle, path: '/dashboard/support' }, // Consider making this a link to an external page or a modal
];

const SidebarNav: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate(); // Added useNavigate
  const { toast } = useToast(); // Added useToast

  const handleSignOut = async () => {
    logout();
    // if (error) {
    //   toast({
    //     title: "Logout Failed",
    //     description: error.message,
    //     variant: "destructive",
    //   });
    // } else {
    navigate('/auth'); // Redirect to auth page after sign out
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    // }
  };

  return (
    <div className='w-64 bg-sidebar text-sidebar-foreground flex flex-col min-h-screen border-r border-sidebar-border'>
      <div className='p-6 border-b border-sidebar-border'>
        {/* Logo and optional back button */}
        {location.pathname !== '/dashboard' &&
        location.pathname !== '/dashboard/' ? (
          <Link to='/dashboard'>
            <Button
              variant='ghost'
              className='text-muted-foreground hover:text-primary mb-4 flex items-center text-sm px-0'
            >
              <ChevronLeft className='mr-2 h-4 w-4' /> back to dashboard
            </Button>
          </Link>
        ) : (
          <Link
            to='/dashboard'
            className='flex items-center space-x-2 mb-4 h-[40px]'
          >
            {' '}
            {/* Ensure consistent height */}
            <img
              src='/placeholder.svg'
              alt='Banking App'
              className='h-8 w-auto'
            />{' '}
            {/* Replace with actual logo */}
            <span className='text-xl font-bold text-primary'>banking</span>
          </Link>
        )}
      </div>
      <nav className='flex-grow px-4 py-4 space-y-1'>
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== '/dashboard' &&
              location.pathname.startsWith(item.path + '/')) ||
            (item.name === 'Dashboard' && location.pathname === '/dashboard/');
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }`}
            >
              <item.icon
                className={`h-5 w-5 ${
                  isActive
                    ? 'text-sidebar-primary-foreground'
                    : 'text-muted-foreground group-hover:text-sidebar-accent-foreground'
                }`}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className='p-4 mt-auto border-t border-sidebar-border'>
        <Button
          variant='ghost'
          className='w-full flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-destructive transition-colors justify-start group'
          onClick={handleSignOut} // Updated onClick
        >
          <LogOut className='h-5 w-5 text-muted-foreground group-hover:text-destructive' />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
};

export default SidebarNav;
