
import React from 'react';
import { CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Account } from './AccountSelector';

interface TransferConfirmationProps {
  amount: string;
  fromAccount?: string;
  toAccount?: string;
  accounts: Account[];
  onViewReceipt: () => void;
  onMakeAnotherTransfer: () => void;
}

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Check {...props} />
);

const TransferConfirmation: React.FC<TransferConfirmationProps> = ({
  amount, fromAccount, toAccount, accounts, onViewReceipt, onMakeAnotherTransfer
}) => {
  const fromAccountName = accounts.find(a => a.id === fromAccount)?.name;
  const toAccountName = accounts.find(a => a.id === toAccount)?.name;

  return (
    <div className="text-center space-y-6 py-8"> {/* Increased spacing */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
           <CheckIcon className="h-8 w-8 text-green-600" strokeWidth={3}/>
        </div>
        <CardTitle className="text-2xl font-semibold text-gray-800">Transfer Confirmed!</CardTitle> {/* Larger title */}
        <p className="text-base text-gray-600 leading-relaxed"> {/* Increased text size and line height */}
            Your transfer of <span className="font-semibold">${parseFloat(amount || "0").toFixed(2)}</span> from <br className="sm:hidden"/> {/* Break line on small screens */}
            <span className="font-semibold">{fromAccountName || 'N/A'}</span> to <span className="font-semibold">{toAccountName || 'N/A'}</span> <br className="sm:hidden"/>
            has been initiated.
        </p>
        <p className="text-sm text-gray-500">Reference ID: TXN{Date.now()}</p> {/* Larger text */}
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-6"> {/* Responsive buttons */}
          <Button variant="outline" onClick={onViewReceipt} className="w-full sm:w-auto">View Receipt</Button>
          <Button onClick={onMakeAnotherTransfer} className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">Make Another Transfer</Button>
        </div>
    </div>
  );
};

export default TransferConfirmation;
