
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { session, isLoading, isAdmin, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Index page - session:', session, 'isLoading:', isLoading, 'isAdmin:', isAdmin, 'userRole:', userRole);
    
    if (!isLoading) {
      if (session) {
        console.log('User is authenticated, role:', userRole, 'isAdmin:', isAdmin);
        if (isAdmin) {
          console.log('Redirecting to admin dashboard');
          navigate('/admin', { replace: true });
        } else {
          console.log('Redirecting to user dashboard');
          navigate('/dashboard', { replace: true });
        }
      } else {
        console.log('No session, redirecting to auth');
        navigate('/auth', { replace: true });
      }
    }
  }, [session, isLoading, isAdmin, userRole, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Loading...</h1>
        <p className="text-gray-600">Please wait while we direct you.</p>
        {session && (
          <div className="mt-4 text-sm text-gray-500">
            <p>Session: {session ? 'Active' : 'None'}</p>
            <p>Role: {userRole || 'Loading...'}</p>
            <p>Is Admin: {isAdmin ? 'Yes' : 'No'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
