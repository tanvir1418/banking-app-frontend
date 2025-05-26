
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ArrowRight, InfoIcon } from 'lucide-react';
import AccountSelector, { Account } from './AccountSelector';

interface TransferFormDetailsProps {
  fromAccount?: string;
  setFromAccount: (value: string | undefined) => void;
  toAccount?: string;
  setToAccount: (value: string | undefined) => void;
  amount: string;
  setAmount: (value: string) => void;
  transferDate?: Date;
  setTransferDate: (date?: Date) => void;
  description: string;
  setDescription: (value: string) => void;
  isRecurring: boolean;
  setIsRecurring: (value: boolean) => void;
  saveAsTemplate: boolean;
  setSaveAsTemplate: (value: boolean) => void;
  accounts: Account[];
  selectedFromAccount?: Account;
  selectedToAccount?: Account;
  onContinue: () => void;
}

const TransferFormDetails: React.FC<TransferFormDetailsProps> = ({
  fromAccount, setFromAccount, toAccount, setToAccount,
  amount, setAmount, transferDate, setTransferDate,
  description, setDescription, isRecurring, setIsRecurring,
  saveAsTemplate, setSaveAsTemplate, accounts,
  selectedFromAccount, selectedToAccount, onContinue
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <AccountSelector
          id="fromAccount"
          label="From Account"
          value={fromAccount}
          onValueChange={setFromAccount}
          accounts={accounts}
          placeholder="Select account"
          selectedAccountDetails={selectedFromAccount}
          showDailyLimit={true}
        />
        <AccountSelector
          id="toAccount"
          label="To Account"
          value={toAccount}
          onValueChange={setToAccount}
          accounts={accounts}
          placeholder="Select account"
          selectedAccountDetails={selectedToAccount}
          disabledValues={fromAccount ? [fromAccount] : []}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-gray-700 font-medium">Amount</Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500 text-sm">$</span>
            </div>
            <Input 
              id="amount" 
              type="text"
              placeholder="0.00" 
              value={amount} 
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setAmount(value);
                }
              }}
              className="bg-white pl-7 text-sm h-12" // Added h-12 for consistent height
            />
          </div>
          {selectedFromAccount && <p className="text-xs text-gray-500 mt-1">Available balance: ${selectedFromAccount.balance.toFixed(2)}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="transferDate" className="text-gray-700 font-medium">Transfer Date</Label>
          <DatePicker selected={transferDate} onSelect={setTransferDate} className="w-full bg-white text-sm h-12" placeholder="Select date" /> {/* Added h-12 */}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-gray-700 font-medium">Description (Optional)</Label>
        <Textarea 
          id="description" 
          placeholder="Add a note about this transfer" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="bg-white text-sm"
          rows={3}
        />
      </div>
      
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-2">
          <Switch id="recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
          <Label htmlFor="recurring" className="font-normal text-sm text-gray-700">Make this a recurring transfer</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="saveTemplate" checked={saveAsTemplate} onCheckedChange={(checked) => setSaveAsTemplate(checked as boolean)} />
          <Label htmlFor="saveTemplate" className="font-normal text-sm text-gray-700">Save as template</Label>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 space-y-1 border border-blue-200 shadow-sm">
        <div className="flex items-start">
          <InfoIcon className="h-5 w-5 mr-2.5 mt-0.5 text-blue-600 shrink-0" />
          <div>
            <p className="font-semibold text-blue-700">Transfer Information</p>
            <ul className="list-disc list-inside text-xs mt-1.5 space-y-1 text-blue-700/90">
              <li>Internal transfers between your accounts are free of charge.</li>
              <li>Transfers are typically processed immediately during business hours.</li>
              <li>Scheduled transfers will be processed on the selected date.</li>
              <li>Your transaction will be secured with two-factor authentication.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" className="text-sm">Cancel</Button>
        <Button onClick={onContinue} className="bg-blue-600 hover:bg-blue-700 text-white text-sm">
          Continue to Review <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TransferFormDetails;

