
import React from 'react';
import NotificationItem, { NotificationItemProps } from './NotificationItem';
import { 
  AlertOctagon, 
  Receipt, 
  FileText as FileTextIcon,
  Landmark, 
  Gift, 
  UserCog, 
  KeyRound, 
  Repeat 
} from 'lucide-react';

const mockNotificationsData: NotificationItemProps[] = [
  {
    id: '1',
    icon: AlertOctagon,
    iconColorClass: 'text-red-600 dark:text-red-400',
    iconBgClass: 'bg-red-100 dark:bg-red-900/30',
    title: 'Security Alert',
    description: 'We detected a login attempt from a new device in London, UK. Was this you?',
    timestamp: '10:23 AM',
    isUnread: true,
    actions: [
      { label: 'Yes, it was me', variant: 'outline', className: 'text-green-600 dark:text-green-400 border-green-600 dark:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700 dark:hover:text-green-300' },
      { label: 'No, secure my account', variant: 'destructive' },
    ],
  },
  {
    id: '2',
    icon: Receipt,
    iconColorClass: 'text-blue-600 dark:text-blue-400',
    iconBgClass: 'bg-blue-100 dark:bg-blue-900/30',
    title: 'Transaction Completed',
    description: 'Your payment of $89.99 to Netflix Subscription was completed successfully.',
    timestamp: '8:45 AM',
    isUnread: true,
    detailsLink: '#',
  },
  {
    id: '3',
    icon: FileTextIcon,
    iconColorClass: 'text-green-600 dark:text-green-400',
    iconBgClass: 'bg-green-100 dark:bg-green-900/30',
    title: 'Statement Available',
    description: 'Your April 2025 account statement is now available for download.',
    timestamp: '7:12 AM',
    isUnread: true,
    actions: [{ label: 'Download statement', variant: 'link', className: 'p-0 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300' }],
  },
  {
    id: '4',
    icon: Landmark,
    iconColorClass: 'text-blue-600 dark:text-blue-400',
    iconBgClass: 'bg-blue-100 dark:bg-blue-900/30',
    title: 'Large Transaction',
    description: 'A transfer of $2,500.00 to James Wilson was completed successfully.',
    timestamp: '3:45 PM',
    detailsLink: '#',
  },
  {
    id: '5',
    icon: Gift,
    iconColorClass: 'text-purple-600 dark:text-purple-400',
    iconBgClass: 'bg-purple-100 dark:bg-purple-900/30',
    title: 'Special Offer',
    description: "You're eligible for our new Premium Rewards Credit Card with 2.5% cashback on all purchases.",
    timestamp: '11:30 AM',
    actions: [{ label: 'Learn more', variant: 'link', className: 'p-0 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300' }],
  },
  {
    id: '6',
    icon: UserCog,
    iconColorClass: 'text-gray-600 dark:text-gray-400',
    iconBgClass: 'bg-gray-100 dark:bg-gray-800',
    title: 'Profile Updated',
    description: 'Your contact information was updated successfully.',
    timestamp: 'May 2, 2025',
  },
  {
    id: '7',
    icon: KeyRound,
    iconColorClass: 'text-yellow-600 dark:text-yellow-400',
    iconBgClass: 'bg-yellow-100 dark:bg-yellow-900/30',
    title: 'Password Expiring',
    description: 'Your password will expire in 7 days. Please update it to maintain account security.',
    timestamp: 'May 1, 2025',
    actions: [{ label: 'Change password', variant: 'link', className: 'p-0 text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300' }],
  },
  {
    id: '8',
    icon: Repeat,
    iconColorClass: 'text-blue-600 dark:text-blue-400',
    iconBgClass: 'bg-blue-100 dark:bg-blue-900/30',
    title: 'Recurring Payment',
    description: 'Your monthly payment of $15.99 to Spotify Premium was processed successfully.',
    timestamp: 'April 30, 2025',
  },
];

const groupNotificationsByDate = (notifications: NotificationItemProps[]) => {
  const grouped: { [key: string]: NotificationItemProps[] } = {};
  
  notifications.forEach(notification => {
    let groupKey = "Older";
    if (notification.id === '1' || notification.id === '2' || notification.id === '3') {
      groupKey = 'Today - May 6, 2025';
    } else if (notification.id === '4' || notification.id === '5') {
      groupKey = 'Yesterday - May 5, 2025';
    } else if (notification.id === '6' || notification.id === '7' || notification.id === '8') {
      groupKey = 'Last Week';
    }

    if (!grouped[groupKey]) {
      grouped[groupKey] = [];
    }
    grouped[groupKey].push(notification);
  });
  return grouped;
};

const NotificationList: React.FC = () => {
  const groupedNotifications = groupNotificationsByDate(mockNotificationsData);
  const dateGroups = ['Today - May 6, 2025', 'Yesterday - May 5, 2025', 'Last Week', 'Older'];

  return (
    <div className="space-y-6">
      {dateGroups.map(dateGroup => {
        const notificationsInGroup = groupedNotifications[dateGroup];
        if (!notificationsInGroup || notificationsInGroup.length === 0) {
          return null;
        }
        return (
          <div key={dateGroup}>
            <h3 className="text-xs font-medium text-muted-foreground uppercase mb-3">{dateGroup}</h3>
            {notificationsInGroup.map(notification => (
              <NotificationItem key={notification.id} {...notification} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default NotificationList;
