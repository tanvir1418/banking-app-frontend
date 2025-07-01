import React from 'react';
import {
  Bell,
  Search,
  Settings,
  LogOut,
  UserCircle,
  Moon,
  Sun,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeProvider';

const AdminHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    logout();
    // if (error) {
    //   // toast({
    //   //   title: 'Logout Failed',
    //   //   description: error.message,
    //   //   variant: 'destructive',
    //   // });
    // } else {
    navigate('/auth');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    // }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'A';
  // const userFullName = user?.user_metadata?.full_name || user?.email || 'Admin User';
  const userFullName = 'Admin User';

  return (
    <header className='bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 sticky top-0 z-40'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-6'>
          <h2 className='text-lg text-gray-600 dark:text-gray-400'>Admin</h2>
          <span className='text-gray-400 dark:text-gray-500'>{'>'}</span>
          <h3 className='text-lg font-medium text-gray-900 dark:text-white'>
            Dashboard
          </h3>
        </div>

        <div className='flex items-center space-x-4'>
          {/* Search */}
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500' />
            <Input
              placeholder='Search...'
              className='pl-10 w-80 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
            />
          </div>

          {/* Notifications */}
          <Button
            variant='ghost'
            size='icon'
            className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 relative'
          >
            <Bell className='h-5 w-5' />
            <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
          </Button>

          {/* Dark Mode Toggle */}
          <Button
            variant='ghost'
            size='icon'
            onClick={toggleTheme}
            className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          >
            {theme === 'dark' ? (
              <Sun className='h-5 w-5' />
            ) : (
              <Moon className='h-5 w-5' />
            )}
          </Button>

          {/* Settings */}
          <Button
            variant='ghost'
            size='icon'
            className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          >
            <Settings className='h-5 w-5' />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='flex items-center space-x-3 px-3'
              >
                <Avatar className='h-8 w-8'>
                  {/* <AvatarImage src={user?.user_metadata?.avatar_url} /> */}
                  <AvatarImage
                    src={'https://avatar.iran.liara.run/public/41'}
                  />
                  <AvatarFallback className='bg-blue-600 text-white'>
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className='text-right'>
                  <p className='text-sm font-medium text-gray-900 dark:text-white'>
                    {userFullName}
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    Administrator
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align='end'
              className='w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
            >
              <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserCircle className='mr-2 h-4 w-4' />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className='mr-2 h-4 w-4' />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className='text-red-600 dark:text-red-400'
              >
                <LogOut className='mr-2 h-4 w-4' />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
