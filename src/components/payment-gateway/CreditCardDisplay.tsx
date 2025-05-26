
import React from 'react';
import { CreditCard as CreditCardIconLucide } from 'lucide-react'; // Renamed to avoid conflict

interface CreditCardDisplayProps {
  cardType?: string; // e.g. "Credit", "Visa"
  lastFourDigits: string;
  cardHolderName: string;
  expiryDate: string; // MM/YY
}

const CreditCardDisplay: React.FC<CreditCardDisplayProps> = ({
  cardType = "Credit",
  lastFourDigits,
  cardHolderName,
  expiryDate,
}) => {
  return (
    <div className="p-5 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-xl relative overflow-hidden"> {/* Increased padding, rounded-xl, shadow-xl */}
      {/* Background pattern (optional) */}
      <div className="absolute inset-0 opacity-10 mix-blend-overlay">
        {/* You can add an SVG pattern here if desired */}
      </div>
      <div className="flex justify-between items-start mb-6"> {/* Increased mb */}
          <span className="text-sm font-medium tracking-wide">{cardType}</span> {/* Added tracking-wide */}
          <CreditCardIconLucide className="h-7 w-7 opacity-80" /> {/* Increased size, opacity */}
      </div>
      <p className="text-2xl font-mono tracking-wider mb-4">**** **** **** {lastFourDigits}</p> {/* Increased size, mb */}
      <div className="flex justify-between items-end text-xs">
          <div>
              <p className="opacity-75 uppercase text-[0.65rem] tracking-wider">Card Holder</p> {/* Uppercase, smaller, tracking */}
              <p className="font-medium text-sm">{cardHolderName}</p> {/* font-medium, text-sm */}
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
