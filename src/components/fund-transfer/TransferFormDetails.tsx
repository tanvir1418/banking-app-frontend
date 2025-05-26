
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, Landmark, Wallet } from 'lucide-react';
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <div>
        <Label htmlFor="amount" className="text-gray-700">Amount</Label>
        <Input id="amount" type="number" placeholder="$ 0.00" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-white" />
        {selectedFromAccount && <p className="text-xs text-gray-500 mt-1">Available balance: ${selectedFromAccount.balance.toFixed(2)}</p>}
      </div>

      <div>
        <Label htmlFor="transferDate" className="text-gray-700">Transfer Date</Label>
        <DatePicker selected={transferDate} onSelect={setTransferDate} className="w-full bg-white" icon={<CalendarDays className="mr-2 h-4 w-4 text-gray-500" />} />
      </div>

      <div>
        <Label htmlFor="description" className="text-gray-700">Description (Optional)</Label>
        <Textarea id="description" placeholder="Add a note about this transfer" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-white"/>
      </div>
      
      <div className="flex items-center space-x-6 pt-2"> {/* Increased spacing */}
        <div className="flex items-center space-x-2">
          <Switch id="recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
          <Label htmlFor="recurring" className="font-normal text-gray-700">Make this a recurring transfer</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="saveTemplate" checked={saveAsTemplate} onCheckedChange={(checked) => setSaveAsTemplate(checked as boolean)} />
          <Label htmlFor="saveTemplate" className="font-normal text-gray-700">Save as template</Label>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-800 space-y-1 border border-blue-200">
        <p className="font-semibold">Transfer Information</p>
        <ul className="list-disc list-inside text-xs marker:text-blue-600">
            <li>Internal transfers between your accounts are free of charge.</li>
            <li>Transfers are typically processed immediately during business hours.</li>
            <li>External transfers may take 1-3 business days to complete.</li>
            <li>Your transaction will be secured with two-factor authentication.</li>
        </ul>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={onContinue} className="bg-blue-600 hover:bg-blue-700 text-white">
          Continue to Review <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TransferFormDetails;
