
import React, { useState } from 'react';
import { DatePicker } from '@/components/ui/date-picker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const TransactionFilters: React.FC = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date('2025-04-06'));
  const [toDate, setToDate] = useState<Date | undefined>(new Date('2025-05-06'));

  return (
    <Card className="p-4 shadow-md bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div>
          <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <DatePicker selected={fromDate} onSelect={setFromDate} placeholder="Start date"/>
        </div>
        <div>
          <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <DatePicker selected={toDate} onSelect={setToDate} placeholder="End date" />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="All Transactions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expenses">Expenses</SelectItem>
              <SelectItem value="transfers">Transfers</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="lg:col-span-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <Input id="search" placeholder="Search transactions..." />
        </div>
        <Button variant="outline" className="w-full lg:w-auto flex items-center gap-2 border-gray-300 hover:bg-gray-50">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
      <div className="mt-3 flex space-x-2">
        <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">Today</Button>
        <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">This Week</Button>
        <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50 bg-blue-100">This Month</Button> {/* Example active */}
        <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">Last Month</Button>
      </div>
    </Card>
  );
};

// Need to import Card if it's not globally available
import { Card } from '@/components/ui/card';
export default TransactionFilters;
