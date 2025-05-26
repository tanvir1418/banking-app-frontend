
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link as LinkIcon } from 'lucide-react'; // Renamed to avoid conflict
// Placeholder icons - in a real app, you'd use actual brand icons
import { ChromeIcon, FacebookIcon, AppleIcon, TwitterIcon } from 'lucide-react'; 
import { toast } from '@/hooks/use-toast';

const ConnectedAccountsCard: React.FC = () => {
  const placeholderAction = (action: string, account?: string) => {
    toast({ title: 'Placeholder', description: `${action} for ${account || ''} functionality not yet implemented.` });
  };

  const accounts = [
    { name: 'Google', Icon: ChromeIcon, connectedDate: 'May 4, 2025', status: 'connected' as const },
    { name: 'Facebook', Icon: FacebookIcon, status: 'not_connected' as const },
    { name: 'Apple', Icon: AppleIcon, connectedDate: 'April 28, 2025', status: 'connected' as const },
    { name: 'Twitter', Icon: TwitterIcon, status: 'not_connected' as const },
  ];

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader className="flex flex-row items-center space-x-3 p-4 border-b">
        <LinkIcon className="h-6 w-6 text-blue-600" />
        <CardTitle className="text-lg font-semibold text-gray-700">Connected Accounts</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {accounts.map(account => (
          <div key={account.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <account.Icon className="h-6 w-6 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-800">{account.name}</p>
                {account.status === 'connected' && account.connectedDate && (
                  <p className="text-xs text-gray-500">Connected on {account.connectedDate}</p>
                )}
                 {account.status === 'not_connected' && (
                  <p className="text-xs text-gray-500">Not connected</p>
                )}
              </div>
            </div>
            {account.status === 'connected' ? (
              <Button variant="link" className="text-sm text-red-600 hover:text-red-700" onClick={() => placeholderAction('Disconnect', account.name)}>Disconnect</Button>
            ) : (
              <Button variant="link" className="text-sm text-blue-600 hover:text-blue-700" onClick={() => placeholderAction('Connect', account.name)}>Connect</Button>
            )}
          </div>
        ))}
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button variant="outline" className="w-full" onClick={() => placeholderAction('Manage All Connections')}>Manage All Connections</Button>
      </CardFooter>
    </Card>
  );
};

export default ConnectedAccountsCard;

