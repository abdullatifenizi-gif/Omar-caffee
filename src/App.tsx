
import React, { useState, useMemo } from 'react';
import { Customer, Product, Transaction, View } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CustomerDetail from './components/CustomerDetail';
import ProductManager from './components/ProductManager';

const App: React.FC = () => {
  const [customers, setCustomers] = useLocalStorage<Customer[]>('customers', []);
  const [products, setProducts] = useLocalStorage<Product[]>('products', []);
  
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [isProductManagerOpen, setProductManagerOpen] = useState(false);

  const handleAddCustomer = (customer: Omit<Customer, 'id' | 'balance'>) => {
    const newCustomer: Customer = { 
      ...customer, 
      id: `C${Date.now()}`,
      balance: 0
    };
    setCustomers([...customers, newCustomer]);
  };

  const handleAddTransaction = (customerId: string, transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = { ...transaction, id: `T${Date.now()}` };
    const updatedCustomers = customers.map(c => {
      if (c.id === customerId) {
        const transactions = c.transactions ? [...c.transactions, newTransaction] : [newTransaction];
        return { ...c, transactions };
      }
      return c;
    });
    setCustomers(updatedCustomers);
  };
  
  const customersWithBalance = useMemo(() => {
    return customers.map(customer => {
      const balance = (customer.transactions || []).reduce((acc, t) => {
        return acc + (t.type === 'DEBT' ? t.amount : -t.amount);
      }, 0);
      return { ...customer, balance };
    });
  }, [customers]);

  const selectedCustomer = useMemo(() => {
    return customersWithBalance.find(c => c.id === selectedCustomerId) || null;
  }, [customersWithBalance, selectedCustomerId]);
  
  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setCurrentView(View.CUSTOMER_DETAIL);
  };

  const navigateToDashboard = () => {
    setSelectedCustomerId(null);
    setCurrentView(View.DASHBOARD);
  };

  return (
    <div className="min-h-screen bg-brand-background font-sans text-brand-text">
      <Header onManageProducts={() => setProductManagerOpen(true)} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {currentView === View.DASHBOARD && (
          <Dashboard 
            customers={customersWithBalance}
            onSelectCustomer={handleSelectCustomer}
            onAddCustomer={handleAddCustomer}
          />
        )}
        {currentView === View.CUSTOMER_DETAIL && selectedCustomer && (
          <CustomerDetail 
            customer={selectedCustomer}
            products={products}
            onAddTransaction={handleAddTransaction}
            onBack={navigateToDashboard}
          />
        )}
      </main>
      {isProductManagerOpen && (
        <ProductManager 
          products={products}
          setProducts={setProducts}
          onClose={() => setProductManagerOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
