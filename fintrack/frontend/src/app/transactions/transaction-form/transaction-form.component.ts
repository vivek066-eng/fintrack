import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Transaction, TransactionType, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent implements OnChanges {
  @Input() editingTransaction: Transaction | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  form: FormGroup;
  expenseCategories = EXPENSE_CATEGORIES;
  incomeCategories = INCOME_CATEGORIES;
  errorMessage = '';

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      type: ['EXPENSE' as TransactionType, Validators.required],
      category: ['', Validators.required],
      date: [this.today(), Validators.required],
      notes: ['']
    });
  }

  ngOnChanges(): void {
    if (this.editingTransaction) {
      this.form.patchValue(this.editingTransaction);
    } else {
      this.form.reset({ type: 'EXPENSE', date: this.today() });
    }
  }

  get categories(): string[] {
    return this.form.value.type === 'INCOME' ? this.incomeCategories : this.expenseCategories;
  }

  private today(): string {
    return new Date().toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const payload: Transaction = this.form.value;
    const request$ = this.editingTransaction?.id
      ? this.transactionService.update(this.editingTransaction.id, payload)
      : this.transactionService.create(payload);

    request$.subscribe({
      next: () => {
        this.errorMessage = '';
        this.form.reset({ type: 'EXPENSE', date: this.today() });
        this.saved.emit();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to save transaction';
      }
    });
  }

  onCancel(): void {
    this.form.reset({ type: 'EXPENSE', date: this.today() });
    this.cancelled.emit();
  }
}
