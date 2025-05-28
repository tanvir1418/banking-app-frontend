import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import { QueryClient } from '@/contexts/QueryContext';
import Index from '@/pages/Index';
import AuthPage from '@/pages/AuthPage';
import DashboardPage from '@/pages/DashboardPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import NotFound from '@/pages/NotFound';
import AdminRoute from '@/components/AdminRoute';
import AdminDashboard from '@/pages/AdminDashboard';
import FundTransferPage from '@/pages/FundTransferPage';
import TransactionHistoryPage from '@/pages/TransactionHistoryPage';
import PaymentGatewayPage from '@/pages/PaymentGatewayPage';
import NotificationsPage from '@/pages/NotificationsPage';
import SettingsPage from '@/pages/SettingsPage';
import AdminUserManagement from '@/pages/AdminUserManagement';
import AdminAccountManagement from '@/pages/AdminAccountManagement';
import AdminSystemMonitoring from '@/pages/AdminSystemMonitoring';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="system" storageKey="banking-ui-theme">
        <QueryClient>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/transfer" element={<FundTransferPage />} />
                <Route path="/transactions" element={<TransactionHistoryPage />} />
                <Route path="/payments" element={<PaymentGatewayPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUserManagement />} />
                <Route path="/admin/accounts" element={<AdminAccountManagement />} />
                <Route path="/admin/monitoring" element={<AdminSystemMonitoring />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </QueryClient>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
