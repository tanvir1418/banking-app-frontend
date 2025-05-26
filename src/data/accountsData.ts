
import { Landmark, Wallet } from 'lucide-react';
import { Account } from '@/components/fund-transfer/AccountSelector';

// Mock data for accounts with icons and interest rate
export const accountsData: Account[] = [
  { id: 'acc1', name: 'Checking Account **** 4582', balance: 12458.35, currency: 'USD', icon: Landmark, interestRate: '0.10% APY' },
  { id: 'acc2', name: 'Savings Account **** 7291', balance: 45892.35, currency: 'USD', icon: Wallet, interestRate: '1.25% APY' },
  { id: 'acc3', name: 'Business Account **** 3012', balance: 7800.00, currency: 'USD', icon: Landmark, interestRate: '0.05% APY' },
];

export const recentTransfersData = [
  { date: 'May 05, 2025', from: 'Checking (*4582)', to: 'Savings (*7823)', amount: '$1,500.00', status: 'Completed', action: 'Repeat' },
  { date: 'Apr 28, 2025', from: 'Checking (*4582)', to: 'Savings (*7823)', amount: '$2,000.00', status: 'Completed', action: 'Repeat' },
  { date: 'Apr 15, 2025', from: 'Savings (*7823)', to: 'Checking (*4582)', amount: '$750.00', status: 'Completed', action: 'Repeat' },
];
