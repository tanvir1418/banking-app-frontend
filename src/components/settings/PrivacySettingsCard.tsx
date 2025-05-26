
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
// import { Label } from '@/components/ui/label'; // Label not used
import { Eye } from 'lucide-react';
import { toast as showToast } from '@/hooks/use-toast'; // Renamed

const PrivacySettingsCard: React.FC = () => {
  const placeholderAction = (action: string) => {
    showToast({ title: 'Placeholder', description: `${action} functionality not yet implemented.` });
  };

  return (
    <Card className="bg-card shadow-md rounded-lg">
      <CardHeader className="flex flex-row items-center space-x-3 p-6">
        <Eye className="h-6 w-6 text-primary" />
        <CardTitle className="text-lg font-semibold text-card-foreground">Privacy</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">Data Sharing</p>
            <p className="text-xs text-muted-foreground">Share data for service improvement</p>
          </div>
          <Switch id="dataSharing" defaultChecked onCheckedChange={() => placeholderAction('Toggle Data Sharing')} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">Cookie Preferences</p>
            <p className="text-xs text-muted-foreground">Manage cookies and tracking</p>
          </div>
          <Button variant="link" className="text-sm text-primary hover:text-primary/90 px-0" onClick={() => placeholderAction('Manage Cookie Preferences')}>Manage</Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">Activity History</p>
            <p className="text-xs text-muted-foreground">Track your account activity</p>
          </div>
          <Switch id="activityHistory" defaultChecked onCheckedChange={() => placeholderAction('Toggle Activity History')} />
        </div>
         <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-card-foreground">Third-Party Access</p>
            <p className="text-xs text-muted-foreground">Manage app connections</p>
          </div>
          <Button variant="link" className="text-sm text-primary hover:text-primary/90 px-0" onClick={() => placeholderAction('View Third-Party Access')}>View</Button>
        </div>
      </CardContent>
      <CardFooter className="p-6 border-t border-border">
        <Button variant="outline" className="w-full text-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => placeholderAction('Download My Data')}>Download My Data</Button>
      </CardFooter>
    </Card>
  );
};

export default PrivacySettingsCard;
