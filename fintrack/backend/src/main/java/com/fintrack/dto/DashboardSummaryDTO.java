package com.fintrack.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class DashboardSummaryDTO {
    private BigDecimal totalIncome;
    private BigDecimal totalExpense;
    private BigDecimal balance;
    private Map<String, BigDecimal> expenseByCategory;
    private Map<String, BigDecimal> incomeByCategory;
    private List<MonthlyTrendDTO> monthlyTrend;
    private List<TransactionDTO> recentTransactions;

    public DashboardSummaryDTO() {
    }

    public DashboardSummaryDTO(BigDecimal totalIncome, BigDecimal totalExpense, BigDecimal balance,
                                Map<String, BigDecimal> expenseByCategory, Map<String, BigDecimal> incomeByCategory,
                                List<MonthlyTrendDTO> monthlyTrend, List<TransactionDTO> recentTransactions) {
        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
        this.balance = balance;
        this.expenseByCategory = expenseByCategory;
        this.incomeByCategory = incomeByCategory;
        this.monthlyTrend = monthlyTrend;
        this.recentTransactions = recentTransactions;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private BigDecimal totalIncome;
        private BigDecimal totalExpense;
        private BigDecimal balance;
        private Map<String, BigDecimal> expenseByCategory;
        private Map<String, BigDecimal> incomeByCategory;
        private List<MonthlyTrendDTO> monthlyTrend;
        private List<TransactionDTO> recentTransactions;

        public Builder totalIncome(BigDecimal v) { this.totalIncome = v; return this; }
        public Builder totalExpense(BigDecimal v) { this.totalExpense = v; return this; }
        public Builder balance(BigDecimal v) { this.balance = v; return this; }
        public Builder expenseByCategory(Map<String, BigDecimal> v) { this.expenseByCategory = v; return this; }
        public Builder incomeByCategory(Map<String, BigDecimal> v) { this.incomeByCategory = v; return this; }
        public Builder monthlyTrend(List<MonthlyTrendDTO> v) { this.monthlyTrend = v; return this; }
        public Builder recentTransactions(List<TransactionDTO> v) { this.recentTransactions = v; return this; }

        public DashboardSummaryDTO build() {
            return new DashboardSummaryDTO(totalIncome, totalExpense, balance,
                    expenseByCategory, incomeByCategory, monthlyTrend, recentTransactions);
        }
    }

    public static class MonthlyTrendDTO {
        private String month;
        private BigDecimal income;
        private BigDecimal expense;

        public MonthlyTrendDTO() {
        }

        public MonthlyTrendDTO(String month, BigDecimal income, BigDecimal expense) {
            this.month = month;
            this.income = income;
            this.expense = expense;
        }

        public static Builder builder() {
            return new Builder();
        }

        public static class Builder {
            private String month;
            private BigDecimal income;
            private BigDecimal expense;

            public Builder month(String month) { this.month = month; return this; }
            public Builder income(BigDecimal income) { this.income = income; return this; }
            public Builder expense(BigDecimal expense) { this.expense = expense; return this; }

            public MonthlyTrendDTO build() {
                return new MonthlyTrendDTO(month, income, expense);
            }
        }

        public String getMonth() { return month; }
        public void setMonth(String month) { this.month = month; }

        public BigDecimal getIncome() { return income; }
        public void setIncome(BigDecimal income) { this.income = income; }

        public BigDecimal getExpense() { return expense; }
        public void setExpense(BigDecimal expense) { this.expense = expense; }
    }

    public BigDecimal getTotalIncome() { return totalIncome; }
    public void setTotalIncome(BigDecimal totalIncome) { this.totalIncome = totalIncome; }

    public BigDecimal getTotalExpense() { return totalExpense; }
    public void setTotalExpense(BigDecimal totalExpense) { this.totalExpense = totalExpense; }

    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }

    public Map<String, BigDecimal> getExpenseByCategory() { return expenseByCategory; }
    public void setExpenseByCategory(Map<String, BigDecimal> expenseByCategory) { this.expenseByCategory = expenseByCategory; }

    public Map<String, BigDecimal> getIncomeByCategory() { return incomeByCategory; }
    public void setIncomeByCategory(Map<String, BigDecimal> incomeByCategory) { this.incomeByCategory = incomeByCategory; }

    public List<MonthlyTrendDTO> getMonthlyTrend() { return monthlyTrend; }
    public void setMonthlyTrend(List<MonthlyTrendDTO> monthlyTrend) { this.monthlyTrend = monthlyTrend; }

    public List<TransactionDTO> getRecentTransactions() { return recentTransactions; }
    public void setRecentTransactions(List<TransactionDTO> recentTransactions) { this.recentTransactions = recentTransactions; }
}
