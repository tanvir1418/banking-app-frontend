
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AdminRoute = () => {
  const { session, isLoading, isAdmin, userRole } = useAuth();

  console.log('AdminRoute - session:', session, 'isLoading:', isLoading, 'isAdmin:', isAdmin, 'userRole:', userRole);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading admin access...</p>
          <p className="text-sm text-gray-500 mt-2">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    console.log('AdminRoute: No session, redirecting to auth');
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    console.log('AdminRoute: Not admin, redirecting to dashboard. Role:', userRole);
    return <Navigate to="/dashboard" replace />;
  }

  console.log('AdminRoute: Admin access granted');
  return <Outlet />;
};

export default AdminRoute;
