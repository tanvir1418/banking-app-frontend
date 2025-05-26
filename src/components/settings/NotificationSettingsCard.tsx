
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
// import { Label } from '@/components/ui/label'; // Label not used
import { Bell } from 'lucide-react';
import { toast as showToast } from '@/hooks/use-toast'; // Renamed

const NotificationSettingsCard: React.FC = () => {
  const placeholderAction = (action: string) => {
    showToast({ title: 'Placeholder', description: `${action} functionality not yet implemented.` });
  };

  return (
    <Card className="bg-card shadow-md rounded-lg">
      <CardHeader className="flex flex-row items-center space-x-3 p-6">
        <Bell className="h-6 w-6 text-primary" />
        <CardTitle className="text-lg font-semibold text-card-foreground">Notifications</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">Email Notifications</p>
            <p className="text-xs text-muted-foreground">Receive emails about account activity</p>
          </div>
          <Switch id="emailNotifications" defaultChecked onCheckedChange={() => placeholderAction('Toggle Email Notifications')} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">Push Notifications</p>
            <p className="text-xs text-muted-foreground">Get notifications on your device</p>
          </div>
          <Switch id="pushNotifications" defaultChecked onCheckedChange={() => placeholderAction('Toggle Push Notifications')} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">SMS Notifications</p>
            <p className="text-xs text-muted-foreground">Get text messages for important alerts</p>
          </div>
          <Switch id="smsNotifications" onCheckedChange={() => placeholderAction('Toggle SMS Notifications')} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">Marketing Communications</p>
            <p className="text-xs text-muted-foreground">Receive offers and updates</p>
          </div>
          <Switch id="marketingComms" onCheckedChange={() => placeholderAction('Toggle Marketing Communications')} />
        </div>
      </CardContent>
      <CardFooter className="p-6 border-t border-border">
        <Button variant="outline" className="w-full text-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => placeholderAction('Manage Notification Preferences')}>Manage Notification Preferences</Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationSettingsCard;
