
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import TransferStepper from './TransferStepper';
import TransferFormDetails from './TransferFormDetails';
import TransferReview from './TransferReview';
import TransferConfirmation from './TransferConfirmation';
import { Account } from './AccountSelector';

interface TransferFormContainerProps {
  currentStep: number;
  fromAccount?: string;
  toAccount?: string;
  amount: string;
  transferDate?: Date;
  description: string;
  isRecurring: boolean;
  saveAsTemplate: boolean;
  accounts: Account[];
  selectedFromAccount?: Account;
  selectedToAccount?: Account;
  setFromAccount: (value: string | undefined) => void;
  setToAccount: (value: string | undefined) => void;
  setAmount: (value: string) => void;
  setTransferDate: (date?: Date) => void;
  setDescription: (value: string) => void;
  setIsRecurring: (value: boolean) => void;
  setSaveAsTemplate: (value: boolean) => void;
  handleContinue: () => void;
  handleViewReceipt: () => void;
  handleMakeAnotherTransfer: () => void;
  onBack?: () => void;
}

const TransferFormContainer: React.FC<TransferFormContainerProps> = ({
  currentStep,
  fromAccount,
  toAccount,
  amount,
  transferDate,
  description,
  isRecurring,
  saveAsTemplate,
  accounts,
  selectedFromAccount,
  selectedToAccount,
  setFromAccount,
  setToAccount,
  setAmount,
  setTransferDate,
  setDescription,
  setIsRecurring,
  setSaveAsTemplate,
  handleContinue,
  handleViewReceipt,
  handleMakeAnotherTransfer,
  onBack,
}) => {
  return (
    <Card className="shadow-lg mt-6 bg-card md:max-w-3xl lg:max-w-4xl mx-auto">
      <CardHeader>
        <TransferStepper currentStep={currentStep} />
      </CardHeader>
      <CardContent className="px-4 md:px-6 pb-6">
        {currentStep === 1 && (
          <TransferFormDetails
            fromAccount={fromAccount}
            setFromAccount={setFromAccount}
            toAccount={toAccount}
            setToAccount={setToAccount}
            amount={amount}
            setAmount={setAmount}
            transferDate={transferDate}
            setTransferDate={setTransferDate}
            description={description}
            setDescription={setDescription}
            isRecurring={isRecurring}
            setIsRecurring={setIsRecurring}
            saveAsTemplate={saveAsTemplate}
            setSaveAsTemplate={setSaveAsTemplate}
            accounts={accounts}
            selectedFromAccount={selectedFromAccount}
            selectedToAccount={selectedToAccount}
            onContinue={handleContinue}
          />
        )}
        {currentStep === 2 && (
          <TransferReview
            fromAccount={fromAccount}
            toAccount={toAccount}
            amount={amount}
            transferDate={transferDate}
            description={description}
            isRecurring={isRecurring}
            saveAsTemplate={saveAsTemplate}
            accounts={accounts}
            onBack={() => onBack && onBack()}
            onConfirm={handleContinue}
          />
        )}
        {currentStep === 3 && (
          <TransferConfirmation
            amount={amount}
            fromAccount={fromAccount}
            toAccount={toAccount}
            accounts={accounts}
            onViewReceipt={handleViewReceipt}
            onMakeAnotherTransfer={handleMakeAnotherTransfer}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TransferFormContainer;
