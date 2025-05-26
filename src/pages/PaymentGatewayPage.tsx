
import React, { useState } from 'react';
import SidebarNav from '@/components/dashboard/SidebarNav';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import { ReceiptText, Smartphone, Wifi, Shield, Zap, Droplets, LucideIcon } from 'lucide-react'; // Added Zap, Droplets, LucideIcon

// New component imports
import BillCategoriesGrid from '@/components/payment-gateway/BillCategoriesGrid';
import UpcomingBillsList from '@/components/payment-gateway/UpcomingBillsList';
import AddNewBillerForm from '@/components/payment-gateway/AddNewBillerForm';
import CreditCardPaymentForm from '@/components/payment-gateway/CreditCardPaymentForm';
import RecentTransactionsTable from '@/components/payment-gateway/RecentTransactionsTable';

// Mock data (remains similar, but components will consume it)
const billCategories = [
  { name: 'Utility Bills', icon: ReceiptText, action: () => console.log('Pay Utility Bills') },
  { name: 'Mobile Recharge', icon: Smartphone, action: () => console.log('Recharge Mobile') },
  { name: 'Internet Bills', icon: Wifi, action: () => console.log('Pay Internet Bills') },
  { name: 'Insurance', icon: Shield, action: () => console.log('Pay Insurance') },
];

const upcomingBillsData = [
  { id: 'bill1', name: 'Electricity Bill', due: 'in 3 days', amount: 78.45, icon: Zap, providerLogo: '/placeholder.svg' }, // Added icon
  { id: 'bill2', name: 'Water Bill', due: 'Next week', amount: 42.20, icon: Droplets, providerLogo: '/placeholder.svg' }, // Added icon
  { id: 'bill3', name: 'Internet Bill', due: 'in 10 days', amount: 59.99, icon: Wifi, providerLogo: '/placeholder.svg' }, // Added icon
];

const recentTransactionsData = [
    { id: 'txn1', description: 'Pacific Gas & Electric', date: 'May 2, 2025', category: 'Utility', amount: -78.45, status: 'Completed', icon: Zap, logo: '/placeholder.svg' }, // Added icon
    { id: 'txn2', description: 'Comcast Xfinity', date: 'April 28, 2025', category: 'Internet', amount: -59.99, status: 'Completed', icon: Wifi, logo: '/placeholder.svg' }, // Added icon
    { id: 'txn3', description: 'State Farm Insurance', date: 'April 15, 2025', category: 'Insurance', amount: -128.75, status: 'Completed', icon: Shield, logo: '/placeholder.svg' }, // Added a new transaction with icon
    { id: 'txn4', description: 'City Water Department', date: 'April 10, 2025', category: 'Utility', amount: -42.20, status: 'Completed', icon: Droplets, logo: '/placeholder.svg' }, // Added a new transaction with icon
];

const checkingAccounts = [
    { id: 'chk1', name: 'Checking Account **** 5678', balance: 12458.96 },
    { id: 'chk2', name: 'Savings Account **** 1234', balance: 5860.32 },
];

const PaymentGatewayPage: React.FC = () => {
  const [paymentAmount, setPaymentAmount] = useState<string>('35.00');
  const [payFullAmount, setPayFullAmount] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<string>('bank');
  const [selectedCheckingAccount, setSelectedCheckingAccount] = useState<string>(checkingAccounts[0].id);
  const [setupAutomaticPayments, setSetupAutomaticPayments] = useState<boolean>(true);
  
  const handlePayFullAmountChange = (checked: boolean) => {
    setPayFullAmount(checked);
    if (checked) {
        setPaymentAmount('35.00'); // Reset to example full amount (replace with actual logic if available)
    }
  };

  const handlePayNow = () => {
    console.log("Pay Now Clicked:", {
        paymentAmount: payFullAmount ? 'Full Amount (e.g. 35.00)' : paymentAmount,
        paymentMethod,
        selectedCheckingAccount: paymentMethod === 'bank' ? selectedCheckingAccount : undefined,
        setupAutomaticPayments,
    });
    alert("Payment Submitted!"); // Placeholder for actual submission
  };

  return (
    <div className="flex min-h-screen bg-slate-100"> {/* Changed bg to slate-100 for slightly lighter background */}
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto space-y-8"> {/* Increased padding */}
          <section>
            <h1 className="text-3xl font-semibold text-gray-800">Payment Gateway</h1>
            <p className="text-gray-600 mt-1">Manage your bills and credit card payments in one place</p> {/* Added mt-1 */}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"> {/* Adjusted gap */}
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6 md:space-y-8"> {/* Adjusted space-y */}
              <BillCategoriesGrid categories={billCategories} />
              <UpcomingBillsList bills={upcomingBillsData} />
              <AddNewBillerForm />
            </div>

            {/* Right Column - Credit Card Payments */}
            <div className="lg:col-span-1">
              <CreditCardPaymentForm
                paymentAmount={paymentAmount}
                setPaymentAmount={setPaymentAmount}
                payFullAmount={payFullAmount}
                handlePayFullAmountChange={handlePayFullAmountChange}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                selectedCheckingAccount={selectedCheckingAccount}
                setSelectedCheckingAccount={setSelectedCheckingAccount}
                checkingAccounts={checkingAccounts}
                setupAutomaticPayments={setupAutomaticPayments}
                setSetupAutomaticPayments={setSetupAutomaticPayments}
                onPayNow={handlePayNow}
              />
            </div>
          </div>

          <RecentTransactionsTable transactions={recentTransactionsData} />
        </main>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default PaymentGatewayPage;
