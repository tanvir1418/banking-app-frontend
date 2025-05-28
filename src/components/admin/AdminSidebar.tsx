
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Shield, 
  FileText,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const adminNavItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { name: 'Users', icon: Users, path: '/admin/users' },
  { name: 'Transactions', icon: CreditCard, path: '/admin/transactions' },
  { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
  { name: 'Reports', icon: FileText, path: '/admin/reports' },
  { name: 'Security', icon: Shield, path: '/admin/security' },
  { name: 'Settings', icon: Settings, path: '/admin/settings' },
];

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-card text-card-foreground flex flex-col min-h-screen border-r border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">A</span>
          </div>
          <span className="text-xl font-bold text-primary">Admin</span>
        </div>
        
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="w-full justify-start text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to User Dashboard
        </Button>
      </div>

      <nav className="flex-grow px-4 py-4 space-y-1">
        {adminNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                ${
                  isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-card-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-accent-foreground'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
