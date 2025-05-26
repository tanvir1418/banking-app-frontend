
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const NotificationSettingsCard: React.FC = () => {
  const placeholderAction = (action: string) => {
    toast({ title: 'Placeholder', description: `${action} functionality not yet implemented.` });
  };

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader className="flex flex-row items-center space-x-3 p-4 border-b">
        <Bell className="h-6 w-6 text-blue-600" />
        <CardTitle className="text-lg font-semibold text-gray-700">Notifications</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">Email Notifications</p>
            <p className="text-xs text-gray-500">Receive emails about account activity</p>
          </div>
          <Switch id="emailNotifications" defaultChecked onCheckedChange={() => placeholderAction('Toggle Email Notifications')} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">Push Notifications</p>
            <p className="text-xs text-gray-500">Get notifications on your device</p>
          </div>
          <Switch id="pushNotifications" defaultChecked onCheckedChange={() => placeholderAction('Toggle Push Notifications')} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">SMS Notifications</p>
            <p className="text-xs text-gray-500">Get text messages for important alerts</p>
          </div>
          <Switch id="smsNotifications" onCheckedChange={() => placeholderAction('Toggle SMS Notifications')} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">Marketing Communications</p>
            <p className="text-xs text-gray-500">Receive offers and updates</p>
          </div>
          <Switch id="marketingComms" onCheckedChange={() => placeholderAction('Toggle Marketing Communications')} />
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button variant="outline" className="w-full" onClick={() => placeholderAction('Manage Notification Preferences')}>Manage Notification Preferences</Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationSettingsCard;

