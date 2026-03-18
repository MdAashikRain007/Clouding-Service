package com.Ak.CloudService.controller;

import com.Ak.CloudService.document.TransactionDocument;
import com.Ak.CloudService.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping
    public ResponseEntity<List<TransactionDocument>> listTransactions() {
        List<TransactionDocument> txs = transactionService.getTransactionsForCurrentUser();
        return ResponseEntity.ok(txs);
    }
}
