import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, TransactionType } from '../models/transaction.model';

const API_BASE = 'http://localhost:8080/api/transactions';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private http: HttpClient) {}

  getAll(type?: TransactionType): Observable<Transaction[]> {
    const url = type ? `${API_BASE}?type=${type}` : API_BASE;
    return this.http.get<Transaction[]>(url);
  }

  create(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(API_BASE, transaction);
  }

  update(id: number, transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${API_BASE}/${id}`, transaction);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE}/${id}`);
  }
}
