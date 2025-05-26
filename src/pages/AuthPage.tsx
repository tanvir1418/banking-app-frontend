
import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegistrationForm from '@/components/auth/RegistrationForm';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react'; // Import ChevronDown

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 text-white"> {/* Updated gradient */}
      {/* Header */}
      <header className="p-4 sm:p-6 flex justify-between items-center">
        <div className="text-3xl font-bold text-white">logo</div> {/* Updated logo text */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* TODO: Implement actual dropdown functionality */}
          <Button variant="ghost" className="text-white hover:bg-white/20 flex items-center">
            English <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/20">Help</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {isLoginView ? (
          <LoginForm onSwitchToRegister={() => setIsLoginView(false)} />
        ) : (
          <RegistrationForm onSwitchToLogin={() => setIsLoginView(true)} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 p-4 sm:p-6 text-xs text-gray-300"> {/* Added dark background and adjusted text color */}
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <span>© 2025 logo. All rights reserved.</span> {/* Updated copyright text */}
          <div className="flex space-x-3 sm:space-x-4 mt-2 sm:mt-0">
            <Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto text-xs">Privacy Policy</Button>
            <Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto text-xs">Terms of Service</Button>
            <Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto text-xs">Security</Button>
            <Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto text-xs">Contact</Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthPage;
