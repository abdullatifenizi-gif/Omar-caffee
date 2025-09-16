
export enum TransactionType {
  DEBT = 'DEBT',
  PAYMENT = 'PAYMENT'
}

export interface Transaction {
  id: string;
  customerId: string;
  amount: number;
  type: TransactionType;
  date: string;
  description: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  notes: string;
  balance: number;
  transactions?: Transaction[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
}

export enum View {
  DASHBOARD = 'DASHBOARD',
  CUSTOMER_DETAIL = 'CUSTOMER_DETAIL',
}
