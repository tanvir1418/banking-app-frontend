
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReceiptText, Smartphone, Wifi, Shield, LucideIcon } from 'lucide-react'; // Added LucideIcon type

interface BillCategory {
  name: string;
  icon: LucideIcon; // Use LucideIcon type
  action: () => void;
}

interface BillCategoriesGridProps {
  categories: BillCategory[];
}

const BillCategoriesGrid: React.FC<BillCategoriesGridProps> = ({ categories }) => {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-4"> {/* Adjusted padding */}
        <CardTitle className="text-xl text-gray-800">Bill Payments</CardTitle>
        <Button variant="link" className="text-sm text-blue-600 p-0 h-auto">View All</Button>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map(category => (
          <Button 
            key={category.name} 
            variant="outline" 
            className="flex flex-col items-center justify-center h-28 text-gray-700 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-md border-gray-200" 
            onClick={category.action}
          >
            <category.icon className="h-8 w-8 mb-2 text-blue-600" />
            <span className="text-xs text-center font-medium">{category.name}</span> {/* Added font-medium */}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default BillCategoriesGrid;
