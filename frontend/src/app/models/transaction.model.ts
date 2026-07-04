export type TransactionType = 'INCOME' | 'EXPENSE';

// Mirrors com.fintrack.dto.TransactionDTO
export interface Transaction {
  id?: number;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string; // ISO format YYYY-MM-DD, matches LocalDate serialization
  notes?: string;
}
