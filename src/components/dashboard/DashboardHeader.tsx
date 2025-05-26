import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, Search, UserCircle, Settings, LogOut } from 'lucide-react';
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
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
// import { supabase } from '@/integrations/supabase/client'; // No longer directly needed for signOut
import { useToast } from '@/hooks/use-toast';

const DashboardHeader: React.FC = () => {
  const { user, signOut } = useAuth(); // Changed: use signOut from context, remove setUser
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'U';
  const userFullName = user?.user_metadata?.full_name || user?.email;

  const handleLogout = async () => {
    const error = await signOut(); // Call signOut from context
    if (error) {
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      // setUser(null) is handled by AuthContext's signOut
      navigate('/auth'); // Redirect to login page
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality, e.g., navigate to a search results page
      // navigate(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
      toast({ title: "Search", description: `Searching for: ${searchQuery}`}); // Placeholder
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between">
        {/* Search Bar - aligned to the left */}
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <Input 
            type="search" 
            placeholder="Search transactions, reports, etc..." 
            className="pl-10 pr-4 py-2 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </form>

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
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt={userFullName} />
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
                <span className="hidden md:inline text-sm font-medium text-gray-700">{userFullName}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => navigate('/dashboard/profile')}>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => navigate('/dashboard/settings')}>
                <Settings className="mr-2 h-4 w-4" /> {/* Icon used here */}
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" /> {/* Icon used here */}
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
