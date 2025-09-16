
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Customer } from '../types';
import CustomerList from './CustomerList';
import AddCustomerForm from './AddCustomerForm';

interface DashboardProps {
  customers: Customer[];
  onSelectCustomer: (customerId: string) => void;
  onAddCustomer: (customer: Omit<Customer, 'id' | 'balance'>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ customers, onSelectCustomer, onAddCustomer }) => {
    const { t } = useTranslation();
    const [isAddingCustomer, setIsAddingCustomer] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const { totalDebt, totalPayments } = useMemo(() => {
        let totalDebt = 0;
        let totalPayments = 0;
        customers.forEach(customer => {
            (customer.transactions || []).forEach(t => {
                if (t.type === 'DEBT') {
                    totalDebt += t.amount;
                } else {
                    totalPayments += t.amount;
                }
            })
        });
        return { totalDebt, totalPayments };
    }, [customers]);
    
    const filteredCustomers = useMemo(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        if (!lowercasedQuery) {
            return customers;
        }
        return customers.filter(customer => 
            customer.name.toLowerCase().includes(lowercasedQuery) ||
            customer.phone.toLowerCase().includes(lowercasedQuery)
        );
    }, [customers, searchQuery]);

    const totalOutstanding = totalDebt - totalPayments;

    return (
        <div className="space-y-8">
            {/* Reports Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-brand-surface p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-sm font-medium text-gray-500 uppercase">{t('dashboard.totalOutstanding')}</h3>
                    <p className="mt-1 text-4xl font-semibold text-red-600">${totalOutstanding.toFixed(2)}</p>
                </div>
                <div className="bg-brand-surface p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-sm font-medium text-gray-500 uppercase">{t('dashboard.totalDebt')}</h3>
                    <p className="mt-1 text-3xl font-semibold text-brand-primary">${totalDebt.toFixed(2)}</p>
                </div>
                <div className="bg-brand-surface p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-sm font-medium text-gray-500 uppercase">{t('dashboard.totalPayments')}</h3>
                    <p className="mt-1 text-3xl font-semibold text-green-600">${totalPayments.toFixed(2)}</p>
                </div>
            </div>

            {/* Customers Section */}
            <div className="bg-brand-surface p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-brand-primary">{t('dashboard.customers')}</h2>
                    {!isAddingCustomer && (
                        <button onClick={() => setIsAddingCustomer(true)} className="bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-brand-accent transition duration-300">
                            {t('dashboard.addCustomer')}
                        </button>
                    )}
                </div>
                {isAddingCustomer ? (
                    <AddCustomerForm onAddCustomer={onAddCustomer} onClose={() => setIsAddingCustomer(false)} />
                ) : (
                    <>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('dashboard.searchPlaceholder')}
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm"
                                aria-label="Search customers"
                            />
                        </div>
                        <CustomerList customers={filteredCustomers} onSelectCustomer={onSelectCustomer} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
