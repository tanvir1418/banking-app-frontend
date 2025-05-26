
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Sun, Moon, Laptop } from 'lucide-react'; // Added Laptop for System
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const AppearanceSettingsCard: React.FC = () => {
  const placeholderAction = (action: string) => {
    toast({ title: 'Placeholder', description: `${action} functionality not yet implemented.` });
  };
  
  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader className="flex flex-row items-center space-x-3 p-4 border-b">
        <Palette className="h-6 w-6 text-blue-600" />
        <CardTitle className="text-lg font-semibold text-gray-700">Appearance</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        <div>
          <Label className="text-sm font-medium text-gray-600">Theme</Label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <Button variant="outline" className="flex flex-col items-center justify-center h-20 border-blue-500 ring-2 ring-blue-500" onClick={() => placeholderAction('Set Light Theme')}>
              <Sun className="h-6 w-6 mb-1" /> Light
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center h-20" onClick={() => placeholderAction('Set Dark Theme')}>
              <Moon className="h-6 w-6 mb-1" /> Dark
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center h-20" onClick={() => placeholderAction('Set System Theme')}>
              <Laptop className="h-6 w-6 mb-1" /> System
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="language" className="text-sm font-medium text-gray-600">Language</Label>
          <Select defaultValue="en-US" onValueChange={() => placeholderAction('Change Language')}>
            <SelectTrigger id="language" className="mt-1 bg-white">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en-US">English (US)</SelectItem>
              <SelectItem value="es-ES">Español (España)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="dateFormat" className="text-sm font-medium text-gray-600">Date Format</Label>
          <Select defaultValue="mmddyyyy" onValueChange={() => placeholderAction('Change Date Format')}>
            <SelectTrigger id="dateFormat" className="mt-1 bg-white">
              <SelectValue placeholder="Select date format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mmddyyyy">MM/DD/YYYY</SelectItem>
              <SelectItem value="ddmmyyyy">DD/MM/YYYY</SelectItem>
              <SelectItem value="yyyymmdd">YYYY/MM/DD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettingsCard;

