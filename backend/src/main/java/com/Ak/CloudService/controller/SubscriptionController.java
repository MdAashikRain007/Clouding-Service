package com.Ak.CloudService.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Ak.CloudService.document.SubscriptionDocument;
import com.Ak.CloudService.document.TransactionDocument;
import com.Ak.CloudService.service.SubscriptionService;
import com.Ak.CloudService.service.TransactionService;
import com.Ak.CloudService.service.UserCreditsService;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
    private final UserCreditsService userCreditsService;
    private final TransactionService transactionService;

    @GetMapping
    public ResponseEntity<SubscriptionDocument> current() {
        return ResponseEntity.ok(subscriptionService.getCurrentSubscription());
    }

    @PostMapping("/purchase")
    public ResponseEntity<?> purchase(@RequestBody PurchaseRequest req) {
        // plan mapping with INR pricing
        int credits;
        double amount;
        // switch expression for plan mapping
        switch (req.getPlan()) {
            case "starter" -> {
                credits = 50;
                amount = 199.0;
            }
            case "pro" -> {
                credits = 200;
                amount = 499.0;
            }
            default -> {
                credits = 5;
                amount = 0.0;
            }
        }
        // add credits
        var uc = userCreditsService.addCredits(credits);
        // log transaction and update subscription
        TransactionDocument tx = transactionService.logPurchase(uc.getClerkId(), credits, amount);
        SubscriptionDocument sub = subscriptionService.purchasePlan(req.getPlan(), credits, amount);
        return ResponseEntity.ok(Map.of("subscription", sub, "transaction", tx, "credits", uc.getCredits()));
    }

    @Data
    public static class PurchaseRequest {
        private String plan;
    }
}