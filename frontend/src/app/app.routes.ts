import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionListComponent } from './components/transactions/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transactions/transaction-form/transaction-form.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'transactions', component: TransactionListComponent, canActivate: [authGuard] },
  { path: 'transactions/new', component: TransactionFormComponent, canActivate: [authGuard] },
  { path: 'transactions/:id/edit', component: TransactionFormComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' },
];
