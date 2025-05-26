
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Landmark, Wallet } from 'lucide-react'; // Example icons

export interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
  icon?: React.ElementType; // Make icon optional or provide a default
  interestRate?: string; // Optional interest rate
}

interface AccountSelectorProps {
  id: string;
  label: string;
  value?: string;
  onValueChange: (value: string | undefined) => void;
  accounts: Account[];
  placeholder: string;
  selectedAccountDetails?: Account;
  showDailyLimit?: boolean;
  disabledValues?: string[]; // Account IDs to disable
}

const AccountSelector: React.FC<AccountSelectorProps> = ({
  id,
  label,
  value,
  onValueChange,
  accounts,
  placeholder,
  selectedAccountDetails,
  showDailyLimit = false,
  disabledValues = [],
}) => {
  const getIcon = (IconComponent?: React.ElementType) => {
    if (IconComponent) {
      return <IconComponent className="mr-2 h-4 w-4 text-gray-500" />;
    }
    // Default icon if none provided, or handle based on account type if more info available
    return <Wallet className="mr-2 h-4 w-4 text-gray-500" />; 
  };

  return (
    <div>
      <Label htmlFor={id} className="text-gray-700">{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id} className="bg-white">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {accounts.map(acc => (
            <SelectItem key={acc.id} value={acc.id} disabled={disabledValues.includes(acc.id)}>
              <div className="flex items-center">
                {getIcon(acc.icon)}
                {acc.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedAccountDetails && (
        <div className="bg-slate-100 border border-slate-200 rounded-md p-3 text-xs text-gray-600 mt-2 space-y-1">
          <div className="flex justify-between"><span>Available Balance:</span> <span className="font-medium">${selectedAccountDetails.balance.toFixed(2)}</span></div>
          {showDailyLimit && <div className="flex justify-between"><span>Daily Transfer Limit:</span> <span className="font-medium">$25,000.00</span></div>}
          {selectedAccountDetails.interestRate && !showDailyLimit && (
            <div className="flex justify-between"><span>Interest Rate:</span> <span className="font-medium">{selectedAccountDetails.interestRate}</span></div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountSelector;
