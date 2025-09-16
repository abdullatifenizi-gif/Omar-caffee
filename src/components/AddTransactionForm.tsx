
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Product, Transaction, TransactionType } from '../types';

interface AddTransactionFormProps {
    customerId: string;
    products: Product[];
    onAddTransaction: (customerId: string, transaction: Omit<Transaction, 'id'>) => void;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ customerId, products, onAddTransaction }) => {
    const { t } = useTranslation();
    const [productId, setProductId] = useState<string>('');
    const [customAmount, setCustomAmount] = useState('');
    const [description, setDescription] = useState('');
    const isCustom = productId === 'custom';
    const amount = isCustom ? parseFloat(customAmount) : products.find(p => p.id === productId)?.price || 0;

    const handleSubmit = (type: TransactionType) => {
        if (!amount || amount <= 0) return;

        const transactionDescription = description || (products.find(p => p.id === productId)?.name || t('transactionForm.customAmount'));

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
            <h4 className="font-semibold text-lg text-brand-primary">{t('customerDetail.newTransaction')}</h4>
            <div>
                <label className="block text-sm font-medium text-gray-700">{t('transactionForm.productOrCustom')}</label>
                <select value={productId} onChange={e => setProductId(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm rounded-md">
                    <option value="">{t('transactionForm.selectProduct')}</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name} - ${p.price.toFixed(2)}</option>)}
                    <option value="custom">{t('transactionForm.customAmount')}</option>
                </select>
            </div>
            {isCustom && (
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('transactionForm.customAmountLabel')}</label>
                    <input type="number" value={customAmount} onChange={e => setCustomAmount(e.target.value)} placeholder="0.00" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm" />
                </div>
            )}
             <div>
                <label className="block text-sm font-medium text-gray-700">{t('transactionForm.description')}</label>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder={t('transactionForm.descriptionPlaceholder')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm" />
            </div>
            <div className="flex gap-2 justify-end">
                <button onClick={() => handleSubmit(TransactionType.PAYMENT)} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">{t('transactionForm.recordPayment')}</button>
                <button onClick={() => handleSubmit(TransactionType.DEBT)} className="px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">{t('transactionForm.recordDebt')}</button>
            </div>
        </div>
    )
}

export default AddTransactionForm;
