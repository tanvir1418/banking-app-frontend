
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const NotificationFilters: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow mb-6">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex items-center space-x-2">
          <Switch id="unread-only" />
          <Label htmlFor="unread-only" className="text-sm text-gray-600">Show unread only</Label>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px] text-sm">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              <SelectItem value="alerts">Alerts</SelectItem>
              <SelectItem value="transactions">Transactions</SelectItem>
              <SelectItem value="statements">Statements</SelectItem>
              <SelectItem value="offers">Special Offers</SelectItem>
              <SelectItem value="profile">Profile Updates</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="newest">
            <SelectTrigger className="w-full sm:w-[180px] text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="link" className="text-sm text-blue-600 hover:text-blue-700 px-0">
          Mark all as read
        </Button>
      </div>
    </div>
  );
};

export default NotificationFilters;
