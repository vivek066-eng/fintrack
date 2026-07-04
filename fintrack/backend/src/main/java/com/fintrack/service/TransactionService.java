package com.fintrack.service;

import com.fintrack.dto.TransactionDTO;
import com.fintrack.exception.ApiException;
import com.fintrack.model.Transaction;
import com.fintrack.model.TransactionType;
import com.fintrack.model.User;
import com.fintrack.repository.TransactionRepository;
import com.fintrack.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public TransactionService(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    private User getUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ApiException("User not found", HttpStatus.NOT_FOUND));
    }

    public TransactionDTO create(String username, TransactionDTO dto) {
        User user = getUser(username);
        Transaction transaction = Transaction.builder()
                .title(dto.getTitle())
                .amount(dto.getAmount())
                .type(dto.getType())
                .category(dto.getCategory())
                .date(dto.getDate())
                .notes(dto.getNotes())
                .user(user)
                .build();
        Transaction saved = transactionRepository.save(transaction);
        return toDTO(saved);
    }

    public List<TransactionDTO> getAll(String username) {
        User user = getUser(username);
        return transactionRepository.findByUserOrderByDateDesc(user)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<TransactionDTO> getByType(String username, TransactionType type) {
        User user = getUser(username);
        return transactionRepository.findByUserAndTypeOrderByDateDesc(user, type)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public TransactionDTO update(String username, Long id, TransactionDTO dto) {
        User user = getUser(username);
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ApiException("Transaction not found", HttpStatus.NOT_FOUND));

        if (!transaction.getUser().getId().equals(user.getId())) {
            throw new ApiException("You are not authorized to update this transaction", HttpStatus.FORBIDDEN);
        }

        transaction.setTitle(dto.getTitle());
        transaction.setAmount(dto.getAmount());
        transaction.setType(dto.getType());
        transaction.setCategory(dto.getCategory());
        transaction.setDate(dto.getDate());
        transaction.setNotes(dto.getNotes());

        return toDTO(transactionRepository.save(transaction));
    }

    public void delete(String username, Long id) {
        User user = getUser(username);
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ApiException("Transaction not found", HttpStatus.NOT_FOUND));

        if (!transaction.getUser().getId().equals(user.getId())) {
            throw new ApiException("You are not authorized to delete this transaction", HttpStatus.FORBIDDEN);
        }
        transactionRepository.delete(transaction);
    }

    private TransactionDTO toDTO(Transaction t) {
        return TransactionDTO.builder()
                .id(t.getId())
                .title(t.getTitle())
                .amount(t.getAmount())
                .type(t.getType())
                .category(t.getCategory())
                .date(t.getDate())
                .notes(t.getNotes())
                .build();
    }
}
