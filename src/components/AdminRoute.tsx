import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AdminRoute = () => {
  const { isAuthenticated, isLoading, isAdmin, userRole } = useAuth();

  console.log(
    'AdminRoute - isAuthenticated:',
    isAuthenticated,
    'isLoading:',
    isLoading,
    'isAdmin:',
    isAdmin,
    'userRole:',
    userRole
  );

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <p>Loading admin access...</p>
          <p className='text-sm text-gray-500 mt-2'>Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('AdminRoute: No isAuthenticated, redirecting to auth');
    return <Navigate to='/auth' replace />;
  }

  if (!isAdmin) {
    console.log(
      'AdminRoute: Not admin, redirecting to dashboard. Role:',
      userRole
    );
    return <Navigate to='/dashboard' replace />;
  }

  console.log('AdminRoute: Admin access granted');
  return <Outlet />;
};

export default AdminRoute;
