import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AdminRoute = () => {
  const { isAuthenticated, isLoading, isAdmin, userRole } = useAuth();

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
    return <Navigate to='/auth' replace />;
  }

  if (!isAdmin) {
    return <Navigate to='/dashboard' replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
