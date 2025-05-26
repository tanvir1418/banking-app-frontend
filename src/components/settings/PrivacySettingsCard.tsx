
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Eye } from 'lucide-react'; // Using Eye as a generic privacy icon
import { toast } from '@/hooks/use-toast';

const PrivacySettingsCard: React.FC = () => {
  const placeholderAction = (action: string) => {
    toast({ title: 'Placeholder', description: `${action} functionality not yet implemented.` });
  };

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader className="flex flex-row items-center space-x-3 p-4 border-b">
        <Eye className="h-6 w-6 text-blue-600" />
        <CardTitle className="text-lg font-semibold text-gray-700">Privacy</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">Data Sharing</p>
            <p className="text-xs text-gray-500">Share data for service improvement</p>
          </div>
          <Switch id="dataSharing" defaultChecked onCheckedChange={() => placeholderAction('Toggle Data Sharing')} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">Cookie Preferences</p>
            <p className="text-xs text-gray-500">Manage cookies and tracking</p>
          </div>
          <Button variant="link" className="text-sm" onClick={() => placeholderAction('Manage Cookie Preferences')}>Manage</Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">Activity History</p>
            <p className="text-xs text-gray-500">Track your account activity</p>
          </div>
          <Switch id="activityHistory" defaultChecked onCheckedChange={() => placeholderAction('Toggle Activity History')} />
        </div>
         <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">Third-Party Access</p>
            <p className="text-xs text-gray-500">Manage app connections</p>
          </div>
          <Button variant="link" className="text-sm" onClick={() => placeholderAction('View Third-Party Access')}>View</Button>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button variant="outline" className="w-full" onClick={() => placeholderAction('Download My Data')}>Download My Data</Button>
      </CardFooter>
    </Card>
  );
};

export default PrivacySettingsCard;
