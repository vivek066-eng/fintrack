package com.fintrack.service;

import com.fintrack.dto.DashboardSummaryDTO;
import com.fintrack.dto.TransactionDTO;
import com.fintrack.exception.ApiException;
import com.fintrack.model.Transaction;
import com.fintrack.model.TransactionType;
import com.fintrack.model.User;
import com.fintrack.repository.TransactionRepository;
import com.fintrack.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public DashboardService(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    public DashboardSummaryDTO getSummary(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ApiException("User not found", HttpStatus.NOT_FOUND));

        List<Transaction> transactions = transactionRepository.findByUserOrderByDateDesc(user);

        BigDecimal totalIncome = transactions.stream()
                .filter(t -> t.getType() == TransactionType.INCOME)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalExpense = transactions.stream()
                .filter(t -> t.getType() == TransactionType.EXPENSE)
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, BigDecimal> expenseByCategory = transactions.stream()
                .filter(t -> t.getType() == TransactionType.EXPENSE)
                .collect(Collectors.groupingBy(Transaction::getCategory,
                        Collectors.reducing(BigDecimal.ZERO, Transaction::getAmount, BigDecimal::add)));

        Map<String, BigDecimal> incomeByCategory = transactions.stream()
                .filter(t -> t.getType() == TransactionType.INCOME)
                .collect(Collectors.groupingBy(Transaction::getCategory,
                        Collectors.reducing(BigDecimal.ZERO, Transaction::getAmount, BigDecimal::add)));

        Map<String, DashboardSummaryDTO.MonthlyTrendDTO> trendMap = new LinkedHashMap<>();
        transactions.stream()
                .sorted(Comparator.comparing(Transaction::getDate))
                .forEach(t -> {
                    String monthKey = t.getDate().getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH)
                            + " " + t.getDate().getYear();
                    DashboardSummaryDTO.MonthlyTrendDTO trend = trendMap.getOrDefault(monthKey,
                            DashboardSummaryDTO.MonthlyTrendDTO.builder()
                                    .month(monthKey).income(BigDecimal.ZERO).expense(BigDecimal.ZERO).build());
                    if (t.getType() == TransactionType.INCOME) {
                        trend.setIncome(trend.getIncome().add(t.getAmount()));
                    } else {
                        trend.setExpense(trend.getExpense().add(t.getAmount()));
                    }
                    trendMap.put(monthKey, trend);
                });

        List<TransactionDTO> recent = transactions.stream()
                .limit(5)
                .map(t -> TransactionDTO.builder()
                        .id(t.getId()).title(t.getTitle()).amount(t.getAmount())
                        .type(t.getType()).category(t.getCategory()).date(t.getDate()).notes(t.getNotes())
                        .build())
                .collect(Collectors.toList());

        return DashboardSummaryDTO.builder()
                .totalIncome(totalIncome)
                .totalExpense(totalExpense)
                .balance(totalIncome.subtract(totalExpense))
                .expenseByCategory(expenseByCategory)
                .incomeByCategory(incomeByCategory)
                .monthlyTrend(new ArrayList<>(trendMap.values()))
                .recentTransactions(recent)
                .build();
    }
}
