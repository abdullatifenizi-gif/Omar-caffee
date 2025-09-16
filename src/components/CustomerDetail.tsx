
import React, { useState } from 'react';
import { Customer, Product, Transaction, TransactionType } from '../types';

interface AddTransactionFormProps {
    customerId: string;
    products: Product[];
    onAddTransaction: (customerId: string, transaction: Omit<Transaction, 'id'>) => void;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ customerId, products, onAddTransaction }) => {
    const [productId, setProductId] = useState<string>('');
    const [customAmount, setCustomAmount] = useState('');
    const [description, setDescription] = useState('');
    const isCustom = productId === 'custom';
    const amount = isCustom ? parseFloat(customAmount) : products.find(p => p.id === productId)?.price || 0;

    const handleSubmit = (type: TransactionType) => {
        if (!amount || amount <= 0) return;

        const transactionDescription = description || (products.find(p => p.id === productId)?.name || 'Custom Amount');

        onAddTransaction(customerId, {
            customerId,
            amount,
            type,
            date: new Date().toISOString(),
            description: transactionDescription
        });
        setProductId('');
        setCustomAmount('');
        setDescription('');
    }

    return (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4 space-y-4">
            <h4 className="font-semibold text-lg text-brand-primary">New Transaction</h4>
            <div>
                <label className="block text-sm font-medium text-gray-700">Product or Custom Amount</label>
                <select value={productId} onChange={e => setProductId(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm rounded-md">
                    <option value="">Select a product...</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name} - ${p.price.toFixed(2)}</option>)}
                    <option value="custom">Custom Amount</option>
                </select>
            </div>
            {isCustom && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">Custom Amount ($)</label>
                    <input type="number" value={customAmount} onChange={e => setCustomAmount(e.target.value)} placeholder="0.00" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm" />
                </div>
            )}
             <div>
                <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g., Morning Latte" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm" />
            </div>
            <div className="flex gap-2 justify-end">
                <button onClick={() => handleSubmit(TransactionType.PAYMENT)} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">Record Payment</button>
                <button onClick={() => handleSubmit(TransactionType.DEBT)} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">Record Debt</button>
            </div>
        </div>
    )
}

interface TransactionListProps {
    transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
    if (!transactions || transactions.length === 0) {
        return <p className="text-center text-gray-500 mt-8">No transactions yet.</p>
    }
    const sortedTransactions = [...transactions].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <div className="mt-6 flow-root">
            <ul className="-my-4 divide-y divide-gray-200">
                {sortedTransactions.map(t => (
                    <li key={t.id} className="flex items-center py-4 space-x-4">
                        <div className="flex-shrink-0">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'DEBT' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                {t.type === 'DEBT' ? '−' : '+'}
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{t.description}</p>
                            <p className="text-sm text-gray-500 truncate">{new Date(t.date).toLocaleString()}</p>
                        </div>
                        <div className={`text-sm font-semibold ${t.type === 'DEBT' ? 'text-red-600' : 'text-green-600'}`}>
                           {t.type === 'DEBT' ? '+' : '-'}${t.amount.toFixed(2)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}


interface CustomerDetailProps {
  customer: Customer;
  products: Product[];
  onAddTransaction: (customerId: string, transaction: Omit<Transaction, 'id'>) => void;
  onBack: () => void;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customer, products, onAddTransaction, onBack }) => {
  return (
    <div>
        <button onClick={onBack} className="mb-4 text-brand-primary hover:text-brand-accent font-semibold">&larr; Back to Dashboard</button>
        <div className="bg-brand-surface p-6 rounded-lg shadow-md">
            {/* Customer Info */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-bold text-brand-primary">{customer.name}</h2>
                    <p className="text-gray-500">{customer.phone}</p>
                    {customer.notes && <p className="mt-2 text-sm text-gray-600 bg-yellow-50 p-2 rounded-md border border-yellow-200">{customer.notes}</p>}
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Current Balance</p>
                    <p className={`text-4xl font-bold ${customer.balance > 0 ? 'text-red-600' : customer.balance < 0 ? 'text-green-600' : 'text-gray-800'}`}>
                        ${customer.balance.toFixed(2)}
                    </p>
                </div>
            </div>

            <hr className="my-6"/>

            {/* Add Transaction */}
            <AddTransactionForm customerId={customer.id} products={products} onAddTransaction={onAddTransaction} />

            {/* Transaction History */}
            <h3 className="text-xl font-bold text-brand-primary mt-8 mb-2">Transaction History</h3>
            <TransactionList transactions={customer.transactions || []} />
        </div>
    </div>
  );
};

export default CustomerDetail;
