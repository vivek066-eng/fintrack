import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/user.model';

const API_URL = 'http://localhost:8080/api/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {

  currentUser = signal<AuthResponse | null>(this.loadUserFromStorage());

  constructor(private http: HttpClient) {}

  private loadUserFromStorage(): AuthResponse | null {
    const stored = localStorage.getItem('fintrack_user');
    return stored ? JSON.parse(stored) : null;
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/register`, request)
      .pipe(tap(res => this.setSession(res)));
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/login`, request)
      .pipe(tap(res => this.setSession(res)));
  }

  private setSession(res: AuthResponse): void {
    localStorage.setItem('fintrack_user', JSON.stringify(res));
    this.currentUser.set(res);
  }

  logout(): void {
    localStorage.removeItem('fintrack_user');
    this.currentUser.set(null);
  }

  getToken(): string | null {
    return this.currentUser()?.token ?? null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
