package com.Ak.CloudService.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.Ak.CloudService.document.TransactionDocument;
import com.Ak.CloudService.repository.TransactionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final ProfileService profileService;

    public TransactionDocument logUpload(String clerkId) {
        TransactionDocument tx = TransactionDocument.builder()
                .clerkId(clerkId)
                .type("UPLOAD")
                .credits(1)
                .amount(0.0)
                .timestamp(LocalDateTime.now())
                .build();
        return transactionRepository.save(tx);
    }

    public TransactionDocument logPurchase(String clerkId, int credits, double amount) {
        TransactionDocument tx = TransactionDocument.builder()
                .clerkId(clerkId)
                .type("PURCHASE")
                .credits(credits)
                .amount(amount)
                .timestamp(LocalDateTime.now())
                .build();
        return transactionRepository.save(tx);
    }

    public List<TransactionDocument> getTransactionsForCurrentUser() {
        String clerkId = profileService.getCurrentProfile().getClerkId();
        return transactionRepository.findByClerkId(clerkId);
    }
}
