
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, Landmark, Smartphone, CalendarDays } from 'lucide-react'; // Example icons

const actions = [
    { name: 'Transfer', icon: ArrowRightLeft, color: 'bg-blue-100 text-blue-600' },
    { name: 'Pay Bills', icon: Landmark, color: 'bg-green-100 text-green-600' },
    { name: 'Mobile Deposit', icon: Smartphone, color: 'bg-purple-100 text-purple-600' },
    { name: 'Schedule', icon: CalendarDays, color: 'bg-orange-100 text-orange-600' },
];

const QuickActions: React.FC = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map(action => (
            <Button key={action.name} variant="outline" className="flex flex-col items-center justify-center h-28 text-center p-2 hover:shadow-md transition-shadow">
              <div className={`p-3 rounded-full ${action.color} mb-2`}>
                <action.icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium text-gray-700">{action.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
