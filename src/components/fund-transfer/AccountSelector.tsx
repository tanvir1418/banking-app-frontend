
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { CreditCard, Landmark, Wallet } from 'lucide-react';

export interface Account {
  id: string;
  name: string;
  balance: number;
  currency: string;
  accountType: string;
  accountNumber: string;
  icon?: React.ElementType;
  interestRate?: string;
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
  disabledValues?: string[];
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
  const getIcon = (account: Account) => {
    if (account.icon) {
      const IconComponent = account.icon;
      return <IconComponent className="mr-2 h-5 w-5 text-blue-600" />; // Slightly larger icon and consistent color
    }
    
    // Default icons based on account type
    if (account.accountType === 'Checking') {
      return <Landmark className="mr-2 h-5 w-5 text-blue-600" />;
    } else if (account.accountType === 'Savings') {
      return <Wallet className="mr-2 h-5 w-5 text-blue-600" />;
    } else {
      return <CreditCard className="mr-2 h-5 w-5 text-blue-600" />;
    }
  };

  const selectedAccountForDisplay = accounts.find(acc => acc.id === value);

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-gray-700 font-medium">{label}</Label> {/* Added font-medium */}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id} className="bg-white border-gray-300 h-12 text-left"> {/* Ensure text-left */}
          {selectedAccountForDisplay ? (
            <div className="flex items-center">
              {getIcon(selectedAccountForDisplay)}
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-800">{selectedAccountForDisplay.name}</span>
                <span className="text-xs text-gray-500">**** {selectedAccountForDisplay.accountNumber}</span>
              </div>
            </div>
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>
        <SelectContent className="bg-white">
          {accounts.map(acc => (
            <SelectItem key={acc.id} value={acc.id} disabled={disabledValues.includes(acc.id)}>
              <div className="flex items-center">
                {getIcon(acc)}
                <div>
                  <span className="text-sm font-medium">{acc.name}</span>
                  <span className="text-xs text-gray-500 ml-1">**** {acc.accountNumber}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedAccountDetails && (
        <div className="mt-2 text-sm space-y-1 px-1"> {/* Removed box, adjusted padding */}
          <div className="flex justify-between">
            <span className="text-gray-600">
              {showDailyLimit ? 'Available Balance:' : 'Current Balance:'}
            </span> 
            <span className="font-medium text-gray-800">${selectedAccountDetails.balance.toFixed(2)}</span>
          </div>
          {showDailyLimit && (
            <div className="flex justify-between">
              <span className="text-gray-600">Daily Transfer Limit:</span> 
              <span className="font-medium text-gray-800">$25,000.00</span> {/* Matched example format */}
            </div>
          )}
          {selectedAccountDetails.interestRate && !showDailyLimit && (
            <div className="flex justify-between">
              <span className="text-gray-600">Interest Rate:</span> 
              <span className="font-medium text-gray-800">{selectedAccountDetails.interestRate} APY</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountSelector;

