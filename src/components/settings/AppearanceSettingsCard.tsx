
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Sun, Moon, Laptop } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/contexts/ThemeProvider'; // Updated import
import { cn } from '@/lib/utils';

const AppearanceSettingsCard: React.FC = () => {
  const { theme, setTheme } = useTheme();

  // Placeholder for language/date format change
  const placeholderAction = (action: string) => {
    console.log(`${action} functionality not yet implemented.`);
  };
  
  const themes = [
    { name: "Light", value: "light", Icon: Sun },
    { name: "Dark", value: "dark", Icon: Moon },
    { name: "System", value: "system", Icon: Laptop },
  ];

  return (
    <Card className="bg-card shadow-md rounded-lg">
      <CardHeader className="flex flex-row items-center space-x-3 p-6">
        <Palette className="h-6 w-6 text-primary" />
        <CardTitle className="text-lg font-semibold text-card-foreground">Appearance</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <Label className="text-sm font-medium text-muted-foreground">Theme</Label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {themes.map(({ name, value, Icon }) => (
              <Button
                key={value}
                variant="outline"
                className={cn(
                  "flex flex-col items-center justify-center h-24 py-2 text-center",
                  "bg-transparent hover:bg-accent hover:text-accent-foreground",
                  theme === value && "ring-2 ring-primary border-primary text-primary"
                )}
                onClick={() => setTheme(value)}
              >
                <Icon className={cn("h-6 w-6 mb-1.5", theme === value ? "text-primary" : "text-muted-foreground")} />
                <span className={cn("text-xs", theme === value ? "font-semibold" : "font-normal")}>{name}</span>
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="language" className="text-sm font-medium text-muted-foreground">Language</Label>
          <Select defaultValue="en-US" onValueChange={() => placeholderAction('Change Language')}>
            <SelectTrigger id="language" className="mt-1 bg-background text-foreground">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground">
              <SelectItem value="en-US">English (US)</SelectItem>
              <SelectItem value="es-ES">Español (España)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="dateFormat" className="text-sm font-medium text-muted-foreground">Date Format</Label>
          <Select defaultValue="mmddyyyy" onValueChange={() => placeholderAction('Change Date Format')}>
            <SelectTrigger id="dateFormat" className="mt-1 bg-background text-foreground">
              <SelectValue placeholder="Select date format" />
            </SelectTrigger>
            <SelectContent className="bg-popover text-popover-foreground">
              <SelectItem value="mmddyyyy">MM/DD/YYYY</SelectItem>
              <SelectItem value="ddmmyyyy">DD/MM/YYYY</SelectItem>
              <SelectItem value="yyyymmdd">YYYY/MM/DD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettingsCard;
