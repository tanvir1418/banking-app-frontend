
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button'; // Assuming Button is available

const DashboardPage = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        {user ? (
          <p className="text-lg mb-6">Welcome, {user.email}!</p>
        ) : (
          <p className="text-lg mb-6">Loading user information...</p>
        )}
        <p className="text-gray-700 mb-6">
          This is your protected dashboard. Content based on Figma designs will be added here.
        </p>
        <Button onClick={signOut} variant="destructive">
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default DashboardPage;
