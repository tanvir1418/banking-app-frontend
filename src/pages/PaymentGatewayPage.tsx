
import React, { useState } from 'react';
import SidebarNav from '@/components/dashboard/SidebarNav';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ReceiptText, Smartphone, Wifi, Shield, Search, CreditCard as CreditCardIcon, ArrowRight } from 'lucide-react'; // Visa replaced by CreditCardIcon

const billCategories = [
  { name: 'Utility Bills', icon: ReceiptText, action: () => console.log('Pay Utility Bills') },
  { name: 'Mobile Recharge', icon: Smartphone, action: () => console.log('Recharge Mobile') },
  { name: 'Internet Bills', icon: Wifi, action: () => console.log('Pay Internet Bills') },
  { name: 'Insurance', icon: Shield, action: () => console.log('Pay Insurance') },
];

const upcomingBillsData = [
  { id: 'bill1', name: 'Electricity Bill', due: 'in 3 days', amount: 78.45, providerLogo: '/placeholder.svg' },
  { id: 'bill2', name: 'Water Bill', due: 'Next week', amount: 42.20, providerLogo: '/placeholder.svg' },
  { id: 'bill3', name: 'Internet Bill', due: 'in 10 days', amount: 59.99, providerLogo: '/placeholder.svg' },
];

const recentTransactionsData = [
    { id: 'txn1', description: 'Pacific Gas & Electric', date: 'May 2, 2025', category: 'Utility', amount: -78.45, status: 'Completed' },
    { id: 'txn2', description: 'Comcast Xfinity', date: 'April 28, 2025', category: 'Internet', amount: -59.99, status: 'Completed' },
    { id: 'txn3', description: 'State Farm Insurance', date: 'April 15, 2025', category: 'Insurance', amount: -128.75, status: 'Completed' },
    { id: 'txn4', description: 'City Water Department', date: 'April 10, 2025', category: 'Utility', amount: -42.20, status: 'Completed' },
];

const checkingAccounts = [
    { id: 'chk1', name: 'Checking Account **** 5678', balance: 12458.96 },
    { id: 'chk2', name: 'Savings Account **** 1234', balance: 5860.32 },
];


const PaymentGatewayPage: React.FC = () => {
  const [paymentAmount, setPaymentAmount] = useState<string>('35.00'); // Default based on image
  const [payFullAmount, setPayFullAmount] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<string>('bank');
  const [selectedCheckingAccount, setSelectedCheckingAccount] = useState<string>(checkingAccounts[0].id);
  const [setupAutomaticPayments, setSetupAutomaticPayments] = useState<boolean>(true);
  
  const handlePayFullAmountChange = (checked: boolean) => {
    setPayFullAmount(checked);
    if (checked) {
        // Assuming some logic to fetch/set full amount, placeholder for now
        setPaymentAmount('35.00'); // Reset to example full amount
    }
  };


  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarNav />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8">
          <section>
            <h1 className="text-3xl font-semibold text-gray-800">Payment Gateway</h1>
            <p className="text-gray-600">Manage your bills and credit card payments in one place</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bill Payments */}
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl text-gray-800">Bill Payments</CardTitle>
                  <Button variant="link" className="text-sm text-blue-600 p-0 h-auto">View All</Button>
                </CardHeader>
                <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {billCategories.map(category => (
                    <Button key={category.name} variant="outline" className="flex flex-col items-center justify-center h-28 text-gray-700 hover:bg-blue-50 hover:border-blue-300" onClick={category.action}>
                      <category.icon className="h-8 w-8 mb-2 text-blue-600" />
                      <span className="text-xs text-center">{category.name}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Bills */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Upcoming Bills</CardTitle>
                  {/* Add View All if needed */}
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingBillsData.map(bill => (
                    <div key={bill.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                      <div className="flex items-center">
                        {/* <img src={bill.providerLogo} alt={bill.name} className="h-8 w-8 mr-3 rounded-full" /> */}
                        <div>
                          <p className="font-medium text-gray-800">{bill.name}</p>
                          <p className="text-xs text-gray-500">Due {bill.due}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">${bill.amount.toFixed(2)}</p>
                        <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto text-xs">Pay Now</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Add New Bill */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Add New Bill</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center space-x-3">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input placeholder="Search for a biller (e.g., PG&E, Netflix)" className="pl-10"/>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add Bill</Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Credit Card Payments */}
            <div className="lg:col-span-1">
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl text-gray-800">Credit Card Payments</CardTitle>
                  <Button variant="link" className="text-sm text-blue-600 p-0 h-auto">Manage Cards</Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Credit Card Visual */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-medium">Credit</span>
                        <CreditCardIcon className="h-6 w-6 opacity-75" /> {/* Using generic CC icon */}
                    </div>
                    <p className="text-xl font-mono tracking-wider mb-1">**** **** **** 4587</p>
                    <div className="flex justify-between items-end text-xs">
                        <div>
                            <p className="opacity-75">Card Holder</p>
                            <p>John Doe</p>
                        </div>
                        <div>
                            <p className="opacity-75">Expires</p>
                            <p>05/28</p>
                        </div>
                    </div>
                  </div>

                  {/* Payment Form */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <Label htmlFor="paymentAmount" className="text-gray-700">Payment Amount</Label>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="payFullAmount" checked={payFullAmount} onCheckedChange={handlePayFullAmountChange} />
                            <Label htmlFor="payFullAmount" className="text-xs text-gray-600 font-normal">Pay full amount</Label>
                        </div>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <Input 
                            id="paymentAmount" 
                            type="number" 
                            value={paymentAmount} 
                            onChange={(e) => setPaymentAmount(e.target.value)} 
                            className="pl-7"
                            disabled={payFullAmount}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Minimum payment: $35.00</span>
                        <span>Due date: May 15, 2025</span>
                      </div>
                    </div>

                    <div>
                        <Label className="text-gray-700 mb-1 block">Payment Method</Label>
                        <RadioGroup defaultValue="bank" value={paymentMethod} onValueChange={setPaymentMethod} className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bank" id="bankAccount" />
                                <Label htmlFor="bankAccount" className="font-normal text-gray-700">Bank Account</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="debit" id="debitCard" />
                                <Label htmlFor="debitCard" className="font-normal text-gray-700">Debit Card</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    
                    {paymentMethod === 'bank' && (
                        <div>
                            <Label htmlFor="checkingAccount" className="text-gray-700">Checking Account</Label>
                             <Select value={selectedCheckingAccount} onValueChange={setSelectedCheckingAccount}>
                                <SelectTrigger id="checkingAccount">
                                    <SelectValue placeholder="Select account" />
                                </SelectTrigger>
                                <SelectContent>
                                    {checkingAccounts.map(acc => (
                                        <SelectItem key={acc.id} value={acc.id}>
                                            {acc.name} (${acc.balance.toFixed(2)})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <div className="flex items-center space-x-2 pt-2">
                        <Checkbox id="autoPay" checked={setupAutomaticPayments} onCheckedChange={(checked) => setSetupAutomaticPayments(checked as boolean)}/>
                        <Label htmlFor="autoPay" className="font-normal text-gray-700">Set up automatic payments</Label>
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Pay Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

           {/* Recent Transactions */}
          <Card className="bg-white shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl text-gray-800">Recent Transactions</CardTitle>
              <Button variant="link" className="text-sm text-blue-600 p-0 h-auto">View All</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-600">TRANSACTION</TableHead>
                    <TableHead className="text-gray-600">DATE</TableHead>
                    <TableHead className="text-gray-600">CATEGORY</TableHead>
                    <TableHead className="text-gray-600 text-right">AMOUNT</TableHead>
                    <TableHead className="text-gray-600 text-center">STATUS</TableHead>
                    <TableHead className="text-gray-600 text-right">ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactionsData.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-medium text-gray-800">{tx.description}</TableCell>
                      <TableCell className="text-gray-600">{tx.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 text-xs rounded-full font-medium
                          ${tx.category === 'Utility' ? 'bg-yellow-100 text-yellow-700' :
                            tx.category === 'Internet' ? 'bg-purple-100 text-purple-700' :
                            tx.category === 'Insurance' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                          {tx.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium text-gray-800">${Math.abs(tx.amount).toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${tx.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {tx.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700 text-xs">Receipt</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

        </main>
        <DashboardFooter />
      </div>
    </div>
  );
};

export default PaymentGatewayPage;
