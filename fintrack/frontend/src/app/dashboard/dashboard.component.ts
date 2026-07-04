import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { DashboardService } from '../services/dashboard.service';
import { DashboardSummary } from '../models/transaction.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  summary: DashboardSummary | null = null;
  isLoading = true;

  pieChartData: ChartData<'pie'> = { labels: [], datasets: [{ data: [] }] };
  pieChartOptions: ChartConfiguration['options'] = { responsive: true, plugins: { legend: { position: 'bottom' } } };

  lineChartData: ChartData<'line'> = { labels: [], datasets: [] };
  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } },
    scales: { y: { beginAtZero: true } }
  };

  categoryColors = ['#4f46e5', '#f59e0b', '#10b981', '#ef4444', '#3b82f6', '#a855f7', '#ec4899', '#14b8a6', '#f97316'];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getSummary().subscribe({
      next: (data) => {
        this.summary = data;
        this.buildPieChart(data);
        this.buildLineChart(data);
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; }
    });
  }

  private buildPieChart(data: DashboardSummary): void {
    const labels = Object.keys(data.expenseByCategory);
    const values = Object.values(data.expenseByCategory);
    this.pieChartData = {
      labels,
      datasets: [{ data: values, backgroundColor: this.categoryColors }]
    };
  }

  private buildLineChart(data: DashboardSummary): void {
    const labels = data.monthlyTrend.map(t => t.month);
    this.lineChartData = {
      labels,
      datasets: [
        {
          label: 'Income',
          data: data.monthlyTrend.map(t => t.income),
          borderColor: '#10b981',
          backgroundColor: 'rgba(16,185,129,0.15)',
          fill: true,
          tension: 0.3
        },
        {
          label: 'Expense',
          data: data.monthlyTrend.map(t => t.expense),
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239,68,68,0.15)',
          fill: true,
          tension: 0.3
        }
      ]
    };
  }
}
