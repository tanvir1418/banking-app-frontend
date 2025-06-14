
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import jsPDF from 'jspdf';

interface Transaction {
  id: string;
  description: string;
  date: string;
  category: string;
  amount: number;
  status: string;
}

interface ReceiptModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ transaction, isOpen, onClose }) => {
  if (!transaction) return null;

  const handleDownloadReceipt = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('Payment Receipt', 20, 30);
    
    // Receipt details
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Receipt ID: ${transaction.id}`, 20, 50);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 60);
    
    // Transaction details
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text('Transaction Details', 20, 80);
    
    doc.setFontSize(10);
    doc.text('Description:', 20, 95);
    doc.text(transaction.description, 60, 95);
    
    doc.text('Date:', 20, 105);
    doc.text(transaction.date, 60, 105);
    
    doc.text('Category:', 20, 115);
    doc.text(transaction.category, 60, 115);
    
    doc.text('Amount:', 20, 125);
    doc.setTextColor(220, 53, 69);
    doc.text(`$${Math.abs(transaction.amount).toFixed(2)}`, 60, 125);
    
    doc.setTextColor(40, 40, 40);
    doc.text('Status:', 20, 135);
    doc.text(transaction.status, 60, 135);
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text('Thank you for using our payment gateway service.', 20, 160);
    doc.text('For questions, please contact our support team.', 20, 170);
    
    // Save the PDF
    doc.save(`receipt-${transaction.id}.pdf`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Payment Receipt
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="border-b pb-4">
            <p className="text-sm text-muted-foreground">Receipt ID</p>
            <p className="font-mono text-sm">{transaction.id}</p>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="font-medium">{transaction.description}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p>{transaction.date}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <Badge variant="outline" className="text-xs">
                {transaction.category}
              </Badge>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-lg font-semibold text-red-600">
                ${Math.abs(transaction.amount).toFixed(2)}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge className="bg-green-100 text-green-800">
                {transaction.status}
              </Badge>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <Button 
              onClick={handleDownloadReceipt}
              className="w-full flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download Receipt
            </Button>
          </div>
          
          <div className="text-center text-xs text-muted-foreground">
            <p>Thank you for using our payment gateway service.</p>
            <p>Generated on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptModal;
