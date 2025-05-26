
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 p-4 text-sm text-gray-500">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <span>© 2025 Banking App. All rights reserved.</span>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <Link to="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-blue-600">Terms of Service</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact Support</Link>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
