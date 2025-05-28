
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
      // Here you would typically call an API to process the transfer
    }
  };

  const handleMakeAnotherTransfer = () => {
    setCurrentStep(1);
    resetForm();
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleViewReceipt = () => {
    console.log("View receipt clicked for TXN" + Date.now());
    // In a real app, this would navigate to a receipt page or show a modal
    alert("Receipt functionality not yet implemented.");
  };

  return (
    <Tabs defaultValue="internal" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-grid md:grid-cols-2 gap-2 md:max-w-xs mb-6">
        <TabsTrigger 
          value="internal" 
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md text-muted-foreground hover:text-primary px-4 py-2.5 text-sm font-medium rounded-md transition-all"
        >
          Internal Transfer
        </TabsTrigger>
        <TabsTrigger 
          value="external" 
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md text-muted-foreground hover:text-primary px-4 py-2.5 text-sm font-medium rounded-md transition-all"
        >
          External Transfer
        </TabsTrigger>
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
