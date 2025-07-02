import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const RedirectIfAuthenticated: React.FC = () => {
  const { isAuthenticated, userRole, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <p>Loading access...</p>
          <p className='text-sm text-gray-500 mt-2'>Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    if (userRole === 'admin') return <Navigate to='/admin' replace />;
    if (userRole === 'user') return <Navigate to='/dashboard' replace />;
  }

  return <Outlet />;
};

export default RedirectIfAuthenticated;
