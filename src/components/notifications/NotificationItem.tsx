
import React from 'react';
import { LucideProps, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type NotificationAction = {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
};

export type NotificationItemProps = {
  id: string;
  icon: React.ComponentType<LucideProps>;
  iconColorClass: string;
  iconBgClass: string;
  title: string;
  description: string;
  timestamp: string;
  isUnread?: boolean;
  actions?: NotificationAction[];
  detailsLink?: string;
};

const NotificationItem: React.FC<NotificationItemProps> = ({
  icon: Icon,
  iconColorClass,
  iconBgClass,
  title,
  description,
  timestamp,
  isUnread,
  actions,
  detailsLink,
}) => {
  return (
    <Card className={`p-4 mb-3 flex items-start space-x-4 relative transition-all hover:shadow-md ${isUnread ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
      <div className={`p-2 rounded-full ${iconBgClass}`}>
        <Icon className={`h-5 w-5 ${iconColorClass}`} />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
        <p className="text-gray-600 text-sm" dangerouslySetInnerHTML={{ __html: description }}></p>
        {actions && actions.length > 0 && (
          <div className="mt-2 space-x-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || 'default'}
                size="sm"
                onClick={action.onClick}
                className={`${action.className} text-xs px-3 py-1 h-auto`}
              >
                {action.href ? <a href={action.href}>{action.label}</a> : action.label}
              </Button>
            ))}
          </div>
        )}
        {detailsLink && !actions?.find(a => a.label.toLowerCase().includes('details') || a.label.toLowerCase().includes('statement')) && (
          <Button variant="link" size="sm" className="p-0 h-auto text-xs text-blue-600 hover:text-blue-700 mt-1">
            <a href={detailsLink}>View transaction details</a>
          </Button>
        )}
      </div>
      <div className="text-xs text-gray-500 whitespace-nowrap">{timestamp}</div>
      {isUnread && (
        <div className="absolute top-3 right-10 h-2 w-2 bg-blue-500 rounded-full"></div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-7 w-7 absolute top-2 right-1 text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Mark as read</DropdownMenuItem>
          <DropdownMenuItem>Archive</DropdownMenuItem>
          <DropdownMenuItem>Notification settings</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
};

export default NotificationItem;
