import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  user;
  recentTransactions: Transaction[] = [];
  loading = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private transactionService: TransactionService
  ) {
    this.user = this.authService.currentUser;
  }

  ngOnInit(): void {
    this.transactionService.getAll().subscribe({
      next: (data) => {
        this.recentTransactions = [...data]
          .sort((a, b) => (a.date < b.date ? 1 : -1))
          .slice(0, 5);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  get totalIncome(): number {
    return this.recentTransactions
      .filter((t) => t.type === 'INCOME')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }

  get totalExpense(): number {
    return this.recentTransactions
      .filter((t) => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
