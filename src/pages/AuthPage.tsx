
import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegistrationForm from '@/components/auth/RegistrationForm';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground"> {/* Changed gradient to bg-background and text-foreground */}
      {/* Header */}
      <header className="p-4 sm:p-6 flex justify-between items-center">
        <div className="text-3xl font-bold">logo</div> {/* text-white to text-foreground implicitly */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" className="text-foreground hover:bg-accent flex items-center"> {/* text-white to text-foreground */}
            English <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
          <Button variant="ghost" className="text-foreground hover:bg-accent">Help</Button> {/* text-white to text-foreground */}
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
      <footer className="bg-muted p-4 sm:p-6 text-xs text-muted-foreground"> {/* bg-slate-900 to bg-muted, text-gray-300 to text-muted-foreground */}
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <span>© 2025 logo. All rights reserved.</span>
          <div className="flex space-x-3 sm:space-x-4 mt-2 sm:mt-0">
            <Button variant="link" className="text-muted-foreground hover:text-foreground p-0 h-auto text-xs">Privacy Policy</Button>
            <Button variant="link" className="text-muted-foreground hover:text-foreground p-0 h-auto text-xs">Terms of Service</Button>
            <Button variant="link" className="text-muted-foreground hover:text-foreground p-0 h-auto text-xs">Security</Button>
            <Button variant="link" className="text-muted-foreground hover:text-foreground p-0 h-auto text-xs">Contact</Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthPage;
