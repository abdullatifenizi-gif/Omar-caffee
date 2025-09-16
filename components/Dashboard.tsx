
import React, { useState, useMemo } from 'react';
import { Customer } from '../types';

interface CustomerListProps {
  customers: Customer[];
  onSelectCustomer: (customerId: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onSelectCustomer }) => {
    if (customers.length === 0) {
        return <p className="text-center text-gray-500 mt-4">No customers added yet. Add one to get started!</p>
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
            <div className="text-right">
                <p className="font-bold text-xl">
                {customer.balance > 0 ? (
                    <span className="text-red-600">${customer.balance.toFixed(2)}</span>
                ) : customer.balance < 0 ? (
                    <span className="text-green-600">-${(-customer.balance).toFixed(2)}</span>
                ) : (
                    <span className="text-gray-700">${customer.balance.toFixed(2)}</span>
                )}
                </p>
                <p className="text-xs text-gray-400">Current Balance</p>
            </div>
            </div>
        ))}
        </div>
    );
};

interface AddCustomerFormProps {
    onAddCustomer: (customer: Omit<Customer, 'id' | 'balance'>) => void;
    onClose: () => void;
}

const AddCustomerForm: React.FC<AddCustomerFormProps> = ({ onAddCustomer, onClose }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) return;
        onAddCustomer({ name, phone, notes, transactions: [] });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm" required />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm" />
            </div>
            <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm" />
            </div>
            <div className="flex justify-end gap-2">
                <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-accent">Add Customer</button>
            </div>
        </form>
    );
}


interface DashboardProps {
  customers: Customer[];
  onSelectCustomer: (customerId: string) => void;
  onAddCustomer: (customer: Omit<Customer, 'id' | 'balance'>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ customers, onSelectCustomer, onAddCustomer }) => {
    const [isAddingCustomer, setIsAddingCustomer] = useState(false);

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

    const totalOutstanding = totalDebt - totalPayments;

    return (
        <div className="space-y-8">
            {/* Reports Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-brand-surface p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-sm font-medium text-gray-500 uppercase">Total Outstanding Debt</h3>
                    <p className="mt-1 text-4xl font-semibold text-red-600">${totalOutstanding.toFixed(2)}</p>
                </div>
                <div className="bg-brand-surface p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-sm font-medium text-gray-500 uppercase">Total Debt Recorded</h3>
                    <p className="mt-1 text-3xl font-semibold text-brand-primary">${totalDebt.toFixed(2)}</p>
                </div>
                <div className="bg-brand-surface p-6 rounded-lg shadow-md text-center">
                    <h3 className="text-sm font-medium text-gray-500 uppercase">Total Payments Received</h3>
                    <p className="mt-1 text-3xl font-semibold text-green-600">${totalPayments.toFixed(2)}</p>
                </div>
            </div>

            {/* Customers Section */}
            <div className="bg-brand-surface p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-brand-primary">Customers</h2>
                    {!isAddingCustomer && (
                        <button onClick={() => setIsAddingCustomer(true)} className="bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-brand-accent transition duration-300">
                            Add Customer
                        </button>
                    )}
                </div>
                {isAddingCustomer ? (
                    <AddCustomerForm onAddCustomer={onAddCustomer} onClose={() => setIsAddingCustomer(false)} />
                ) : (
                    <CustomerList customers={customers} onSelectCustomer={onSelectCustomer} />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
