
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, Search, UserCircle, Settings, LogOut, CreditCard, Repeat, Briefcase } from 'lucide-react'; // Added CreditCard, Repeat, Briefcase
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input'; // Input no longer needed here
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const headerNavItems = [
  { name: 'Accounts', path: '/dashboard/accounts' }, // Assuming this path, adjust if needed
  { name: 'Transfers', path: '/dashboard/transfers' },
  { name: 'Payments', path: '/dashboard/payments' }, // Assuming this path, adjust if needed
  { name: 'Cards', path: '/dashboard/cards' }, // New item
  { name: 'Investments', path: '/dashboard/investments' }, // New item
];

const DashboardHeader: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  // const [searchQuery, setSearchQuery] = useState(''); // Search query no longer needed

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';
  const userFullName = user?.user_metadata?.full_name || user?.email;

  const handleLogout = async () => {
    const error = await signOut();
    if (error) {
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate('/auth');
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    }
  };
  
  // const handleSearch = (e: React.FormEvent) => { // Search handler no longer needed
  //   e.preventDefault();
  //   if (searchQuery.trim()) {
  //     toast({ title: "Search", description: `Searching for: ${searchQuery}`});
  //   }
  // };

  return (
    <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between">
        {/* Navigation Links - aligned to the left */}
        <NavigationMenu>
          <NavigationMenuList>
            {headerNavItems.map((item) => (
              <NavigationMenuItem key={item.name}>
                <Link to={item.path}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Aligned Icons & User Dropdown */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
            <Bell className="h-6 w-6" />
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 focus:outline-none">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt={userFullName ?? undefined} />
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-sm font-medium text-gray-700">{userFullName}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white shadow-lg rounded-md border z-50"> {/* Ensured background and z-index */}
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => navigate('/dashboard/profile')}>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/dashboard/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleLogout}>
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
