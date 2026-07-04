import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TransactionService } from '../../../services/transaction.service';
import { Transaction } from '../../../models/transaction.model';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './transaction-form.component.html',
})
export class TransactionFormComponent implements OnInit {
  loading = false;
  errorMessage = '';
  editId: number | null = null;
  isEditMode = false;

  form;

  categories = ['Food', 'Rent', 'Salary', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other'];

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
      type: ['EXPENSE', [Validators.required]],
      category: ['', [Validators.required]],
      date: [this.todayIsoDate(), [Validators.required]],
      notes: [''],
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editId = Number(idParam);
      this.isEditMode = true;
      this.loadTransaction(this.editId);
    }
  }

  private loadTransaction(id: number): void {
    this.loading = true;
    this.transactionService.getAll().subscribe({
      next: (transactions) => {
        const match = transactions.find((t) => t.id === id);
        if (match) {
          this.form.patchValue(match);
        } else {
          this.errorMessage = 'Transaction not found.';
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Could not load transaction.';
        this.loading = false;
      },
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    const payload = this.form.getRawValue() as Transaction;

    const request$ = this.isEditMode && this.editId
      ? this.transactionService.update(this.editId, payload)
      : this.transactionService.create(payload);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/transactions']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Could not save transaction. Please check your details.';
      },
    });
  }

  private todayIsoDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
