
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, UserCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // For search
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';


const topNavItems = [
  { name: 'Accounts', path: '/dashboard/accounts' },
  { name: 'Transfers', path: '/dashboard/transfers' },
  { name: 'Payments', path: '/dashboard/payments' },
  { name: 'Cards', path: '/dashboard/cards' },
  { name: 'Investments', path: '/dashboard/investments' },
];

const DashboardHeader: React.FC = () => {
  const { user, signOut } = useAuth();
  const userInitials = user?.email?.substring(0, 2)?.toUpperCase() || 'U';

  return (
    <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        {/* Top Navigation Links - shown on larger screens */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {topNavItems.map((item) => (
            <Link key={item.name} to={item.path} className="text-sm font-medium text-gray-600 hover:text-blue-600">
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="md:hidden"> {/* Placeholder for mobile menu trigger or logo */}
           <span className="text-xl font-semibold text-gray-700">Dashboard</span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search bar - optional, can be expanded */}
          {/* 
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search..." className="pl-10 w-48 lg:w-64" />
          </div>
          */}
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-blue-600">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            {/* Basic notification indicator */}
            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email || "User"} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.user_metadata?.full_name || user?.email}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email ? (user.email.length > 20 ? user.email.substring(0,18) + '...' : user.email) : "No email"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
