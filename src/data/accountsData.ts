
import { CreditCard, Landmark, Wallet } from 'lucide-react';
import { Account } from '@/components/fund-transfer/AccountSelector';

// Add type for Transaction to match our updated component
export interface Transaction {
  id: string;
  description: string;
  date: string;
  category: string;
  amount: number;
  status: string;
}

// Add type for Bill to match our updated component
export interface Bill {
  id: string;
  name: string;
  due: string;
  amount: number;
  category: string;
}

// Updated accounts data with account types and numbers
export const accountsData: Account[] = [
  {
    id: '1',
    name: 'Checking Account',
    accountNumber: '4587',
    balance: 12458.35,
    currency: 'USD',
    accountType: 'Checking',
    icon: Landmark
  },
  {
    id: '2',
    name: 'Savings Account',
    accountNumber: '7823',
    balance: 5892.67,
    currency: 'USD',
    accountType: 'Savings',
    interestRate: '1.25%',
    icon: Wallet
  },
  {
    id: '3',
    name: 'Credit Card',
    accountNumber: '9245',
    balance: 1234.56,
    currency: 'USD',
    accountType: 'Credit',
    icon: CreditCard
  },
];

// Updated transfer data to match our reference
export const recentTransfersData = [
  {
    date: 'May 05, 2025',
    from: 'Checking (4587)',
    to: 'Savings (7823)',
    amount: '$1,500.00',
    status: 'Completed',
    action: 'Repeat'
  },
  {
    date: 'Apr 28, 2025',
    from: 'Checking (4587)',
    to: 'Savings (7823)',
    amount: '$2,000.00',
    status: 'Completed',
    action: 'Repeat'
  },
  {
    date: 'Apr 15, 2025',
    from: 'Savings (7823)',
    to: 'Checking (4587)',
    amount: '$750.00',
    status: 'Completed',
    action: 'Repeat'
  },
];

// Sample bill data for upcoming bills
export const upcomingBillsData: Bill[] = [
  {
    id: '1',
    name: 'Electricity Bill',
    due: 'May 15',
    amount: 125.50,
    category: 'Utility',
  },
  {
    id: '2',
    name: 'Verizon Wireless',
    due: 'May 18',
    amount: 89.99,
    category: 'Internet',
  },
  {
    id: '3',
    name: 'Car Insurance',
    due: 'May 22',
    amount: 142.75,
    category: 'Insurance',
  },
];

// Sample transaction data
export const recentTransactionsData: Transaction[] = [
  {
    id: '1',
    description: 'City Power & Light',
    date: 'May 10, 2025',
    category: 'Utility',
    amount: 125.50,
    status: 'Completed',
  },
  {
    id: '2',
    description: 'Verizon Wireless',
    date: 'May 08, 2025',
    category: 'Internet',
    amount: 89.99,
    status: 'Completed',
  },
  {
    id: '3',
    description: 'State Farm Insurance',
    date: 'May 03, 2025',
    category: 'Insurance',
    amount: 142.75,
    status: 'Pending',
  },
];
