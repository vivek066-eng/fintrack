import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TransactionFormComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  editingTransaction: Transaction | null = null;
  isLoading = true;
  filterType: 'ALL' | 'INCOME' | 'EXPENSE' = 'ALL';

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.isLoading = true;
    this.transactionService.getAll().subscribe({
      next: (data) => {
        this.transactions = data;
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  get filteredTransactions(): Transaction[] {
    if (this.filterType === 'ALL') return this.transactions;
    return this.transactions.filter(t => t.type === this.filterType);
  }

  onEdit(transaction: Transaction): void {
    this.editingTransaction = { ...transaction };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onDelete(id: number | undefined): void {
    if (!id) return;
    if (!confirm('Delete this transaction?')) return;

    this.transactionService.delete(id).subscribe({
      next: () => this.loadTransactions()
    });
  }

  onSaved(): void {
    this.editingTransaction = null;
    this.loadTransactions();
  }

  onCancelled(): void {
    this.editingTransaction = null;
  }
}
