import React, { useState } from 'react';
import SidebarNav from '@/components/dashboard/SidebarNav';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardFooter from '@/components/dashboard/DashboardFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, CalendarDays, Check } from 'lucide-react';
import { Switch } from "@/components/ui/switch"; // Import Switch

// Mock data for selects and table
const accounts = [
  { id: 'acc1', name: 'Checking Account **** 4582', balance: 12458.35, currency: 'USD' },
  { id: 'acc2', name: 'Savings Account **** 7291', balance: 45892.35, currency: 'USD' },
  { id: 'acc3', name: 'Business Account **** 3012', balance: 7800.00, currency: 'USD' },
];

const recentTransfersData = [
  { date: 'May 05, 2025', from: 'Checking (*4582)', to: 'Savings (*7823)', amount: '$1,500.00', status: 'Completed', action: 'Repeat' },
  { date: 'Apr 28, 2025', from: 'Checking (*4582)', to: 'Savings (*7823)', amount: '$2,000.00', status: 'Completed', action: 'Repeat' },
  { date: 'Apr 15, 2025', from: 'Savings (*7823)', to: 'Checking (*4582)', amount: '$750.00', status: 'Completed', action: 'Repeat' },
];

// Helper icon, can be moved or replaced
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Check {...props} />
);

const FundTransferPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [fromAccount, setFromAccount] = useState<string | undefined>(accounts[0]?.id);
  const [toAccount, setToAccount] = useState<string | undefined>();
  const [amount, setAmount] = useState<string>('');
  const [transferDate, setTransferDate] = useState<Date | undefined>(new Date());
  const [description, setDescription] = useState<string>('');
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [saveAsTemplate, setSaveAsTemplate] = useState<boolean>(false);

  const selectedFromAccount = accounts.find(acc => acc.id === fromAccount);
  const selectedToAccount = accounts.find(acc => acc.id === toAccount);

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Submitting transfer:', { fromAccount, toAccount, amount, transferDate, description, isRecurring, saveAsTemplate });
      alert('Transfer submitted!');
       // Optionally reset form or navigate
      setCurrentStep(1); // Go back to step 1 for a new transfer
      setFromAccount(accounts[0]?.id);
      setToAccount(undefined);
      setAmount('');
      setTransferDate(new Date());
      setDescription('');
      setIsRecurring(false);
      setSaveAsTemplate(false);
    }
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
            <TabsList className="grid w-full grid-cols-2 md:w-1/3 bg-gray-100 p-1 rounded-md">
              <TabsTrigger value="internal" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">Internal Transfer</TabsTrigger>
              <TabsTrigger value="external" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">External Transfer</TabsTrigger>
            </TabsList>
            <TabsContent value="internal">
              {/* Adjusted max-width here for a narrower form area */}
              <Card className="shadow-lg mt-4 bg-white md:max-w-3xl lg:max-w-4xl mx-auto">
                <CardHeader>
                  <div className="flex items-center w-full mb-6">
                    {[1, 2, 3].map(step => (
                      <React.Fragment key={step}>
                        <div className="flex flex-col items-center text-center w-1/3">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 text-sm font-medium ${currentStep >= step ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-500'}`}>
                            {currentStep > step ? <CheckIcon className="h-5 w-5" strokeWidth={3} /> : step}
                          </div>
                          <p className={`mt-2 text-xs sm:text-sm ${currentStep >= step ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                            {step === 1 && 'Details'}
                            {step === 2 && 'Review'}
                            {step === 3 && 'Confirm'}
                          </p>
                        </div>
                        {step < 3 && <div className={`flex-auto border-t-2 mx-2 sm:mx-4 ${currentStep > step ? 'border-blue-600' : 'border-gray-300'}`}></div>}
                      </React.Fragment>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="fromAccount" className="text-gray-700">From Account</Label>
                          <Select value={fromAccount} onValueChange={setFromAccount}>
                            <SelectTrigger id="fromAccount" className="bg-white">
                              <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                            <SelectContent>
                              {accounts.map(acc => (
                                <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {selectedFromAccount && (
                            <div className="bg-slate-100 border border-slate-200 rounded-md p-3 text-xs text-gray-600 mt-2 space-y-1">
                              <div className="flex justify-between"><span>Available Balance:</span> <span className="font-medium">${selectedFromAccount.balance.toFixed(2)}</span></div>
                              <div className="flex justify-between"><span>Daily Transfer Limit:</span> <span className="font-medium">$25,000.00</span></div>
                            </div>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="toAccount" className="text-gray-700">To Account</Label>
                          <Select value={toAccount} onValueChange={setToAccount}>
                            <SelectTrigger id="toAccount" className="bg-white">
                              <SelectValue placeholder="Select account" />
                            </SelectTrigger>
                            <SelectContent>
                              {accounts.filter(acc => acc.id !== fromAccount).map(acc => (
                                <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                           {selectedToAccount && (
                             <div className="bg-slate-100 border border-slate-200 rounded-md p-3 text-xs text-gray-600 mt-2 space-y-1">
                                <div className="flex justify-between"><span>Current Balance:</span> <span className="font-medium">${selectedToAccount.balance.toFixed(2)}</span></div>
                                <div className="flex justify-between"><span>Interest Rate:</span> <span className="font-medium">1.25% APY</span></div>
                             </div>
                           )}
                        </div>
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
                      
                      <div className="flex items-center space-x-4 pt-2"> {/* Changed space-x-2 to space-x-4 for more separation */}
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
                        <Button onClick={handleContinue} className="bg-blue-600 hover:bg-blue-700 text-white">
                          Continue to Review <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <CardTitle className="text-xl mb-4 font-semibold text-gray-800">Review Transfer Details</CardTitle>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p><span className="font-medium">From:</span> {accounts.find(a => a.id === fromAccount)?.name}</p>
                        <p><span className="font-medium">To:</span> {accounts.find(a => a.id === toAccount)?.name}</p>
                        <p><span className="font-medium">Amount:</span> ${parseFloat(amount || "0").toFixed(2)}</p>
                        <p><span className="font-medium">Date:</span> {transferDate?.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><span className="font-medium">Description:</span> {description || 'N/A'}</p>
                        {isRecurring && <p><span className="font-medium">Recurring:</span> Yes</p>}
                        {saveAsTemplate && <p><span className="font-medium">Save as Template:</span> Yes</p>}
                      </div>
                      <div className="flex justify-end space-x-3 pt-6">
                        <Button variant="outline" onClick={() => setCurrentStep(1)}>Back</Button>
                        <Button onClick={handleContinue} className="bg-blue-600 hover:bg-blue-700 text-white">Confirm Transfer</Button>
                      </div>
                    </div>
                  )}
                  {currentStep === 3 && (
                     <div className="text-center space-y-4 py-8">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                           <CheckIcon className="h-8 w-8 text-green-600" strokeWidth={3}/>
                        </div>
                        <CardTitle className="text-xl font-semibold text-gray-800">Transfer Confirmed!</CardTitle>
                        <p className="text-sm text-gray-600">Your transfer of <span className="font-semibold">${parseFloat(amount || "0").toFixed(2)}</span> from <span className="font-semibold">{accounts.find(a => a.id === fromAccount)?.name}</span> to <span className="font-semibold">{accounts.find(a => a.id === toAccount)?.name}</span> has been initiated.</p>
                        <p className="text-xs text-gray-500">Reference ID: TXN{Date.now()}</p>
                        <div className="flex justify-center space-x-3 pt-6">
                          <Button variant="outline" onClick={() => {/* TODO: View receipt */}}>View Receipt</Button>
                          <Button onClick={() => { setCurrentStep(1); setFromAccount(accounts[0]?.id); setToAccount(undefined); setAmount(''); setTransferDate(new Date()); setDescription(''); setIsRecurring(false); setSaveAsTemplate(false);}} className="bg-blue-600 hover:bg-blue-700 text-white">Make Another Transfer</Button>
                        </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="external">
                <Card className="shadow-lg mt-4 bg-white md:max-w-3xl lg:max-w-4xl mx-auto">
                    <CardHeader><CardTitle className="text-gray-800">External Transfers</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-gray-600">External transfer functionality coming soon. This section will allow you to send funds to accounts outside of this bank.</p>
                    </CardContent>
                </Card>
            </TabsContent>
          </Tabs>

          <Card className="shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-gray-800">Recent Transfers</CardTitle>
              <CardDescription className="text-gray-500">Overview of your recent internal fund movements.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-600">Date</TableHead>
                    <TableHead className="text-gray-600">From</TableHead>
                    <TableHead className="text-gray-600">To</TableHead>
                    <TableHead className="text-gray-600">Amount</TableHead>
                    <TableHead className="text-gray-600">Status</TableHead>
                    <TableHead className="text-gray-600">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransfersData.map((transfer, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-gray-700">{transfer.date}</TableCell>
                      <TableCell className="text-gray-700">{transfer.from}</TableCell>
                      <TableCell className="text-gray-700">{transfer.to}</TableCell>
                      <TableCell className="text-gray-700 font-medium">{transfer.amount}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${transfer.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {transfer.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-700 text-xs">{transfer.action}</Button>
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

export default FundTransferPage;
