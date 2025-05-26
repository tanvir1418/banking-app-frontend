
import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import RegistrationForm from '@/components/auth/RegistrationForm';
import { Button } from '@/components/ui/button'; // For header/footer links if needed

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white">
      {/* Header */}
      <header className="p-4 sm:p-6 flex justify-between items-center">
        <div className="text-2xl font-bold">logo</div>
        <div className="flex items-center space-x-4">
          {/* TODO: Implement English dropdown */}
          <Button variant="ghost" className="text-white hover:bg-white/10">English</Button>
          <Button variant="ghost" className="text-white hover:bg-white/10">Help</Button>
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
      <footer className="p-4 sm:p-6 text-xs text-white/80">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <span>© 2025 logo. All rights reserved.</span>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <Button variant="link" className="text-white/80 hover:text-white p-0 h-auto">Privacy Policy</Button>
            <Button variant="link" className="text-white/80 hover:text-white p-0 h-auto">Terms of Service</Button>
            <Button variant="link" className="text-white/80 hover:text-white p-0 h-auto">Security</Button>
            <Button variant="link" className="text-white/80 hover:text-white p-0 h-auto">Contact</Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthPage;
