import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import { QueryClient } from '@/contexts/QueryContext';

import ProtectedRoute from '@/components/ProtectedRoute';
import RedirectIfAuthenticated from '@/components/RedirectIfAuthenticated';
import AdminRoute from '@/components/AdminRoute';

import Index from '@/pages/Index';
import AuthPage from '@/pages/AuthPage';
import DashboardPage from '@/pages/DashboardPage';
import DashboardAccountsPage from '@/pages/DashboardAccountsPage';
import DashboardSupportPage from '@/pages/DashboardSupportPage';

import NotFound from '@/pages/NotFound';
import AdminDashboard from '@/pages/AdminDashboard';
import FundTransferPage from '@/pages/FundTransferPage';
import TransactionHistoryPage from '@/pages/TransactionHistoryPage';
import PaymentGatewayPage from '@/pages/PaymentGatewayPage';
import NotificationsPage from '@/pages/NotificationsPage';
import SettingsPage from '@/pages/SettingsPage';
import AdminUserManagement from '@/pages/AdminUserManagement';
import AdminAccountManagement from '@/pages/AdminAccountManagement';
import AdminSystemMonitoring from '@/pages/AdminSystemMonitoring';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme='system' storageKey='banking-ui-theme'>
        <QueryClient>
          <Toaster richColors position='top-right' />
          <BrowserRouter>
            <Routes>
              <Route element={<RedirectIfAuthenticated />}>
                <Route path='/' element={<Index />} />
                <Route path='/auth' element={<AuthPage />} />
                <Route
                  path='/forget-password'
                  element={<ForgotPasswordPage />}
                />
                <Route
                  path='/reset-password/:token'
                  element={<ResetPasswordPage />}
                />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route
                  path='/dashboard/accounts'
                  element={<DashboardAccountsPage />}
                />
                <Route
                  path='/dashboard/transfers'
                  element={<FundTransferPage />}
                />
                <Route
                  path='/dashboard/payments'
                  element={<PaymentGatewayPage />}
                />
                <Route
                  path='/dashboard/history'
                  element={<TransactionHistoryPage />}
                />
                <Route
                  path='/dashboard/notifications'
                  element={<NotificationsPage />}
                />
                <Route path='/dashboard/settings' element={<SettingsPage />} />
                <Route
                  path='/dashboard/support'
                  element={<DashboardSupportPage />}
                />
                <Route path='/dashboard/profile' element={<SettingsPage />} />
                {/* Legacy routes for backward compatibility */}
                <Route path='/transfer' element={<FundTransferPage />} />
                <Route
                  path='/transactions'
                  element={<TransactionHistoryPage />}
                />
                <Route path='/payments' element={<PaymentGatewayPage />} />
                <Route path='/notifications' element={<NotificationsPage />} />
                <Route path='/settings' element={<SettingsPage />} />
              </Route>
              <Route element={<AdminRoute />}>
                <Route path='/admin' element={<AdminDashboard />} />
                <Route path='/admin/users' element={<AdminUserManagement />} />
                <Route
                  path='/admin/accounts'
                  element={<AdminAccountManagement />}
                />
                <Route
                  path='/admin/monitoring'
                  element={<AdminSystemMonitoring />}
                />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </QueryClient>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
