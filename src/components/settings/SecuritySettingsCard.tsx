
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Eye } from 'lucide-react'; // Changed to Eye for login history
import { toast } from '@/hooks/use-toast';

const SecuritySettingsCard: React.FC = () => {
  const placeholderAction = (action: string) => {
    toast({ title: 'Placeholder', description: `${action} functionality not yet implemented.` });
  };

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader className="flex flex-row items-center space-x-3 p-4 border-b">
        <ShieldCheck className="h-6 w-6 text-blue-600" />
        <CardTitle className="text-lg font-semibold text-gray-700">Security</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">Change Password</p>
            <p className="text-xs text-gray-500">Last changed 45 days ago</p>
          </div>
          <Button variant="link" className="text-sm" onClick={() => placeholderAction('Change Password')}>Change</Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">Two-Factor Authentication</p>
            <p className="text-xs text-gray-500">Secure your account with 2FA</p>
          </div>
          <Switch id="2fa" onCheckedChange={() => placeholderAction('Toggle 2FA')} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">Login Notifications</p>
            <p className="text-xs text-gray-500">Get notified of new logins</p>
          </div>
          <Switch id="loginNotifications" defaultChecked onCheckedChange={() => placeholderAction('Toggle Login Notifications')} />
        </div>
         <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">Biometric Login</p>
            <p className="text-xs text-gray-500">Use fingerprint or Face ID</p>
          </div>
          <Switch id="biometricLogin" onCheckedChange={() => placeholderAction('Toggle Biometric Login')} />
        </div>
        <Button variant="link" className="text-sm p-0 h-auto flex items-center text-blue-600 hover:text-blue-700" onClick={() => placeholderAction('View Login History')}>
          <Eye className="mr-1.5 h-4 w-4" /> View Login History
        </Button>
      </CardContent>
    </Card>
  );
};

export default SecuritySettingsCard;
