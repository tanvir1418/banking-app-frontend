
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CreditCardDisplay from './CreditCardDisplay'; // Import the new display component

interface CheckingAccount {
    id: string;
    name: string;
    balance: number;
}

interface CreditCardPaymentFormProps {
    paymentAmount: string;
    setPaymentAmount: (value: string) => void;
    payFullAmount: boolean;
    handlePayFullAmountChange: (checked: boolean) => void;
    paymentMethod: string;
    setPaymentMethod: (value: string) => void;
    selectedCheckingAccount: string;
    setSelectedCheckingAccount: (value: string) => void;
    checkingAccounts: CheckingAccount[];
    setupAutomaticPayments: boolean;
    setSetupAutomaticPayments: (checked: boolean) => void;
    onPayNow: () => void; // Added onPayNow prop
}

const CreditCardPaymentForm: React.FC<CreditCardPaymentFormProps> = ({
    paymentAmount, setPaymentAmount, payFullAmount, handlePayFullAmountChange,
    paymentMethod, setPaymentMethod, selectedCheckingAccount, setSelectedCheckingAccount,
    checkingAccounts, setupAutomaticPayments, setSetupAutomaticPayments, onPayNow
}) => {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-4"> {/* Adjusted padding */}
        <CardTitle className="text-xl text-gray-800">Credit Card Payments</CardTitle>
        <Button variant="link" className="text-sm text-blue-600 p-0 h-auto">Manage Cards</Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <CreditCardDisplay 
            lastFourDigits="4587"
            cardHolderName="John Doe"
            expiryDate="05/28"
        />

        <div className="space-y-4 pt-2"> {/* Added pt-2 */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="paymentAmount" className="text-gray-700 font-medium">Payment Amount</Label> {/* Added font-medium */}
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
                  className="pl-7 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={payFullAmount}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1.5"> {/* Added mt-1.5 */}
              <span>Minimum payment: $35.00</span>
              <span>Due date: May 15, 2025</span>
            </div>
          </div>

          <div>
              <Label className="text-gray-700 mb-2 block font-medium">Payment Method</Label> {/* Added mb-2, font-medium */}
              <RadioGroup defaultValue="bank" value={paymentMethod} onValueChange={setPaymentMethod} className="flex space-x-6"> {/* Increased space-x */}
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
                  <Label htmlFor="checkingAccount" className="text-gray-700 font-medium">Checking Account</Label> {/* Added font-medium */}
                   <Select value={selectedCheckingAccount} onValueChange={setSelectedCheckingAccount}>
                      <SelectTrigger id="checkingAccount" className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
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

          <div className="flex items-center space-x-2 pt-3"> {/* Added pt-3 */}
              <Checkbox id="autoPay" checked={setupAutomaticPayments} onCheckedChange={setSetupAutomaticPayments}/>
              <Label htmlFor="autoPay" className="font-normal text-gray-700">Set up automatic payments</Label>
          </div>
          
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-semibold" onClick={onPayNow}> {/* Increased py, text-base, font-semibold */}
              Pay Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditCardPaymentForm;
