
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ReceiptText, Smartphone, Wifi, Shield, LucideIcon } from 'lucide-react';

interface BillCategory {
  name: string;
  icon: LucideIcon;
  action: () => void;
}

interface BillCategoriesGridProps {
  categories: BillCategory[];
}

const BillCategoriesGrid: React.FC<BillCategoriesGridProps> = ({ categories }) => {
  return (
    <Card className="bg-card shadow-lg border border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-xl text-card-foreground">Bill Payments</CardTitle>
        <Button variant="link" className="text-sm text-primary p-0 h-auto hover:text-primary/80">View All</Button>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {categories.map(category => (
          <Button 
            key={category.name} 
            variant="outline" 
            className="flex flex-col items-center justify-center h-28 text-card-foreground hover:bg-accent hover:text-accent-foreground hover:border-primary transition-all duration-200 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-md border-border" 
            onClick={category.action}
          >
            <category.icon className="h-8 w-8 mb-2 text-primary" />
            <span className="text-xs text-center font-medium">{category.name}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default BillCategoriesGrid;
