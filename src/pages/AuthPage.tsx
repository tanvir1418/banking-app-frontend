
import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegistrationForm from '@/components/auth/RegistrationForm';
import AdminLoginForm from '@/components/auth/AdminLoginForm';
import { Button } from '@/components/ui/button';
import { ChevronDown, Shield, User } from 'lucide-react';

type AuthView = 'login' | 'register' | 'admin';

const AuthPage = () => {
  const [currentView, setCurrentView] = useState<AuthView>('login');

  const renderAuthForm = () => {
    switch (currentView) {
      case 'login':
        return <LoginForm onSwitchToRegister={() => setCurrentView('register')} />;
      case 'register':
        return <RegistrationForm onSwitchToLogin={() => setCurrentView('login')} />;
      case 'admin':
        return <AdminLoginForm onSwitchToUser={() => setCurrentView('login')} />;
      default:
        return <LoginForm onSwitchToRegister={() => setCurrentView('register')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-sky-100 via-blue-200 to-indigo-300 dark:from-sky-800 dark:via-blue-900 dark:to-indigo-950 text-foreground">
      {/* Header */}
      <header className="p-4 sm:p-6 flex justify-between items-center bg-background/80 dark:bg-background/70 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">logo</div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" className="text-foreground hover:bg-accent flex items-center">
            English <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
          <Button variant="ghost" className="text-foreground hover:bg-accent">Help</Button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="flex justify-center p-4">
        <div className="flex bg-background/80 dark:bg-background/70 backdrop-blur-md rounded-lg p-1 shadow-sm">
          <Button
            variant={currentView === 'login' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('login')}
            className="flex items-center space-x-2"
          >
            <User className="h-4 w-4" />
            <span>User Login</span>
          </Button>
          <Button
            variant={currentView === 'register' ? 'default' : 'ghost'}
            onClick={() => setCurrentView('register')}
            className="flex items-center space-x-2"
          >
            <User className="h-4 w-4" />
            <span>Register</span>
          </Button>
          <Button
            variant={currentView === 'admin' ? 'destructive' : 'ghost'}
            onClick={() => setCurrentView('admin')}
            className="flex items-center space-x-2"
          >
            <Shield className="h-4 w-4" />
            <span>Admin</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {renderAuthForm()}
      </main>

      {/* Footer */}
      <footer className="bg-background/80 dark:bg-background/70 backdrop-blur-md p-4 sm:p-6 text-xs text-muted-foreground shadow-sm">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <span>© 2025 logo. All rights reserved.</span>
          <div className="flex space-x-3 sm:space-x-4 mt-2 sm:mt-0">
            <Button variant="link" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-0 h-auto text-xs">Privacy Policy</Button>
            <Button variant="link" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-0 h-auto text-xs">Terms of Service</Button>
            <Button variant="link" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-0 h-auto text-xs">Security</Button>
            <Button variant="link" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 p-0 h-auto text-xs">Contact</Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthPage;
