
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const AddNewBillerForm: React.FC = () => {
  return (
    <Card className="bg-card shadow-lg border border-border">
      <CardHeader className="pb-4">
          <CardTitle className="text-xl text-card-foreground">Add New Bill</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-3">
          <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search for a biller (e.g., PG&E, Netflix)" className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"/>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">Add Bill</Button>
      </CardContent>
    </Card>
  );
};

export default AddNewBillerForm;
