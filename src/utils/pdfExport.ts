
import jsPDF from 'jspdf';
import { ShoppingCart, Briefcase, Building, Utensils, Film, Fuel, Landmark } from 'lucide-react';

interface Transaction {
  id: string;
  description: string;
  details: string;
  date: string;
  time: string;
  category: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
}

// Mock transaction data (in a real app, this would come from your backend)
const mockTransactions: Transaction[] = [
  { id: '1', description: "Amazon.com", details: "Online Shopping", date: "May 6, 2025", time: "10:23 AM", category: "Shopping", amount: -128.50, status: "Completed" },
  { id: '2', description: "Acme Corp", details: "Salary Deposit", date: "May 5, 2025", time: "09:00 AM", category: "Income", amount: 3450.00, status: "Completed" },
  { id: '3', description: "Sunset Apartments", details: "Rent Payment", date: "May 3, 2025", time: "02:15 PM", category: "Housing", amount: -1850.00, status: "Completed" },
  { id: '4', description: "Bistro Cafe", details: "Dinner", date: "May 2, 2025", time: "07:45 PM", category: "Food", amount: -78.35, status: "Completed" },
  { id: '5', description: "Netflix", details: "Subscription", date: "May 1, 2025", time: "12:00 AM", category: "Entertainment", amount: -14.99, status: "Completed" },
  { id: '6', description: "Shell Gas Station", details: "Fuel", date: "April 30, 2025", time: "03:45 PM", category: "Transportation", amount: -65.20, status: "Completed" },
  { id: '7', description: "Savings Account", details: "Transfer", date: "April 28, 2025", time: "10:30 AM", category: "Transfer", amount: -500.00, status: "Completed" },
  { id: '8', description: "Freelance Work", details: "Project Payment", date: "April 25, 2025", time: "02:30 PM", category: "Income", amount: 1200.00, status: "Completed" },
  { id: '9', description: "Investment Return", details: "Dividend Payment", date: "April 22, 2025", time: "11:15 AM", category: "Income", amount: 350.00, status: "Completed" },
];

const filterTransactionsByType = (transactions: Transaction[], type: string): Transaction[] => {
  if (type === 'all') {
    return transactions;
  }
  
  switch (type) {
    case 'income':
      return transactions.filter(transaction => transaction.amount > 0);
    case 'expenses':
      return transactions.filter(transaction => transaction.amount < 0 && transaction.category !== 'Transfer');
    case 'transfers':
      return transactions.filter(transaction => transaction.category === 'Transfer');
    default:
      return transactions;
  }
};

const getTypeDisplayName = (type: string): string => {
  switch (type) {
    case 'income':
      return 'Income';
    case 'expenses':
      return 'Expenses';
    case 'transfers':
      return 'Transfers';
    default:
      return 'All Transactions';
  }
};

export const exportTransactionsToPDF = (fromDate?: Date, toDate?: Date, transactionType: string = 'all') => {
  const doc = new jsPDF();
  
  // Filter transactions by type
  const filteredTransactions = filterTransactionsByType(mockTransactions, transactionType);
  const typeDisplayName = getTypeDisplayName(transactionType);
  
  // Add header
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 40);
  doc.text(`${typeDisplayName} Report`, 20, 30);
  
  // Add date range
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  const dateRange = `${fromDate?.toLocaleDateString() || 'Start'} - ${toDate?.toLocaleDateString() || 'End'}`;
  doc.text(`Period: ${dateRange}`, 20, 45);
  
  // Add generation date
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 55);
  
  // Add filter info
  doc.text(`Filter: ${typeDisplayName}`, 20, 65);
  
  // Table headers
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  doc.text('Date', 20, 80);
  doc.text('Description', 50, 80);
  doc.text('Category', 100, 80);
  doc.text('Amount', 140, 80);
  doc.text('Status', 170, 80);
  
  // Add line under headers
  doc.line(20, 83, 190, 83);
  
  // Add transaction data
  let yPosition = 93;
  let totalIncome = 0;
  let totalExpenses = 0;
  
  if (filteredTransactions.length === 0) {
    doc.setFontSize(12);
    doc.setTextColor(120, 120, 120);
    doc.text(`No ${typeDisplayName.toLowerCase()} found for the selected period.`, 20, yPosition);
  } else {
    filteredTransactions.forEach((transaction, index) => {
      if (yPosition > 270) { // Add new page if needed
        doc.addPage();
        yPosition = 30;
      }
      
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      
      // Date
      doc.text(transaction.date, 20, yPosition);
      
      // Description
      doc.text(transaction.description, 50, yPosition);
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(transaction.details, 50, yPosition + 3);
      
      // Category
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      doc.text(transaction.category, 100, yPosition);
      
      // Amount
      const amountColor = transaction.amount < 0 ? [220, 53, 69] : [40, 167, 69];
      doc.setTextColor(amountColor[0], amountColor[1], amountColor[2]);
      const amountText = `${transaction.amount < 0 ? '-' : '+'}$${Math.abs(transaction.amount).toFixed(2)}`;
      doc.text(amountText, 140, yPosition);
      
      // Status
      doc.setTextColor(60, 60, 60);
      doc.text(transaction.status, 170, yPosition);
      
      // Update totals
      if (transaction.amount > 0) {
        totalIncome += transaction.amount;
      } else {
        totalExpenses += Math.abs(transaction.amount);
      }
      
      yPosition += 12;
    });
  }
  
  // Add summary section
  if (filteredTransactions.length > 0) {
    yPosition += 10;
    doc.line(20, yPosition, 190, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text(`${typeDisplayName} Summary`, 20, yPosition);
    
    yPosition += 15;
    doc.setFontSize(10);
    
    // Show relevant totals based on transaction type
    if (transactionType === 'all') {
      doc.setTextColor(40, 167, 69);
      doc.text(`Total Income: +$${totalIncome.toFixed(2)}`, 20, yPosition);
      
      yPosition += 8;
      doc.setTextColor(220, 53, 69);
      doc.text(`Total Expenses: -$${totalExpenses.toFixed(2)}`, 20, yPosition);
      
      yPosition += 8;
      doc.setTextColor(40, 40, 40);
      const netAmount = totalIncome - totalExpenses;
      doc.text(`Net Amount: ${netAmount >= 0 ? '+' : ''}$${netAmount.toFixed(2)}`, 20, yPosition);
    } else if (transactionType === 'income') {
      doc.setTextColor(40, 167, 69);
      doc.text(`Total Income: +$${totalIncome.toFixed(2)}`, 20, yPosition);
    } else if (transactionType === 'expenses') {
      doc.setTextColor(220, 53, 69);
      doc.text(`Total Expenses: -$${totalExpenses.toFixed(2)}`, 20, yPosition);
    } else if (transactionType === 'transfers') {
      doc.setTextColor(40, 40, 40);
      const totalTransfers = filteredTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
      doc.text(`Total Transfers: $${totalTransfers.toFixed(2)}`, 20, yPosition);
    }
  }
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(`Page ${i} of ${pageCount}`, 170, 285);
    doc.text('Generated by Banking Dashboard', 20, 285);
  }
  
  // Save the PDF with descriptive filename
  const typeForFilename = transactionType === 'all' ? 'all-transactions' : transactionType;
  const fileName = `${typeForFilename}-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
