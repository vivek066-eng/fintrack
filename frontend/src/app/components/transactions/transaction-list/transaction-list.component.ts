import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TransactionService } from '../../../services/transaction.service';
import { Transaction, TransactionType } from '../../../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './transaction-list.component.html',
})
export class TransactionListComponent implements OnInit {
  allTransactions: Transaction[] = [];
  transactions: Transaction[] = [];
  loading = false;
  errorMessage = '';
  activeFilter: TransactionType | 'ALL' = 'ALL';

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.errorMessage = '';

    // Always fetch the full list so totals stay accurate regardless of the active filter
    this.transactionService.getAll().subscribe({
      next: (data) => {
        this.allTransactions = data;
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Could not load transactions.';
        this.loading = false;
      },
    });
  }

  private applyFilter(): void {
    const filtered = this.activeFilter === 'ALL'
      ? this.allTransactions
      : this.allTransactions.filter((t) => t.type === this.activeFilter);
    this.transactions = [...filtered].sort((a, b) => (a.date < b.date ? 1 : -1));
  }

  setFilter(filter: TransactionType | 'ALL'): void {
    this.activeFilter = filter;
    this.applyFilter();
  }

  remove(id?: number): void {
    if (!id) return;
    if (!confirm('Delete this transaction?')) return;

    this.transactionService.delete(id).subscribe({
      next: () => this.load(),
      error: () => (this.errorMessage = 'Could not delete transaction.'),
    });
  }

  get totalIncome(): number {
    return this.allTransactions
      .filter((t) => t.type === 'INCOME')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }

  get totalExpense(): number {
    return this.allTransactions
      .filter((t) => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }

  get balance(): number {
    return this.totalIncome - this.totalExpense;
  }
}
