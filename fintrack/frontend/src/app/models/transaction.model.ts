export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id?: number;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  notes?: string;
}

export interface MonthlyTrend {
  month: string;
  income: number;
  expense: number;
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  expenseByCategory: { [key: string]: number };
  incomeByCategory: { [key: string]: number };
  monthlyTrend: MonthlyTrend[];
  recentTransactions: Transaction[];
}

export const EXPENSE_CATEGORIES = [
  'Food', 'Transport', 'Housing', 'Utilities', 'Entertainment',
  'Healthcare', 'Shopping', 'Education', 'Other'
];

export const INCOME_CATEGORIES = [
  'Salary', 'Freelance', 'Business', 'Investment', 'Gift', 'Other'
];
