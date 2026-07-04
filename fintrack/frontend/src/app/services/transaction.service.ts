import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

const API_URL = 'http://localhost:8080/api/transactions';

@Injectable({ providedIn: 'root' })
export class TransactionService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(API_URL);
  }

  create(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(API_URL, transaction);
  }

  update(id: number, transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${API_URL}/${id}`, transaction);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
