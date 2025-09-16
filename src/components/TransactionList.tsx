
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Transaction } from '../types';

interface TransactionListProps {
    transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
    const { t } = useTranslation();

    if (!transactions || transactions.length === 0) {
        return <p className="text-center text-gray-500 mt-8">{t('customerDetail.noTransactions')}</p>
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

export default TransactionList;
