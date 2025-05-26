
import React from 'react';
import { Check } from 'lucide-react';

interface TransferStepperProps {
  currentStep: number;
}

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <Check {...props} />
);

const TransferStepper: React.FC<TransferStepperProps> = ({ currentStep }) => {
  return (
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
  );
};

export default TransferStepper;
