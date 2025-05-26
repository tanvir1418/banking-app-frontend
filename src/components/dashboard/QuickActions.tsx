
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, Landmark, Smartphone, CalendarDays } from 'lucide-react';

const actions = [
    { name: 'Transfer', icon: ArrowRightLeft, colorClasses: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' },
    { name: 'Pay Bills', icon: Landmark, colorClasses: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
    { name: 'Mobile Deposit', icon: Smartphone, colorClasses: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' },
    { name: 'Schedule', icon: CalendarDays, colorClasses: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' },
];

const QuickActions: React.FC = () => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-card-foreground">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map(action => (
            <Button key={action.name} variant="outline" className="flex flex-col items-center justify-center h-28 text-center p-2 hover:shadow-md transition-shadow">
              <div className={`p-3 rounded-full ${action.colorClasses} mb-2`}>
                <action.icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium text-card-foreground">{action.name}</span> {/* text-gray-700 to text-card-foreground */}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
