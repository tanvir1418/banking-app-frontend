
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker'; // Assuming you have a DatePicker component from shadcn
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, CalendarDays } from 'lucide-react'; // Added ArrowRight

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

  // For DatePicker, ensure you have a working shadcn DatePicker component
  // If not, this part might need adjustment or a placeholder
  const DatePickerComponent = ({ date, onDateChange }: { date?: Date, onDateChange: (date?: Date) => void }) => (
    // This is a placeholder if you don't have a specific shadcn DatePicker wrapper ready.
    // Ideally, use the shadcn DatePicker with Popover like in their examples.
    <Input 
        type="date" 
        value={date ? date.toISOString().split('T')[0] : ''} 
        onChange={(e) => onDateChange(e.target.value ? new Date(e.target.value) : undefined)}
        className="w-full"
    />
    // Replace with actual <DatePicker selected={date} onSelect={onDateChange} ... /> if available
  );


  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle final submission
      console.log('Submitting transfer:', { fromAccount, toAccount, amount, transferDate, description, isRecurring, saveAsTemplate });
      alert('Transfer submitted!');
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8">
      <section>
        <h1 className="text-3xl font-semibold text-gray-800">Fund Transfer</h1>
        <p className="text-gray-600">Send money to your accounts or other recipients</p>
      </section>

      <Tabs defaultValue="internal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-1/3">
          <TabsTrigger value="internal">Internal Transfer</TabsTrigger>
          <TabsTrigger value="external">External Transfer</TabsTrigger>
        </TabsList>
        <TabsContent value="internal">
          <Card className="shadow-lg mt-4">
            <CardHeader>
              {/* Stepper */}
              <div className="flex items-center w-full mb-6">
                {[1, 2, 3].map(step => (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 ${currentStep >= step ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-500'}`}>
                        {currentStep > step ? <CheckIcon className="h-5 w-5" /> : step}
                      </div>
                      <p className={`mt-2 text-sm ${currentStep >= step ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                        {step === 1 && 'Details'}
                        {step === 2 && 'Review'}
                        {step === 3 && 'Confirm'}
                      </p>
                    </div>
                    {step < 3 && <div className={`flex-auto border-t-2 mx-4 ${currentStep > step ? 'border-blue-600' : 'border-gray-300'}`}></div>}
                  </React.Fragment>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fromAccount">From Account</Label>
                      <Select value={fromAccount} onValueChange={setFromAccount}>
                        <SelectTrigger id="fromAccount">
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map(acc => (
                            <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedFromAccount && (
                        <div className="text-xs text-gray-500 mt-1">
                          <p>Available Balance: ${selectedFromAccount.balance.toFixed(2)}</p>
                          <p>Daily Transfer Limit: $25,000.00</p> {/* Mock data */}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="toAccount">To Account</Label>
                      <Select value={toAccount} onValueChange={setToAccount}>
                        <SelectTrigger id="toAccount">
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.filter(acc => acc.id !== fromAccount).map(acc => (
                            <SelectItem key={acc.id} value={acc.id}>{acc.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                       {accounts.find(acc => acc.id === toAccount) && (
                         <div className="text-xs text-gray-500 mt-1">
                            <p>Current Balance: ${accounts.find(acc => acc.id === toAccount)?.balance.toFixed(2)}</p>
                            <p>Interest Rate: 1.25% APY</p> {/* Mock data */}
                         </div>
                       )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" placeholder="$ 0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    {selectedFromAccount && <p className="text-xs text-gray-500 mt-1">Available balance: ${selectedFromAccount.balance.toFixed(2)}</p>}
                  </div>

                  <div>
                    <Label htmlFor="transferDate">Transfer Date</Label>
                    {/* Replace with shadcn DatePicker component from /ui if you have one set up properly */}
                    {/* <DatePickerComponent date={transferDate} onDateChange={setTransferDate} /> */}
                    <DatePicker selected={transferDate} onSelect={setTransferDate} className="w-full" icon={<CalendarDays className="h-4 w-4 text-gray-500" />} />

                  </div>

                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea id="description" placeholder="Add a note about this transfer" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="recurring" checked={isRecurring} onCheckedChange={(checked) => setIsRecurring(checked as boolean)} />
                    <Label htmlFor="recurring" className="font-normal">Make this a recurring transfer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="saveTemplate" checked={saveAsTemplate} onCheckedChange={(checked) => setSaveAsTemplate(checked as boolean)} />
                    <Label htmlFor="saveTemplate" className="font-normal">Save as template</Label>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-700 space-y-1">
                    <p className="font-semibold">Transfer Information</p>
                    <ul className="list-disc list-inside text-xs">
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
                <div>
                  <CardTitle className="text-lg mb-4">Review Transfer Details</CardTitle>
                  {/* Add review details here */}
                  <p>From: {accounts.find(a => a.id === fromAccount)?.name}</p>
                  <p>To: {accounts.find(a => a.id === toAccount)?.name}</p>
                  <p>Amount: ${parseFloat(amount).toFixed(2)}</p>
                  <p>Date: {transferDate?.toLocaleDateString()}</p>
                  <p>Description: {description || 'N/A'}</p>
                  <div className="flex justify-end space-x-3 pt-6">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>Back</Button>
                    <Button onClick={handleContinue} className="bg-blue-600 hover:bg-blue-700 text-white">Confirm Transfer</Button>
                  </div>
                </div>
              )}
              {currentStep === 3 && (
                <div>
                  <CardTitle className="text-lg mb-4">Transfer Confirmed!</CardTitle>
                  {/* Add confirmation details here */}
                  <p>Your transfer of ${parseFloat(amount).toFixed(2)} from {accounts.find(a => a.id === fromAccount)?.name} to {accounts.find(a => a.id === toAccount)?.name} has been initiated.</p>
                  <div className="flex justify-end space-x-3 pt-6">
                    <Button onClick={() => { setCurrentStep(1); /* Reset form potentially */ }}>Make Another Transfer</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="external">
            <Card className="shadow-lg mt-4">
                <CardHeader><CardTitle>External Transfers</CardTitle></CardHeader>
                <CardContent>
                    <p>External transfer functionality coming soon.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Recent Transfers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransfersData.map((transfer, index) => (
                <TableRow key={index}>
                  <TableCell>{transfer.date}</TableCell>
                  <TableCell>{transfer.from}</TableCell>
                  <TableCell>{transfer.to}</TableCell>
                  <TableCell>{transfer.amount}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${transfer.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {transfer.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="link" className="p-0 h-auto text-blue-600">{transfer.action}</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper icon, can be moved to a separate file or replaced with lucide-react if available
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);


export default FundTransferPage;
