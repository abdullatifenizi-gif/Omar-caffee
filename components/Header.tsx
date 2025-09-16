
import React from 'react';

interface HeaderProps {
  onManageProducts: () => void;
}

const Header: React.FC<HeaderProps> = ({ onManageProducts }) => {
  return (
    <header className="bg-brand-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-brand-secondary">
              ☕ Coffee Debt Manager
            </h1>
          </div>
          <div>
            <button
              onClick={onManageProducts}
              className="bg-brand-secondary text-brand-primary px-4 py-2 rounded-md hover:bg-brand-accent hover:text-white transition duration-300"
            >
              Manage Products
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
