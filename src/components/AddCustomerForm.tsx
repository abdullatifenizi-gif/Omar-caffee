
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Customer } from '../types';

interface AddCustomerFormProps {
    onAddCustomer: (customer: Omit<Customer, 'id' | 'balance'>) => void;
    onClose: () => void;
}

const AddCustomerForm: React.FC<AddCustomerFormProps> = ({ onAddCustomer, onClose }) => {
    const { t } = useTranslation();
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('customerForm.name')}</label>
                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm" required />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t('customerForm.phone')}</label>
                <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm" />
            </div>
            <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">{t('customerForm.notes')}</label>
                <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm" />
            </div>
            <div className="flex justify-end gap-2">
                <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">{t('customerForm.cancel')}</button>
                <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-primary hover:bg-brand-accent">{t('customerForm.addCustomer')}</button>
            </div>
        </form>
    );
}

export default AddCustomerForm;
