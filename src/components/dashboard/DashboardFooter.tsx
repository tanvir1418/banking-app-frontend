
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardFooter: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border p-4 text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <span>© 2025 Banking App. All rights reserved.</span>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
          <Link to="/contact" className="hover:text-primary">Contact Support</Link>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
