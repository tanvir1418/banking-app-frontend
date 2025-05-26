
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const AddNewBillerForm: React.FC = () => {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="pb-4"> {/* Adjusted padding */}
          <CardTitle className="text-xl text-gray-800">Add New Bill</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-3">
          <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input placeholder="Search for a biller (e.g., PG&E, Netflix)" className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"/> {/* Enhanced input styling */}
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">Add Bill</Button> {/* Added px-6 */}
      </CardContent>
    </Card>
  );
};

export default AddNewBillerForm;
