import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, BarChart3 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

const adminNavItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { name: 'User Management', icon: Users, path: '/admin/users' },
  { name: 'Account Management', icon: CreditCard, path: '/admin/accounts' },
  { name: 'System Monitoring', icon: BarChart3, path: '/admin/monitoring' },
];

const AdminSidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'A';
  // const userFullName = user?.user_metadata?.full_name || user?.email || 'Admin User';
  const userFullName = 'Admin User';

  return (
    <div className='w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col min-h-screen'>
      <div className='p-6 border-b border-gray-200 dark:border-gray-700'>
        <div className='flex items-center space-x-2 mb-6'>
          <span className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
            banking
          </span>
        </div>
      </div>

      <nav className='flex-grow px-4 py-6 space-y-2'>
        {adminNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
            >
              <item.icon
                className={`h-5 w-5 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                }`}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
        <div className='flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg'>
          <Avatar className='h-8 w-8'>
            {/* <AvatarImage src={user?.user_metadata?.avatar_url} /> */}
            <AvatarImage src={'https://avatar.iran.liara.run/public/41'} />
            <AvatarFallback className='bg-blue-600 text-white'>
              {userInitial}
            </AvatarFallback>
          </Avatar>
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium text-gray-900 dark:text-white truncate'>
              {userFullName}
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400'>Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
