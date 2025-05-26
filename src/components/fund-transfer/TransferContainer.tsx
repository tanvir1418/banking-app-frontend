
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExternalTransferContent from './ExternalTransferContent';
import TransferFormContainer from './TransferFormContainer';
import { Account } from './AccountSelector';
import { accountsData } from '@/data/accountsData';

const TransferContainer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [fromAccount, setFromAccount] = useState<string | undefined>(accountsData[0]?.id);
  const [toAccount, setToAccount] = useState<string | undefined>();
  const [amount, setAmount] = useState<string>('');
  const [transferDate, setTransferDate] = useState<Date | undefined>(new Date());
  const [description, setDescription] = useState<string>('');
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [saveAsTemplate, setSaveAsTemplate] = useState<boolean>(false);

  const selectedFromAccount = accountsData.find(acc => acc.id === fromAccount);
  const selectedToAccount = accountsData.find(acc => acc.id === toAccount);

  const resetForm = () => {
    setFromAccount(accountsData[0]?.id);
    setToAccount(undefined);
    setAmount('');
    setTransferDate(new Date());
    setDescription('');
    setIsRecurring(false);
    setSaveAsTemplate(false);
  };

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Submitting transfer:', { fromAccount, toAccount, amount, transferDate, description, isRecurring, saveAsTemplate });
    }
  };

  const handleMakeAnotherTransfer = () => {
    setCurrentStep(1);
    resetForm();
  };
  
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleViewReceipt = () => {
    console.log("View receipt clicked for TXN" + Date.now());
    alert("Receipt functionality not yet implemented.");
  };

  return (
    <Tabs defaultValue="internal" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-grid md:grid-cols-2 gap-1 bg-gray-200 p-1 rounded-lg md:max-w-sm">
        <TabsTrigger value="internal" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm px-4 py-2 text-sm font-medium">Internal Transfer</TabsTrigger>
        <TabsTrigger value="external" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm px-4 py-2 text-sm font-medium">External Transfer</TabsTrigger>
      </TabsList>
      <TabsContent value="internal">
        <TransferFormContainer
          currentStep={currentStep}
          fromAccount={fromAccount}
          toAccount={toAccount}
          amount={amount}
          transferDate={transferDate}
          description={description}
          isRecurring={isRecurring}
          saveAsTemplate={saveAsTemplate}
          accounts={accountsData}
          selectedFromAccount={selectedFromAccount}
          selectedToAccount={selectedToAccount}
          setFromAccount={setFromAccount}
          setToAccount={setToAccount}
          setAmount={setAmount}
          setTransferDate={setTransferDate}
          setDescription={setDescription}
          setIsRecurring={setIsRecurring}
          setSaveAsTemplate={setSaveAsTemplate}
          handleContinue={handleContinue}
          handleViewReceipt={handleViewReceipt}
          handleMakeAnotherTransfer={handleMakeAnotherTransfer}
          onBack={handleBack}
        />
      </TabsContent>
      <TabsContent value="external">
        <ExternalTransferContent />
      </TabsContent>
    </Tabs>
  );
};

export default TransferContainer;
