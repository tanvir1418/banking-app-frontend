
import React from 'react';
import { CreditCard as CreditCardIconLucide } from 'lucide-react';

interface CreditCardDisplayProps {
  cardType?: string;
  lastFourDigits: string;
  cardHolderName: string;
  expiryDate: string;
}

const CreditCardDisplay: React.FC<CreditCardDisplayProps> = ({
  cardType = "Credit",
  lastFourDigits,
  cardHolderName,
  expiryDate,
}) => {
  return (
    <div className="p-5 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 mix-blend-overlay">
        {/* Background pattern */}
      </div>
      <div className="flex justify-between items-start mb-6">
          <span className="text-sm font-medium tracking-wide">{cardType}</span>
          <CreditCardIconLucide className="h-7 w-7 opacity-80" />
      </div>
      <p className="text-2xl font-mono tracking-wider mb-4">**** **** **** {lastFourDigits}</p>
      <div className="flex justify-between items-end text-xs">
          <div>
              <p className="opacity-75 uppercase text-[0.65rem] tracking-wider">Card Holder</p>
              <p className="font-medium text-sm">{cardHolderName}</p>
          </div>
          <div>
              <p className="opacity-75 uppercase text-[0.65rem] tracking-wider">Expires</p>
              <p className="font-medium text-sm">{expiryDate}</p>
          </div>
      </div>
    </div>
  );
};

export default CreditCardDisplay;
