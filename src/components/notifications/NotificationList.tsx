
import React from 'react';
import NotificationItem, { NotificationItemProps } from './NotificationItem';
import { 
  AlertOctagon, 
  Receipt, 
  FileText as FileTextIcon, // Renamed to avoid conflict
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
    iconColorClass: 'text-red-600',
    iconBgClass: 'bg-red-100',
    title: 'Security Alert',
    description: 'We detected a login attempt from a new device in London, UK. Was this you?',
    timestamp: '10:23 AM',
    isUnread: true,
    actions: [
      { label: 'Yes, it was me', variant: 'outline', className: 'text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700' },
      { label: 'No, secure my account', variant: 'destructive' },
    ],
  },
  {
    id: '2',
    icon: Receipt,
    iconColorClass: 'text-blue-600',
    iconBgClass: 'bg-blue-100',
    title: 'Transaction Completed',
    description: 'Your payment of $89.99 to Netflix Subscription was completed successfully.',
    timestamp: '8:45 AM',
    isUnread: true,
    detailsLink: '#',
  },
  {
    id: '3',
    icon: FileTextIcon,
    iconColorClass: 'text-green-600',
    iconBgClass: 'bg-green-100',
    title: 'Statement Available',
    description: 'Your April 2025 account statement is now available for download.',
    timestamp: '7:12 AM',
    isUnread: true,
    actions: [{ label: 'Download statement', variant: 'link', className: 'p-0 text-green-600 hover:text-green-700' }],
  },
  {
    id: '4',
    icon: Landmark,
    iconColorClass: 'text-blue-600',
    iconBgClass: 'bg-blue-100',
    title: 'Large Transaction',
    description: 'A transfer of $2,500.00 to James Wilson was completed successfully.',
    timestamp: '3:45 PM',
    detailsLink: '#',
  },
  {
    id: '5',
    icon: Gift,
    iconColorClass: 'text-purple-600',
    iconBgClass: 'bg-purple-100',
    title: 'Special Offer',
    description: "You're eligible for our new Premium Rewards Credit Card with 2.5% cashback on all purchases.",
    timestamp: '11:30 AM',
    actions: [{ label: 'Learn more', variant: 'link', className: 'p-0 text-purple-600 hover:text-purple-700' }],
  },
  {
    id: '6',
    icon: UserCog,
    iconColorClass: 'text-gray-600',
    iconBgClass: 'bg-gray-100',
    title: 'Profile Updated',
    description: 'Your contact information was updated successfully.',
    timestamp: 'May 2, 2025',
  },
  {
    id: '7',
    icon: KeyRound,
    iconColorClass: 'text-yellow-600',
    iconBgClass: 'bg-yellow-100',
    title: 'Password Expiring',
    description: 'Your password will expire in 7 days. Please update it to maintain account security.',
    timestamp: 'May 1, 2025',
    actions: [{ label: 'Change password', variant: 'link', className: 'p-0 text-yellow-600 hover:text-yellow-700' }],
  },
  {
    id: '8',
    icon: Repeat,
    iconColorClass: 'text-blue-600',
    iconBgClass: 'bg-blue-100',
    title: 'Recurring Payment',
    description: 'Your monthly payment of $15.99 to Spotify Premium was processed successfully.',
    timestamp: 'April 30, 2025',
  },
];

const groupNotificationsByDate = (notifications: NotificationItemProps[]) => {
  const grouped: { [key: string]: NotificationItemProps[] } = {};
  
  notifications.forEach(notification => {
    // This is a simplified grouping. In a real app, you'd parse timestamps properly.
    // For this mock, we'll use predefined groups based on the example.
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
  const dateGroups = ['Today - May 6, 2025', 'Yesterday - May 5, 2025', 'Last Week', 'Older']; // Ensure correct order

  return (
    <div className="space-y-6">
      {dateGroups.map(dateGroup => {
        const notificationsInGroup = groupedNotifications[dateGroup];
        if (!notificationsInGroup || notificationsInGroup.length === 0) {
          return null;
        }
        return (
          <div key={dateGroup}>
            <h3 className="text-xs font-medium text-gray-500 uppercase mb-3">{dateGroup}</h3>
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
