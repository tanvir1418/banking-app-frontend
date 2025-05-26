
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
// import { Label } from '@/components/ui/label'; // Label not used
import { ShieldCheck, Eye } from 'lucide-react';
import { toast as showToast } from '@/hooks/use-toast'; // Renamed to avoid conflict if toast is used as a prop

const SecuritySettingsCard: React.FC = () => {
  const placeholderAction = (action: string) => {
    showToast({ title: 'Placeholder', description: `${action} functionality not yet implemented.` });
  };

  return (
    <Card className="bg-card shadow-md rounded-lg">
      <CardHeader className="flex flex-row items-center space-x-3 p-6">
        <ShieldCheck className="h-6 w-6 text-primary" />
        <CardTitle className="text-lg font-semibold text-card-foreground">Security</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">Change Password</p>
            <p className="text-xs text-muted-foreground">Last changed 45 days ago</p>
          </div>
          <Button variant="link" className="text-sm text-primary hover:text-primary/90 px-0" onClick={() => placeholderAction('Change Password')}>Change</Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">Two-Factor Authentication</p>
            <p className="text-xs text-muted-foreground">Secure your account with 2FA</p>
          </div>
          <Switch id="2fa" onCheckedChange={() => placeholderAction('Toggle 2FA')} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">Login Notifications</p>
            <p className="text-xs text-muted-foreground">Get notified of new logins</p>
          </div>
          <Switch id="loginNotifications" defaultChecked onCheckedChange={() => placeholderAction('Toggle Login Notifications')} />
        </div>
         <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">Biometric Login</p>
            <p className="text-xs text-muted-foreground">Use fingerprint or Face ID</p>
          </div>
          <Switch id="biometricLogin" onCheckedChange={() => placeholderAction('Toggle Biometric Login')} />
        </div>
        <Button variant="link" className="text-sm p-0 h-auto flex items-center text-primary hover:text-primary/90" onClick={() => placeholderAction('View Login History')}>
          <Eye className="mr-1.5 h-4 w-4" /> View Login History
        </Button>
      </CardContent>
    </Card>
  );
};

export default SecuritySettingsCard;
