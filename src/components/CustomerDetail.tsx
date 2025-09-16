
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Customer, Product, Transaction } from '../types';
import AddTransactionForm from './AddTransactionForm';
import TransactionList from './TransactionList';

interface CustomerDetailProps {
  customer: Customer;
  products: Product[];
  onAddTransaction: (customerId: string, transaction: Omit<Transaction, 'id'>) => void;
  onBack: () => void;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer, products, onAddTransaction, onBack }) => {
  const { t } = useTranslation();
  return (
    <div>
        <button onClick={onBack} className="mb-4 text-brand-primary hover:text-brand-accent font-semibold">{t('customerDetail.backToDashboard')}</button>
        <div className="bg-brand-surface p-6 rounded-lg shadow-md">
            {/* Customer Info */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold text-brand-primary">{customer.name}</h2>
                    <p className="text-gray-500">{customer.phone}</p>
                    {customer.notes && <p className="mt-2 text-sm text-gray-600 bg-yellow-50 p-2 rounded-md border border-yellow-200">{customer.notes}</p>}
                </div>
                <div className="text-end">
                    <p className="text-sm text-gray-500">{t('customerDetail.currentBalance')}</p>
                    <p className={`text-4xl font-bold ${customer.balance > 0 ? 'text-red-600' : customer.balance < 0 ? 'text-green-600' : 'text-gray-800'}`}>
                        ${customer.balance.toFixed(2)}
                    </p>
                </div>
            </div>

            <hr className="my-6"/>

            {/* Add Transaction */}
            <AddTransactionForm customerId={customer.id} products={products} onAddTransaction={onAddTransaction} />

            {/* Transaction History */}
            <h3 className="text-xl font-bold text-brand-primary mt-8 mb-2">{t('customerDetail.transactionHistory')}</h3>
            <TransactionList transactions={customer.transactions || []} />
        </div>
    </div>
  );
};

export default CustomerDetail;
