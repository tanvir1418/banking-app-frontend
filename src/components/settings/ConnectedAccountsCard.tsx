
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link as LinkIcon } from 'lucide-react';
import { ChromeIcon, FacebookIcon, AppleIcon, TwitterIcon } from 'lucide-react'; 
import { toast as showToast } from '@/hooks/use-toast'; // Renamed

const ConnectedAccountsCard: React.FC = () => {
  const placeholderAction = (action: string, account?: string) => {
    showToast({ title: 'Placeholder', description: `${action}${account ? ` for ${account}` : ''} functionality not yet implemented.` });
  };

  const accounts = [
    { name: 'Google', Icon: ChromeIcon, connectedDate: 'May 4, 2025', status: 'connected' as const },
    { name: 'Facebook', Icon: FacebookIcon, status: 'not_connected' as const },
    { name: 'Apple', Icon: AppleIcon, connectedDate: 'April 28, 2025', status: 'connected' as const },
    { name: 'Twitter', Icon: TwitterIcon, status: 'not_connected' as const },
  ];

  return (
    <Card className="bg-card shadow-md rounded-lg">
      <CardHeader className="flex flex-row items-center space-x-3 p-6">
        <LinkIcon className="h-6 w-6 text-primary" />
        <CardTitle className="text-lg font-semibold text-card-foreground">Connected Accounts</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-5">
        {accounts.map(account => (
          <div key={account.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <account.Icon className="h-6 w-6 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-card-foreground">{account.name}</p>
                {account.status === 'connected' && account.connectedDate && (
                  <p className="text-xs text-muted-foreground">Connected on {account.connectedDate}</p>
                )}
                 {account.status === 'not_connected' && (
                  <p className="text-xs text-muted-foreground">Not connected</p>
                )}
              </div>
            </div>
            {account.status === 'connected' ? (
              <Button variant="link" className="text-sm text-destructive hover:text-destructive/90 px-0" onClick={() => placeholderAction('Disconnect', account.name)}>Disconnect</Button>
            ) : (
              <Button variant="link" className="text-sm text-primary hover:text-primary/90 px-0" onClick={() => placeholderAction('Connect', account.name)}>Connect</Button>
            )}
          </div>
        ))}
      </CardContent>
      <CardFooter className="p-6 border-t border-border">
        <Button variant="outline" className="w-full text-foreground hover:bg-accent hover:text-accent-foreground" onClick={() => placeholderAction('Manage All Connections')}>Manage All Connections</Button>
      </CardFooter>
    </Card>
  );
};

export default ConnectedAccountsCard;
