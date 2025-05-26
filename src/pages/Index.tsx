
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (session) {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/auth', { replace: true });
      }
    }
  }, [session, isLoading, navigate]);

  // Show a loading state or a brief message while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Loading...</h1>
        <p className="text-gray-600">Please wait while we direct you.</p>
      </div>
    </div>
  );
};

export default Index;
