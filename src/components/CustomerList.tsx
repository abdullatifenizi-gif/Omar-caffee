
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Customer } from '../types';

interface CustomerListProps {
  customers: Customer[];
  onSelectCustomer: (customerId: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onSelectCustomer }) => {
    const { t } = useTranslation();

    if (customers.length === 0) {
        return <p className="text-center text-gray-500 mt-4">{t('dashboard.noCustomersFound')}</p>
    }
    
    return (
        <div className="space-y-3">
        {customers.map((customer) => (
            <div
            key={customer.id}
            onClick={() => onSelectCustomer(customer.id)}
            className="bg-brand-surface p-4 rounded-lg shadow-sm hover:shadow-lg cursor-pointer transition-shadow duration-300 flex justify-between items-center"
            >
            <div>
                <p className="font-semibold text-lg text-brand-primary">{customer.name}</p>
                <p className="text-sm text-gray-500">{customer.phone}</p>
            </div>
            <div className="text-end">
                <p className="font-bold text-xl">
                {customer.balance > 0 ? (
                    <span className="text-red-600">${customer.balance.toFixed(2)}</span>
                ) : customer.balance < 0 ? (
                    <span className="text-green-600">-${(-customer.balance).toFixed(2)}</span>
                ) : (
                    <span className="text-gray-700">${customer.balance.toFixed(2)}</span>
                )}
                </p>
                <p className="text-xs text-gray-400">{t('customerList.currentBalance')}</p>
            </div>
            </div>
        ))}
        </div>
    );
};

export default CustomerList;
