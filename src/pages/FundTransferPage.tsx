
import React, { useState } from 'react';
import SidebarNav from '@/components/dashboard/SidebarNav';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Landmark, Wallet, Check as CheckIconLucide } from 'lucide-react'; // Import Check as CheckIconLucide to avoid conflict

// New component imports
import TransferStepper from '@/components/fund-transfer/TransferStepper';
import TransferFormDetails from '@/components/fund-transfer/TransferFormDetails';
import TransferReview from '@/components/fund-transfer/TransferReview';
import TransferConfirmation from '@/components/fund-transfer/TransferConfirmation';
import RecentTransfersTable from '@/components/fund-transfer/RecentTransfersTable';
import { Account } from '@/components/fund-transfer/AccountSelector';

// Updated mock data for accounts with icons and interest rate
const accountsData: Account[] = [
  { id: 'acc1', name: 'Checking Account **** 4582', balance: 12458.35, currency: 'USD', icon: Landmark, interestRate: '0.10% APY' },
  { id: 'acc2', name: 'Savings Account **** 7291', balance: 45892.35, currency: 'USD', icon: Wallet, interestRate: '1.25% APY' },
  { id: 'acc3', name: 'Business Account **** 3012', balance: 7800.00, currency: 'USD', icon: Landmark, interestRate: '0.05% APY' },
];

const recentTransfersData = [
  { date: 'May 05, 2025', from: 'Checking (*4582)', to: 'Savings (*7823)', amount: '$1,500.00', status: 'Completed', action: 'Repeat' },
  { date: 'Apr 28, 2025', from: 'Checking (*4582)', to: 'Savings (*7823)', amount: '$2,000.00', status: 'Completed', action: 'Repeat' },
  { date: 'Apr 15, 2025', from: 'Savings (*7823)', to: 'Checking (*4582)', amount: '$750.00', status: 'Completed', action: 'Repeat' },
];

const FundTransferPage: React.FC = () => {
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
      // This is the old submit logic, now handled by TransferConfirmation's "Make Another Transfer"
      console.log('Submitting transfer:', { fromAccount, toAccount, amount, transferDate, description, isRecurring, saveAsTemplate });
      // alert('Transfer submitted!'); // Alert is disruptive, confirmation screen is better
      // setCurrentStep(1);
      // resetForm();
    }
  };

  const handleMakeAnotherTransfer = () => {
    setCurrentStep(1);
    resetForm();
  };
  
  const handleViewReceipt = () => {
    // TODO: Implement receipt viewing logic
    console.log("View receipt clicked for TXN" + Date.now());
    alert("Receipt functionality not yet implemented.");
  };


  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8">
          <section>
            <h1 className="text-3xl font-semibold text-gray-800">Fund Transfer</h1>
            <p className="text-gray-600">Send money to your accounts or other recipients</p>
          </section>

          <Tabs defaultValue="internal" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-grid md:grid-cols-2 gap-1 bg-gray-200 p-1 rounded-lg md:max-w-sm">
              <TabsTrigger value="internal" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm px-4 py-2 text-sm font-medium">Internal Transfer</TabsTrigger>
              <TabsTrigger value="external" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm px-4 py-2 text-sm font-medium">External Transfer</TabsTrigger>
            </TabsList>
            <TabsContent value="internal">
              <Card className="shadow-lg mt-6 bg-white md:max-w-3xl lg:max-w-4xl mx-auto"> {/* Increased mt-6 */}
                <CardHeader>
                  <TransferStepper currentStep={currentStep} />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-6"> {/* Added more padding */}
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
                      accounts={accountsData}
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
                      accounts={accountsData}
                      onBack={() => setCurrentStep(1)}
                      onConfirm={handleContinue}
                    />
                  )}
                  {currentStep === 3 && (
                    <TransferConfirmation
                      amount={amount}
                      fromAccount={fromAccount}
                      toAccount={toAccount}
                      accounts={accountsData}
                      onViewReceipt={handleViewReceipt}
                      onMakeAnotherTransfer={handleMakeAnotherTransfer}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="external">
                <Card className="shadow-lg mt-4 bg-white md:max-w-3xl lg:max-w-4xl mx-auto">
                    <CardHeader><CardTitle className="text-gray-800 text-xl">External Transfers</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-gray-600 text-sm">External transfer functionality coming soon. This section will allow you to send funds to accounts outside of this bank.</p>
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>

          <RecentTransfersTable transfers={recentTransfersData} />
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default FundTransferPage;
