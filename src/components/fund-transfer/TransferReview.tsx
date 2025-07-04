
import React from 'react';
import { CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Account } from './AccountSelector';

interface TransferReviewProps {
  fromAccount?: string;
  toAccount?: string;
  amount: string;
  transferDate?: Date;
  description: string;
  isRecurring: boolean;
  saveAsTemplate: boolean;
  accounts: Account[];
  onBack: () => void;
  onConfirm: () => void;
}

const TransferReview: React.FC<TransferReviewProps> = ({
  fromAccount, toAccount, amount, transferDate, description,
  isRecurring, saveAsTemplate, accounts, onBack, onConfirm
}) => {
  const fromAccountName = accounts.find(a => a.id === fromAccount)?.name;
  const toAccountName = accounts.find(a => a.id === toAccount)?.name;

  return (
    <div className="space-y-6">
      <CardTitle className="text-xl mb-4 font-semibold text-card-foreground">Review Transfer Details</CardTitle>
      <div className="space-y-3 text-sm text-card-foreground p-4 border border-border rounded-md bg-muted/30">
        <div className="flex justify-between"><span className="font-medium">From:</span> <span>{fromAccountName || 'N/A'}</span></div>
        <div className="flex justify-between"><span className="font-medium">To:</span> <span>{toAccountName || 'N/A'}</span></div>
        <div className="flex justify-between"><span className="font-medium">Amount:</span> <span>${parseFloat(amount || "0").toFixed(2)}</span></div>
        <div className="flex justify-between"><span className="font-medium">Date:</span> <span>{transferDate?.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) || 'N/A'}</span></div>
        <div className="flex justify-between"><span className="font-medium">Description:</span> <span className="text-right">{description || 'N/A'}</span></div>
        {isRecurring && <div className="flex justify-between"><span className="font-medium">Recurring:</span> <span>Yes</span></div>}
        {saveAsTemplate && <div className="flex justify-between"><span className="font-medium">Save as Template:</span> <span>Yes</span></div>}
      </div>
      <div className="flex justify-end space-x-3 pt-6">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onConfirm} className="bg-primary hover:bg-primary/90 text-primary-foreground">Confirm Transfer</Button>
      </div>
    </div>
  );
};

export default TransferReview;
